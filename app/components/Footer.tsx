import Image from "next/image";
import Link from "next/link";

const filmStrip = [
  "/image/mango.jpg",
  "/image/lychee.jpg",
  "/image/dragon-fruit.jpg",
  "/image/pineapple.jpg",
  "/image/banana.jpg",
];

export default function Footer() {
  return (
    <footer id="about" className="relative">
      <div className="zigzag-brown" />
      <div className="bg-brown text-cream">
        <div className="flex flex-wrap justify-center px-4 pt-8 sm:px-6">
          {filmStrip.map((src, i) => (
            <div
              key={src}
              style={{ zIndex: i }}
              className={`h-11 w-11 shrink-0 overflow-hidden border-2 border-cream bg-paper shadow-md first:ml-0 sm:h-14 sm:w-14 ${
                i % 2 ? "rotate-3" : "-rotate-3"
              } ${i > 0 ? "-ml-2 sm:-ml-3" : ""}`}
            >
              <Image
                src={src}
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:gap-10 sm:px-6 lg:py-12">
          <div>
            <p className="font-[family-name:var(--font-serif-tc)] text-lg tracking-widest">
              台灣水果誌
            </p>
            <p className="mt-3 text-sm leading-6 text-cream/80">
              一份獻給寶島物產的復古導覽，記錄四季更迭中，
              那些從土地長出來的甜蜜滋味。
            </p>
          </div>

          <div>
            <p className="text-sm font-bold tracking-widest text-mustard">
              快速連結
            </p>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              <li>
                <Link href="/" className="transition-colors hover:text-mustard">
                  首頁
                </Link>
              </li>
              <li>
                <Link
                  href="/#fruits"
                  className="transition-colors hover:text-mustard"
                >
                  水果圖鑑
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-mustard"
                >
                  水果故事
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="transition-colors hover:text-mustard"
                >
                  關於本站
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold tracking-widest text-mustard">
              關於本站
            </p>
            <p className="mt-3 text-sm leading-6 text-cream/80">
              本站為介紹台灣在地水果的示範網站，內容僅供參考，
              歡迎將這份甜蜜分享給更多人。
            </p>
          </div>
        </div>

        <div className="retro-divider mx-4 sm:mx-6" />

        <p className="px-4 py-6 text-center text-[11px] tracking-widest text-mustard sm:px-6 sm:text-xs">
          TASTE OF TAIWAN — 用一口水果，記得這座島嶼的甜
        </p>
      </div>
    </footer>
  );
}
