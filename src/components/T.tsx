import type { Bi } from '../lang';

/** Renders both languages; CSS shows the one selected on <html data-lang>. */
export default function T({ en, zh }: Bi) {
  return (
    <>
      <span className="en">{en}</span>
      <span className="zh">{zh}</span>
    </>
  );
}
