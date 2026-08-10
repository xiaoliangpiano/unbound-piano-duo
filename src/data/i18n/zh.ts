import { duoSpreadsZh } from "@/data/duo.zh";
import type { Dictionary } from "./types";

// Nav, hero, The Duo (cover + all six spreads, via duoSpreadsZh), and the
// Project 01 / Five Elements landing intro are finalized. Calendar,
// Performances, Contact, and the Five Elements detail content are still
// pending translation.
export const zh: Dictionary = {
  lang: "zh",
  htmlLang: "zh-CN",
  siteTitle: "Unbound 钢琴二重奏",
  nav: {
    wordmark: "Unbound",
    links: [
      { label: "关于我们", href: "#the-duo" },
      { label: "项目", href: "#featured-project" },
      { label: "演出日程", href: "#calendar" },
      { label: "演出合辑", href: "#performances" },
      { label: "联系", href: "#contact" },
    ],
    languageSwitchLabel: "EN",
  },
  hero: {
    // Brand name — never translated, identical across locales.
    headline: ["Unbound", "Piano Duo"],
    subtitle: ["独立之声。", "共同之乐。", "无量。"],
  },
  theDuo: {
    eyebrow: "我们俩",
    sloganLines: ["彼此相连，却不受束缚。", "共同前行，依然自由。"],
    closedBook: {
      title: "Unbound",
      subtitle: "我们的故事",
      openLabel: "翻开故事",
      openAriaLabel: "打开书本",
    },
    openBook: {
      dialogLabel: "二重奏 — 我们的故事",
      closeLabel: "合上书本",
      prevLabel: "上一页",
      nextLabel: "下一页",
    },
    spreads: duoSpreadsZh,
  },
  project: {
    eyebrow: "项目 01",
    title: "五行",
    subtitle: "四手之旅",
    intro: [
      "《五行》以中国“五行”思想为灵感，将五部音乐作品转化为彼此相连的声音世界，在音乐、动态、色彩与情感之间展开想象。",
      "从金到水、木、火、土，音乐依次流转。来自韩国、中国、法国、阿根廷与德国的音乐在四手联弹中彼此连接，展开一段不断变化的旅程。",
    ],
    inviteLabel: "探索五行",
    elements: [
      { id: "metal", label: "金" },
      { id: "water", label: "水" },
      { id: "wood", label: "木" },
      { id: "fire", label: "火" },
      { id: "earth", label: "土" },
    ],
  },
  calendar: {
    title: "巡演",
    eyebrow: "在路上",
    nextStopLabel: "下一站",
  },
  performances: {
    eyebrow: "演出合辑",
    statement: "敬请期待",
    subtitle: "演出视频与精选录音即将上线。",
  },
  contact: {
    eyebrow: "联系方式",
    statementLines: ["一起创造更多可能。"],
    subtitle: "演出、合作、讲座及项目邀约，欢迎与我们联系。",
    emailPrefix: "邮箱：",
    websitePrefix: "个人网站：",
    artistNames: {
      "xiao-liang": "Xiao Liang 梁潇",
      "huixian-wu": "Huixian Wu 邬慧娴",
    },
  },
};
