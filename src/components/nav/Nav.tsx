import type { NavDictionary } from "@/data/i18n";

export default function Nav({
  dict,
  lang,
}: {
  dict: NavDictionary;
  lang: "en" | "zh";
}) {
  const languageHref = lang === "en" ? "/zh" : "/";

  return (
    <header className="nav-in fixed inset-x-0 top-0 z-[var(--z-sticky)] flex items-center justify-between gap-[var(--space-sm)] px-[var(--space-lg)] py-[var(--space-md)] md:px-[var(--space-xl)]">
      <span className="shrink-0 text-xs font-medium uppercase tracking-[0.24em] text-[#F4F3F0]">
        {dict.wordmark}
      </span>
      <nav className="min-w-0">
        <ul className="flex items-center gap-[var(--space-lg)] overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {dict.links.map((link) => (
            <li key={link.label} className="shrink-0">
              <a
                href={link.href}
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#A99783] transition-colors duration-[var(--duration-slow)] hover:text-[#F4F3F0]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="shrink-0">
            <a
              href={languageHref}
              lang={lang === "en" ? "zh-CN" : "en"}
              className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#A99783] transition-colors duration-[var(--duration-slow)] hover:text-[#F4F3F0]"
            >
              {dict.languageSwitchLabel}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
