import { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, Sparkle } from "@phosphor-icons/react";
import { experiences, type Experience } from "../data";
import { Reveal, SectionHead, Tape } from "./primitives";
import { WorkDialog } from "./WorkDialog";

const TAB = 3.25; // rem; folder-tab height, each stacked card leaves the previous tab visible
const STICK = 5.75; // rem; just under the floating nav

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ["start start", "end end"] });
  const n = experiences.length;

  return (
    <section id="experience" className="relative pt-24 pb-10 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead kicker="where I've been" swash="bg-sky" title="Work experience">
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 w-fit -rotate-1 rounded-[0.25rem] bg-butter px-6 py-3 text-[0.9375rem] shadow-[0_14px_24px_-14px_rgb(170_120_20/0.6)]">
              Tap any card to open the full story and photos.
            </p>
          </Reveal>
        </SectionHead>

        <div ref={stackRef} className="mt-16 md:mt-20">
          {experiences.map((exp, i) => (
            <FolderCard
              key={exp.id}
              exp={exp}
              index={i}
              total={n}
              progress={scrollYProgress}
              onOpen={() => setOpenId(exp.id)}
            />
          ))}
        </div>
      </div>

      <WorkDialog openId={openId} onChange={setOpenId} />
    </section>
  );
}

function FolderCard({
  exp,
  index,
  total,
  progress,
  onOpen,
}: {
  exp: Experience;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  // earlier cards shrink slightly as later ones slide over them
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.025]);
  const cover = exp.photos[exp.cover];

  // Desktop stack: keep the next folder below the fold until this one has settled at its sticky spot,
  // so the following cards never sit "parked" half-visible under the current one.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(0);
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const isLast = index === total - 1;
  const top = STICK + index * TAB;
  const fan = exp.photos.filter((_, i) => i !== exp.cover).slice(0, 2);

  return (
    <div
      ref={wrapRef}
      className="-mb-5 md:sticky md:top-[var(--top)] md:mb-[var(--gap)]"
      style={
        {
          "--top": `${top}rem`,
          "--gap": isLast ? "2.5rem" : `max(2.5rem, calc(100svh - ${top}rem - ${cardH}px + 1rem))`,
        } as React.CSSProperties
      }
    >
      <motion.article
        style={{ scale }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="origin-top"
      >
        {/* folder tab */}
        <div className="relative flex" style={{ paddingLeft: `min(${index * 22}%, calc(100% - 15rem))` }}>
          <span
            className={`font-mono flex items-center gap-3 rounded-tl-[1.375rem] py-4 pr-16 pl-6 text-[0.75rem] font-medium tracking-[0.18em] whitespace-nowrap uppercase sm:text-[0.8125rem] ${exp.theme.card} ${exp.theme.text} [clip-path:polygon(0_0,calc(100%-44px)_0,100%_100%,0_100%)]`}
            style={{ height: `${TAB}rem` }}
          >
            <Sparkle size={14} weight="fill" />
            {exp.tab}
          </span>
        </div>

        <div
          className={`clay group relative grid w-full gap-7 overflow-hidden p-6 pb-12 sm:p-10 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10 lg:min-h-[24rem] ${
            index === 0 ? "rounded-tl-none" : ""
          } ${exp.theme.card} ${exp.theme.text}`}
          style={{ "--sh": exp.theme.sh } as React.CSSProperties}
        >
          <div>
            <div className="flex flex-wrap gap-2">
              {[exp.year, exp.duration].map((c) => (
                <span key={c} className={`rounded-full px-3.5 py-1.5 text-[0.8125rem] font-semibold ${exp.theme.chip}`}>
                  {c}
                </span>
              ))}
            </div>
            <h3 className="font-display mt-4 text-[2rem] leading-[1.02] font-bold tracking-tight text-balance sm:mt-5 sm:text-5xl lg:text-6xl">
              {exp.role}
            </h3>
            <p className={`mt-3 max-w-[44ch] leading-relaxed sm:mt-4 sm:text-lg ${exp.theme.muted}`}>{exp.teaser}</p>
            <button
              type="button"
              onClick={onOpen}
              aria-haspopup="dialog"
              aria-label={`View details: ${exp.role} at ${exp.company}`}
              className={`btn mt-6 cursor-pointer sm:mt-7 px-5 py-3 text-[0.9375rem] [--sh:0_0_0] after:absolute after:-inset-[62.4375rem] after:content-[''] ${exp.theme.button}`}
            >
              View details
              <ArrowUpRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>

          <div className="relative mx-auto w-[82%] max-w-[23.75rem] pb-2 sm:w-full md:pb-0">
            {fan.map((p, k) => (
              <img
                key={p.src}
                src={p.src}
                alt=""
                aria-hidden
                loading="lazy"
                className={`absolute inset-x-6 top-4 aspect-[4/3] rounded-[0.25rem] bg-cream object-cover p-1.5 shadow-lg transition-transform duration-500 ease-[var(--ease-out-soft)] ${
                  k === 0
                    ? "-rotate-6 group-hover:-translate-x-8 group-hover:-rotate-12"
                    : "rotate-6 group-hover:translate-x-8 group-hover:rotate-12"
                }`}
              />
            ))}
            <figure className="relative rotate-[-1.5deg] rounded-[0.25rem] bg-cream p-2.5 shadow-[0_24px_40px_-20px_rgb(0_0_0/0.5)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-0 group-hover:scale-[1.03]">
              <Tape color="gingham [--g:242_80_143] [--gs:0.5rem]" className="-top-3 -left-4 -rotate-12" />
              <Tape color={exp.theme.tape} className="-top-3 -right-4 rotate-12" />
              <img
                src={cover.src}
                alt={cover.alt}
                width={cover.w}
                height={cover.h}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-[0.125rem] object-cover"
              />
              <figcaption className="font-hand pt-2 text-center text-lg leading-none text-ink-soft">
                {exp.photos.length} photos inside
              </figcaption>
            </figure>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
