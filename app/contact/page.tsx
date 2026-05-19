import Link from "next/link";
import { MessageSquare } from "lucide-react";
import Footer from "../components/Footer";
import { Reveal } from "@/components/Reveal";

const mapUrlPP = "https://maps.app.goo.gl/PVD5W2F86Ykoaz4d6";
const mapUrlVB = "https://maps.app.goo.gl/hrDwxLsGX6drHNtMA";
const phonePP = process.env.NEXT_PUBLIC_PHONE_POORNA ?? "";
const phoneVB = process.env.NEXT_PUBLIC_PHONE_VIJAYA ?? "";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "";

export default function ContactPage() {
  return (
    <div>
      {/* Back to Home — hidden on mobile (hamburger menu provides Home nav) */}
      <div className="fixed top-4 left-4 z-50 hidden md:block">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7F50] text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-[#FF7F50]/30 hover:bg-[#FF9974] transition-colors"
        >
          ← Home
        </Link>
      </div>

      {/* Hero */}
      <Reveal>
      <section
        className="relative min-h-[40vh] sm:min-h-[45vh] flex items-end overflow-hidden"
        style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 60%, #FDFCF0 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,127,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,127,80,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pt-28 sm:pt-32 pb-10 sm:pb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3 sm:mb-4">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 leading-tight">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl leading-relaxed">
            We&apos;d love to hear from you. Visit a campus, give us a call, or drop an
            email&mdash;we&apos;re here to answer every question.
          </p>
        </div>
      </section>
      </Reveal>

      {/* Contact Grid */}
      <Reveal>
      <section className="relative z-30 section bg-[#FDFCF0]">
        <div className="max-w-5xl mx-auto">

          {/* Campus Columns */}
          <div className="grid sm:grid-cols-2 gap-6">

            {/* Column 1 – Poorna Pragna Layout */}
            <div className="flex flex-col gap-6">
              {/* Maps Box */}
              <a
                href={mapUrlPP}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-8 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#FF7F50]/30 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#FF7F50]/10">
                    📍
                  </div>
                  <h3 className="font-bold text-lg text-[#FF7F50]">
                    Poorna Pragna Layout Campus
                  </h3>
                </div>
                <p className="text-[#333333] text-sm leading-[1.9] whitespace-pre-line flex-1">
                  {"Poorna Pragna Layout\nBangalore – 560098\nKarnataka, India"}
                </p>
                <span className="text-sm font-semibold text-[#FF7F50]">
                  Open in Google Maps →
                </span>
              </a>

              {/* WhatsApp Box */}
              <a
                href="https://wa.me/919900477944"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-8 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#FF7F50]/30 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#FF7F50]/10">
                    <MessageSquare className="w-6 h-6 text-[#FF7F50]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#FF7F50]">
                    Connect on WhatsApp – Poorna Pragna
                  </h3>
                </div>
                <p className="text-[#333333] text-sm leading-[1.9] flex-1">
                  {phonePP}
                </p>
                <span className="text-xs text-[#6B6963] italic">
                  Opens WhatsApp Web on Desktop
                </span>
                <span className="text-sm font-semibold text-[#FF7F50]">
                  Chat now →
                </span>
              </a>
            </div>

            {/* Column 2 – Vijaya Bank Layout */}
            <div className="flex flex-col gap-6">
              {/* Maps Box */}
              <a
                href={mapUrlVB}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-8 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#FF7F50]/30 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#FF7F50]/10">
                    📍
                  </div>
                  <h3 className="font-bold text-lg text-[#FF7F50]">
                    Vijaya Bank Layout Campus
                  </h3>
                </div>
                <p className="text-[#333333] text-sm leading-[1.9] whitespace-pre-line flex-1">
                  {"Vijaya Bank Layout\nBannerghatta Road\nBangalore – 560076"}
                </p>
                <span className="text-sm font-semibold text-[#FF7F50]">
                  Open in Google Maps →
                </span>
              </a>

              {/* WhatsApp Box */}
              <a
                href="https://wa.me/919741530944"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-8 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#FF7F50]/30 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#FF7F50]/10">
                    <MessageSquare className="w-6 h-6 text-[#FF7F50]" />
                  </div>
                  <h3 className="font-bold text-lg text-[#FF7F50]">
                    Connect on WhatsApp – Vijaya Bank
                  </h3>
                </div>
                <p className="text-[#333333] text-sm leading-[1.9] flex-1">
                  {phoneVB}
                </p>
                <span className="text-xs text-[#6B6963] italic">
                  Opens WhatsApp Web on Desktop
                </span>
                <span className="text-sm font-semibold text-[#FF7F50]">
                  Chat now →
                </span>
              </a>
            </div>

          </div>

          {/* Bottom Row – Email & School Timings */}
          <div className="grid sm:grid-cols-2 gap-6 mt-6">

            {/* Email Box */}
            <a
              href={`mailto:${email}`}
              className="bg-white rounded-2xl p-8 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#FF7F50]/30 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#FF7F50]/10">
                  ✉️
                </div>
                <h3 className="font-bold text-lg text-[#FF7F50]">Email Us</h3>
              </div>
              <p className="text-[#333333] text-sm leading-[1.9] flex-1">
                {email}
              </p>
              <span className="text-sm font-semibold text-[#FF7F50]">
                Write to us →
              </span>
            </a>

            {/* School Timings Box */}
            <div className="bg-white rounded-2xl p-8 flex flex-col gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border border-[#FF7F50]/30 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 bg-[#FF7F50]/10">
                  🕐
                </div>
                <h3 className="font-bold text-lg text-[#FF7F50]">School Timings</h3>
              </div>
              <p className="text-[#333333] text-sm leading-[1.9] whitespace-pre-line flex-1">
                {"Monday – Saturday\n10:00 AM – 4:00 PM\n\nHalf-day option available\n10:00 AM – 1:00 PM"}
              </p>
            </div>

          </div>

          {/* Enquiry prompt */}
          <div className="mt-10 bg-white rounded-2xl p-8 text-center border border-[#FF7F50]/30 shadow-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-xl font-bold text-[#333333] mb-2">
              Ready to Visit?
            </h3>
            <p className="text-[#6B6963] text-sm mb-5 max-w-sm mx-auto">
              Schedule a guided campus tour and meet the principal. Admissions are open for
              the 2025–26 academic year.
            </p>
            <a
              href={`mailto:${email}`}
              className="inline-block px-7 py-3 rounded-full bg-[#FF7F50] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#FF9974] transition-colors shadow-md shadow-[#FF7F50]/25"
            >
              Schedule a Visit
            </a>
          </div>

        </div>
      </section>
      </Reveal>

      <Footer />
    </div>
  );
}
