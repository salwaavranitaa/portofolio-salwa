import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import type { Photo } from "../data";

export const easeOut = [0.23, 1, 0.32, 1] as const;

/** Fade + lift on first scroll into view. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Tape({ className = "", color = "bg-yellow" }: { className?: string; color?: string }) {
  return <span aria-hidden className={`tape ${color} ${className}`} />;
}

/** Paper polaroid with washi tape. */
export function Polaroid({
  photo,
  caption,
  className = "",
  imgClassName = "aspect-[4/5]",
  tape = "bg-yellow",
  rotate = 0,
}: {
  photo: Photo;
  caption?: string;
  className?: string;
  imgClassName?: string;
  tape?: string;
  rotate?: number;
}) {
  return (
    <figure
      className={`relative rounded-[0.25rem] bg-cream p-2.5 pb-3 shadow-[0_22px_40px_-20px_rgb(40_30_60/0.5),0_3px_8px_rgb(40_30_60/0.08)] ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      <Tape color={tape} className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" />
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.w}
        height={photo.h}
        loading="lazy"
        decoding="async"
        className={`w-full rounded-[0.125rem] object-cover ${imgClassName}`}
      />
      {caption && (
        <figcaption className="font-hand pt-2 text-center text-lg leading-none text-ink-soft">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Handwritten label sitting on a soft highlighter swash (no strokes). */
export function Scribble({
  children,
  className = "",
  swash = "bg-butter",
}: {
  children: ReactNode;
  className?: string;
  swash?: string;
}) {
  return (
    <span className={`font-hand relative inline-block px-2 text-2xl leading-none sm:text-3xl ${className}`}>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: easeOut }}
        className={`absolute inset-x-0 bottom-0 h-[55%] origin-left -rotate-1 rounded-full ${swash}`}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

/** Section heading: handwritten kicker + display title, centered. */
export function SectionHead({
  kicker,
  title,
  swash,
  kickerClass,
  children,
}: {
  kicker: string;
  title: ReactNode;
  swash?: string;
  kickerClass?: string;
  children?: ReactNode;
}) {
  return (
    <div className="text-center">
      <Reveal>
        <Scribble swash={swash} className={kickerClass}>
          {kicker}
        </Scribble>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display mx-auto mt-4 max-w-[18ch] text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {children}
    </div>
  );
}

/** Deterministic ragged edge for torn paper bands. */
export function tornClip(seed = 7, depth = 14, steps = 42) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const top: string[] = [];
  const bottom: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = ((i / steps) * 100).toFixed(2);
    top.push(`${x}% ${(rand() * depth).toFixed(1)}px`);
    bottom.unshift(`${x}% calc(100% - ${(rand() * depth).toFixed(1)}px)`);
  }
  return `polygon(${[...top, ...bottom].join(", ")})`;
}
