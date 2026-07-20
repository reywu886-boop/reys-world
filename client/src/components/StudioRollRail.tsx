import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getCurrentRollId, MAJOR_ROLLS, requestUnitReel } from '@/components/UnitReelTransition';

/** A persistent physical trace of the six reels. It is navigation, not decoration. */
export default function StudioRollRail() {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState('home');
  const [visited, setVisited] = useState<Set<string>>(() => new Set(['home']));
  const [deepVisited, setDeepVisited] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const update = () => {
      const roll = getCurrentRollId();
      setCurrent(roll);
      setVisited((value) => new Set(value).add(roll));
    };
    update();
    const observer = new IntersectionObserver(() => update(), { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.2, 0.55] });
    MAJOR_ROLLS.forEach((roll) => {
      const section = document.getElementById(roll.id);
      if (section) observer.observe(section);
    });
    window.addEventListener('unit-reel-complete', update);
    const recordInteraction = (event: Event) => {
      const roll = (event as CustomEvent<{ roll?: string }>).detail?.roll;
      if (roll) setDeepVisited((value) => new Set(value).add(roll));
    };
    window.addEventListener('rey-world-interaction', recordInteraction);
    return () => {
      observer.disconnect();
      window.removeEventListener('unit-reel-complete', update);
      window.removeEventListener('rey-world-interaction', recordInteraction);
    };
  }, []);

  const goToRoll = (target: string) => {
    const from = getCurrentRollId();
    requestUnitReel({ from, target });
    // The gate owns the move. Sync the fragment after it settles rather than
    // before it, so native anchor scrolling never cuts through the shutter.
    window.setTimeout(() => {
      if (getCurrentRollId() === target && window.location.hash !== `#${target}`) {
        window.history.replaceState(null, '', `${window.location.pathname}#${target}`);
      }
    }, 3100);
  };

  return (
    <nav aria-label="Roll navigation" className="fixed bottom-5 right-5 z-30 hidden w-8 flex-col gap-2 rounded-none border border-[#eef0e8]/25 bg-[#07100f]/58 px-2 py-3 backdrop-blur-md lg:flex">
      {MAJOR_ROLLS.map((roll) => {
        const active = current === roll.id;
        const hasVisited = visited.has(roll.id);
        const hasDeepVisited = deepVisited.has(roll.id);
        return <button key={roll.id} type="button" onClick={() => goToRoll(roll.id)} className="group relative flex h-8 w-3 items-center justify-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#eef0e8]" aria-label={`${hasVisited ? 'Revisit' : 'Go to'} ${roll.id}${hasDeepVisited ? ', explored' : ''}`} aria-current={active ? 'page' : undefined}>
          <motion.span className="absolute inset-x-0 border border-[#eef0e8]/45" animate={{ height: active ? 28 : hasVisited ? 14 : 9, backgroundColor: active ? 'rgba(235,227,193,.68)' : hasVisited ? 'rgba(235,227,193,.28)' : 'rgba(235,227,193,.08)' }} transition={{ duration: reduced ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }} />
          {hasDeepVisited && <span className="absolute -right-1 top-1 h-1 w-1 bg-[#e8d78c]" aria-hidden="true" />}
          <span className="pointer-events-none absolute right-[calc(100%+11px)] whitespace-nowrap border-b border-[#eef0e8]/35 pb-1 font-mono-custom text-[7px] tracking-[0.16em] text-[#eef0e8] opacity-0 transition-opacity duration-200 group-hover:opacity-100">{roll.roll} / {roll.shot}</span>
        </button>;
      })}
    </nav>
  );
}
