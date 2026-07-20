import { motion, useReducedMotion } from 'framer-motion';

type StudioContinuityLayerProps = {
  artifact: string;
  meaning: string;
  accent: string;
  origin?: 'left' | 'center' | 'right';
};

function ArtifactTrace({ artifact }: { artifact: string }) {
  if (artifact === 'DESK') {
    return (
      <div className="absolute inset-x-0 bottom-0 h-[68%] border-b border-[#0A0A0A]/22">
        <span className="absolute bottom-3 left-[8%] h-[42%] w-[24%] -rotate-3 border border-[#0A0A0A]/20 bg-white/18" />
        <span className="absolute bottom-2 left-[36%] h-[54%] w-[29%] rotate-2 border border-[#0A0A0A]/18 bg-white/14" />
        <span className="absolute bottom-4 right-[7%] h-[35%] w-[20%] -rotate-1 border border-[#0A0A0A]/16 bg-white/12" />
      </div>
    );
  }

  if (artifact === 'MONITOR') {
    return (
      <div className="absolute inset-[12%] border border-[#0A0A0A]/25 bg-[#0A0A0A]/[0.025]">
        <span className="absolute inset-[8%] border border-[#0A0A0A]/14" />
        <span className="absolute bottom-[-18%] left-1/2 h-[18%] border-l border-[#0A0A0A]/24" />
        <span className="absolute bottom-[-18%] left-[36%] right-[36%] border-b border-[#0A0A0A]/24" />
      </div>
    );
  }

  if (artifact === 'CABINET') {
    return (
      <div className="absolute inset-[10%] grid grid-cols-3 gap-[3px] border border-[#0A0A0A]/20 p-[3px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="relative border border-[#0A0A0A]/14 bg-white/10">
            <span className="absolute bottom-1 left-1/2 w-2 -translate-x-1/2 border-b border-[#0A0A0A]/24" />
          </span>
        ))}
      </div>
    );
  }

  if (artifact === 'DOOR') {
    return (
      <div className="absolute inset-y-[4%] left-[22%] right-[22%] border border-[#0A0A0A]/24">
        <span className="absolute inset-y-0 left-1/2 border-l border-[#0A0A0A]/16" />
        <span className="absolute right-[8%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 border border-[#0A0A0A]/30" />
      </div>
    );
  }

  return (
    <div className="absolute inset-[10%] border border-[#0A0A0A]/20 bg-white/10">
      <span className="absolute left-[9%] top-[12%] h-[28%] w-[18%] border border-[#0A0A0A]/18" />
      <span className="absolute left-[34%] right-[9%] top-[14%] border-t border-[#0A0A0A]/20" />
      <span className="absolute left-[34%] right-[18%] top-[34%] border-t border-[#0A0A0A]/12" />
      <span className="absolute bottom-[18%] left-[9%] right-[9%] border-t border-[#0A0A0A]/14" />
    </div>
  );
}

export default function StudioContinuityLayer({ artifact, meaning, accent, origin = 'right' }: StudioContinuityLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const position = origin === 'left' ? '22%' : origin === 'center' ? '50%' : '78%';

  return (
    <div data-studio-trace={`${artifact} → ${meaning}`} className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at ${position} 12%, ${accent} 0%, transparent 42%)` }}
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="absolute bottom-[10%] top-[12%] w-px bg-[#0A0A0A]/12"
        style={{ left: position }}
        initial={prefersReducedMotion ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute top-16 h-24 w-44 md:top-20 md:h-32 md:w-60"
        style={{ left: `calc(${position} - clamp(5.5rem, 12vw, 7.5rem))` }}
        initial={prefersReducedMotion ? false : { opacity: 0, y: -10, filter: 'blur(5px)' }}
        whileInView={{ opacity: 0.72, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <ArtifactTrace artifact={artifact} />
      </motion.div>
    </div>
  );
}
