"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper. Fades + lifts its children in when they enter the
 * viewport and resets when they leave, so the animation REPLAYS every time you
 * scroll back to it (matching the rest of the site's reveal behaviour).
 *
 * - Honours prefers-reduced-motion (renders content statically, no hiding).
 * - Used only on sections that don't already have a GSAP reveal, so it never
 *   double-animates or conflicts with the existing animation system.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setShown(entries[0].isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduced
          ? undefined
          : {
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translateY(28px)",
              transition:
                "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
              transitionDelay: shown ? `${delay}s` : "0s",
              willChange: "opacity, transform",
            }
      }
    >
      {children}
    </div>
  );
}
