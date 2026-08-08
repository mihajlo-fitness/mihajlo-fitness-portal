"use client";

import { useEffect, useRef, useState } from "react";

// Vraća [ref, jeVidljivo] — jeVidljivo postaje true kad element uđe u
// viewport tokom skrolovanja, ostaje true posle (ne ponavlja se).
export function useScrollReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [jeVidljivo, setJeVidljivo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setJeVidljivo(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, jeVidljivo];
}
