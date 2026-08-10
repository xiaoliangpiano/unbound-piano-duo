import { duoSpreads } from "@/data/duo";
import type { Dictionary } from "./types";

export const en: Dictionary = {
  lang: "en",
  htmlLang: "en",
  siteTitle: "Unbound Piano Duo",
  nav: {
    wordmark: "Unbound",
    links: [
      { label: "About", href: "#the-duo" },
      { label: "Project", href: "#featured-project" },
      { label: "Calendar", href: "#calendar" },
      { label: "Performances", href: "#performances" },
      { label: "Contact", href: "#contact" },
    ],
    languageSwitchLabel: "中文",
  },
  hero: {
    headline: ["Unbound", "Piano Duo"],
    subtitle: ["Distinct voices.", "Shared music.", "Unbound."],
  },
  theDuo: {
    eyebrow: "The Duo",
    sloganLines: ["Connected, but not confined.", "Together, but still free."],
    closedBook: {
      title: "Unbound",
      subtitle: "Our Story",
      openLabel: "Open Book",
      openAriaLabel: "Open the book",
    },
    openBook: {
      dialogLabel: "The Duo — Our Story",
      closeLabel: "Close Book",
      prevLabel: "Previous page",
      nextLabel: "Next page",
    },
    spreads: duoSpreads,
  },
  project: {
    eyebrow: "Project 01",
    title: "Five Elements",
    subtitle: "A Journey for Four Hands",
    intro: [
      "Inspired by Wuxing (五行), the Chinese idea of five interacting phases, Five Elements transforms five musical works into interconnected worlds of sound, movement, color, and emotion.",
      "Moving from Metal through Water, Wood, Fire, and Earth, the program brings music connected with Korea, China, France, Argentina, and Germany into a continuously evolving journey for piano four hands.",
    ],
    inviteLabel: "Explore the Five Elements",
    elements: [
      { id: "metal", label: "Metal" },
      { id: "water", label: "Water" },
      { id: "wood", label: "Wood" },
      { id: "fire", label: "Fire" },
      { id: "earth", label: "Earth" },
    ],
  },
  calendar: {
    title: "Calendar",
    eyebrow: "On the Road",
    nextStopLabel: "Next Stop",
  },
  performances: {
    eyebrow: "Performances",
    statement: "Coming Soon",
    subtitle: "Performance videos and selected recordings are on the way.",
  },
  contact: {
    eyebrow: "Contact",
    statementLines: ["Let’s Create", "Something Together."],
    subtitle:
      "For performances, collaborations, presentations, and project inquiries.",
    emailPrefix: "",
    websitePrefix: "",
    artistNames: {},
  },
};
