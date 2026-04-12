import type { Metadata } from "next";
import { Playfair_Display, Inter, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import Providers from "@/components/layout/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageLoader from "@/components/ui/PageLoader";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import MobileStickyBar from "@/components/ui/MobileStickyBar";
import PageTransition from "@/components/ui/PageTransition";
import "./globals.css";
import "nprogress/nprogress.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SmileCraft Dental | Clinical Excellence, Redefined",
  description: "Experience the gold standard of modern dentistry. Clinical excellence paired with luxury wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jakarta.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className="min-h-full flex flex-col bg-surface text-on-surface font-sans">
        <Providers>
          <PageLoader />
          <CustomCursor />
          <ScrollProgressBar />
          <PageTransition />
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <WhatsAppFloat />
          <MobileStickyBar />
        </Providers>
      </body>
    </html>
  );
}
