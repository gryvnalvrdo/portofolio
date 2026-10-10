"use client";

import { useEffect, useRef, ReactNode } from "react";

interface RevealWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function RevealWrapper({ children, className = "", delay = 0, style }: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
