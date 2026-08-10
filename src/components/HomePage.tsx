import Hero from "@/components/hero/Hero";
import Calendar from "@/components/calendar/Calendar";
import Nav from "@/components/nav/Nav";
import TheDuo from "@/components/duo/TheDuo";
import Project from "@/components/project/Project";
import Contact from "@/components/contact/Contact";
import Performances from "@/components/performances/Performances";
import type { Dictionary } from "@/data/i18n";

// Rendered by both the English (/) and Chinese (/zh) routes — the section
// structure, ids, and components are shared; only `dict` differs per locale.
export default function HomePage({ dict }: { dict: Dictionary }) {
  return (
    <main>
      <Nav dict={dict.nav} lang={dict.lang} />

      <section id="hero" className="min-h-screen scroll-mt-20">
        <Hero dict={dict.hero} />
      </section>

      <section id="the-duo" className="min-h-screen scroll-mt-20">
        <TheDuo dict={dict.theDuo} />
      </section>

      <section id="featured-project" className="min-h-screen scroll-mt-20">
        <Project dict={dict.project} />
      </section>

      <section id="calendar" className="min-h-screen scroll-mt-20">
        <Calendar dict={dict.calendar} />
      </section>

      <section id="performances" className="min-h-screen scroll-mt-20">
        <Performances dict={dict.performances} />
      </section>

      <section id="contact" className="min-h-screen scroll-mt-20">
        <Contact dict={dict.contact} />
      </section>
    </main>
  );
}
