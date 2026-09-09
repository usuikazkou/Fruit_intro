import Header from "./components/Header";
import Footer from "./components/Footer";
import ParallaxImage from "./components/ParallaxImage";
import FruitCard, { type Fruit } from "./components/FruitCard";
import EmailSignupCard from "./components/EmailSignupCard";

const fruits: Fruit[] = [
  {
    image: "/image/mango.jpg",
    name: "愛心芒果",
    alias: "愛文 / 玉文",
    season: "5 – 8 月",
    desc: "南台灣豔陽下養出的國民水果，果肉金黃香甜，冰鎮後配煉乳更是消暑經典。",
    ribbon: "mustard",
    accent: "brick",
  },
  {
    image: "/image/pineapple.jpg",
    name: "鳳梨",
    alias: "土鳳梨 / 金鑽",
    season: "全年",
    desc: "酸甜有勁、纖維細緻，台語俗稱「旺來」，是喜慶場合最討喜的吉祥水果。",
    ribbon: "brick",
    accent: "olive",
  },
  {
    image: "/image/guava.jpg",
    name: "芭樂",
    alias: "珍珠芭 / 紅心芭樂",
    season: "全年",
    desc: "清脆爽口、維他命 C 含量極高，是台灣人隨手一包配梅粉的國民點心。",
    ribbon: "olive",
    accent: "teal",
  },
  {
    image: "/image/sugar-apple.jpg",
    name: "釋迦",
    alias: "鳳梨釋迦",
    season: "9 – 12 月",
    desc: "台東的太陽把它曬得又香又甜，果肉綿密如冰淇淋，挖一口就懂為何叫「釋迦」。",
    ribbon: "teal",
    accent: "mustard-deep",
  },
  {
    image: "/image/dragon-fruit.jpg",
    name: "火龍果",
    alias: "紅肉 / 白肉",
    season: "6 – 10 月",
    desc: "外皮如火焰、果肉布滿黑籽，清甜爽脆，是夏日消暑退火的最佳選擇。",
    ribbon: "brick",
    accent: "teal",
  },
  {
    image: "/image/lychee.jpg",
    name: "荔枝",
    alias: "玉荷包",
    season: "5 – 6 月",
    desc: "果肉晶瑩剔透、香氣濃郁，產季短暫卻讓人年年引頸期盼，一口咬下滿是蜜香。",
    ribbon: "olive",
    accent: "brick",
  },
  {
    image: "/image/banana.jpg",
    name: "香蕉",
    alias: "北蕉",
    season: "全年",
    desc: "曾是台灣外銷傳奇的「香蕉王國」代表作，綿密香甜，是最庶民也最長情的水果。",
    ribbon: "mustard",
    accent: "mustard-deep",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />

      <section className="relative isolate overflow-hidden border-b-4 border-ink">
        <div className="absolute inset-0 -z-10">
          <ParallaxImage
            src="/image/mango.jpg"
            alt=""
            priority
            strength={50}
            sizes="100vw"
            className="absolute inset-0"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-10% via-ink/70 via-50% to-ink/20" />
        <div className="sunburst absolute inset-0 -z-10 opacity-40 mix-blend-overlay" />

        <div className="mx-auto max-w-3xl px-4 py-16 text-center text-cream sm:px-6 sm:py-24 lg:py-32">
          <span className="inline-block -rotate-2 border border-cream/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cream/90 sm:text-[11px] sm:tracking-[0.3em]">
            限定復刻 ‧ 農產手帖 No.01
          </span>
          <h2 className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-serif-tc)] text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            一年四季，
            <br />
            嚐遍台灣的甜
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-cream/85 sm:text-base sm:leading-8">
            從北到南、從平地到高山，得天獨厚的氣候讓台灣成為名副其實的「水果王國」。
            翻開這本復古風味誌，一起認識土地孕育出的經典滋味。
          </p>
        </div>
      </section>
      <div className="zigzag-ink" />

      <main
        id="fruits"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:py-24"
      >
        <div className="mb-12 max-w-xl sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-brick sm:tracking-[0.4em]">
            Field Guide ‧ No. 01–07
          </p>
          <h3 className="mt-3 font-[family-name:var(--font-serif-tc)] text-2xl font-bold text-ink sm:text-3xl">
            水果圖鑑
          </h3>
          <p className="mt-3 text-sm leading-7 text-brown">
            七款最能代表台灣的水果，按產季與風味逐一收錄，附上別名與品嚐筆記。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 sm:gap-y-16">
          {fruits.map((fruit, i) => (
            <FruitCard
              key={fruit.name}
              fruit={fruit}
              index={i}
              priority={i === 0}
            />
          ))}
          <EmailSignupCard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
