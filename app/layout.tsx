import type { Metadata } from "next";
import { Poppins, Quicksand, Crimson_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollTriggerInit from "@/components/ScrollTriggerInit";

// Poppins — headings & bold copy; friendly, academic authority
const poppins = Poppins({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display:  "swap",
});

// Crimson Pro — elegant serif for numbers & statistics
const crimsonPro = Crimson_Pro({
  subsets:  ["latin"],
  weight:   ["400", "600", "700"],
  variable: "--font-crimson",
  display:  "swap",
});

// Quicksand — body copy & sub-text; warm, approachable, readable
const quicksand = Quicksand({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  variable: "--font-quicksand",
  display:  "swap",
});

export const metadata: Metadata = {
  title: "Little Millennium Preschool | Poorna Pragna & Vijaya Bank Layout",
  description: "Nurturing Greatness through the Four-Stage Learning Path. Top-rated preschools in Bangalore — Poorna Pragna Layout & Vijaya Bank Layout.",
  // iOS Safari auto-wraps bare phone numbers in <a href="tel:..."> tags during page
  // load, which mutates the DOM before React hydrates and causes a hydration mismatch.
  // We render our own tel: anchors where we want them — disable the auto-detection.
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This is the CRITICAL line that fixes the terminal warning
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${quicksand.variable} ${crimsonPro.variable} antialiased bg-[#FDFCF0] text-[#333333] selection:bg-[#FF7F50] selection:text-white`}
      >
        <ScrollTriggerInit />
        {/* This "children" tag is where your homepage and other pages appear */}
        <Navbar />
        <main className="relative min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}