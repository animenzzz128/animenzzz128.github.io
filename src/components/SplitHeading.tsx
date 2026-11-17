import SplitText from '../reactbits/SplitText';

/**
 * A section heading whose words rise into place the first time it scrolls into view (React Bits SplitText, on GSAP).
 * Loaded lazily by the page that uses it, so GSAP stays out of the first download.
 */
export default function SplitHeading({ en, zh }: { en: string; zh: string }) {
  return (
    <h2>
      <span className="en"><SplitText tag="span" text={en} splitType="words" textAlign="left" delay={45} duration={0.9} threshold={0.12} rootMargin="-40px" /></span>
      <span className="zh"><SplitText tag="span" text={zh} splitType="chars" textAlign="left" delay={28} duration={0.9} threshold={0.12} rootMargin="-40px" /></span>
    </h2>
  );
}
