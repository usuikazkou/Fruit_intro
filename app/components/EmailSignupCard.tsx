"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "../actions";

const initialState: SubscribeState = { status: "idle", message: "" };

export default function EmailSignupCard() {
  const [state, formAction, pending] = useActionState(
    subscribe,
    initialState,
  );
  const done = state.status === "success" || state.status === "duplicate";

  return (
    <div className="retro-border flex flex-col justify-center gap-4 bg-paper p-6 text-center sm:p-8">
      <span className="mx-auto inline-block -rotate-2 border border-brown/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-brick">
        Coming Soon
      </span>
      <h4 className="font-[family-name:var(--font-serif-tc)] text-xl font-bold text-ink sm:text-2xl">
        還沒開賣，先搶頭香
      </h4>
      <p className="text-sm leading-6 text-brown">
        我們正在準備第一批台灣水果箱，留下 Email，開賣時第一個通知你。
      </p>

      {done ? (
        <p className="border-2 border-olive bg-cream px-4 py-3 text-sm font-bold text-olive">
          {state.message}
        </p>
      ) : (
        <form action={formAction} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full border-2 border-ink bg-cream px-4 py-2 text-sm text-ink placeholder:text-brown/50 focus:outline-none focus:ring-2 focus:ring-brick"
          />
          <button
            type="submit"
            disabled={pending}
            className="shrink-0 border-2 border-ink bg-brick px-5 py-2 text-sm font-bold tracking-widest text-cream transition-colors hover:bg-ink disabled:opacity-60"
          >
            {pending ? "登記中…" : "通知我"}
          </button>
        </form>
      )}

      {state.status === "error" && (
        <p className="text-xs font-bold text-brick">{state.message}</p>
      )}
    </div>
  );
}
