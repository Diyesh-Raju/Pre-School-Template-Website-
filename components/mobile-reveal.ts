/**
 * Mobile-only animation helpers — replaces GSAP/ScrollTrigger on iOS Safari
 * where the GSAP scroll detection is unreliable. Desktop continues to use
 * GSAP and is unaffected by these.
 */

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Sets up an IntersectionObserver that adds `.is-revealed` to each matched
 * element when it enters the viewport. Returns a cleanup function.
 *
 * Pass a `root` (usually the component's section ref) to scope queries —
 * otherwise it queries `document` which can match elements in other sections.
 */
export function setupMobileReveal(
  selector: string,
  root?: HTMLElement | null,
  options?: { threshold?: number; rootMargin?: string }
): () => void {
  const scope: ParentNode = root ?? document;
  const elements = Array.from(scope.querySelectorAll<HTMLElement>(selector));
  if (!elements.length) return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: options?.threshold ?? 0.15,
      rootMargin: options?.rootMargin ?? "0px 0px -40px 0px",
    }
  );

  elements.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
