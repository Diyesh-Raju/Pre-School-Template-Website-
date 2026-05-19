"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../components/Footer";
import { isMobileViewport } from "@/components/mobile-reveal";

gsap.registerPlugin(ScrollTrigger);

const teachers = [
  { name: "Ms. Lakshmi Rao", role: "Senior Educator – Developing Roots (Playgroup)", exp: "9 years", campus: "Poorna Pragna" },
  { name: "Ms. Preethi Naidu", role: "Lead Teacher – Emerging Wings (Nursery)", exp: "7 years", campus: "Vijaya Bank" },
  { name: "Ms. Ananya Kumar", role: "Arts & Craft Specialist", exp: "6 years", campus: "Both Campuses" },
  { name: "Mr. Suresh Gowda", role: "Physical Education Coordinator", exp: "8 years", campus: "Both Campuses" },
  { name: "Ms. Divya Hegde", role: "Lead Teacher – Ready to Fly I (LKG)", exp: "5 years", campus: "Poorna Pragna" },
  { name: "Ms. Kavitha Srinivas", role: "Lead Teacher – Ready to Fly II (UKG)", exp: "10 years", campus: "Vijaya Bank" },
];

export default function AboutUsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Mobile: pure CSS animations handle reveals + marquee. No JS needed.
    if (isMobileViewport()) return;

    // Desktop: GSAP path (unchanged)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".principal-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".principal-row",
            start: "top 82%",
            toggleActions: "restart none none reset",
          },
        }
      );
    }, pageRef);

    const track = trackRef.current;
    let detachHover: (() => void) | null = null;
    if (track) {
      const totalWidth = track.scrollWidth / 2;
      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        force3D: true,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });

      const pause = () => tweenRef.current?.pause();
      const resume = () => tweenRef.current?.resume();
      const parent = track.parentElement;
      parent?.addEventListener("mouseenter", pause);
      parent?.addEventListener("mouseleave", resume);
      detachHover = () => {
        parent?.removeEventListener("mouseenter", pause);
        parent?.removeEventListener("mouseleave", resume);
      };
    }

    return () => {
      ctx.revert();
      tweenRef.current?.kill();
      detachHover?.();
    };
  }, []);

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-end" style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 60%, #FDFCF0 100%)" }}>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(rgba(255,127,80,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,127,80,1) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pt-28 sm:pt-32 pb-10 sm:pb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3 sm:mb-4">About Us</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4 leading-tight">
            Our{" "}
            <span className="gradient-text">Leadership</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-xl leading-relaxed">
            Meet the dedicated educators and leaders who shape the Little Millennium experience every day.
          </p>
        </div>
      </section>

      {/* Principal Cards */}
      <section className="section bg-[#FDFCF0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
              Our <span className="gradient-text">Principals</span>
            </h2>
          </div>

          <div className="principal-row grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                campus: "Poorna Pragna Layout Campus",
                name: "Mrs. [Mom's Name]",
                qual: "M.Ed, Child Psychology & Early Childhood Education",
                address: "No.67, 4th Main Road, Near Vijaya Bank, Bengaluru 560061",
                phone: "9900477944",
                email: "poorna@littlemillennium.in",
                bio: "With over 15 years of experience in early childhood education, our Principal at Poorna Pragna has shaped the philosophy and culture of the campus since its founding. Her vision centres on nurturing each child's innate potential through play, inquiry, and emotional warmth.",
                badge: "Principal",
              },
              {
                campus: "Vijaya Bank Layout Campus",
                name: "Mrs. [Mom's Name]",
                qual: "M.Ed, Montessori Certified (AMI Level 3)",
                address: "No.87, 1st Main, 4th Cross Road, Behind HDFC Bank, Bengaluru 560076",
                phone: "9741530944",
                email: "vijaya@littlemillennium.in",
                bio: "A passionate advocate for child-led learning, our Vijaya Bank Layout Principal brings a deep expertise in Montessori methodology and developmental assessment. Her leadership has created a campus culture defined by curiosity, discipline, and joy.",
                badge: "Principal",
              },
            ].map((p) => (
              <div key={p.campus} className="principal-card glass rounded-2xl p-8 flex flex-col gap-5">
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-[#FF7F50]/10 border-2 border-[#FF7F50]/30 flex items-center justify-center shrink-0">
                    <svg className="w-10 h-10 text-[#FF7F50]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] border border-[#FF7F50]/35 px-2 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">{p.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{p.campus}</p>
                  </div>
                </div>
                <p className="text-[var(--accent-gold)] text-xs font-medium">{p.qual}</p>
                <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{p.address}</p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{p.bio}</p>
                {/* Contact details */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#FF7F50]/20">
                  <a
                    href={`tel:${p.phone}`}
                    className="flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
                  >
                    <svg className="w-4 h-4 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {p.phone}
                  </a>
                  <a
                    href={`mailto:${p.email}`}
                    className="flex items-center gap-2 text-sm text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors"
                  >
                    <svg className="w-4 h-4 text-[var(--accent-gold)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {p.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Marquee */}
      <section className="section overflow-hidden" style={{ background: "linear-gradient(180deg, #FDFCF0 0%, #FAF5E8 50%, #FDFCF0 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-3">Faculty</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            Meet Our <span className="gradient-text">Teachers</span>
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#FDFCF0] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#FDFCF0] to-transparent z-10 pointer-events-none" />

          <div ref={trackRef} className="flex lm-marquee-track--fast" style={{ width: "max-content" }}>
            {[...teachers, ...teachers].map((t, i) => (
              <div
                key={i}
                className="glass rounded-2xl p-6 mx-3 flex flex-col gap-4 shrink-0"
                style={{ width: "260px" }}
              >
                <div className="w-14 h-14 rounded-full bg-[#FF7F50]/10 border border-[#FF7F50]/30 flex items-center justify-center mx-auto">
                  <span className="text-[var(--accent-gold)] font-bold text-xl">{t.name[4]}</span>
                </div>
                <div className="text-center">
                  <h4 className="text-[var(--text-primary)] font-semibold text-sm">{t.name}</h4>
                  <p className="text-[var(--accent-gold)] text-xs mt-0.5">{t.role}</p>
                  <p className="text-[var(--text-secondary)] text-xs mt-1">{t.exp} experience</p>
                  <p className="text-[var(--text-secondary)] text-xs">{t.campus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
