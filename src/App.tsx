import { MotionConfig } from "motion/react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Work } from "./components/Work";
import { Campus } from "./components/Campus";
import { Contact, Footer } from "./components/Contact";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div aria-hidden className="page-bg" />
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to experience
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Campus />
        <Contact />
      </main>
      <Footer />
      <div aria-hidden className="grain" />
    </MotionConfig>
  );
}
