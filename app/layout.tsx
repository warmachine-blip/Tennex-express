import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import { Providers } from "./Providers";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F0",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tennexexpress.com"),
  title: {
    default: "Tennex Express — Real tennis gear, real prices",
    template: "%s | Tennex Express",
  },
  description:
    "Affordable tennis equipment for beginners and intermediate players. Racquets, strings, bags, balls, and accessories. US-based, ships in 2 days.",
  keywords: ["tennis racquet", "tennis gear", "tennis equipment", "beginner tennis", "affordable tennis"],
  authors: [{ name: "Tennex Express" }],
  creator: "Tennex Express",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tennexexpress.com",
    siteName: "Tennex Express",
    title: "Tennex Express — Real tennis gear, real prices",
    description:
      "Affordable tennis equipment for beginners and intermediate players.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennex Express — Real tennis gear, real prices",
    description: "Affordable tennis equipment for beginners and intermediate players.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-bg text-ink antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
