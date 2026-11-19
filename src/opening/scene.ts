/**
 * The home page opening: a six-second walk through a small gallery.
 *   0.0  title wall   the name is lettered onto the green entrance wall
 *   1.5  the corner   the camera trucks right, past the wall's edge, into the white room
 *   2.9  the wall     the framed projects; lamps come on one by one, the last template comes down
 *   4.0  step closer  the first work and its label
 *   5.0  the ticket   the label lifts off the wall and lands where the page's ticket sits
 * Every frame is computed from the time alone, so the film can be skipped or jumped to any moment.
 * Lighting is painted, not computed: materials are unlit and the lamp pools and shadows are textures.
 */
import {
  BoxGeometry, CanvasTexture, Color, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry,
  RepeatWrapping, Scene, ShaderMaterial, SRGBColorSpace, Texture, Vector2, Vector3, WebGLRenderer,
} from 'three';

export const END = 6.0;
/** Chapter start times, for captions. */
export const CHAPTERS = [0, 1.5, 4.0, 5.0];

export type OpeningWork = { name: string; line: string; facts: string[]; image: string };
/**
 * The page ticket's rows, as fractions of the ticket's height: each row's label (as shown, in the page's language),
 * its top edge and its label's baseline; `bottom` is the last row's bottom edge and `size` the label font size.
 * `nums` are the three figures under the rows (left edge as a fraction of the width), `numSize` their font size.
 */
export type TicketLayout = {
  rows: { label: string; top: number; base: number }[]; bottom: number; size: number;
  nums?: { text: string; left: number; base: number }[]; numSize?: number;
};
export type OpeningOptions = {
  canvas: HTMLCanvasElement;
  dark: boolean;
  zh: boolean;
  works: OpeningWork[];
  /** Where the real ticket sits on the page, so the 3D one can land on it. */
  ticketRect: () => DOMRect | null;
  /** The real ticket's rows, so the painted one shows the same labels on the same lines. */
  ticketRows?: () => TicketLayout | null;
};
export type Opening = {
  /** Draws the frame for time t (seconds) and returns how opaque the overlay should be. */
  frame: (t: number) => number;
  resize: () => void;
  dispose: () => void;
};

const c01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const seg = (t: number, a: number, b: number) => c01((t - a) / (b - a));
const eio = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const ss = (t: number) => t * t * (3 - 2 * t);

const FOV = 32;
const TAN = Math.tan((FOV * Math.PI) / 360);
const F_DISPLAY = '"Fraunces Variable", "Fraunces", "Noto Serif SC", Georgia, serif';
const F_MONO = '"IBM Plex Mono", ui-monospace, Menlo, monospace';
const F_BODY = '"Hanken Grotesk Variable", "Hanken Grotesk", "Noto Sans SC", system-ui, sans-serif';
const F_CN = '"Noto Serif SC", "Songti SC", serif';

const LIGHT = {
  wall: '#ebe6dc', pool: '255,253,246', poolA: 1, floorA: '#b98f60', floorB: '#a67f52', base: '#e7e0d2',
  mat: '#fbf8f1', frame: '#2a2620', sheet: '#fbf8f1', ink: '#14261e', muted: '#5d6a62', rule: '#ddd5c6', brass: '#8a6c35',
};
const DARK = {
  wall: '#141a17', pool: '255,200,87', poolA: 0.3, floorA: '#4a3924', floorB: '#3e2f1d', base: '#1f2622',
  mat: '#171d1a', frame: '#050605', sheet: '#171d1a', ink: '#ece6da', muted: '#a0a89f', rule: '#2b332e', brass: '#d9b56a',
};
const GREEN = '#1e4636';
const CREAM = '#f6f1e4';

function canvas2d(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return { c, g: c.getContext('2d')! };
}
function tex(c: HTMLCanvasElement | ImageBitmap) {
  const t = c instanceof HTMLCanvasElement ? new CanvasTexture(c) : new Texture(c);
  t.colorSpace = SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}
function spacing(g: CanvasRenderingContext2D, px: number) {
  // Letter spacing on canvas text is not in every browser; without it the text is just a little tighter.
  (g as unknown as { letterSpacing: string }).letterSpacing = `${px}px`;
}
function wrapText(g: CanvasRenderingContext2D, text: string, x: number, y: number, maxW: number, lh: number, maxLines: number) {
  // Chinese breaks between any two characters; a Latin word inside a mixed name ("像素小屋 Jacky's Room") stays whole.
  const units = text.match(/[　-〿㐀-鿿＀-￯]|[^\s　-〿㐀-鿿＀-￯]+\s*|\s+/g) || [];
  let line = '', n = 0;
  for (const u of units) {
    if (g.measureText(line + u).width > maxW && line) {
      g.fillText(line.trimEnd(), x, y + n * lh);
      line = u.trim() ? u : ''; n++;
      if (n >= maxLines) return n;
    } else line += u;
  }
  if (line) { g.fillText(line.trimEnd(), x, y + n * lh); n++; }
  return n;
}
/**
 * A screenshot, decoded and scaled down off the main thread. On the wall it is never drawn wider than ~700
 * pixels, and uploading the originals (up to 2560 px wide, with mipmaps) froze the page for a third of a second.
 * The bitmap is flipped here because WebGL ignores a texture's flipY for ImageBitmaps.
 */
async function loadImage(src: string): Promise<ImageBitmap | null> {
  try {
    const blob = await (await fetch(src)).blob();
    return await createImageBitmap(blob, { resizeWidth: 1024, resizeQuality: 'high', imageOrientation: 'flipY' });
  } catch (e) {
    return null;
  }
}

/**
 * Lettering on the title wall, drawn once into two textures: the fixed parts (pencil guide, tape) and the words.
 * The words are revealed by their material, never by redrawing. An earlier version redrew and re-uploaded one
 * 2048x1024 texture every frame while the letters went up; on an integrated GPU at 240 Hz that dropped about
 * half the frames of the film's first two seconds.
 */
function titleArt(zh: boolean) {
  const W = 2048, H = 1024, fixed = canvas2d(W, H), words = canvas2d(W, H);
  const name = 'Jiaqi (Jacky) Yao', chars = Array.from(name);
  let g = words.g;
  g.font = `500 200px ${F_DISPLAY}`;
  const size = Math.floor((200 * 1500) / g.measureText(name).width);
  const font = `500 ${size}px ${F_DISPLAY}`;
  g.font = font;
  const full = g.measureText(name).width, x0 = (W - full) / 2, base = 520;
  // left edge of every letter, plus the right edge of the last one
  const edges = chars.map((_, i) => x0 + g.measureText(name.slice(0, i)).width).concat(x0 + full);

  // the words: kicker, name, Chinese name, each in its own horizontal band
  g.textBaseline = 'alphabetic';
  g.fillStyle = '#c9d3c8'; g.font = `500 34px ${F_MONO}`; spacing(g, 9);
  g.fillText(zh ? '凭券入场 · 耶鲁管理学院 2027 届' : 'ADMIT ONE · YALE SOM ’27', x0, base - size * 1.12 - 8);
  spacing(g, 0);
  g.fillStyle = CREAM; g.font = font;
  g.fillText(name, x0, base);
  g.fillStyle = '#c9d3c8'; g.font = `500 66px ${F_CN}`; spacing(g, 22);
  g.fillText('姚嘉骐', x0, base + 150);
  spacing(g, 0);

  // the fixed parts: the signwriter's pencil guide and two pieces of masking tape
  g = fixed.g;
  g.globalAlpha = 0.42; g.strokeStyle = CREAM; g.lineWidth = 2; g.setLineDash([10, 9]);
  g.beginPath(); g.moveTo(x0 - 20, base + 44); g.lineTo(x0 + full + 20, base + 44); g.stroke();
  g.setLineDash([]);
  g.globalAlpha = 0.85; g.fillStyle = '#7faedb';
  for (const [tx, ty, r] of [[x0 - 150, base - size * 1.5, -0.5], [x0 + full - 70, base - size * 1.02, 0.16]] as const) {
    g.save(); g.translate(tx, ty); g.rotate(r); g.fillRect(0, 0, 130, 30); g.restore();
  }
  return {
    fixed: tex(fixed.c), words: tex(words.c), chars,
    edges: edges.map((x) => x / W),
    // band limits in texture v (1 = top): above `kicker` is the kicker, below `cn` the Chinese name, between them the name
    bands: new Vector2(1 - (base - size * 1.03) / H, 1 - (base + size * 0.36) / H),
    // the piece of transfer film that sits over the letter going up: top edge and height as fractions of the canvas
    film: { top: (base - size * 0.92) / H, height: (size * 1.2) / H, pad: 14 / W },
  };
}

/** Shows the words texture band by band: the kicker and the Chinese name fade, the name is wiped in up to uFront. */
function letteringMaterial(map: Texture, bands: Vector2) {
  return new ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { map: { value: map }, uBands: { value: bands }, uFront: { value: 0 }, uKick: { value: 0 }, uCn: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'uniform sampler2D map; uniform vec2 uBands; uniform float uFront; uniform float uKick; uniform float uCn; varying vec2 vUv;',
      'void main() {',
      '  vec4 c = texture2D(map, vUv);',
      '  float a = vUv.y > uBands.x ? uKick : (vUv.y < uBands.y ? uCn : 1.0 - smoothstep(uFront - 0.012, uFront, vUv.x));',
      '  gl_FragColor = vec4(c.rgb, c.a * a);',
      '  #include <colorspace_fragment>',
      '}',
    ].join('\n'),
  });
}

function poolArt(rgb: string, alpha: number) {
  const { c, g } = canvas2d(256, 256);
  const r = g.createRadialGradient(128, 114, 0, 128, 114, 112); // fades out inside the square, so no edge shows
  r.addColorStop(0, `rgba(${rgb},${alpha})`);
  r.addColorStop(0.55, `rgba(${rgb},${alpha * 0.45})`);
  r.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = r; g.fillRect(0, 0, 256, 256);
  return tex(c);
}
function shadowArt() {
  const { c, g } = canvas2d(256, 256);
  g.shadowColor = 'rgba(0,0,0,.55)'; g.shadowBlur = 36; g.shadowOffsetY = 14;
  g.fillStyle = 'rgba(0,0,0,.5)'; g.fillRect(48, 48, 160, 150);
  return tex(c);
}
function fadeArt() {
  const { c, g } = canvas2d(4, 64);
  const l = g.createLinearGradient(0, 0, 0, 64);
  l.addColorStop(0, 'rgba(0,0,0,.34)'); l.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = l; g.fillRect(0, 0, 4, 64);
  return tex(c);
}
function floorArt(a: string, b: string) {
  const { c, g } = canvas2d(512, 512);
  g.fillStyle = a; g.fillRect(0, 0, 512, 512);
  let s = 7;
  const rnd = () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
  for (let row = 0; row < 8; row++) {
    let x = -rnd() * 200;
    while (x < 512) {
      const w = 150 + rnd() * 160;
      const darker = rnd() < 0.5;
      g.globalAlpha = (0.1 + rnd() * 0.22) * (darker ? 1 : 0.3); g.fillStyle = darker ? b : '#ffffff';
      g.fillRect(x, row * 64, w, 64);
      g.globalAlpha = 0.5; g.fillStyle = b; g.fillRect(x, row * 64, 2, 64);
      x += w;
    }
    g.globalAlpha = 0.55; g.fillStyle = b; g.fillRect(0, row * 64, 512, 2);
  }
  const t = tex(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  return t;
}
function kraftArt(no: number) {
  const { c, g } = canvas2d(512, 360);
  g.fillStyle = '#c9a678'; g.fillRect(0, 0, 512, 360);
  g.strokeStyle = 'rgba(90,62,28,.7)'; g.lineWidth = 3; g.setLineDash([14, 10]); g.strokeRect(18, 18, 476, 324);
  g.setLineDash([]); g.fillStyle = 'rgba(90,62,28,.8)'; g.font = `500 26px ${F_MONO}`; spacing(g, 4);
  g.fillText(`NO. ${String(no).padStart(2, '0')}`, 40, 64);
  g.fillStyle = '#7faedb'; g.globalAlpha = 0.9;
  g.save(); g.translate(-10, 6); g.rotate(-0.5); g.fillRect(0, 0, 90, 22); g.restore();
  g.save(); g.translate(440, -14); g.rotate(0.5); g.fillRect(0, 0, 90, 22); g.restore();
  return tex(c);
}
function placardArt(P: typeof LIGHT, i: number, n: number, w: OpeningWork) {
  const { c, g } = canvas2d(512, 560);
  g.fillStyle = P.sheet; g.fillRect(0, 0, 512, 560);
  g.strokeStyle = P.rule; g.lineWidth = 3; g.strokeRect(1.5, 1.5, 509, 557);
  g.textBaseline = 'alphabetic';
  g.fillStyle = P.brass; g.font = `500 24px ${F_MONO}`; spacing(g, 4);
  g.fillText(`NO. ${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`, 40, 76); spacing(g, 0);
  g.fillStyle = P.ink; g.font = `600 50px ${F_DISPLAY}`;
  wrapText(g, w.name, 40, 150, 432, 58, 2);
  const two = g.measureText(w.name).width > 432;
  g.fillStyle = P.rule; g.fillRect(40, two ? 238 : 182, 432, 2);
  g.fillStyle = P.ink; g.font = `600 29px ${F_BODY}`;
  let y = (two ? 290 : 236) + wrapText(g, w.line, 40, two ? 290 : 236, 432, 42, 4) * 42;
  // the evidence: the same checked facts the page's label lists
  g.fillStyle = P.rule; g.fillRect(40, y - 18, 432, 2);
  g.font = `400 23px ${F_MONO}`;
  for (const f of w.facts) {
    if (y + 26 > 520) break;
    g.fillStyle = P.brass; g.fillText('—', 40, y + 26);
    g.fillStyle = P.ink;
    y += wrapText(g, f, 76, y + 26, 396, 32, 2) * 32 + 6;
  }
  return tex(c);
}
/** Used only if the page's ticket cannot be read: its rows as measured at 1440×900. */
const TICKET_FALLBACK = (zh: boolean): TicketLayout => ({
  rows: (zh ? ['毕业', '地点', '项目', '游戏'] : ['GRADUATING', 'LOCATION', 'PROJECTS', 'GAMES'])
    .map((label, i) => { const top = [0.162, 0.24, 0.356, 0.589][i]; return { label, top, base: top + 0.031 }; }),
  bottom: 0.789,
  size: 0.0207,
});
function ticketArt(P: typeof LIGHT, zh: boolean, aspect: number, layout: TicketLayout | null) {
  const W = 800, H = Math.round(W / aspect), { c, g } = canvas2d(W, H);
  g.fillStyle = P.sheet; g.fillRect(0, 0, W, H);
  g.strokeStyle = P.rule; g.lineWidth = 3; g.strokeRect(1.5, 1.5, W - 3, H - 3);
  g.fillStyle = GREEN; g.fillRect(0, 0, W, 84);
  g.textBaseline = 'alphabetic';
  g.fillStyle = '#f4f0e8'; g.font = `500 27px ${F_MONO}`; spacing(g, 6);
  g.fillText('ADMIT ONE', 44, 52);
  const r = 'CLASS OF 2027';
  g.fillText(r, W - 44 - g.measureText(r).width, 52); spacing(g, 0);
  g.fillStyle = '#2f7a52'; g.beginPath(); g.arc(54, 136, 9, 0, Math.PI * 2); g.fill();
  g.fillStyle = P.ink; g.font = `500 26px ${F_MONO}`;
  g.fillText(zh ? '正在寻找全职机会' : 'Open to full-time roles', 82, 145);
  // Rows and labels are read from the page's ticket, so the hand-over lines up: the same labels on the same lines.
  const L = layout && layout.rows.length ? layout : TICKET_FALLBACK(zh);
  const fs = Math.round(Math.max(16, Math.min(30, L.size * H)));
  L.rows.forEach((row, i) => {
    const y = Math.round(row.top * H);
    g.fillStyle = P.rule;
    if (i === 0) { for (let x = 44; x < W - 44; x += 14) g.fillRect(x, y, Math.min(7, W - 44 - x), 2); } // the dashed rule under the status line
    else g.fillRect(44, y, W - 88, 2);
    // Labels only: the values fade in with the real ticket, so the two never show as doubled text.
    g.fillStyle = P.muted; g.font = `500 ${fs}px ${F_MONO}`; spacing(g, 2); g.fillText(row.label, 44, Math.round(row.base * H)); spacing(g, 0);
  });
  const bottom = Math.round(Math.min(0.9, L.bottom) * H);
  g.fillStyle = P.rule; g.fillRect(44, bottom, W - 88, 2);
  if (L.nums?.length && L.numSize) {
    // the figures at the page's own size and place, so they do not double up when the real ticket fades in
    g.fillStyle = P.ink; g.font = `500 ${Math.round(Math.max(24, Math.min(64, L.numSize * H)))}px ${F_DISPLAY}`;
    L.nums.forEach((b) => g.fillText(b.text, Math.round(b.left * W), Math.round(b.base * H)));
  } else {
    ['+1.5pp', '5,000+', '−60%'].forEach((b, i) => {
      g.fillStyle = P.ink; g.font = `500 50px ${F_DISPLAY}`; g.fillText(b, 44 + ((W - 88) / 3) * i, bottom + 78);
    });
  }
  return tex(c);
}

export async function createOpening(o: OpeningOptions, cancelled: () => boolean): Promise<Opening | null> {
  const P = o.dark ? DARK : LIGHT;
  // Screenshots are part of the film, but never worth waiting long for: a blank mat is fine.
  const images = await Promise.race([
    Promise.all(o.works.map((w) => loadImage(w.image))),
    new Promise<null[]>((res) => setTimeout(() => res(o.works.map(() => null)), 1200)),
  ]);
  if (cancelled()) return null;

  const renderer = new WebGLRenderer({ canvas: o.canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setClearColor(new Color(P.wall), 1);
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 200);
  const owned: { dispose: () => void }[] = [];
  const keep = <T extends { dispose: () => void }>(x: T) => { owned.push(x); return x; };
  const flat = (color: string) => keep(new MeshBasicMaterial({ color }));
  const painted = (map: Texture, opacity = 1) => keep(new MeshBasicMaterial({ map: keep(map), transparent: true, opacity, depthWrite: false }));
  const plane = (w: number, h: number, m: MeshBasicMaterial, x: number, y: number, z: number, parent: Group | Scene = scene) => {
    const mesh = new Mesh(keep(new PlaneGeometry(w, h)), m);
    mesh.position.set(x, y, z); parent.add(mesh);
    return mesh;
  };
  const box = (w: number, h: number, d: number, m: MeshBasicMaterial | MeshBasicMaterial[], x: number, y: number, z: number) => {
    const mesh = new Mesh(keep(new BoxGeometry(w, h, d)), m);
    mesh.position.set(x, y, z); scene.add(mesh);
    return mesh;
  };

  // ---- the room ----
  plane(40, 40, flat(P.wall), 4, 20, 0);
  box(40, 0.12, 0.03, flat(P.base), 4, 0.06, 0.015);
  const floorTex = floorArt(P.floorA, P.floorB);
  floorTex.repeat.set(44 / 3.2, 70 / 1.28); floorTex.anisotropy = aniso;
  const floor = plane(44, 70, keep(new MeshBasicMaterial({ map: keep(floorTex) })), 4, 0, 35);
  floor.rotation.x = -Math.PI / 2;
  const fade = fadeArt();
  const floorShade = plane(44, 2.6, painted(fade, o.dark ? 0.9 : 0.6), 4, 0.003, 1.3);
  floorShade.rotation.x = -Math.PI / 2;

  // ---- the green title wall: a partition standing in front of the white wall, ending at x = -3.2 ----
  const green = flat(GREEN), greenEnd = flat('#163527');
  box(10, 40, 0.3, [greenEnd, greenEnd, green, green, green, green], -8.2, 20, 1.1);
  box(10, 0.12, 0.02, flat('#163527'), -8.2, 0.06, 1.26);
  const shadeOnGreen = plane(10, 2.6, painted(fade, 0.55), -8.2, 0.003, 2.55);
  shadeOnGreen.rotation.x = -Math.PI / 2;
  const title = titleArt(o.zh);
  const TW = 5.6, TH = 2.8, TX = -6.6, TY = 1.9; // the lettering's size and centre on the wall, in metres
  title.fixed.anisotropy = title.words.anisotropy = aniso;
  plane(TW, TH, painted(title.fixed), TX, TY, 1.252);
  const lettering = keep(letteringMaterial(keep(title.words), title.bands));
  const letteringMesh = new Mesh(keep(new PlaneGeometry(TW, TH)), lettering);
  letteringMesh.position.set(TX, TY, 1.2525); scene.add(letteringMesh);
  const film = keep(new MeshBasicMaterial({ color: CREAM, transparent: true, opacity: 0, depthWrite: false }));
  const filmMesh = plane(1, title.film.height * TH, film, TX, TY + (0.5 - title.film.top - title.film.height / 2) * TH, 1.253);

  // ---- the works, 3 m apart ----
  const n = o.works.length, FX = o.works.map((_, i) => 3 * i), FY = 1.6;
  // The wall shot spans the lamp pools end to end (each 3.6 m wide): 1.8 m past the first and last frames' centres.
  // The last label reaches +1.68 m, so do not tighten this.
  const ROW = FX[n - 1];
  const pool = poolArt(P.pool, P.poolA), shadow = shadowArt();
  const pools: MeshBasicMaterial[] = [], shots: MeshBasicMaterial[] = [];
  const labels: { mesh: Mesh; mat: MeshBasicMaterial; x: number }[] = [];
  const frameMat = flat(P.frame), matMat = flat(P.mat);
  o.works.forEach((w, i) => {
    const x = FX[i];
    const pm = painted(pool, 0); pools.push(pm);
    plane(3.6, 3.8, pm, x, FY + 0.5, 0.002);
    plane(2.9, 2.3, painted(shadow, o.dark ? 0.9 : 0.55), x, FY - 0.06, 0.004);
    box(2.02, 1.42, 0.05, frameMat, x, FY, 0.03);
    plane(1.92, 1.32, matMat, x, FY, 0.0556);
    const im = images[i];
    let sm: MeshBasicMaterial;
    if (im) {
      const t = keep(tex(im)); t.anisotropy = aniso; t.flipY = false;
      const ia = im.width / im.height;
      // same crop as the page: 16:10, anchored top left
      if (ia > 1.6) t.repeat.set(1.6 / ia, 1); else { t.repeat.set(1, ia / 1.6); t.offset.set(0, 1 - ia / 1.6); }
      sm = keep(new MeshBasicMaterial({ map: t }));
    } else sm = flat(P.rule);
    shots.push(sm);
    plane(1.6, 1.0, sm, x, FY, 0.0562);
    if (i > 0) {
      const mat = painted(placardArt(P, i, n, w), 0);
      labels.push({ mesh: plane(0.5, 0.547, mat, x + 1.43, 1.3, 0.006), mat, x: x + 1.43 });
    }
  });

  // The last work is still a kraft-paper hanging template; it comes down as the lamps come on.
  const kraft = new Group();
  kraft.position.set(FX[n - 1] - 1.01, FY + 0.71, 0.062); scene.add(kraft);
  const kraftMat = painted(kraftArt(n));
  plane(2.02, 1.42, kraftMat, 1.01, -0.71, 0, kraft);

  // The first work's label, which becomes the ticket.
  const HOME = new Vector3(FX[0] + 1.43, 1.3, 0.008), HOME_W = 0.5, HOME_H = 0.547;
  const rect0 = o.ticketRect();
  const tAspect = rect0 && rect0.width > 0 && rect0.height > 0 ? rect0.width / rect0.height : 0.95;
  let rows0: TicketLayout | null = null;
  try { rows0 = o.ticketRows?.() ?? null; } catch (e) { /* painted from the fallback rows instead */ }
  const label = painted(placardArt(P, 0, n, o.works[0]));
  const ticket = painted(ticketArt(P, o.zh, Math.max(0.6, Math.min(1.6, tAspect)), rows0), 0);
  const card = new Group(); scene.add(card);
  const unit = keep(new PlaneGeometry(1, 1));
  const cardA = new Mesh(unit, label), cardB = new Mesh(unit, ticket);
  cardB.position.z = 0.0006; cardB.renderOrder = 2; cardA.renderOrder = 1;
  card.add(cardA, cardB);

  // ---- camera: each shot frames a rectangle on a wall; the distance follows from the window's shape ----
  let vw = 1, vh = 1, aspect = 1;
  type Shot = { t: number; x: number; y: number; w: number; h: number; z: number; ease: (t: number) => number };
  let SHOTS: Shot[] = [];
  function layout() {
    const tall = aspect < 0.9;
    SHOTS = [
      { t: 0.0, x: -6.6, y: 1.9, w: tall ? 5.0 : 6.6, h: 3.0, z: 1.25, ease: ss },
      { t: 1.5, x: -6.6, y: 1.9, w: tall ? 4.7 : 6.0, h: 2.8, z: 1.25, ease: ss },
      { t: 2.9, x: tall ? 1.6 : ROW / 2, y: 1.5, w: tall ? 5.6 : ROW + 3.6, h: 3.2, z: 0, ease: eio },
      { t: 4.0, x: tall ? 2.0 : ROW / 2 + 0.4, y: 1.5, w: tall ? 5.4 : ROW + 3.2, h: 3.1, z: 0, ease: ss },
      { t: 5.0, x: tall ? 0.35 : 0.65, y: 1.5, w: tall ? 3.1 : 3.9, h: 2.0, z: 0, ease: eio },
      { t: END, x: tall ? 0.38 : 0.7, y: 1.5, w: tall ? 3.0 : 3.7, h: 1.9, z: 0, ease: ss },
    ];
  }
  const eye = (s: Shot) => s.z + Math.max(s.w / (2 * TAN * aspect), s.h / (2 * TAN));
  function resize() {
    vw = o.canvas.clientWidth || 1; vh = o.canvas.clientHeight || 1; aspect = vw / vh;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(vw, vh, false);
    camera.aspect = aspect; camera.updateProjectionMatrix();
    layout();
  }
  resize();

  const landing = new Vector3();
  function frame(t: number) {
    t = c01(t / END) * END;
    // camera
    let i = 0;
    while (i < SHOTS.length - 2 && t >= SHOTS[i + 1].t) i++;
    const a = SHOTS[i], b = SHOTS[i + 1], k = b.ease(seg(t, a.t, b.t));
    camera.position.set(lerp(a.x, b.x, k), lerp(a.y, b.y, k), lerp(eye(a), eye(b), k));
    camera.lookAt(camera.position.x, camera.position.y, 0);
    camera.updateMatrixWorld();

    // lettering
    // One letter at a time: the wipe front crosses the current letter while a piece of film sits over it.
    const lp = seg(t, 0.15, 1.35), ln = title.chars.length, lk = lp * (ln + 1.5);
    const li = Math.min(ln - 1, Math.floor(lk)), lf = c01(lk - li), going = lk < ln;
    lettering.uniforms.uKick.value = seg(lp, 0, 0.12) * 0.9;
    lettering.uniforms.uCn.value = seg(lp, 0.82, 1);
    lettering.uniforms.uFront.value = going ? lerp(title.edges[li], title.edges[li + 1], ss(c01(lf * 1.5))) : 1.02;
    const lw = title.edges[li + 1] - title.edges[li] + 2 * title.film.pad;
    filmMesh.position.x = TX + ((title.edges[li] + title.edges[li + 1]) / 2 - 0.5) * TW;
    filmMesh.scale.x = lw * TW;
    film.opacity = going && lp > 0 && title.chars[li] !== ' ' ? 0.3 * (1 - Math.abs(2 * lf - 1)) : 0;

    // lamps, one by one; a work is a little grey until its lamp is on
    for (let j = 0; j < pools.length; j++) {
      const lit = ss(seg(t, 2.2 + 0.28 * j, 2.9 + 0.28 * j));
      pools[j].opacity = lit;
      shots[j].color.setScalar(lerp(0.66, 1, lit));
    }

    // each label slides out from behind its frame as the lamp above comes on
    const out = (j: number) => ss(seg(t, 2.45 + 0.28 * j, 3.05 + 0.28 * j));
    labels.forEach((l, j) => { const k = out(j + 1); l.mat.opacity = k; l.mesh.position.x = l.x - (1 - k) * 0.35; });

    // the template comes off the last work
    const kd = eio(seg(t, 3.0, 3.9));
    kraft.rotation.z = -0.5 * kd;
    kraft.position.y = FY + 0.71 - 2.6 * kd * kd;
    kraftMat.opacity = 1 - seg(t, 3.55, 3.9);
    kraft.visible = kd < 1;

    // label -> ticket: fly from the wall to where the page's ticket is
    const e = eio(seg(t, 5.0, 5.75));
    const r = o.ticketRect();
    const ok = !!r && r.width > 0 && r.top < vh * 0.92 && r.bottom > 0;
    const rw = ok ? r!.width : Math.min(vw * 0.82, 400), rh = ok ? r!.height : rw / 0.95;
    const cx = ok ? r!.left + rw / 2 : vw / 2, cy = ok ? r!.top + rh / 2 : vh * 0.56;
    const dz = 1.0, s = (2 * dz * TAN) / vh;
    landing.set((cx - vw / 2) * s, (vh / 2 - cy) * s, -dz).applyMatrix4(camera.matrixWorld);
    card.position.lerpVectors(HOME, landing, e);
    card.scale.set(lerp(HOME_W, rw * s, e), lerp(HOME_H, rh * s, e), 1);
    card.rotation.set(0, Math.sin(Math.PI * e) * 0.4, ok && vw > 880 ? -0.0105 * e : 0);
    const turn = ss(seg(t, 5.1, 5.5));
    ticket.opacity = turn; label.opacity = out(0) * (1 - seg(t, 5.4, 5.55));
    card.position.x -= (1 - out(0)) * 0.35 * (1 - e);

    renderer.render(scene, camera);
    return 1 - ss(seg(t, 5.5, END));
  }

  // Get the GPU ready before the film starts. Shaders compile in the background where the browser allows it
  // (compiling them inline blocked the page for ~0.3 s); then one wide shot is drawn so every texture uploads
  // now, not as a stutter when the camera first rounds the corner.
  try { await renderer.compileAsync(scene, camera); } catch (e) { /* compiled on first draw instead */ }
  if (cancelled()) { owned.forEach((x) => x.dispose()); renderer.dispose(); return null; }
  frame(3.2);
  frame(0);

  function dispose() {
    owned.forEach((x) => x.dispose());
    renderer.dispose();
  }
  return { frame, resize, dispose };
}
