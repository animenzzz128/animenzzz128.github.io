import { useCallback, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'zh';

/** Every visible string has both languages; a missing one is a type error. */
export type Bi = { en: ReactNode; zh: ReactNode };

export function useLang() {
  const [lang, setState] = useState<Lang>(() => (document.documentElement.getAttribute('data-lang') === 'zh' ? 'zh' : 'en'));
  const setLang = useCallback((l: Lang) => {
    document.documentElement.setAttribute('data-lang', l);
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
    try { localStorage.setItem('lang', l); } catch (e) { /* storage blocked */ }
    setState(l);
  }, []);
  return [lang, setLang] as const;
}
