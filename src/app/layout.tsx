import type { Metadata, Viewport } from "next";
import { Figtree, Instrument_Serif, JetBrains_Mono, Unbounded } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { UIProvider } from "@/components/providers/UIProvider";
import { SoundProvider } from "@/components/providers/SoundProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Intro } from "@/components/intro/Intro";
import { INTRO_SEEN_KEY } from "@/lib/events";
import { site } from "@/lib/site";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description:
    "Jake Roberts is a CSE student at SRM IST building AI products end to end: retrieval, models, APIs and the UI.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.socials.github }],
  creator: site.name,
  keywords: ["Jake Roberts", "AI engineer", "software developer", "RAG", "MLOps", "SRM IST", "portfolio"],
  openGraph: { type: "website", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#141311",
  colorScheme: "dark",
  viewportFit: "cover",
};

// Runs before paint: cover the page with the intro sheet on a first visit,
// unless the visitor prefers reduced motion.
const introScript = `try{if(!sessionStorage.getItem("${INTRO_SEEN_KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-on")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${unbounded.variable} ${instrumentSerif.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="label sr-only z-[100] rounded-full bg-ember px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <MotionProvider>
            <UIProvider>
              <SoundProvider>
                <TransitionProvider>
                  <Intro />
                  <Header />
                  <main id="main" className="flex-1 overflow-x-clip">
                    {children}
                  </main>
                  <Footer />
                </TransitionProvider>
              </SoundProvider>
            </UIProvider>
          </MotionProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
