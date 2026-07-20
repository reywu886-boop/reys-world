import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const PASSAGES = {
  about: { roll: '02', title: 'PROFILE / ARCHIVE', mode: 'FOCUS PULL', axis: 'scale', accent: '#b8c8bd' },
  projects: { roll: '03', title: 'PROJECTS / DESK', mode: 'LATERAL INSERT', axis: 'right', accent: '#d1ad73' },
  film: { roll: '04', title: 'FILM / MONITOR', mode: 'SCREEN WIPE', axis: 'left', accent: '#9dbdcc' },
  experiments: { roll: '05', title: 'EXPERIMENTS / CABINET', mode: 'VERTICAL TEST', axis: 'up', accent: '#a9ba8a' },
  contact: { roll: '06', title: 'CONTACT / DOOR', mode: 'DOOR OPEN', axis: 'down', accent: '#ce8f79' },
} as const;

type PassageId = keyof typeof PASSAGES;

function PassageObject({ id }: { id: PassageId }) {
  if (id === 'projects') return <div className="relative h-28 w-52 border-b border-current/70"><span className="absolute bottom-2 left-2 h-12 w-24 -rotate-3 border border-current/55" /><span className="absolute bottom-1 left-[42%] h-16 w-28 rotate-2 border border-current/42" /></div>;
  if (id === 'film') return <div className="relative h-32 w-52 border border-current/70"><span className="absolute inset-3 border border-current/35" /><span className="absolute -bottom-6 left-1/2 h-6 border-l border-current/65" /><span className="absolute -bottom-6 left-[38%] right-[38%] border-b border-current/65" /></div>;
  if (id === 'experiments') return <div className="grid h-32 w-44 grid-cols-3 gap-1.5 border border-current/70 p-2">{Array.from({ length: 6 }).map((_, i) => <span key={i} className="border border-current/35" />)}</div>;
  if (id === 'contact') return <div className="relative h-44 w-32 border border-current/70"><span className="absolute inset-y-0 left-1/2 border-l border-current/42" /><span className="absolute right-3 top-1/2 h-2 w-2 border border-current/70" /></div>;
  return <div className="relative h-28 w-52 border border-current/70"><span className="absolute left-5 top-5 h-12 w-9 border border-current/42" /><span className="absolute left-20 right-5 top-6 border-t border-current/56" /><span className="absolute bottom-6 left-5 right-5 border-t border-current/30" /></div>;
}

export default function SectionPassageOverlay() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<PassageId | null>(null);
  const last = useRef<string>('home');
  const timer = useRef<number>(0);

  useEffect(() => {
    const sections = Object.keys(PASSAGES).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const next = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]?.target.id as PassageId | undefined;
      if (!next || next === last.current) return;
      last.current = next;
      window.clearTimeout(timer.current);
      setActive(next);
      timer.current = window.setTimeout(() => setActive(null), reduced ? 0 : 780);
    }, { rootMargin: '-24% 0px -50% 0px', threshold: [0.12, 0.35, 0.6] });
    sections.forEach((section) => observer.observe(section));
    return () => { observer.disconnect(); window.clearTimeout(timer.current); };
  }, [reduced]);

  useEffect(() => {
    const reveal = (id: PassageId) => {
      if (!PASSAGES[id]) return;
      last.current = id;
      window.clearTimeout(timer.current);
      setActive(id);
      timer.current = window.setTimeout(() => setActive(null), reduced ? 0 : 840);
    };
    const handleReel = (event: Event) => {
      const target = (event as CustomEvent<{ target?: string }>).detail?.target as PassageId | undefined;
      if (target && target in PASSAGES) reveal(target);
    };
    window.addEventListener('unit-reel-complete', handleReel);
    return () => { window.removeEventListener('unit-reel-complete', handleReel); window.clearTimeout(timer.current); };
  }, [reduced]);

  const passage = active ? PASSAGES[active] : null;
  const initial = passage?.axis === 'right' ? { x: '105%', opacity: 0 } : passage?.axis === 'left' ? { x: '-105%', opacity: 0 } : passage?.axis === 'up' ? { y: '100%', opacity: 0 } : passage?.axis === 'down' ? { y: '-100%', opacity: 0 } : { scale: 1.22, opacity: 0 };
  const exit = passage?.axis === 'right' ? { x: '-105%', opacity: 0 } : passage?.axis === 'left' ? { x: '105%', opacity: 0 } : passage?.axis === 'up' ? { y: '-100%', opacity: 0 } : passage?.axis === 'down' ? { y: '100%', opacity: 0 } : { scale: 0.88, opacity: 0 };

  return (
    <AnimatePresence>
      {passage && (
        <motion.div className="pointer-events-none fixed inset-0 z-[42] overflow-hidden bg-[#08100f]/25" initial={initial} animate={{ x: 0, y: 0, scale: 1, opacity: [0, 0.94, 0] }} exit={exit} transition={{ duration: reduced ? 0 : 1.08, times: [0, 0.28, 1], ease: [0.16, 1, 0.3, 1] }} aria-hidden="true">
          <motion.div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_42%)] mix-blend-screen" animate={{ scale: [0.72, 1.18], opacity: [0.1, 0.78, 0] }} transition={{ duration: reduced ? 0 : 1.08 }} />
          <div className="absolute inset-x-[4vw] top-[9vh] flex items-center gap-4 border-y border-current/55 px-5 py-3 font-mono-custom text-[9px] tracking-[0.2em]" style={{ color: passage.accent }}>
            <span>ROLL {passage.roll}</span><span className="h-px flex-1 bg-current/55" /><span>{passage.title}</span><span className="h-px w-[14vw] bg-current/55" /><span>{passage.mode}</span>
          </div>
          <div className="absolute inset-y-0 left-[4vw] flex gap-3 py-[16vh]">
            {Array.from({ length: 11 }).map((_, i) => <span key={i} className="w-2 rounded-[1px] border border-current/50 bg-current/15" style={{ color: passage.accent }} />)}
          </div>
          <div className="absolute inset-y-0 right-[4vw] flex gap-3 py-[16vh]">
            {Array.from({ length: 11 }).map((_, i) => <span key={i} className="w-2 rounded-[1px] border border-current/50 bg-current/15" style={{ color: passage.accent }} />)}
          </div>
          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: passage.accent }} initial={{ opacity: 0, scale: 0.58, filter: 'blur(8px)' }} animate={{ opacity: [0, 1, 0], scale: [0.58, 1.32, 1.65], filter: ['blur(8px)', 'blur(0px)', 'blur(4px)'] }} transition={{ duration: reduced ? 0 : 1.05, times: [0, 0.46, 1], ease: [0.16, 1, 0.3, 1] }}><PassageObject id={active!} /></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
