import { motion, useReducedMotion } from 'framer-motion';
import { requestUnitReel } from '@/components/UnitReelTransition';

type RewindToStudioProps = { from: 'about' | 'projects' | 'film' | 'experiments' | 'contact'; object: string };

export default function RewindToStudio({ from, object }: RewindToStudioProps) {
  const reduced = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={() => requestUnitReel({ from, target: 'home', direction: 'reverse' })}
      className="absolute right-5 top-24 z-20 flex items-center gap-2 border-y border-[#0A0A0A]/25 bg-white/35 px-2 py-1.5 font-mono-custom text-[8px] tracking-[0.16em] text-[#0A0A0A]/65 backdrop-blur-sm transition-colors hover:border-[#0A0A0A]/60 hover:text-[#0A0A0A] md:right-8 md:top-28"
      initial={reduced ? false : { opacity: 0, x: 10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.28 }}
      aria-label="Rewind to Rey's World studio"
    >
      <span className="relative h-3.5 w-3.5 border border-current/70"><span className="absolute left-1/2 top-0 h-full -translate-x-1/2 border-l border-current/30" /></span>
      <span>REWIND / {object}</span>
    </motion.button>
  );
}
