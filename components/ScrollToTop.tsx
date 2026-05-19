"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Disable the browser's default scroll restoration memory
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. Force the window to the absolute top left
    window.scrollTo(0, 0);
  }, [pathname]); // Re-run this anytime the route changes

  return null; // This component doesn't render anything visually
}
