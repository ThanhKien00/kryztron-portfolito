import { profile } from "@/content/profile";

export type Post = {
  title: string;
  link: string;
  /** ISO date, for `<time dateTime>`. */
  date: string;
  summary: string;
  tags: string[];
};

/** Longest summary rendered on a card before it is cut at a word boundary. */
const SUMMARY_LENGTH = 160;

/**
 * Substack publishes a well-formed, stable RSS shape, so the feed is read with
 * targeted expressions rather than by pulling in an XML parser for one call.
 */
function firstMatch(source: string, tag: string): string | null {
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`).exec(source);
  return match ? match[1] : null;
}

function allMatches(source: string, tag: string): string[] {
  return [
    ...source.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "g")),
  ].map((match) => match[1]);
}

/**
 * Feed content is data from a third party, never markup to be trusted. Every
 * field goes through here: CDATA wrapper off, tags stripped, entities decoded,
 * whitespace collapsed. What comes out is a plain string rendered as a text
 * node — nothing from the feed can reach the DOM as markup.
 */
function toPlainText(raw: string | null): string {
  if (!raw) return "";
  return raw
    .replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&#8212;/g, "—")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Reads the newsletter's RSS feed.
 *
 * Revalidated hourly through the fetch cache rather than fetched per request:
 * the page is otherwise fully static, and a newsletter gains a post every few
 * weeks.
 *
 * Any failure — network down, Substack 5xx, a shape change — resolves to an
 * empty array, and the Writing section then renders nothing. A build on a
 * machine with no network must still succeed.
 */
export async function getSubstackPosts(limit = 3): Promise<Post[]> {
  try {
    const response = await fetch(profile.substackFeed, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];

    const xml = await response.text();
    const items = allMatches(xml, "item").slice(0, limit);

    return items.flatMap((item) => {
      const title = toPlainText(firstMatch(item, "title"));
      const link = toPlainText(firstMatch(item, "link"));
      // Only http(s) links are rendered — the feed should never carry anything
      // else, and an unchecked href from a remote document is a link target we
      // did not choose.
      if (!title || !/^https?:\/\//.test(link)) return [];

      const pubDate = toPlainText(firstMatch(item, "pubDate"));
      const parsed = new Date(pubDate);
      const date = Number.isNaN(parsed.getTime())
        ? ""
        : parsed.toISOString().slice(0, 10);

      return [
        {
          title,
          link,
          date,
          summary: truncate(
            toPlainText(firstMatch(item, "description")),
            SUMMARY_LENGTH,
          ),
          tags: allMatches(item, "category").map(toPlainText).filter(Boolean),
        },
      ];
    });
  } catch {
    return [];
  }
}
