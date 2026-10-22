import { useRef, useState, type CSSProperties } from 'react';
import T from './T';

export default function Contact() {
  const email = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  function copy() {
    const select = () => {
      if (!email.current) return;
      const r = document.createRange();
      r.selectNodeContents(email.current);
      const s = getSelection();
      s?.removeAllRanges();
      s?.addRange(r);
    };
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText('jacky.yao@yale.edu').then(done, select);
    else select();
  }

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <div className="eyebrow" style={{ color: 'inherit', opacity: '.7' } as CSSProperties}><T en="Contact" zh="联系方式" /></div>
        <h2><span className="en">Have a role or a problem in mind? <mark className="hl" style={{ '--d': '0s' } as CSSProperties}>Let’s talk.</mark></span><span className="zh">有合适的机会或想聊的问题？<mark className="hl" style={{ '--d': '0s' } as CSSProperties}>欢迎联系我。</mark></span></h2>
        <div className="contact-row">
          <span className="email" ref={email}>jacky.yao@yale.edu</span>
          <button className="btn primary" type="button" onClick={copy}>{copied ? <T en="Copied" zh="已复制" /> : <T en="Copy email" zh="复制邮箱" />}</button>
          <a className="btn" href="https://www.linkedin.com/in/jiaqi-jacky-yao-94188b25a/" target="_blank" rel="noopener">LinkedIn ↗</a>
          <a className="btn" href="https://github.com/animenzzz128" target="_blank" rel="noopener">GitHub ↗</a>
        </div>
        <p className="foot">New Haven, CT · <T en="Open to full-time roles in North America and China" zh="关注北美与国内的全职机会" /></p>
      </div>
    </section>
  );
}
