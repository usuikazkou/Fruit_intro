"use client";

import Link from "next/link";
import { useUserName } from "./UserNameContext";

const navLinks = [
  { href: "/", label: "首頁" },
  { href: "/#fruits", label: "水果圖鑑" },
  { href: "/blog", label: "水果故事" },
  { href: "/#about", label: "關於本站" },
];

export default function Header() {
  const { name } = useUserName();

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-brown text-cream">
      <div className="overflow-hidden bg-mustard py-1 text-ink">
        <p className="whitespace-nowrap text-center text-[9px] font-bold tracking-[0.25em] sm:text-[10px] sm:tracking-[0.35em]">
          產地直送 ✦ 當季鮮甜 ✦ 台灣好物 ✦ 產地直送 ✦ 當季鮮甜 ✦ 台灣好物
        </p>
      </div>

      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-baseline gap-2 sm:gap-3">
          <span className="flex h-8 w-8 -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-cream/70 font-[family-name:var(--font-serif-tc)] text-[10px] font-bold sm:h-9 sm:w-9 sm:text-[11px]">
            TW
          </span>
          <span className="font-[family-name:var(--font-serif-tc)] text-lg font-bold tracking-widest sm:text-xl">
            台灣水果誌
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-6">
          <nav className="flex items-center gap-4 text-xs tracking-widest sm:gap-6 sm:text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/90 decoration-mustard decoration-2 underline-offset-4 transition-colors hover:text-mustard hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {name && (
            <span className="border-l border-cream/30 pl-4 text-xs font-bold tracking-widest text-mustard sm:text-sm">
              嗨，{name} 👋
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
