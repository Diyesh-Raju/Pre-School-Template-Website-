"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Every selector that participates in the mobile reveal cascade (see globals.css).
const REVEAL_SELECTOR =
  ".teacher-pillar, .about-content, .stage-card, .principal-card, .principal-content, .activity-card, .curriculum-stage, .gallery-item, .petal-intro, .petal-mascot, .petal-card";

/**
 * Mounts once at the root and nudges ScrollTrigger so it works reliably on iOS Safari.
 * - Ignores the elastic toolbar collapse that otherwise breaks trigger math.
 * - Refreshes after the page settles, then once more after fonts/images, so triggers
 *   register against the final layout (not the intermediate one where the desktop hero
 *   was display:none but not yet measured).
 *
 * On mobile (<=767px) it also drives the section reveal animations with an
 * IntersectionObserver: `.is-revealed` is added when an element enters and
 * removed when it leaves, so the reveal re-plays on every scroll-in.
 */
export default function ScrollTriggerInit() {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    // First refresh — after current render commit and a tick.
    const raf1 = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    // Second refresh — after fonts/images likely loaded.
    const t1 = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 1200);

    // Also refresh on document fully loaded.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState !== "complete") {
      window.addEventListener("load", onLoad, { once: true });
    }

    // Mobile-only reveal driver.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    if (isMobile) {
      const observed = new WeakSet<Element>();

      // Two thresholds mirror the desktop "restart none none reset" behavior:
      //   - 0.15 → reveal (matches the previous CSS-only entry point)
      //   - 0    → reset, but only when the element is fully BELOW the viewport
      //     (i.e., the user scrolled back up past it). Exiting at the top keeps
      //     the element revealed, so the user never sees a fade-out while
      //     scrolling forward.
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const ratio = entry.intersectionRatio;
            const rect = entry.boundingClientRect;
            if (ratio >= 0.15) {
              entry.target.classList.add("is-revealed");
            } else if (ratio === 0 && rect.top > 0) {
              entry.target.classList.remove("is-revealed");
            }
          });
        },
        { threshold: [0, 0.15] }
      );

      const observeAll = () => {
        if (!intersectionObserver) return;
        document
          .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
          .forEach((el) => {
            if (observed.has(el)) return;
            observed.add(el);
            intersectionObserver!.observe(el);
          });
      };

      observeAll();

      // Re-attach as React adds/replaces nodes (route changes, filter renders, etc.).
      mutationObserver = new MutationObserver(() => observeAll());
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", onLoad);
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return null;
}
