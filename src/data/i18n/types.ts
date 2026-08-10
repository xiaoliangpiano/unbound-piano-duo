import type { DuoSpread } from "@/data/duo";
import type { ElementId } from "@/data/elements";

export type Locale = "en" | "zh";

export interface NavLinkContent {
  label: string;
  /** In-page anchor — language-independent, identical across locales. */
  href: string;
}

export interface NavDictionary {
  wordmark: string;
  links: NavLinkContent[];
  /** Label for the *other* language's link — "中文" on the English site, "EN" on the Chinese site. */
  languageSwitchLabel: string;
}

export interface HeroDictionary {
  /** Rendered as separate lines joined by <br />, matching the current hand-broken layout. */
  headline: string[];
  subtitle: string[];
}

export interface ClosedBookDictionary {
  title: string;
  subtitle: string;
  /** Visible "Open Book" control label. */
  openLabel: string;
  /** Accessible name for the open-book button — historically distinct wording from openLabel. */
  openAriaLabel: string;
}

export interface OpenBookDictionary {
  dialogLabel: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export interface TheDuoDictionary {
  eyebrow: string;
  sloganLines: [string, string];
  closedBook: ClosedBookDictionary;
  openBook: OpenBookDictionary;
  /** Full per-spread book content — same shape/layout hints for every locale. */
  spreads: DuoSpread[];
}

export interface ProjectElementContent {
  id: ElementId;
  label: string;
}

export interface ProjectDictionary {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Each entry is a paragraph; consecutive paragraphs are joined with a blank line, matching the current markup. */
  intro: string[];
  inviteLabel: string;
  elements: ProjectElementContent[];
}

export interface CalendarDictionary {
  title: string;
  eyebrow: string;
  nextStopLabel: string;
}

export interface PerformancesDictionary {
  eyebrow: string;
  statement: string;
  subtitle: string;
}

export interface ContactDictionary {
  eyebrow: string;
  /** One entry per heading line, joined with <br /> — locales may use a
      different number of lines than English. */
  statementLines: string[];
  subtitle: string;
  /** Prepended to the visible email text only — the mailto: href is
      untouched. Empty string for locales (like English) that show no
      prefix. */
  emailPrefix: string;
  /** Prepended to the visible website label only — the href is untouched. */
  websitePrefix: string;
  /** Keyed by ContactArtist.id (see src/data/contact.ts) — a per-locale
      display name shown instead of the shared ContactArtist.name. An
      artist with no entry here falls back to the shared name. */
  artistNames: Record<string, string>;
}

export interface Dictionary {
  lang: Locale;
  /** Value for <html lang="…">. */
  htmlLang: string;
  /** <title> metadata for this locale's root layout. */
  siteTitle: string;
  nav: NavDictionary;
  hero: HeroDictionary;
  theDuo: TheDuoDictionary;
  project: ProjectDictionary;
  calendar: CalendarDictionary;
  performances: PerformancesDictionary;
  contact: ContactDictionary;
}
