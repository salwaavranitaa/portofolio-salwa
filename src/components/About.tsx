import { useRef, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, GraduationCap, Medal, Translate, UsersThree } from "@phosphor-icons/react";
import { education, portraits, roles, skills } from "../data";
import { ClayIcon } from "./Hero";
import { Polaroid, Reveal, SectionHead, easeOut, tornClip } from "./primitives";

const bandClip = tornClip(11, 18, 48);

export function About() {
  return (
    <section id="about" className="relative pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead kicker="a little about me" swash="bg-blush" title="I help people feel supported while they learn." />

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-5">
          {/* photos on a gingham picnic cloth */}
          <Reveal className="clay gingham relative col-span-2 min-h-[25rem] overflow-hidden [--g:242_80_143] [--gs:2.25rem] [--sh:190_70_110] sm:min-h-[27.5rem] lg:col-span-4 lg:row-span-2">
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative w-[46%] max-w-[15.625rem] -translate-x-[40%] sm:w-[40%] lg:w-[56%] lg:-translate-x-[22%]">
                <Polaroid
                  photo={portraits.standing}
                  caption="a regular office day"
                  rotate={-5}
                  tape="gingham [--g:248_198_65] [--gs:0.5rem]"
                />
                <Polaroid
                  photo={portraits.podcast}
                  caption="on air!"
                  rotate={8}
                  tape="gingham [--g:52_97_232] [--gs:0.5rem]"
                  className="-right-[88%] -mt-[72%] w-[82%] lg:-right-[55%] lg:-mt-[48%] lg:w-[72%]"
                />
              </div>
            </div>
          </Reveal>

          {/* bio */}
          <Reveal delay={0.05} className="clay col-span-2 bg-cream p-7 sm:p-9 lg:col-span-8">
            <p className="font-display text-2xl leading-snug font-semibold tracking-tight text-balance sm:text-[1.75rem]">
              I&apos;m Salwa, a Computer Science graduate from Universitas Brawijaya who found her place in EdTech.
            </p>
            <p className="mt-4 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
              Since 2024 I&apos;ve led Class Managers, run LMS platforms and facilitated everything from bootcamps to
              corporate training. To me, a great learning program is tidy behind the scenes and warm in front of learners.
            </p>
          </Reveal>

          {/* keycaps */}
          <Reveal delay={0.1} className="clay col-span-2 bg-[#efeae3] p-7 sm:p-8 lg:col-span-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-xl font-bold tracking-tight">My toolkit</h3>
              <p className="font-hand text-xl text-ink-soft">go on, press a key</p>
            </div>
            <Keyboard />
          </Reveal>

          {/* education */}
          <Reveal delay={0.15} className="clay col-span-1 flex flex-col bg-lilac p-5 [--sh:100_80_190] sm:p-7 lg:col-span-3">
            <ClayIcon className={`bg-[#7d68e0] text-white [--glow:100_80_190] ${factIcon}`}>
              <GraduationCap size={24} weight="fill" />
            </ClayIcon>
            <p className="font-display mt-auto pt-4 text-3xl font-extrabold tracking-tight sm:pt-6 sm:text-5xl">{education.gpa}</p>
            <p className="text-[0.9375rem] leading-snug text-ink/70 sm:text-base">GPA out of 4.00</p>
            <p className="mt-3 hidden leading-snug font-semibold sm:block">{education.school}</p>
            <p className="hidden text-[0.9375rem] text-ink/70 sm:block">
              {education.degree}, {education.years}
            </p>
          </Reveal>

          {/* small facts: 2-up mini tiles on phones, wide rows from lg */}
          <Fact delay={0.1} className="bg-sky [--sh:60_110_170]" icon={<ClayIcon className={`bg-blue text-white [--glow:52_97_232] ${factIcon}`}><UsersThree size={24} weight="fill" /></ClayIcon>}>
            <p className="font-display text-3xl font-extrabold tracking-tight">14+</p>
            <p className="text-[0.9375rem] leading-snug text-ink/70 sm:text-base">Class Managers led and mentored</p>
          </Fact>
          <Fact delay={0.15} className="bg-butter [--sh:170_120_20]" icon={<ClayIcon className={`bg-orange text-white [--glow:220_100_50] ${factIcon}`}><Medal size={24} weight="fill" /></ClayIcon>}>
            <p className="font-display text-lg leading-tight font-bold tracking-tight sm:text-xl">PMW Awardee 2023</p>
            <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink/70 sm:text-base">Student Entrepreneur Program funding</p>
          </Fact>
          <Fact delay={0.2} className="bg-mint [--sh:30_120_80]" icon={<ClayIcon className={`bg-green text-white [--glow:20_120_80] ${factIcon}`}><Translate size={24} weight="fill" /></ClayIcon>}>
            <p className="font-display text-lg leading-tight font-bold tracking-tight sm:text-xl">Bahasa & English</p>
            <p className="mt-0.5 text-[0.9375rem] leading-snug text-ink/70 sm:text-base">Native Indonesian, intermediate English</p>
          </Fact>
        </div>
      </div>

      <Roles />
    </section>
  );
}

const factIcon = "size-11 rounded-[0.875rem] sm:size-14 sm:rounded-[1.125rem]";

function Fact({
  children,
  icon,
  className,
  delay,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className={`clay col-span-1 flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6 lg:col-span-4 ${className}`}
    >
      {icon}
      <div>{children}</div>
    </Reveal>
  );
}

function Keyboard() {
  const [pressed, setPressed] = useState<string | null>(null);
  return (
    <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-4 pb-2">
      {skills.map((s, i) => (
        <motion.li
          key={s.label}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 * i, ease: easeOut }}
        >
          <button
            type="button"
            data-pressed={pressed === s.label}
            onPointerDown={() => setPressed(s.label)}
            onPointerUp={() => setPressed(null)}
            onPointerLeave={() => setPressed(null)}
            className={`keycap px-4 py-2.5 text-[0.9375rem] font-semibold ${s.text}`}
            style={{ "--cap": s.cap, "--edge": s.edge } as React.CSSProperties}
          >
            {s.label}
          </button>
        </motion.li>
      ))}
    </ul>
  );
}

function Roles() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // phones get a swipeable rail; track which card is centred for the dots
  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    cards.forEach((c, i) => {
      if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)) best = i;
    });
    setActive(best);
  };

  return (
    <div className="soft-gingham relative mt-24 py-24 md:mt-32 md:py-32" style={{ clipPath: bandClip }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="font-hand text-5xl text-white [text-shadow:0_3px_0_rgb(194_50_104/0.55),0_14px_24px_rgb(120_20_60/0.25)] sm:text-6xl">
            Where I fit best
          </p>
          <p className="clay-sm mx-auto mt-5 w-fit rounded-full bg-cream px-5 py-2 text-[0.9375rem] font-medium [--sh:190_70_110]">
            Three roles that match my experience so far
          </p>
        </Reveal>

        <div
          ref={railRef}
          onScroll={onScroll}
          className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11%] pt-6 pb-14 sm:-mx-6 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:p-0 lg:gap-8"
        >
          {roles.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0, rotate: [-1.5, 1, -1][i] }}
              whileHover={{ y: -8, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 160, damping: 20, delay: i * 0.1 }}
              className={`clay flex w-[78%] max-w-[22rem] shrink-0 snap-center flex-col bg-cream p-6 [--sh:170_40_90] md:w-auto md:max-w-none ${i === 1 ? "md:mt-10" : ""}`}
            >
              <div className="mx-auto size-36 sm:size-40">
                <FlowerImage src={r.photo.src} alt={r.photo.alt} />
              </div>
              <h3
                className={`mx-auto mt-5 w-fit rounded-full px-4 py-1.5 text-center text-[0.875rem] font-semibold shadow-[inset_0_1.5px_0_rgb(255_255_255/0.4),inset_0_-3px_0_rgb(0_0_0/0.12)] ${r.pill}`}
              >
                {r.title}
              </h3>
              <p className="mt-4 text-center leading-relaxed text-ink-soft">{r.body}</p>
              <ul className="mt-auto space-y-2 rounded-[1.25rem] bg-paper p-4 [margin-top:1.25rem]">
                {r.proof.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-[0.9375rem] font-semibold">
                    <CheckCircle size={20} weight="fill" className="shrink-0 text-pink" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="-mt-6 flex items-center justify-center gap-3 md:hidden">
          <div className="flex gap-1.5 rounded-full bg-cream/90 px-3 py-2 shadow-[0_8px_16px_-10px_rgb(120_20_60/0.5)]">
            {roles.map((r, i) => (
              <span
                key={r.title}
                className={`block h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-soft)] ${
                  i === active ? "w-5 bg-pink" : "w-2 bg-ink/20"
                }`}
              />
            ))}
          </div>
          <p className="font-hand text-2xl text-white [text-shadow:0_2px_0_rgb(194_50_104/0.5)]">swipe me</p>
        </div>
      </div>
    </div>
  );
}

/** Photo cropped into a scalloped flower via CSS mask (8 petals). */
function FlowerImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      initial={{ rotate: -20, scale: 0.85 }}
      whileInView={{ rotate: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: easeOut }}
      className="size-full object-cover"
      style={{ WebkitMaskImage: flowerMask, maskImage: flowerMask, WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}
    />
  );
}

const petals = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return `<circle cx='${(50 + Math.cos(a) * 28).toFixed(2)}' cy='${(50 + Math.sin(a) * 28).toFixed(2)}' r='22'/>`;
}).join("");
const flowerMask = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><g fill='black'><circle cx='50' cy='50' r='34'/>${petals}</g></svg>")`;
