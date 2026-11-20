import { BLOG_PART_1 } from './part1';
import { BLOG_PART_2 } from './part2';
import { BLOG_PART_3 } from './part3';
import { BLOG_PART_4 } from './part4';
import { BLOG_PART_5 } from './part5';
import { BLOG_PART_6 } from './part6';
import { BLOG_EXTRAS_1 } from './extras1';
import { BLOG_EXTRAS_2 } from './extras2';
import { BLOG_EXTRAS_3 } from './extras3';
import { BLOG_EXTRAS_4 } from './extras4';

const BASE: Record<string, string[]> = {
  ...BLOG_PART_1,
  ...BLOG_PART_2,
  ...BLOG_PART_3,
  ...BLOG_PART_4,
  ...BLOG_PART_5,
  ...BLOG_PART_6,
};

const EXTRAS: Record<string, string[]> = {
  ...BLOG_EXTRAS_1,
  ...BLOG_EXTRAS_2,
  ...BLOG_EXTRAS_3,
  ...BLOG_EXTRAS_4,
};

// Extra sections are spliced in before the final section of each post (the call to action).
function build(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [slug, lines] of Object.entries(BASE)) {
    const extra = EXTRAS[slug];
    if (!extra) {
      out[slug] = lines;
      continue;
    }
    let lastHeading = -1;
    lines.forEach((l, i) => {
      if (l.startsWith('## ')) lastHeading = i;
    });
    // The last "## " heading begins the closing section (buying/ordering); keep it last.
    const at = lastHeading > 0 ? lastHeading : lines.length;
    out[slug] = [...lines.slice(0, at), ...extra, ...lines.slice(at)];
  }
  return out;
}

export const BLOG_CONTENT = build();
