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
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  keywords: ["Todo", "Todo app", "Todo next js", "Todo github"],

  twitter: {
    card: "summary",
    title: "TODOAPP",
    description: "Test TODO APP with Json-server",
    creator: "@TODOAPP",
    site: "@TODOAPP",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
