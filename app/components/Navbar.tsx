"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

type NavChild = { href: string; label: string };
type NavLink = { href: string; label: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/gallery", label: "Gallery" },
  { href: "/why-us", label: "Why Us" },
  { href: "/contact", label: "Contact us" },
];

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  // True while the full-bleed scroll-video hero is still on screen — the
  // navbar goes transparent so it merges into the video; reverts to the cream
  // bar once you scroll past the hero.
  const [overHero, setOverHero] = useState(false);
  const pathname = usePathname();
  const logoRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const hero = document.getElementById("hero-scroll");
      if (!hero) {
        setOverHero(false);
        return;
      }
      const r = hero.getBoundingClientRect();
      // height 0 → hero is display:none (mobile / other pages) → not over hero.
      // bottom > navbar height → the hero still covers the area behind the navbar.
      // Works for both the home page's 400vh pinned hero and a regular 100vh hero
      // (e.g. About page) — in both cases the bar stays transparent until you've
      // scrolled the hero almost entirely off the top of the viewport.
      const NAV_HEIGHT = 80;
      setOverHero(r.height > 0 && r.bottom > NAV_HEIGHT);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => {
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 1.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
    }
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 py-4 md:py-6 transition-colors duration-500 ${
        overHero
          ? "bg-transparent border-b border-transparent"
          : "bg-[#FDFCF0]/85 backdrop-blur-md border-b border-[#FF7F50]/15"
      }`}
    >
      <div className="flex items-center justify-between pl-4 pr-4 md:pl-8 md:pr-8 py-2">
        {/* Logo — far left */}
        <Link
          href="/"
          id="navbar-brand-text"
          className="cursor-pointer inline-block flex items-center shrink-0 relative"
          onClick={handleLogoClick}
        >
          <img
            ref={logoRef}
            src="/image_2.png"
            alt="Little Millennium Logo"
            className="block ml-0 transition-opacity duration-700 h-[48px] md:h-[70px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links — unchanged */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 pr-12">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`group relative text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                    isActive
                  ? "text-[#FF7F50]"
                  : overHero
                    ? "text-white hover:text-[#FF7F50]"
                    : "text-[#333333] hover:text-[#FF7F50]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#FF7F50] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                    activeDropdown === link.href
                      ? "opacity-100 pointer-events-auto translate-y-0"
                      : "opacity-0 pointer-events-none -translate-y-1"
                  }`}
                >
                  <ul className="min-w-[180px] bg-white/95 backdrop-blur-md border border-[#FF7F50]/20 rounded-lg py-2 shadow-xl">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[#333333]/80 hover:text-[#FF7F50] hover:bg-[#FF7F50]/10 transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : link.href === "/contact" ? (
              <Link
                key={link.href}
                href={link.href}
                className="px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white rounded-full hover:scale-105 active:scale-100 transition-transform duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, #FF9A6E 0%, #FF7F50 55%, #EE6A3C 100%)",
                  boxShadow:
                    "0 10px 22px -6px rgba(255,127,80,0.55), 0 2px 6px rgba(255,127,80,0.35), inset 0 1.5px 0 rgba(255,255,255,0.5), inset 0 -3px 7px rgba(0,0,0,0.14)",
                }}
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
                  isActive
                  ? "text-[#FF7F50]"
                  : overHero
                    ? "text-white hover:text-[#FF7F50]"
                    : "text-[#333333] hover:text-[#FF7F50]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#FF7F50] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-[#333333] hover:text-[#FF7F50] transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#FDFCF0] border-b border-[#FF7F50]/15 shadow-lg transition-[max-height,opacity] duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[calc(100vh-72px)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col py-2 overflow-y-auto max-h-[calc(100vh-72px)]">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const isSubOpen = mobileSubmenu === link.href;

            if (link.children) {
              return (
                <li key={link.href} className="border-t border-[#FF7F50]/10 first:border-t-0">
                  <div className="flex items-stretch">
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`flex-1 px-5 py-3.5 text-sm font-semibold uppercase tracking-widest ${
                        isActive ? "text-[#FF7F50]" : "text-[#333333]"
                      }`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-label={isSubOpen ? `Collapse ${link.label}` : `Expand ${link.label}`}
                      onClick={() => setMobileSubmenu(isSubOpen ? null : link.href)}
                      className="w-12 flex items-center justify-center text-[#FF7F50]"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isSubOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                  <ul
                    className={`overflow-hidden bg-[#FAF5E8] transition-[max-height] duration-200 ${
                      isSubOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="block px-8 py-3 text-sm text-[#333333]/80 hover:text-[#FF7F50] transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }

            return (
              <li key={link.href} className="border-t border-[#FF7F50]/10 first:border-t-0">
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block px-5 py-3.5 text-sm font-semibold uppercase tracking-widest ${
                    isActive ? "text-[#FF7F50]" : "text-[#333333]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
