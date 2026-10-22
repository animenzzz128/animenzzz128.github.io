import type { Bi } from './lang';

export type Testimonial = { quote: Bi; name: string; role: Bi; source?: string };

// Real quotes only, copied from the person (or their LinkedIn recommendation). The section stays hidden while empty.
export const TESTIMONIALS: Testimonial[] = [];
