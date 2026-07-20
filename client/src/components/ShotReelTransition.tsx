import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';

export type ShotReelRequest = {
  take: string;
  title: string;
  department: string;
  year: string;
  target: string;
};

const FALLBACK: ShotReelRequest = {
  take: '01',
  title: 'SELECTED TAKE',
  department: 'PROJECTS',
  year: '2026',
  target: '/#projects',
};

const REEL_ROWS = [
  ['TAKE 07', 'TAKE 12', 'TAKE 03', 'TAKE 09', 'TAKE 01'],
  ['ARCHIVE', 'CAMERA', 'PROJECTS', 'SELECT', 'MASTER'],
  ['2023', '2024', '2025', '2026', '24 FPS'],
];

function PerforationRail({ side }: { side: 'top' | 'bottom' }) {
  return (
    <motion.div
      className={`absolute left-0 right-0 ${side === 'top' ? 'top-4' : 'bottom-4'} flex justify-around px-3`}
      initial={{ opacity: 0, x: side === 'top' ? 28 : -28 }}
      animate={{ opacity: 0.7, x: side === 'top' ? -8 : 8 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.45, ease: [0.2, 0.8, 0.2, 1] }}
      aria-hidden="true"
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <span key={index} className="h-2.5 w-5 rounded-[2px] border border-white/35 bg-white/8" />
      ))}
    </motion.div>
  );
}

export default function ShotReelTransition() {
  const prefersReducedMotion = useReducedMotion();
  const [, setLocation] = useLocation();
  const [request, setRequest] = useState<ShotReelRequest | null>(null);
  const [phase, setPhase] = useState<'spin' | 'slate'>('spin');
  const timers = useRef<number[]>([]);
  const busy = useRef(false);

  const rows = useMemo(() => {
    if (!request) return REEL_ROWS;
    return [
      [...REEL_ROWS[0].slice(0, 4), `TAKE ${request.take}`],
      [...REEL_ROWS[1].slice(0, 4), request.department.toUpperCase()],
      [...REEL_ROWS[2].slice(0, 4), request.year],
    ];
  }, [request]);

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
    const handleRequest = (event: Event) => {
      if (busy.current) return;
      const detail = (event as CustomEvent<ShotReelRequest>).detail ?? FALLBACK;
      busy.current = true;
      clearTimers();
      setRequest(detail);
      setPhase('spin');
      document.body.style.overflow = 'hidden';

      const spinTime = prefersReducedMotion ? 120 : 1350;
      const exitTime = prefersReducedMotion ? 360 : 2500;
      timers.current.push(window.setTimeout(() => setPhase('slate'), spinTime));
      timers.current.push(window.setTimeout(() => {
        document.body.style.overflow = '';
        setRequest(null);
        busy.current = false;
        if (detail.target.startsWith('#')) {
          document.getElementById(detail.target.slice(1))?.scrollIntoView({ behavior: 'auto' });
        } else {
          setLocation(detail.target);
          window.scrollTo(0, 0);
        }
      }, exitTime));
    };

    window.addEventListener('shot-reel-request', handleRequest);
    return () => {
      clearTimers();
      document.body.style.overflow = '';
      busy.current = false;
      window.removeEventListener('shot-reel-request', handleRequest);
    };
  }, [prefersReducedMotion, setLocation]);

  return (
    <AnimatePresence>
      {request && (
        <motion.div
          className="fixed inset-0 z-[70] overflow-hidden bg-[#070a09] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
          role="status"
          aria-live="polite"
          aria-label={`Loading ${request.title}`}
        >
          <PerforationRail side="top" />
          <PerforationRail side="bottom" />
          <div className="absolute inset-x-[6vw] top-[11vh] flex items-center justify-between font-mono-custom text-[8px] tracking-[0.18em] text-white/45">
            <span>REY'S WORLD / PROJECT MAGAZINE</span>
            <span>ROLL 03 · 24 FPS</span>
          </div>

          <AnimatePresence mode="wait">
            {phase === 'spin' ? (
              <motion.div
                key="reel"
                className="absolute inset-x-[6vw] top-1/2 grid h-[44vh] -translate-y-1/2 grid-cols-3 overflow-hidden border-y border-white/28 bg-[#0d1210]"
                exit={{ opacity: 0, scaleY: 0.82 }}
                transition={{ duration: 0.22 }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-[8.8vh] -translate-y-1/2 border-y border-[#d8c79a]/65 bg-[#d8c79a]/6 shadow-[0_0_34px_rgba(216,199,154,0.11)]" />
                {rows.map((items, column) => (
                  <div key={column} className="relative overflow-hidden border-r border-white/12 last:border-r-0 [perspective:800px]">
                    <motion.div
                      className="absolute inset-x-0 top-0"
                      initial={{ y: '4vh', filter: 'blur(0px)' }}
                      animate={{ y: '-35.2vh', filter: ['blur(0px)', 'blur(7px)', 'blur(0px)'] }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.88 + column * 0.16,
                        delay: column * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {items.map((item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex h-[8.8vh] items-center justify-center border-b border-white/8 px-3 text-center font-mono-custom text-[10px] tracking-[0.18em] text-white/72 md:text-xs"
                        >
                          {item}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="slate"
                className="absolute left-1/2 top-1/2 w-[min(82vw,760px)] -translate-x-1/2 -translate-y-1/2 border border-white/35 bg-[#101512]"
                initial={{ opacity: 0, rotate: -1.4, scale: 0.96 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="flex h-11 items-center gap-2 border-b border-white/30 bg-[repeating-linear-gradient(135deg,#d8c79a_0_26px,#101512_26px_52px)]" />
                <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 p-7 md:p-10">
                  <span className="font-mono-custom text-[9px] tracking-[0.18em] text-white/42">TAKE</span>
                  <span className="font-heading text-4xl font-700 leading-none">{request.take}</span>
                  <span className="font-mono-custom text-[9px] tracking-[0.18em] text-white/42">TITLE</span>
                  <h2 className="font-heading text-2xl font-700 leading-tight md:text-4xl">{request.title}</h2>
                  <span className="font-mono-custom text-[9px] tracking-[0.18em] text-white/42">UNIT</span>
                  <span className="font-mono-custom text-[10px] tracking-[0.16em] text-white/78">{request.department} · {request.year}</span>
                </div>
                <div className="mx-7 mb-7 border-t border-white/18 pt-4 md:mx-10 md:mb-10">
                  <div className="mb-2 flex justify-between font-mono-custom text-[7px] tracking-[0.16em] text-white/42"><span>EDITORIAL TIMELINE</span><span>24 FPS / ASSEMBLY</span></div>
                  <div className="flex h-7 gap-1">
                    {[18, 10, 25, 14, 21, 12].map((size, index) => <motion.span key={index} className="h-full bg-[#d8c79a]/70" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.28, delay: 0.12 + index * 0.05 }} style={{ width: `${size}%`, transformOrigin: 'left' }} />)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
