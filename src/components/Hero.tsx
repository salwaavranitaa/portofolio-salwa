import { useEffect } from "react";
import { motion, useReducedMotion, useSpring, useTransform, type PanInfo } from "motion/react";
import { ArrowDown, Buildings, DownloadSimple, Flower, HandPointing, Heart, Star } from "@phosphor-icons/react";
import { portraits, profile } from "../data";
import { easeOut } from "./primitives";

const letters = [
  { ch: "S", color: "#3461e8", depth: "#2244b0" },
  { ch: "a", color: "#f2508f", depth: "#c23268" },
  { ch: "l", color: "#ff7a45", depth: "#cf5520" },
  { ch: "w", color: "#1e9e68", depth: "#12744b" },
  { ch: "a", color: "#f8c641", depth: "#cf9d1c" },
];

const tile = (delay: number) => ({
  initial: { opacity: 0, y: 28, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.8, delay, ease: easeOut },
});

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="px-4 pt-28 pb-6 sm:px-6 md:pt-32">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-5">
        {/* intro */}
        <motion.div
          {...tile(0)}
          className="clay relative col-span-2 overflow-hidden bg-cream p-7 sm:p-10 lg:col-span-7 lg:row-span-2 lg:p-12"
        >
          <span className="clay-sm inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-[0.875rem] font-semibold text-green [--sh:30_120_80]">
            <span className="relative flex size-2.5">
              {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-green/60" />}
              <span className="relative size-2.5 rounded-full bg-green" />
            </span>
            Open to new roles
          </span>

          <p className="font-hand mt-6 text-4xl leading-none text-ink-soft sm:text-5xl">Hi, I&apos;m</p>
          <h1 className="font-display -mt-1 text-[clamp(4.5rem,10vw,8rem)] leading-[0.92] font-extrabold tracking-[-0.045em]">
            <span className="sr-only">Salwa</span>
            <span aria-hidden className="inline-flex pb-3">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotate: i % 2 ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 17, delay: 0.25 + i * 0.07 }}
                  whileHover={reduce ? undefined : { y: -12, rotate: i % 2 ? 6 : -6 }}
                  className="inline-block cursor-default"
                  style={{
                    color: l.color,
                    textShadow: `0 2px 0 rgb(255 255 255 / 0.35), 0 5px 0 ${l.depth}, 0 18px 24px rgb(40 30 60 / 0.25)`,
                  }}
                >
                  {l.ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
            Student Delivery at Maxy Academy. Two-plus years making EdTech learning programs run smoothly and feel
            personal.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <a href="#experience" className="btn group bg-blue px-4 text-white sm:px-6">
              See my work
              <ArrowDown size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a href={profile.cv} download className="btn btn-light px-4 sm:px-6">
              <DownloadSimple size={18} weight="bold" />
              Download CV
            </a>
          </div>

          {/* gingham napkin tucked into the corner */}
          <span
            aria-hidden
            className="gingham pointer-events-none absolute -right-10 -bottom-10 hidden size-36 rotate-12 rounded-[1.75rem] [--g:52_97_232] [--gs:1.125rem] sm:block lg:size-44"
          />

          <motion.span
            aria-hidden
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.8 }}
            whileHover={{ rotate: 90 }}
            className="absolute top-7 right-7 hidden size-20 place-items-center rounded-full bg-pink text-white shadow-[inset_0_3px_2px_rgb(255_255_255/0.45),inset_0_-8px_14px_rgb(120_0_50/0.25),0_20px_30px_-12px_rgb(242_80_143/0.7)] sm:grid"
          >
            <Flower size={44} weight="fill" />
          </motion.span>
        </motion.div>

        {/* lanyard ID */}
        <motion.div
          {...tile(0.1)}
          className="clay sky relative col-span-2 min-h-[35rem] overflow-hidden [--sh:60_110_170] lg:col-span-5 lg:row-span-3 lg:min-h-0"
        >
          <Lanyard />
          <p className="font-hand pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-2xl whitespace-nowrap text-ink/60">
            <HandPointing size={22} />
            give it a swing
          </p>
        </motion.div>

        {/* stats */}
        <motion.div {...tile(0.2)} className="clay col-span-1 flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6 bg-butter [--sh:170_120_20] lg:col-span-4 lg:p-7">
          <ClayIcon className="size-11 rounded-[0.875rem] bg-yellow text-ink [--glow:200_150_20] sm:size-14 sm:rounded-[1.125rem]">
            <Buildings size={26} weight="fill" />
          </ClayIcon>
          <div>
            <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">2+ years</p>
            <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink/70 sm:text-base">in EdTech, across 3 companies</p>
          </div>
        </motion.div>
        <motion.div {...tile(0.28)} className="clay col-span-1 flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6 bg-mint [--sh:30_120_80] lg:col-span-3 lg:p-7">
          <ClayIcon className="size-11 rounded-[0.875rem] bg-green text-white [--glow:20_120_80] sm:size-14 sm:rounded-[1.125rem]">
            <Heart size={24} weight="fill" />
          </ClayIcon>
          <div>
            <p className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">80%+</p>
            <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink/70 sm:text-base">learner retention</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function ClayIcon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // callers may pass their own size/radius; only fall back to the defaults when they don't
  const base = /(^|\s)size-/.test(className) ? "" : "size-14 rounded-[1.125rem]";
  return (
    <span
      className={`grid shrink-0 place-items-center ${base} shadow-[inset_0_2px_1px_rgb(255_255_255/0.5),inset_0_-5px_10px_rgb(0_0_0/0.12),0_12px_20px_-10px_rgb(var(--glow,40_30_60)/0.8)] ${className}`}
    >
      {children}
    </span>
  );
}

function Lanyard() {
  const reduce = useReducedMotion();
  // underdamped spring: the badge keeps swinging a little after you let go
  const rotate = useSpring(reduce ? 0 : 14, { stiffness: 70, damping: 5, mass: 1.2 });
  const shine = useTransform(rotate, [-25, 25], ["0% 50%", "100% 50%"]);

  useEffect(() => {
    if (!reduce) rotate.set(0);
  }, [reduce, rotate]);

  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (reduce) return;
    rotate.set(Math.max(-30, Math.min(30, info.offset.x / 5)));
  };

  return (
    <motion.div
      onPan={onPan}
      onPanEnd={() => rotate.set(0)}
      style={{ rotate, originY: 0 }}
      className="absolute top-0 left-1/2 -ml-[9.6875rem] flex w-[19.375rem] cursor-grab touch-pan-y flex-col items-center active:cursor-grabbing"
    >
      {/* strap */}
      <div className="checker relative h-28 w-10 shadow-[inset_-6px_0_8px_rgb(0_0_0/0.12),inset_6px_0_8px_rgb(255_255_255/0.25)] lg:h-36" />
      {/* metal clip */}
      <div className="relative -mt-1 flex flex-col items-center">
        <div className="h-5 w-14 rounded-t-md rounded-b-lg bg-[linear-gradient(180deg,#f4f4f5,#c9c9ce_55%,#9e9ea6)] shadow-[inset_0_1px_0_#fff,0_4px_8px_-2px_rgb(0_0_0/0.35)]" />
        <div className="-mt-0.5 h-7 w-4 rounded-b-full bg-[linear-gradient(90deg,#9e9ea6,#f1f1f3_45%,#a6a6ad)] shadow-[0_3px_6px_-1px_rgb(0_0_0/0.3)]" />
      </div>

      {/* badge */}
      <div className="relative -mt-3 w-full overflow-hidden rounded-[1.625rem] bg-cream p-3 shadow-[inset_0_2px_1px_rgb(255_255_255/0.9),inset_0_-10px_20px_rgb(70_52_100/0.08),0_40px_50px_-24px_rgb(30_50_90/0.55),0_12px_20px_-10px_rgb(30_50_90/0.3)]">
        <div className="mx-auto mb-2 h-3 w-14 rounded-full bg-[#d8d2ca] shadow-[inset_0_2px_3px_rgb(0_0_0/0.25)]" />
        <div className="rounded-[1.125rem] bg-pink px-4 py-3 text-center text-white shadow-[inset_0_2px_1px_rgb(255_255_255/0.35),inset_0_-6px_12px_rgb(120_0_50/0.2)]">
          <p className="font-display text-3xl leading-none font-extrabold tracking-tight">HELLO</p>
          <p className="font-mono mt-1 text-[0.6875rem] tracking-[0.2em] uppercase opacity-90">my name is</p>
        </div>
        <div className="mt-3 flex items-center gap-3 px-1">
          <img
            src={portraits.hero.src}
            alt={portraits.hero.alt}
            width={900}
            height={900}
            fetchPriority="high"
            draggable={false}
            className="size-28 rounded-[1.125rem] object-cover shadow-[0_8px_16px_-8px_rgb(40_30_60/0.5)]"
          />
          <div className="min-w-0 text-left">
            <p className="font-hand text-[3rem] leading-[0.85] text-blue">Salwa</p>
            <p className="mt-1 text-[0.75rem] leading-tight text-ink-soft">Yanuarin Salwa Afranita</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2 rounded-[1rem] bg-paper px-3.5 py-3">
          <div className="min-w-0">
            <p className="text-[0.8125rem] font-semibold">Student Delivery</p>
            <p className="text-[0.75rem] text-ink-soft">Maxy Academy</p>
          </div>
          <motion.span
            aria-hidden
            style={{ backgroundPosition: shine }}
            className="holo grid size-11 shrink-0 place-items-center rounded-[0.75rem] bg-[length:200%_100%] text-white shadow-[inset_0_1px_1px_rgb(255_255_255/0.9)]"
          >
            <Star size={20} weight="fill" className="text-ink/60" />
          </motion.span>
        </div>
        <div className="mt-2.5 flex gap-1.5 px-0.5 pb-0.5">
          {["bg-blue", "bg-pink", "bg-orange", "bg-green", "bg-yellow"].map((c) => (
            <span key={c} className={`h-2 flex-1 rounded-full ${c}`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
