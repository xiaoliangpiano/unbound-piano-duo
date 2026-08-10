import { en } from "./en";
import { zh } from "./zh";
import type { Dictionary, Locale } from "./types";

function textOr(value: string, fallback: string): string {
  return value.trim().length > 0 ? value : fallback;
}

function textArrayOr(values: string[], fallback: string[]): string[] {
  if (values.length === 0) return fallback;
  return values.map((value, i) => textOr(value, fallback[i] ?? value));
}

/**
 * Fills in any blank translation with the English value instead of letting
 * the UI render empty text. Applied field-by-field to plain string /
 * string[] content; structural data (nav hrefs, element ids, and the Duo
 * spreads themselves) is taken from the locale dictionary as-is — those
 * are either language-independent, or, for the Duo spreads specifically,
 * meant to be swapped in wholesale per spread (see src/data/duo.zh.ts)
 * rather than merged field-by-field here.
 */
function withEnglishFallback(dict: Dictionary): Dictionary {
  if (dict.lang === "en") return dict;

  return {
    ...dict,
    nav: {
      ...dict.nav,
      wordmark: textOr(dict.nav.wordmark, en.nav.wordmark),
      languageSwitchLabel: textOr(
        dict.nav.languageSwitchLabel,
        en.nav.languageSwitchLabel
      ),
      links: dict.nav.links.map((link, i) => ({
        ...link,
        label: textOr(link.label, en.nav.links[i]?.label ?? link.label),
      })),
    },
    hero: {
      headline: textArrayOr(dict.hero.headline, en.hero.headline),
      subtitle: textArrayOr(dict.hero.subtitle, en.hero.subtitle),
    },
    theDuo: {
      ...dict.theDuo,
      eyebrow: textOr(dict.theDuo.eyebrow, en.theDuo.eyebrow),
      sloganLines: textArrayOr(
        dict.theDuo.sloganLines,
        en.theDuo.sloganLines
      ) as [string, string],
      closedBook: {
        title: textOr(dict.theDuo.closedBook.title, en.theDuo.closedBook.title),
        subtitle: textOr(
          dict.theDuo.closedBook.subtitle,
          en.theDuo.closedBook.subtitle
        ),
        openLabel: textOr(
          dict.theDuo.closedBook.openLabel,
          en.theDuo.closedBook.openLabel
        ),
        openAriaLabel: textOr(
          dict.theDuo.closedBook.openAriaLabel,
          en.theDuo.closedBook.openAriaLabel
        ),
      },
      openBook: {
        dialogLabel: textOr(
          dict.theDuo.openBook.dialogLabel,
          en.theDuo.openBook.dialogLabel
        ),
        closeLabel: textOr(
          dict.theDuo.openBook.closeLabel,
          en.theDuo.openBook.closeLabel
        ),
        prevLabel: textOr(
          dict.theDuo.openBook.prevLabel,
          en.theDuo.openBook.prevLabel
        ),
        nextLabel: textOr(
          dict.theDuo.openBook.nextLabel,
          en.theDuo.openBook.nextLabel
        ),
      },
      spreads: dict.theDuo.spreads,
    },
    project: {
      ...dict.project,
      eyebrow: textOr(dict.project.eyebrow, en.project.eyebrow),
      title: textOr(dict.project.title, en.project.title),
      subtitle: textOr(dict.project.subtitle, en.project.subtitle),
      intro: textArrayOr(dict.project.intro, en.project.intro),
      inviteLabel: textOr(dict.project.inviteLabel, en.project.inviteLabel),
      elements: dict.project.elements.map((element, i) => ({
        ...element,
        label: textOr(
          element.label,
          en.project.elements[i]?.label ?? element.label
        ),
      })),
    },
    calendar: {
      title: textOr(dict.calendar.title, en.calendar.title),
      eyebrow: textOr(dict.calendar.eyebrow, en.calendar.eyebrow),
      nextStopLabel: textOr(
        dict.calendar.nextStopLabel,
        en.calendar.nextStopLabel
      ),
    },
    performances: {
      eyebrow: textOr(dict.performances.eyebrow, en.performances.eyebrow),
      statement: textOr(dict.performances.statement, en.performances.statement),
      subtitle: textOr(dict.performances.subtitle, en.performances.subtitle),
    },
    contact: {
      eyebrow: textOr(dict.contact.eyebrow, en.contact.eyebrow),
      statementLines: textArrayOr(
        dict.contact.statementLines,
        en.contact.statementLines
      ),
      subtitle: textOr(dict.contact.subtitle, en.contact.subtitle),
      emailPrefix: textOr(dict.contact.emailPrefix, en.contact.emailPrefix),
      websitePrefix: textOr(
        dict.contact.websitePrefix,
        en.contact.websitePrefix
      ),
      // Per-artist name overrides: an artist missing from this record
      // already falls back to the shared ContactArtist.name in
      // ArtistContact.tsx, so no additional merge is needed here.
      artistNames: dict.contact.artistNames,
    },
  };
}

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : withEnglishFallback(zh);
}

export { en, zh };
export type * from "./types";
