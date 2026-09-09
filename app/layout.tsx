import type { Metadata } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import LuckyDraw from "./components/LuckyDraw";
import { UserNameProvider } from "./components/UserNameContext";
import WelcomeGate from "./components/WelcomeGate";

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "台灣水果誌",
  description: "認識台灣四季水果的復古風味導覽",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSerifTC.variable} ${notoSansTC.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-sans-tc)]">
        <UserNameProvider>
          {children}
          <LuckyDraw />
          <WelcomeGate />
        </UserNameProvider>
      </body>
    </html>
  );
}
