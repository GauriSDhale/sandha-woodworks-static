import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MadeInCanadaBadge } from "@/components/layout/MadeInCanadaBadge";
import { Providers } from "@/components/layout/Providers";
import { brandMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";
import { resources } from "@/lib/i18n/resources";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const homeMeta = resources.en.home.meta;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: homeMeta.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: homeMeta.description,
  icons: {
    icon: brandMedia.favicon,
  },
};

export default function EnRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spaceGrotesk.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers locale="en">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <MadeInCanadaBadge />
        </Providers>
      </body>
    </html>
  );
}
