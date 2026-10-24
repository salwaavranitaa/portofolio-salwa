import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Photo } from "../data";

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "18%" : "-18%", opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-18%" : "18%", opacity: 0, scale: 0.98 }),
};

export function Carousel({ photos, label }: { photos: Photo[]; label: string }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const count = photos.length;
  const photo = photos[index];

  const go = useCallback((step: number) => setState(([i]) => [(i + step + count) % count, step]), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // warm the neighbours so swipes never flash
  useEffect(() => {
    [1, -1].forEach((s) => {
      const img = new Image();
      img.src = photos[(index + s + count) % count].src;
    });
  }, [index, photos, count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -60) go(1);
    else if (swipe > 60) go(-1);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="clay relative overflow-hidden bg-[#2a2436] [--sh:40_30_60]"
    >
      <div className="relative aspect-[4/3] max-h-[56dvh] w-full overflow-hidden sm:aspect-[16/10]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={photo.src}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
            drag={count > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          >
            {/* blurred fill keeps portrait + landscape shots feeling full-bleed */}
            <img src={photo.src} alt="" aria-hidden className="absolute inset-0 size-full scale-110 object-cover opacity-60 blur-2xl" />
            <img
              src={photo.src}
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              className="relative size-full object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        <p className="sr-only" aria-live="polite">
          Photo {index + 1} of {count}: {photo.alt}
        </p>

        {count > 1 && (
          <>
            <NavButton side="left" onClick={() => go(-1)} label="Previous photo">
              <CaretLeft size={20} weight="bold" />
            </NavButton>
            <NavButton side="right" onClick={() => go(1)} label="Next photo">
              <CaretRight size={20} weight="bold" />
            </NavButton>

            {/* glass caption + dots */}
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-full bg-white/75 py-1.5 pr-2 pl-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_10px_24px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md">
              <p className="truncate text-[0.8125rem] font-medium text-ink/80">{photo.alt}</p>
              <div className="flex shrink-0 items-center">
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    type="button"
                    onClick={() => setState([i, i > index ? 1 : -1])}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index}
                    className="grid h-6 place-items-center px-[0.1875rem]"
                  >
                    <span
                      className={`block h-2 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out-soft)] ${
                        i === index ? "w-5 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function NavButton({
  side,
  onClick,
  label,
  children,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`btn btn-light absolute top-1/2 size-11 -translate-y-1/2 p-0 ${
        side === "left" ? "left-3" : "right-3"
      }`}
    >
      {children}
    </button>
  );
}
