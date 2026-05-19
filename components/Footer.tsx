"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

function Facebook({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function Instagram({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Youtube({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Curriculum", href: "/curriculum" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "Why Us", href: "/why-us" },
        { label: "Admissions", href: "/contact" },
        { label: "Careers", href: "#" },
        { label: "Contact Us", href: "/contact", pulse: true },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#FF7F50]" />,
      text: "admissions@littlemillennium.com",
      href: "mailto:admissions@littlemillennium.com",
    },
    {
      icon: <Phone size={18} className="text-[#FF7F50]" />,
      text: <><span className="font-crimson text-base tracking-wider">+91 99004 77944</span>{" "}(Poorna Pragna)</>,
      href: "tel:+919900477944",
    },
    {
      icon: <Phone size={18} className="text-[#FF7F50]" />,
      text: <><span className="font-crimson text-base tracking-wider">+91 97415 30944</span>{" "}(Vijaya Bank)</>,
      href: "tel:+919741530944",
    },
    {
      icon: <MapPin size={18} className="text-[#FF7F50]" />,
      text: "Bengaluru, Karnataka",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Youtube size={20} />, label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-zinc-950 relative h-fit rounded-t-3xl overflow-hidden mt-20 border-t border-zinc-900">
      {/* ── Child photo + dark wash — Obsidian Blade treatment ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="/child-hero.png"
          alt=""
          aria-hidden="true"
          className="hidden md:block absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-zinc-950/55" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 sm:p-10 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 lg:gap-16 pb-8 sm:pb-12">

          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/image_2.png" alt="Little Millennium" className="h-12 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-[#E8E6DD] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
              The first big step for your child. Nurturing greatness through playful learning and holistic growth.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#FF9974] text-lg font-semibold mb-6 uppercase tracking-wider text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative w-fit">
                    <Link href={link.href} className="text-[#E8E6DD] hover:text-[#FF9974] transition-colors text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
                      {link.label}
                    </Link>
                    {link.pulse && (
                      <span className="absolute top-1 -right-3 w-1.5 h-1.5 rounded-full bg-[#FF7F50] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-[#FF7F50] text-lg font-semibold mb-6 uppercase tracking-wider text-sm">
              Connect
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-[#E8E6DD] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
                  <div className="mt-0.5">{item.icon}</div>
                  {item.href ? (
                    <a href={item.href} className="hover:text-[#FF9974] transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-[#FF7F50]/30 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-[#B8B5A8] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.55)]">
          <div className="flex space-x-6">
            {socialLinks.map(({ icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="hover:text-[#FF9974] transition-colors">
                {icon}
              </a>
            ))}
          </div>
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Little Millennium Preschool. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect - Calibrated for long text */}
      <div className="hidden md:flex h-[20rem] -mt-10 -mb-10 w-full justify-center items-center pointer-events-auto">
        <TextHoverEffect text="LITTLE MILLENNIUM" className="z-50 w-full max-w-[90%]" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}