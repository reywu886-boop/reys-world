/*
 * Editorial Modernism: Section reveal animation wrapper
 * Fades in from below (20px) with 600ms ease-out
 */
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { ReactNode, CSSProperties } from 'react';

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

export default function SectionReveal({ children, className = '', delay = 0, style }: SectionRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.08 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
