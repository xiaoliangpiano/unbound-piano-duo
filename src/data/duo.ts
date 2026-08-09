export type PageBlock =
  | { type: "architectural"; lines: string[] }
  | {
      type: "statement";
      lines: string[];
      scale?: "moderate" | "compact";
      revealStagger?: boolean;
      weight?: "bold";
      revealClass?: string;
    }
  | { type: "paragraph"; text: string; narrow?: boolean; revealClass?: string }
  | { type: "verse"; lines: string[] }
  | { type: "cue"; text: string }
  | { type: "keyword"; primary: string; workTitle?: string; movement?: string }
  | {
      type: "emphasis";
      text: string;
      typewriter?: boolean;
      scale?: "compact";
      spacious?: boolean;
    }
  | {
      type: "dominant";
      text: string;
      emergeSlow?: boolean;
      shiftLeft?: number;
    }
  | { type: "slogan"; lines: string[] }
  | {
      type: "archiveImage";
      src: string;
      treatment: "document" | "photo" | "ambient";
      aspect: number;
      caption?: string[];
    };

export interface DuoSpread {
  id: string;
  number: string;
  title: string;
  left: PageBlock[];
  right: PageBlock[];
  centerImage?: { src: string; aspect: number; objectPosition?: string };
}

export const duoSpreads: DuoSpread[] = [
  {
    id: "before-we-knew-each-other",
    number: "01",
    title: "Before We Really Knew Each Other",
    left: [
      { type: "architectural", lines: ["Florida", "State", "University"] },
    ],
    right: [
      {
        type: "paragraph",
        text: "We first met at Florida State University, where we were both doctoral students in piano performance.",
      },
      {
        type: "paragraph",
        text: "But we were about two years apart in the program, so at the beginning, we knew each other without really knowing each other.",
      },
    ],
  },
  {
    id: "the-recital",
    number: "02",
    title: "The Recital",
    left: [
      {
        type: "keyword",
        primary: "Schumann",
        workTitle: "Fantasie, Op. 17",
        movement: "III. Langsam getragen. Durchweg leise zu halten.",
      },
      {
        type: "archiveImage",
        src: "/images/duo/recital-program-2025.png",
        treatment: "document",
        aspect: 4 / 3,
      },
    ],
    right: [
      {
        type: "paragraph",
        text: "Wu attended one of Liang’s final recitals at FSU. The program included Schumann’s Fantasie, Op. 17. When the third movement began, Wu remembers being completely drawn in.",
      },
      {
        type: "paragraph",
        text: "To this day, she still thinks of it as one of the most moving performances of that movement she has ever heard.",
      },
      {
        type: "archiveImage",
        src: "/images/duo/after-recital-2025.jpg",
        treatment: "photo",
        aspect: 655 / 879,
        caption: ["After the Recital", "April 22, 2025"],
      },
    ],
  },
  {
    id: "music-became-friendship",
    number: "03",
    title: "Music Became Friendship",
    left: [
      {
        type: "paragraph",
        text: "After that recital, our conversations became longer.",
      },
      {
        type: "paragraph",
        text: "We spent more time together,",
      },
      {
        type: "paragraph",
        text: "and eventually became close friends.",
      },
      {
        type: "archiveImage",
        src: "/images/duo/coffee-matcha.jpg",
        treatment: "ambient",
        aspect: 1536 / 1024,
      },
    ],
    right: [
      {
        type: "paragraph",
        text: "After graduation, we both remained in the United States and continued building our individual lives as pianists.",
      },
      {
        type: "emphasis",
        text: "And somewhere along the way, we began to notice something.",
        typewriter: true,
      },
    ],
  },
  {
    id: "a-shared-space",
    number: "04",
    title: "A Shared Space",
    centerImage: {
      src: "/images/duo/four-hands-piano.jpg",
      aspect: 16 / 9,
      objectPosition: "50% 62%",
    },
    left: [
      {
        type: "statement",
        lines: ["Music is", "made together."],
        scale: "moderate",
      },
      {
        type: "paragraph",
        text: "Musicians on many other instruments seem to collaborate constantly: chamber music, orchestras, ensembles.",
        narrow: true,
      },
    ],
    right: [
      {
        type: "paragraph",
        text: "Pianists, by comparison, can spend a surprisingly large part of their musical lives alone.",
      },
      {
        type: "emphasis",
        text: "So we decided to create our own space for collaboration.",
        typewriter: true,
        scale: "compact",
        spacious: true,
      },
    ],
  },
  {
    id: "unbound",
    number: "05",
    title: "The Beginning",
    left: [
      {
        type: "statement",
        lines: ["That space", "became"],
        revealStagger: true,
      },
    ],
    right: [
      {
        type: "dominant",
        text: "Unbound.",
        emergeSlow: true,
        shiftLeft: 28,
      },
    ],
  },
  {
    id: "what-unbound-means",
    number: "06",
    title: "What “Unbound” Means",
    left: [
      {
        type: "paragraph",
        text: "A piano duo requires collaboration.",
        revealClass: "duo-s06-p1",
      },
      {
        type: "paragraph",
        text: "We listen, adjust, breathe, shape time, and make decisions together.",
        revealClass: "duo-s06-p2",
      },
      {
        type: "paragraph",
        text: "In that sense, we are",
        revealClass: "duo-s06-p3",
      },
      {
        type: "statement",
        lines: ["Bound together."],
        scale: "moderate",
        weight: "bold",
        revealClass: "duo-s06-bound",
      },
    ],
    right: [
      {
        type: "paragraph",
        text: "But “Unbound” reminds us that collaboration does not require either voice to disappear.",
        revealClass: "duo-s06-r1",
      },
      {
        type: "verse",
        lines: [
          "Two distinct voices.",
          "Listening deeply.",
          "Creating something together",
          "without losing what makes each voice unique.",
        ],
      },
      {
        type: "slogan",
        lines: ["Connected, but not confined.", "Together, but still free."],
      },
    ],
  },
];
