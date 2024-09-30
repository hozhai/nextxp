import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto",
});

const tahoma = localFont({
  src: "./fonts/Tahoma_Pixels.ttf",
  variable: "--font-tahoma",
});

export const metadata: Metadata = {
  title: "Z OS",
  description: "The Z operating system with the Z desktop environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", noto_sans.variable, tahoma.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
