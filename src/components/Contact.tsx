import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  DownloadSimple,
  EnvelopeSimple,
  LinkedinLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { portraits, profile } from "../data";
import { ClayIcon } from "./Hero";
import { Reveal, SectionHead } from "./primitives";

// perforated postage-stamp edge: holes everywhere, then the interior filled back in
const stampMask =
  "radial-gradient(circle at center, #0000 4px, #000 4.5px) -6px -6px / 12px 12px round, linear-gradient(#000 0 0) 10px 10px / calc(100% - 20px) calc(100% - 20px) no-repeat";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative pt-4 pb-10 md:pt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHead kicker="say hello" swash="bg-butter" title="Let's work together" />

        <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
          {/* postcard */}
          <Reveal className="clay relative col-span-3 overflow-hidden bg-cream p-6 sm:p-9 md:col-span-7 md:row-span-2">
            <div className="flow-root h-full sm:grid sm:grid-cols-[1fr_auto] sm:gap-8">
              {/* stamp: floats top-right on phones so the letter wraps around it */}
              <div className="relative float-right mb-4 ml-5 w-[6.5rem] sm:order-2 sm:float-none sm:m-0 sm:w-44">
                <motion.div
                  whileHover={{ rotate: 0, scale: 1.04 }}
                  initial={{ rotate: 6 }}
                  className="bg-white p-2.5 shadow-[0_18px_30px_-16px_rgb(40_30_60/0.55)] sm:p-[0.875rem]"
                  style={{ mask: stampMask, WebkitMask: stampMask }}
                >
                  <img
                    src={portraits.hero.src}
                    alt={portraits.hero.alt}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </motion.div>
                {/* round postmark: lower-left corner on phones (clear of the face), top-left from sm */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 1.6, opacity: 0, rotate: -30 }}
                  whileInView={{ scale: 1, opacity: 0.95, rotate: -16 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.35 }}
                  className="font-display absolute -bottom-3 -left-4 grid size-[3.75rem] place-items-center rounded-full bg-red text-center text-[0.5625rem] leading-[1.15] font-extrabold tracking-[0.12em] text-white uppercase shadow-[inset_0_0_0_3px_rgb(255_255_255/0.55),0_10px_18px_-8px_rgb(150_30_20/0.55)] sm:top-[-1rem] sm:bottom-auto sm:-left-6 sm:size-[5rem] sm:text-[0.8125rem]"
                >
                  <span>
                    Open to
                    <br />
                    work
                  </span>
                </motion.span>
              </div>

              {/* plain block on phones: a flex box would refuse to wrap around the floated stamp */}
              <div className="sm:order-1 sm:flex sm:h-full sm:flex-col">
                <p className="font-hand text-[2.6rem] leading-[1] text-blue sm:text-5xl">Hi there,</p>
                <p className="mt-4 max-w-[36ch] leading-relaxed text-ink-soft sm:text-lg">
                  I&apos;m open to roles in Student Experience, Learning & Development and Product Operations. Got a
                  program that needs a caring, organized hand? I&apos;d love to hear about it.
                </p>
                <p className="font-hand mt-auto pt-6 text-3xl text-ink sm:pt-8">warmly, Salwa</p>
              </div>
            </div>
          </Reveal>

          {/* email */}
          <Reveal delay={0.05} className="clay col-span-3 flex flex-col bg-blue p-6 text-white [--sh:40_70_180] sm:p-7 md:col-span-5">
            <div className="flex items-center gap-4">
              <ClayIcon className="bg-white text-blue [--glow:20_40_120]">
                <EnvelopeSimple size={26} weight="fill" />
              </ClayIcon>
              <div className="min-w-0">
                <p className="text-white/75">Email me at</p>
                <p className="truncate text-lg font-semibold">{profile.email}</p>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-light flex-1 px-4 py-3 text-[0.9375rem]">
                Write an email
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy email address"
                className="btn min-w-[6.5rem] bg-white/15 px-4 py-3 text-[0.9375rem] text-white [--sh:10_30_120]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied ? <Check size={18} weight="bold" /> : <Copy size={18} weight="bold" />}
                    {copied ? "Copied" : "Copy"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </Reveal>

          {/* CV as a paper document */}
          <Reveal delay={0.1} className="col-span-1 md:col-span-5">
            <a
              href={profile.cv}
              download
              className="clay group flex h-full flex-col items-center justify-center gap-3 bg-butter px-3 py-5 text-center [--sh:170_120_20] md:flex-row md:justify-start md:gap-5 md:p-6 md:text-left"
            >
              {/* the paper doc doubles as the icon; shrunk to icon size on phones */}
              <span className="relative -mx-[1.2rem] -my-[1.35rem] block h-24 w-[4.625rem] shrink-0 rotate-[-4deg] rounded-[0.375rem] bg-cream p-2.5 shadow-[0_14px_20px_-10px_rgb(120_80_10/0.55)] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-hover:rotate-0 [clip-path:polygon(0_0,calc(100%-1rem)_0,100%_1rem,100%_100%,0_100%)] max-md:scale-[0.6] md:m-0">
                <span className="absolute top-0 right-0 size-4 bg-[#e9dcae]" />
                <span className="block size-5 rounded-full bg-pink/70" />
                <span className="mt-2 block h-1.5 w-10 rounded-full bg-ink/15" />
                <span className="mt-1.5 block h-1.5 w-12 rounded-full bg-ink/10" />
                <span className="mt-1.5 block h-1.5 w-8 rounded-full bg-ink/10" />
                <span className="mt-1.5 block h-1.5 w-11 rounded-full bg-ink/10" />
              </span>
              <span className="min-w-0 md:flex-1">
                <span className="font-display block text-[0.9375rem] font-bold tracking-tight md:text-xl">My CV</span>
                <span className="hidden text-ink/70 md:block">One page, PDF</span>
              </span>
              <span className="btn hidden size-12 bg-ink p-0 text-yellow [--sh:33_29_43] md:inline-flex">
                <DownloadSimple size={20} weight="bold" />
              </span>
            </a>
          </Reveal>

          <Channel
            delay={0.15}
            href={profile.linkedin}
            label="LinkedIn"
            sub="Let's connect"
            className="bg-sky [--sh:60_110_170]"
            icon={
              <ClayIcon className="size-12 rounded-[1rem] bg-[#0a66c2] text-white [--glow:10_102_194] md:size-14 md:rounded-[1.125rem]">
                <LinkedinLogo size={26} weight="fill" />
              </ClayIcon>
            }
          />
          <Channel
            delay={0.2}
            href={profile.whatsapp}
            label="WhatsApp"
            sub="Quick chat"
            className="bg-mint [--sh:30_120_80]"
            icon={
              <ClayIcon className="size-12 rounded-[1rem] bg-[#25d366] text-white [--glow:20_150_80] md:size-14 md:rounded-[1.125rem]">
                <WhatsappLogo size={26} weight="fill" />
              </ClayIcon>
            }
          />
        </div>
      </div>
    </section>
  );
}

function Channel({
  href,
  label,
  sub,
  icon,
  className,
  delay,
}: {
  href: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  className: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="col-span-1 md:col-span-6">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`clay group flex h-full flex-col items-center justify-center gap-3 px-3 py-5 text-center transition-transform md:flex-row md:justify-start md:gap-5 md:p-6 md:text-left duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 ${className}`}
      >
        {icon}
        <span className="md:flex-1">
          <span className="font-display block text-[0.9375rem] font-bold tracking-tight md:text-xl">{label}</span>
          <span className="hidden text-ink/70 md:block">{sub}</span>
        </span>
        <span className="hidden size-11 place-items-center md:grid rounded-full bg-white/70 shadow-[inset_0_1px_0_#fff] transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:rotate-45">
          <ArrowUpRight size={18} weight="bold" />
        </span>
      </a>
    </Reveal>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pt-6 pb-8 sm:px-6">
      <div className="clay-sm mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-[1.75rem] sm:rounded-full bg-cream/80 py-3 pr-3 pl-6 backdrop-blur sm:flex-row">
        <p className="text-[0.875rem] text-ink-soft">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="btn btn-light px-4 py-2.5 text-[0.875rem]">
          Back to top
          <ArrowUp size={16} weight="bold" />
        </a>
      </div>
    </footer>
  );
}
