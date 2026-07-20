import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ROLLS = [
  { id: 'home', roll: '01', shot: 'WORLD', artifact: 'STUDIO' },
  { id: 'about', roll: '02', shot: 'PROFILE', artifact: 'NOTEBOOK → IDENTITY' },
  { id: 'projects', roll: '03', shot: 'PROJECTS', artifact: 'STORYBOARD → MAKING' },
  { id: 'film', roll: '04', shot: 'FILM', artifact: 'MONITOR → FILM' },
  { id: 'experiments', roll: '05', shot: 'EXPERIMENTS', artifact: 'TEST CABINET → ITERATION' },
  { id: 'contact', roll: '06', shot: 'CONTACT', artifact: 'DOOR → EXCHANGE' },
];

export default function FilmContinuityOverlay() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState('home');
  const [focusPull, setFocusPull] = useState(false);

  useEffect(() => {
    const sections = ROLLS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-22% 0px -68% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleReelComplete = (event: Event) => {
      const target = (event as CustomEvent<{ target?: string }>).detail?.target;
      if (target && ROLLS.some((roll) => roll.id === target)) setActiveId(target);
    };
    window.addEventListener('unit-reel-complete', handleReelComplete);
    return () => window.removeEventListener('unit-reel-complete', handleReelComplete);
  }, []);

  useEffect(() => {
    let timer = 0;
    const handleFocusPull = () => {
      setFocusPull(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setFocusPull(false), prefersReducedMotion ? 0 : 1250);
    };
    window.addEventListener('project-focus-pull', handleFocusPull);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('project-focus-pull', handleFocusPull);
    };
  }, [prefersReducedMotion]);

  const active = ROLLS.find(({ id }) => id === activeId) ?? ROLLS[0];

  return (
    <AnimatePresence>
      {active.id !== 'home' && (
        <motion.aside
          key={active.id}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          className="pointer-events-none fixed inset-0 z-30 mix-blend-difference text-white"
          aria-hidden="true"
        >
          <span className="absolute left-[3.8vw] top-[9.5vh] h-9 w-9 border-l border-t border-current opacity-35" />
          <span className="absolute right-[3.8vw] top-[9.5vh] h-9 w-9 border-r border-t border-current opacity-35" />
          <span className="absolute bottom-[4.5vh] left-[3.8vw] h-9 w-9 border-b border-l border-current opacity-35" />
          <span className="absolute bottom-[4.5vh] right-[3.8vw] h-9 w-9 border-b border-r border-current opacity-35" />

          <div className="absolute bottom-[4.8vh] left-[calc(3.8vw+18px)] font-mono-custom text-[8px] tracking-[0.16em] opacity-65">
            PLAYBACK / ROLL {active.roll}
          </div>
          <div className="absolute bottom-[4.8vh] right-[calc(3.8vw+18px)] font-mono-custom text-[8px] tracking-[0.16em] opacity-65">
            SHOT {active.roll} / {active.shot}
          </div>
          <div className="absolute left-[calc(3.8vw+18px)] top-[calc(9.5vh+12px)] font-mono-custom text-[7px] tracking-[0.15em] opacity-42">
            TRACE / {active.artifact}
          </div>
          <div className="absolute left-[3.8vw] right-[3.8vw] top-[9.5vh] border-t border-current opacity-15" />
          <AnimatePresence>
            {focusPull && active.id === 'projects' && (
              <motion.div
                className="absolute inset-x-[11vw] bottom-[15vh] top-[17vh]"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: [0, 0.72, 0], scale: [1.12, 0.88, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.15, times: [0, 0.55, 1], ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-current" />
                <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-current" />
                <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-current" />
                <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-current" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono-custom text-[8px] tracking-[0.18em]">PULL FOCUS / MARK</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
