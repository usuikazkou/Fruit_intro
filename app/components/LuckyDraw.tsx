"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "mango-coupon-code";
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return `MANGO90-${code}`;
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [coupon, setCoupon] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCoupon(saved);
        setResult("win");
      }
    } catch {
      // localStorage unavailable, ignore
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const draw = () => {
    if (drawing || coupon) return;
    setDrawing(true);
    setResult(null);
    window.setTimeout(() => {
      const won = Math.random() < 0.1;
      if (won) {
        const code = generateCode();
        setCoupon(code);
        setResult("win");
        try {
          window.localStorage.setItem(STORAGE_KEY, code);
        } catch {
          // localStorage unavailable, ignore
        }
      } else {
        setResult("lose");
      }
      setDrawing(false);
    }, 900);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 -rotate-3 border-2 border-ink bg-brick px-4 py-3 text-sm font-bold tracking-widest text-cream shadow-[4px_4px_0_var(--ink)] transition-transform hover:-translate-y-0.5 hover:rotate-0"
      >
        🥭 抽優惠券
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 px-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="retro-border relative w-full max-w-sm bg-cream p-6 text-center sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="關閉"
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-cream text-sm font-bold text-ink shadow-[2px_2px_0_var(--ink)]"
            >
              ✕
            </button>

            <span className="inline-block -rotate-2 border border-brown/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-brick">
              Lucky Draw
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-ink">
              芒果優惠抽獎
            </h3>
            <p className="mt-2 text-sm leading-6 text-brown">
              每次有 10% 機會抽中芒果 9 折優惠券！
            </p>

            <div className="my-6 flex items-center justify-center">
              <span
                className={`text-6xl ${drawing ? "animate-spin" : ""}`}
                aria-hidden="true"
              >
                🥭
              </span>
            </div>

            {!drawing && result === "lose" && !coupon && (
              <p className="ribbon-tag mx-auto mb-4 inline-block -rotate-2 bg-brown px-4 py-1 text-xs font-bold tracking-widest text-cream">
                銘謝惠顧，再試一次！
              </p>
            )}

            {coupon && (
              <div className="mb-4 border-2 border-dashed border-brick bg-paper p-4">
                <p className="ribbon-tag mx-auto mb-2 inline-block -rotate-2 bg-olive px-4 py-1 text-xs font-bold tracking-widest text-cream">
                  恭喜中獎！
                </p>
                <p className="text-sm text-brown">芒果 9 折優惠券代碼</p>
                <p className="mt-1 font-[family-name:var(--font-serif-tc)] text-xl font-bold tracking-widest text-ink">
                  {coupon}
                </p>
                <p className="mt-2 text-xs text-brown/80">
                  結帳時出示此代碼即可享優惠，請截圖保留。
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={draw}
              disabled={drawing || !!coupon}
              className="w-full border-2 border-ink bg-brick px-5 py-3 text-sm font-bold tracking-widest text-cream transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
              {coupon ? "已領取優惠券" : drawing ? "抽獎中…" : "抽一次"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
