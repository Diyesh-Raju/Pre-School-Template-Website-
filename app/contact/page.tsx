import Link from "next/link";
import Footer from "../components/Footer";
import { Reveal } from "@/components/Reveal";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.003 3C9.374 3 4 8.374 4 15.003c0 2.115.553 4.18 1.604 5.998L4 28l7.18-1.572a11.97 11.97 0 0 0 4.823 1.013h.005c6.628 0 12.003-5.374 12.003-12.003C28.011 8.374 22.631 3 16.003 3Zm0 21.86h-.004a9.86 9.86 0 0 1-5.024-1.379l-.36-.213-4.262.932.953-4.155-.234-.37a9.86 9.86 0 0 1-1.51-5.272c0-5.452 4.435-9.887 9.892-9.887 2.641 0 5.124 1.029 6.992 2.898a9.823 9.823 0 0 1 2.9 6.993c-.002 5.452-4.437 9.453-9.343 9.453Zm5.43-7.408c-.297-.149-1.76-.868-2.033-.967-.273-.099-.471-.149-.67.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.148-1.254-.462-2.39-1.475-.883-.787-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.133-.132.297-.347.446-.52.149-.173.198-.297.297-.495.099-.198.05-.371-.024-.52-.074-.149-.67-1.612-.917-2.207-.241-.58-.486-.501-.67-.511l-.57-.01c-.198 0-.52.074-.792.371-.273.297-1.04 1.016-1.04 2.479s1.065 2.875 1.214 3.073c.149.198 2.097 3.202 5.082 4.488.71.306 1.264.489 1.696.626.713.227 1.361.195 1.874.118.572-.086 1.76-.72 2.009-1.414.248-.694.248-1.288.173-1.414-.074-.124-.272-.198-.57-.347Z" />
    </svg>
  );
}

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M5 26.5h4.5V15.4L3 10.5v14a2 2 0 0 0 2 2Z" fill="#4285F4" />
      <path d="M22.5 26.5H27a2 2 0 0 0 2-2v-14l-6.5 4.9v11.1Z" fill="#34A853" />
      <path d="M22.5 8.5v6.9L29 10.5V9.5a2.4 2.4 0 0 0-3.84-1.91L22.5 8.5Z" fill="#FBBC04" />
      <path d="M9.5 15.4V8.5L16 13.3l6.5-4.8v6.9L16 20.2 9.5 15.4Z" fill="#EA4335" />
      <path d="M3 9.5v1l6.5 4.9V8.5L6.84 6.6A2.4 2.4 0 0 0 3 8.5v1Z" fill="#C5221F" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F58529" />
          <stop offset="50%" stopColor="#DD2A7B" />
          <stop offset="100%" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="26" height="26" rx="7" fill="url(#igGrad)" />
      <circle cx="16" cy="16" r="6" fill="none" stroke="#fff" strokeWidth="2.2" />
      <circle cx="23" cy="9" r="1.6" fill="#fff" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="7" fill="#000" />
      <path
        d="M19.5 9h2.3l-5 5.7L23 23h-4.6l-3.6-4.7L10.6 23H8.3l5.4-6.1L8 9h4.7l3.3 4.3L19.5 9Zm-.8 12.5h1.3L13.4 10.4h-1.4l6.7 11.1Z"
        fill="#fff"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <rect x="3" y="3" width="26" height="26" rx="7" fill="#1877F2" />
      <path
        d="M18.5 16.4h2.3l.4-3h-2.7v-1.9c0-.87.27-1.46 1.53-1.46h1.63V7.4a21.8 21.8 0 0 0-2.38-.12c-2.35 0-3.96 1.43-3.96 4.06v2.06H13v3h2.32V24.5h3.18v-8.1Z"
        fill="#fff"
      />
    </svg>
  );
}

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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#25D366]/15">
                    <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
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
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#25D366]/15">
                    <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
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
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white border border-[#FF7F50]/20">
                  <GmailIcon className="w-7 h-7" />
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

          {/* Social Media — Follow us */}
          <div className="mt-10">
            <div className="text-center mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-2">
                Follow Us
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#333333]">
                Stay connected on social
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              <a
                href="https://twitter.com/littlemillennium"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter)"
                className="social-tile group"
              >
                <span className="social-tile-highlight" aria-hidden="true" />
                <TwitterIcon className="social-tile-icon" />
              </a>
              <a
                href="https://www.instagram.com/littlemillennium"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="social-tile group"
              >
                <span className="social-tile-highlight" aria-hidden="true" />
                <InstagramIcon className="social-tile-icon" />
              </a>
              <a
                href="https://www.facebook.com/littlemillennium"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="social-tile group"
              >
                <span className="social-tile-highlight" aria-hidden="true" />
                <FacebookIcon className="social-tile-icon" />
              </a>
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
