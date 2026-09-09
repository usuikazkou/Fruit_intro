"use client";

import { useEffect, useRef, useState } from "react";
import ParallaxImage from "./ParallaxImage";

export type Ribbon = "brick" | "olive" | "teal" | "mustard";
export type Accent = "brick" | "olive" | "teal" | "mustard-deep";

export type Fruit = {
  image: string;
  name: string;
  alias: string;
  season: string;
  desc: string;
  ribbon: Ribbon;
  accent: Accent;
};

const ribbonBg: Record<Ribbon, string> = {
  brick: "bg-brick",
  olive: "bg-olive",
  teal: "bg-teal",
  mustard: "bg-mustard",
};

const ribbonText: Record<Ribbon, string> = {
  brick: "text-cream",
  olive: "text-cream",
  teal: "text-cream",
  mustard: "text-ink",
};

const accentText: Record<Accent, string> = {
  brick: "text-brick",
  olive: "text-olive",
  teal: "text-teal",
  "mustard-deep": "text-mustard-deep",
};

export default function FruitCard({
  fruit,
  index,
  priority = false,
}: {
  fruit: Fruit;
  index: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const tilt = index % 2 === 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`flex flex-col gap-5 transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <div className="relative mx-auto w-full max-w-sm">
        <ParallaxImage
          src={fruit.image}
          alt={fruit.name}
          priority={priority}
          strength={16}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 90vw"
          className={`retro-border relative aspect-[4/3] bg-paper ${
            tilt ? "rotate-2" : "-rotate-2"
          }`}
        />
        <span className="absolute -top-3 -left-3 flex h-10 w-10 -rotate-6 items-center justify-center border-2 border-ink bg-cream font-[family-name:var(--font-serif-tc)] text-xs font-bold text-ink shadow-[3px_3px_0_var(--ink)] sm:-top-4 sm:-left-4 sm:h-12 sm:w-12 sm:text-sm">
          0{index + 1}
        </span>
      </div>

      <div className="mx-auto w-full max-w-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h4 className="font-[family-name:var(--font-serif-tc)] text-xl font-bold text-ink sm:text-2xl">
            {fruit.name}
          </h4>
          <span
            className={`ribbon-tag -rotate-2 px-4 py-1 pl-5 text-xs font-bold tracking-widest ${
              ribbonBg[fruit.ribbon]
            } ${ribbonText[fruit.ribbon]}`}
          >
            {fruit.season}
          </span>
        </div>
        <p
          className={`mt-1 text-xs font-bold tracking-[0.2em] ${accentText[fruit.accent]}`}
        >
          {fruit.alias}
        </p>
        <p className="mt-4 text-sm leading-7 text-brown">{fruit.desc}</p>
      </div>
    </article>
  );
}
