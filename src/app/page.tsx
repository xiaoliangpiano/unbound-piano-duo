import Hero from "@/components/hero/Hero";
import Calendar from "@/components/calendar/Calendar";
import Nav from "@/components/nav/Nav";
import TheDuo from "@/components/duo/TheDuo";
import Project from "@/components/project/Project";
import Contact from "@/components/contact/Contact";
import Performances from "@/components/performances/Performances";

export default function Home() {
  return (
    <main>
      <Nav />

      <section id="hero" className="min-h-screen scroll-mt-20">
        <Hero />
      </section>

      <section id="the-duo" className="min-h-screen scroll-mt-20">
        <TheDuo />
      </section>

      <section id="featured-project" className="min-h-screen scroll-mt-20">
        <Project />
      </section>

      <section id="calendar" className="min-h-screen scroll-mt-20">
        <Calendar />
      </section>

      <section id="performances" className="min-h-screen scroll-mt-20">
        <Performances />
      </section>

      <section id="contact" className="min-h-screen scroll-mt-20">
        <Contact />
      </section>
    </main>
  );
}
