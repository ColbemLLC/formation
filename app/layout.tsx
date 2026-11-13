import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://colbe.cc";
const siteDescription =
  "Colbe is a guild-based community platform. Create communities, share announcements, and build together.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Colbe",
    template: "%s | Colbe",
  },
  description: siteDescription,
  applicationName: "Colbe",
  keywords: ["Colbe", "community platform", "guilds", "communities"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Colbe",
    title: "Colbe",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Colbe",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}