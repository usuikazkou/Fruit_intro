import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ParallaxImage from "../../components/ParallaxImage";
import { getPost, posts } from "../posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} ‧ 台灣水果誌`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug);

  return (
    <div className="flex flex-col flex-1">
      <Header />

      <section className="relative isolate overflow-hidden border-b-4 border-ink">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src={post.cover}
            alt=""
            priority
            strength={40}
            sizes="100vw"
            className="absolute inset-0"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-10% via-ink/70 via-50% to-ink/20" />

        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-cream sm:px-6 sm:py-20">
          <Link
            href="/blog"
            className="inline-block text-xs font-bold tracking-widest text-cream/80 hover:text-mustard"
          >
            ← 回文章列表
          </Link>
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-mustard">
            {post.date} ‧ 閱讀時間 {post.readTime}
          </p>
          <h1 className="mx-auto mt-4 font-[family-name:var(--font-serif-tc)] text-2xl font-black leading-tight sm:text-3xl md:text-4xl">
            {post.title}
          </h1>
        </div>
      </section>
      <div className="zigzag-ink" />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-6">
          {post.content.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h2 className="mb-3 font-[family-name:var(--font-serif-tc)] text-xl font-bold text-ink sm:text-2xl">
                  {block.heading}
                </h2>
              )}
              <p className="text-sm leading-8 text-brown sm:text-base">
                {block.body}
              </p>
            </div>
          ))}
        </div>

        <div className="retro-divider my-14" />

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brick">
            延伸閱讀
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="font-[family-name:var(--font-serif-tc)] text-base font-bold text-ink decoration-brick decoration-2 underline-offset-4 hover:underline sm:text-lg"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
