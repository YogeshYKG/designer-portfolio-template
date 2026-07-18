import type { Metadata } from "next";
import { Geist, Roboto, Sora } from "next/font/google";

import "@/styles/global.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Designer Portfolio",
  description: "Portfolio Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${roboto.variable} ${sora.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}