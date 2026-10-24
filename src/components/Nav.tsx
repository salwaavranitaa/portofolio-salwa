import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, Smiley, X } from "@phosphor-icons/react";
import { easeOut } from "./primitives";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "campus", label: "Campus" },
];

function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = [...links.map((l) => l.id), "contact", "top"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="clay-sm relative mx-auto flex h-16 max-w-3xl items-center justify-between gap-2 rounded-full bg-cream/80 py-2 pr-2 pl-3 backdrop-blur-xl"
      >
        <a href="#top" className="group flex items-center gap-2 pr-2" aria-label="Back to top">
          <span className="grid size-10 place-items-center rounded-full bg-pink text-white shadow-[inset_0_1.5px_0_rgb(255_255_255/0.5),inset_0_-3px_0_rgb(0_0_0/0.12),0_8px_14px_-6px_rgb(242_80_143/0.7)] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-rotate-12">
            <Smiley size={22} weight="fill" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            salwa<span className="text-pink">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.id} className="relative">
              {active === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-butter shadow-[inset_0_1.5px_0_rgb(255_255_255/0.8),inset_0_-3px_6px_rgb(170_120_20/0.15)]"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <a
                href={`#${l.id}`}
                className="relative block rounded-full px-4 py-2 text-[0.9375rem] font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn bg-ink px-5 py-2.5 text-[0.9375rem] text-cream [--sh:33_29_43]">
            Let&apos;s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="btn btn-light size-11 p-0 md:hidden"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="clay-sm absolute inset-x-0 top-[calc(100%+0.625rem)] origin-top rounded-[1.75rem] bg-cream p-2 md:hidden"
            >
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="font-display flex rounded-[1.25rem] px-4 py-3 text-lg font-semibold active:bg-butter"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
