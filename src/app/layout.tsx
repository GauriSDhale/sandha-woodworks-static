import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MadeInCanadaBadge } from "@/components/layout/MadeInCanadaBadge";
import { Providers } from "@/components/layout/Providers";
import { brandMedia } from "@/lib/constants/media";
import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const GENERAL_SANS_STYLESHEET =
  "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Architectural Millwork Manufacturer Canada`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: brandMedia.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href={GENERAL_SANS_STYLESHEET} rel="stylesheet" />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Providers>
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
