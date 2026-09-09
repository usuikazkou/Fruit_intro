import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ParallaxImage from "../components/ParallaxImage";
import { posts } from "./posts";

export const metadata = {
  title: "水果故事 ‧ 台灣水果誌",
  description: "關於台灣水果的專題文章，第一彈：芒果三部曲。",
};

export default function BlogIndexPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <section className="relative isolate overflow-hidden border-b-4 border-ink bg-paper">
        <div className="sunburst absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <span className="inline-block -rotate-2 border border-brown/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-brick sm:text-[11px] sm:tracking-[0.3em]">
            專題連載 ‧ 芒果三部曲
          </span>
          <h1 className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-serif-tc)] text-3xl font-black leading-tight text-ink sm:text-4xl md:text-5xl">
            水果故事
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-brown sm:text-base sm:leading-8">
            從產地身世到餐桌吃法，用文字慢慢認識一顆水果。第一彈，先從最當紅的芒果說起。
          </p>
        </div>
      </section>
      <div className="zigzag-paper" />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-16 sm:gap-20">
          {posts.map((post, i) => (
            <article
              key={post.slug}
              className={`flex flex-col gap-6 sm:items-center sm:gap-10 md:gap-12 ${
                i % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="relative mx-auto w-full max-w-sm shrink-0 sm:mx-0 sm:w-2/5 sm:max-w-none"
              >
                <ParallaxImage
                  src={post.cover}
                  alt={post.title}
                  priority={i === 0}
                  strength={16}
                  sizes="(min-width: 640px) 40vw, 90vw"
                  className={`retro-border relative aspect-[4/3] bg-paper ${
                    i % 2 === 1 ? "rotate-2" : "-rotate-2"
                  }`}
                />
                <span className="absolute -top-3 -left-3 flex h-10 w-10 -rotate-6 items-center justify-center border-2 border-ink bg-cream font-[family-name:var(--font-serif-tc)] text-xs font-bold text-ink shadow-[3px_3px_0_var(--ink)] sm:-top-4 sm:-left-4 sm:h-12 sm:w-12 sm:text-sm">
                  0{i + 1}
                </span>
              </Link>

              <div className="flex-1">
                <p className="text-xs font-bold tracking-[0.2em] text-brick">
                  {post.date} ‧ 閱讀時間 {post.readTime}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-serif-tc)] text-xl font-bold text-ink sm:text-2xl">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="decoration-brick decoration-2 underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-brown">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-xs font-bold tracking-widest text-olive hover:text-brick"
                >
                  閱讀全文 →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
