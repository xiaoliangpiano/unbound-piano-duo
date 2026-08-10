import type { DuoSpread } from "./duo";

// Spreads 01–06 carry finalized Chinese narrative text.
export const duoSpreadsZh: DuoSpread[] = [
  {
    id: "before-we-knew-each-other",
    number: "01",
    title: "在真正认识彼此之前",
    left: [
      // FSU's name is kept in English per the finalized content brief.
      { type: "architectural", lines: ["Florida", "State", "University"] },
    ],
    right: [
      {
        type: "paragraph",
        text: "我们初识于佛罗里达州立大学。那时，我们都在攻读钢琴演奏博士学位。",
      },
      {
        type: "paragraph",
        text: "但我们的入学时间相差大约两年。所以最初，我们认识彼此，却还并不真正了解彼此。",
      },
    ],
  },
  {
    id: "the-recital",
    number: "02",
    title: "那场音乐会",
    left: [
      {
        // Composer, work title, opus number, and the German movement
        // marking are kept in their original language, unlocalized.
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
        text: "邬慧娴参加了梁潇在佛罗里达州立大学的最后一场独奏音乐会。曲目中包括舒曼的《幻想曲》，Op. 17。当第三乐章响起时，邬慧娴记得自己完全沉浸其中。",
      },
      {
        type: "paragraph",
        text: "直到今天，她依然认为，那是她听过的这个乐章中最打动她的演绎之一。",
      },
      {
        type: "archiveImage",
        src: "/images/duo/after-recital-2025.jpg",
        treatment: "photo",
        aspect: 655 / 879,
        caption: ["音乐会后", "2025年4月22日"],
      },
    ],
  },
  {
    id: "music-became-friendship",
    number: "03",
    title: "从音乐，到友谊",
    left: [
      {
        type: "paragraph",
        text: "那场音乐会之后，我们的交谈渐渐变长。",
      },
      {
        type: "paragraph",
        text: "我们开始有更多时间待在一起，",
      },
      {
        type: "paragraph",
        text: "最终成为了亲密的朋友。",
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
        text: "毕业之后，我们都留在了美国，继续各自作为钢琴家的生活。",
      },
      {
        // "emphasis" already renders statically in the gold accent color
        // (see Page.tsx) — no typewriter/reveal animation exists anymore.
        type: "emphasis",
        text: "而在这一路上，我们渐渐意识到了一件事。",
      },
    ],
  },
  {
    id: "a-shared-space",
    number: "04",
    title: "共同的空间",
    // Image config is structural, not text — kept identical to English so
    // the piano image never moves and the layout is unaffected.
    centerImage: {
      src: "/images/duo/four-hands-piano.jpg",
      aspect: 16 / 9,
      objectPosition: "50% 62%",
    },
    left: [
      {
        type: "statement",
        lines: ["音乐，本就是共同创造。"],
        scale: "moderate",
      },
      {
        type: "paragraph",
        text: "对许多其他乐器的演奏者来说，合作似乎无处不在：室内乐、乐团、重奏。",
        narrow: true,
      },
      {
        // duo-s04-left-secondary controls this paragraph's tight spacing
        // under the one above it — kept exactly as on the English spread.
        type: "paragraph",
        text: "相比之下，钢琴家却可能在音乐生涯中，花费相当长的时间独自前行。",
        revealClass: "duo-s04-left-secondary",
      },
    ],
    right: [
      {
        // spacious triggers duo-s04-emphasis, which positions this line
        // under the bridge image — kept exactly as on the English spread.
        type: "emphasis",
        text: "于是，我们决定创造一个属于自己的合作空间。",
        scale: "compact",
        spacious: true,
      },
    ],
  },
  {
    id: "unbound",
    number: "05",
    title: "起点",
    left: [
      {
        type: "statement",
        lines: ["那个空间，", "成为了"],
      },
    ],
    right: [
      {
        // "Unbound." is the ensemble's name — never translated.
        type: "dominant",
        text: "Unbound.",
        shiftLeft: 28,
      },
    ],
  },
  {
    id: "what-unbound-means",
    number: "06",
    title: "“Unbound”的意义",
    left: [
      {
        type: "paragraph",
        text: "钢琴二重奏离不开合作。",
      },
      {
        // duo-s06-p2 / duo-s06-p3 carry this spread's vertical spacing —
        // kept exactly as on the English spread.
        type: "paragraph",
        text: "我们聆听、调整、呼吸，共同塑造时间，共同做出选择。",
        revealClass: "duo-s06-p2",
      },
      {
        type: "paragraph",
        text: "从这个意义上说，我们",
        revealClass: "duo-s06-p3",
      },
      {
        type: "statement",
        lines: ["彼此相系。"],
        scale: "moderate",
        weight: "bold",
      },
    ],
    right: [
      {
        type: "paragraph",
        text: "但“Unbound”提醒着我们，合作并不意味着任何一个声音需要消失。",
      },
      {
        type: "verse",
        lines: [
          "两个独立的声音。",
          "深入地聆听彼此。",
          "共同创造，",
          "却不失去各自独有的声音。",
        ],
      },
      {
        type: "slogan",
        lines: ["彼此相连，却不受束缚。", "共同前行，依然自由。"],
      },
    ],
  },
];
