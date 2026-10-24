import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { HandGrabbing, Megaphone, PenNib } from "@phosphor-icons/react";
import { campusPhotos, orgs } from "../data";
import { ClayIcon } from "./Hero";
import { Reveal, SectionHead, Tape } from "./primitives";

const tapes = [
  "bg-yellow",
  "gingham [--g:242_80_143] [--gs:0.5rem]",
  "bg-blue",
  "gingham [--g:30_158_104] [--gs:0.5rem]",
  "bg-orange",
];
const icons = [Megaphone, PenNib];

export function Campus() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewRef.current) return;
      setLimit(Math.max(0, trackRef.current.scrollWidth - viewRef.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewRef.current) ro.observe(viewRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="campus" className="relative pt-20 pb-10 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead kicker="before EdTech" swash="bg-mint" title="Campus life at BEM FILKOM" />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {orgs.map((o, i) => {
            const Icon = icons[i];
            return (
              <Reveal
                key={o.role}
                delay={0.08 * i}
                className={`clay flex flex-col p-7 sm:p-8 ${o.tone}`}
                style={{ "--sh": o.sh } as React.CSSProperties}
              >
                <div className="flex items-start justify-between gap-4">
                  <ClayIcon className={`${o.accent} text-white`}>
                    <Icon size={26} weight="fill" />
                  </ClayIcon>
                  <span className="rounded-full bg-white/70 px-3.5 py-1.5 text-[0.8125rem] font-semibold shadow-[inset_0_1px_0_#fff]">
                    {o.years}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-2xl leading-tight font-bold tracking-tight text-balance">{o.role}</h3>
                <p className="mt-1 text-ink/70">{o.org}</p>

                <div className="mt-6 flex items-end gap-3 rounded-[1.5rem] bg-white/60 p-5 shadow-[inset_0_1.5px_0_#fff,inset_0_-6px_12px_rgb(0_0_0/0.03)]">
                  <span className="font-display text-5xl leading-none font-extrabold tracking-tight">{o.highlight.value}</span>
                  <span className="pb-1 leading-tight text-ink/70">{o.highlight.label}</span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {o.points.map((p) => (
                    <li key={p} className="flex gap-2.5 leading-relaxed text-ink/85">
                      <span aria-hidden className={`mt-[0.5625rem] size-2 shrink-0 rounded-full ${o.accent}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* draggable polaroid strip */}
      <div className="mt-14">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-2 px-4 sm:px-6">
          <HandGrabbing size={22} className="text-ink-soft" />
          <p className="font-hand text-2xl text-ink-soft">drag to flip through the memories</p>
        </div>
        <div ref={viewRef} className="overflow-hidden py-10">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: -limit, right: 0 }}
            dragElastic={0.08}
            dragTransition={{ power: 0.25, timeConstant: 260 }}
            className="flex w-max cursor-grab gap-6 px-[max(1rem,calc((100vw-72rem)/2+1.5rem))] active:cursor-grabbing"
          >
            {campusPhotos.map((p, i) => (
              <motion.figure
                key={p.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 5) * 0.06, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ rotate: 0, y: -6 }}
                style={{ rotate: `${[-3, 2, -1.5, 3, -2][i % 5]}deg` }}
                className="relative w-[14.375rem] shrink-0 rounded-[0.25rem] bg-cream p-2.5 pb-10 shadow-[0_22px_40px_-20px_rgb(40_30_60/0.5)] sm:w-[16.875rem]"
              >
                <Tape color={tapes[i % tapes.length]} className="-top-3 left-1/2 -translate-x-1/2 rotate-2" />
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  draggable={false}
                  className="pointer-events-none aspect-square w-full rounded-[0.125rem] object-cover"
                />
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
