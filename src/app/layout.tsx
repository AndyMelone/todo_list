import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "react-hot-toast";
import { lang } from "@/store/fr";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: lang.metadata.description,
  description: lang.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` flex justify-center mt-20 md:mt-40 items-center ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Sonner />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
