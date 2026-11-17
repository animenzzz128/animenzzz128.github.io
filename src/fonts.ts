// Fonts are served from this site, not from Google Fonts: a render-blocking request to another host is the
// one thing that can leave the page blank where that host is slow or blocked.
import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';

// The Chinese faces come as about a hundred unicode-range slices per weight, so their stylesheets are large
// (~80 KB compressed for the display face, ~120 KB for the text face). They load after first paint; until
// then Chinese text shows in the system font.

/** The display face: everyone sees the Chinese name and project titles, so everyone gets it. */
export const cjkFonts: Promise<unknown> = import('./fonts-cjk-serif').catch(() => undefined);

// The text face only matters on the Chinese version; English pages leave their few Chinese words to the system font.
let asked = false;
function textFace() {
  if (asked || document.documentElement.getAttribute('data-lang') !== 'zh') return;
  asked = true;
  import('./fonts-cjk-sans').catch(() => undefined);
}
textFace();
new MutationObserver(textFace).observe(document.documentElement, { attributes: true, attributeFilter: ['data-lang'] });
