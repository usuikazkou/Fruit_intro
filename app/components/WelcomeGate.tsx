"use client";

import { useState, type FormEvent } from "react";
import { useUserName } from "./UserNameContext";

export default function WelcomeGate() {
  const { name, setName, ready } = useUserName();
  const [value, setValue] = useState("");

  if (!ready || name) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    setName(trimmed.slice(0, 20));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 px-4 backdrop-blur-sm">
      <div className="retro-border w-full max-w-sm bg-cream p-6 text-center sm:p-8">
        <span className="inline-block -rotate-2 border border-brown/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-brick">
          Welcome
        </span>
        <h3 className="mt-4 font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-ink">
          歡迎光臨台灣水果誌
        </h3>
        <p className="mt-2 text-sm leading-6 text-brown">
          在開始逛之前，先告訴我們怎麼稱呼你吧！
        </p>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="輸入你的稱呼"
            maxLength={20}
            autoFocus
            className="w-full border-2 border-ink bg-paper px-4 py-2 text-sm text-ink placeholder:text-brown/50 focus:outline-none focus:ring-2 focus:ring-brick"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="w-full border-2 border-ink bg-brick px-5 py-3 text-sm font-bold tracking-widest text-cream transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            開始逛逛
          </button>
        </form>
      </div>
    </div>
  );
}
