import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Lightbulb, Mountains, Trophy, X } from "@phosphor-icons/react";
import { experiences } from "../data";
import { Carousel } from "./Carousel";
import { ClayIcon } from "./Hero";

const ease = [0.23, 1, 0.32, 1] as const;

export function WorkDialog({ openId, onChange }: { openId: string | null; onChange: (id: string | null) => void }) {
  const index = experiences.findIndex((e) => e.id === openId);
  const exp = index >= 0 ? experiences[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!exp) return;
    lastFocus.current ??= document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      // keep Tab focus inside the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });
    scrollRef.current?.scrollTo({ top: 0 });
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [exp, onChange]);

  useEffect(() => {
    if (openId === null && lastFocus.current) {
      lastFocus.current.focus({ preventScroll: true });
      lastFocus.current = null;
    }
  }, [openId]);

  const n = experiences.length;
  const prev = exp ? experiences[(index - 1 + n) % n] : null;
  const next = exp ? experiences[(index + 1) % n] : null;

  return createPortal(
    <AnimatePresence>
      {exp && (
        <motion.div
          key="overlay"
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18 } }}
        >
          <div aria-hidden className="absolute inset-0 bg-[#2a2140]/45 backdrop-blur-md" onClick={() => onChange(null)} />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="work-dialog-title"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
            transition={{ duration: 0.4, ease }}
            className="relative flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[2rem] bg-paper shadow-[0_40px_80px_-30px_rgb(20_10_40/0.6)] sm:rounded-[2rem]"
          >
            {/* header */}
            <div className={`flex items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 ${exp.theme.card} ${exp.theme.text}`}>
              <div className="min-w-0">
                <p className="truncate text-[0.875rem] font-medium opacity-85">{exp.company}</p>
                <h2 id="work-dialog-title" className="font-display truncate text-2xl font-bold tracking-tight sm:text-3xl">
                  {exp.role}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => onChange(null)}
                aria-label="Close details"
                className="btn btn-light size-11 shrink-0 p-0 hover:rotate-90"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <div ref={scrollRef} className="overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.3, ease }}
                  className="p-4 sm:p-6"
                >
                  <div className="grid gap-4 lg:grid-cols-12">
                    {/* photos + meta */}
                    <div className="lg:col-span-7 lg:row-span-2">
                      <Carousel key={exp.id} photos={exp.photos} label={`${exp.company} photos`} />
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        {[
                          ["Role", exp.role],
                          ["Timeline", exp.duration],
                          ["Year", exp.year],
                        ].map(([k, v]) => (
                          <div key={k} className="clay-sm bg-cream px-4 py-3">
                            <p className="text-[0.75rem] font-medium text-ink-soft">{k}</p>
                            <p className="mt-0.5 text-[0.875rem] leading-snug font-semibold sm:text-[0.9375rem]">{v}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Block
                      delay={0.08}
                      title="The Challenge"
                      items={exp.challenge}
                      className="bg-blush [--sh:190_70_110] lg:col-span-5"
                      icon={
                        <ClayIcon className="size-11 rounded-[0.875rem] bg-pink text-white [--glow:242_80_143]">
                          <Mountains size={20} weight="fill" />
                        </ClayIcon>
                      }
                    />
                    <Block
                      delay={0.14}
                      title="My Approach"
                      items={exp.approach}
                      className="bg-sky [--sh:60_110_170] lg:col-span-5"
                      icon={
                        <ClayIcon className="size-11 rounded-[0.875rem] bg-blue text-white [--glow:52_97_232]">
                          <Lightbulb size={20} weight="fill" />
                        </ClayIcon>
                      }
                    />

                    {/* result: full width, same type scale as the other blocks */}
                    <Block
                      delay={0.2}
                      title="The Result"
                      items={exp.result}
                      className="bg-mint [--sh:30_120_80] lg:col-span-12"
                      icon={
                        <ClayIcon className="size-11 rounded-[0.875rem] bg-green text-white [--glow:20_120_80]">
                          <Trophy size={20} weight="fill" />
                        </ClayIcon>
                      }
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {prev && next && (
                <div className="grid grid-cols-2 gap-3 px-4 pb-5 sm:px-6">
                  <button
                    type="button"
                    onClick={() => onChange(prev.id)}
                    className="clay-sm group flex items-center gap-3 bg-cream p-4 text-left transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <ArrowLeft size={18} weight="bold" className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
                    <span className="min-w-0">
                      <span className="block text-[0.75rem] text-ink-soft">Previous</span>
                      <span className="block truncate font-semibold">{prev.role}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(next.id)}
                    className="clay-sm group flex items-center justify-end gap-3 bg-cream p-4 text-right transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <span className="min-w-0">
                      <span className="block text-[0.75rem] text-ink-soft">Next</span>
                      <span className="block truncate font-semibold">{next.role}</span>
                    </span>
                    <ArrowRight size={18} weight="bold" className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Block({
  title,
  items,
  icon,
  className,
  delay,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease }}
      className={`clay p-6 ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-display text-xl font-bold tracking-tight">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-ink/85">
            <span aria-hidden className="mt-[0.5625rem] size-1.5 shrink-0 rounded-full bg-ink/60" />
            {t}
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
