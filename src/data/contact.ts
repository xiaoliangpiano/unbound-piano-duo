export interface ContactArtist {
  id: string;
  name: string;
  email: string;
  website: { label: string; href: string };
  image: { src: string; alt: string; objectPosition: string };
  /** Nudges a cooler-toned source photo to feel warmer, closer to the other portrait. */
  warmTone?: boolean;
}

export const CONTACT_ARTISTS: ContactArtist[] = [
  {
    id: "xiao-liang",
    name: "Xiao Liang",
    email: "xiaoliangpiano@gmail.com",
    website: { label: "xiaoliangpiano.com", href: "https://xiaoliangpiano.com" },
    image: {
      src: "/images/contact/xiao-liang.jpg",
      alt: "Portrait of Xiao Liang",
      objectPosition: "50% 20%",
    },
  },
  {
    id: "huixian-wu",
    name: "Huixian Wu",
    email: "huixianwupiano@gmail.com",
    website: { label: "huixianwupiano.com", href: "https://huixianwupiano.com" },
    image: {
      src: "/images/contact/huixian-wu.jpg",
      alt: "Portrait of Huixian Wu",
      objectPosition: "50% 12%",
    },
    warmTone: true,
  },
];
