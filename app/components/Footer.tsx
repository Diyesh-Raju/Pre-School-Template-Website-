"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "What is the admission age for Little Millennium?",
    a: "We welcome children from 1.5 years to 6 years across our four programme levels — Developing Roots (Playgroup), Emerging Wings (Nursery), Ready to Fly I (LKG), and Ready to Fly II (UKG).",
  },
  {
    q: "What are the school timings?",
    a: "Classes are held Monday to Saturday from 10:00 AM to 4:00 PM. We also offer a half-day option (10:00 AM – 1:00 PM) for younger children in the Developing Roots programme.",
  },
  {
    q: "How do I schedule a campus visit?",
    a: "You can reach us via the Contact page or call either campus directly. We encourage all families to visit, meet the principal, and experience the environment before enrolling.",
  },
  {
    q: "What safety measures are in place?",
    a: "Both campuses feature CCTV surveillance, biometric entry for staff, a strict pick-up authorisation policy, trained first-aid staff, and child-safe furniture and equipment.",
  },
  {
    q: "Do you follow a standardised curriculum?",
    a: "Yes—our Four-Stage Learning Path is aligned with NEP 2020 guidelines for early childhood care and education, incorporating international best practices from Montessori and Reggio Emilia philosophies.",
  },
];

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <footer className="bg-[#FDFCF0] border-t border-[#FF7F50]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* FAQ */}
        <div className="pt-2">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">
              FAQ
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Common Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-[1.5rem] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #FFF8F1 100%)",
                  border: "1px solid rgba(255,127,80,0.18)",
                  boxShadow:
                    "0 14px 28px -10px rgba(255,127,80,0.22), 0 2px 6px rgba(0,0,0,0.04), inset 0 2px 0 rgba(255,255,255,0.95)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                >
                  <span className="text-[var(--text-primary)] text-base sm:text-lg font-semibold">
                    {faq.q}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    className={`w-5 h-5 shrink-0 text-[var(--accent-gold)] transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-96 sm:max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-7 pb-6 text-[var(--text-secondary)] text-sm sm:text-[15px] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#FF7F50]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="gradient-text font-bold text-sm">Little Millennium</span>
            <span>|</span>
            <span>Preschool, Bangalore</span>
          </div>
          <nav className="flex items-center gap-6">
            {[
              { href: "/", label: "Home" },
              { href: "/about-us", label: "About" },
              { href: "/gallery", label: "Gallery" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[var(--accent-gold)] transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
