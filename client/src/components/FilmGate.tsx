import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

type FilmGateProps = {
  active: boolean;
  label: string;
  fromRoll?: string;
  fromShot?: string;
  toRoll?: string;
  targetShot?: string;
  direction?: 'forward' | 'reverse';
};

function ProfileDossierMatch({ direction, duration }: { direction: 'forward' | 'reverse'; duration: number }) {
  const reverse = direction === 'reverse';
  return (
    <motion.div
      data-match-artifact="profile-dossier"
      className="absolute left-1/2 top-1/2 h-[154px] w-[min(68vw,360px)] -translate-x-1/2 -translate-y-1/2 border border-[#d7d1be]/52 text-[#d7d1be] md:left-[61%] md:h-[178px] md:w-[360px]"
      initial={{ opacity: 0, scale: reverse ? 1.04 : 0.9, filter: 'blur(5px)' }}
      animate={{
        opacity: reverse ? [0, 0.46, 0.46, 0.18, 0] : [0, 0.12, 0.46, 0.46, 0],
        scale: reverse ? [1.04, 1, 0.98, 0.94, 0.9] : [0.9, 0.94, 0.98, 1, 1.04],
        filter: ['blur(5px)', 'blur(2px)', 'blur(0px)', 'blur(1px)', 'blur(4px)'],
      }}
      transition={{ duration, times: [0, 0.26, 0.43, 0.7, 1], ease: [0.45, 0, 0.2, 1] }}
    >
      <span className="absolute left-4 top-4 h-12 w-9 border border-current/46" />
      <span className="absolute left-16 right-4 top-4 border-t border-current/48" />
      <span className="absolute left-16 right-16 top-9 border-t border-current/28" />
      <span className="absolute left-16 right-8 top-14 border-t border-current/28" />
      <span className="absolute bottom-11 left-4 right-4 border-t border-current/24" />
      <span className="absolute bottom-6 left-4 font-mono-custom text-[7px] tracking-[0.18em] opacity-72">PERSONAL FILE / REY WU</span>
      <span className="absolute bottom-6 right-4 font-mono-custom text-[7px] tracking-[0.18em] opacity-48">ROLL 02</span>
    </motion.div>
  );
}

const STUDIO_MATCHES = {
  PROFILE: { artifact: 'NOTEBOOK', hero: [61, 53], destination: [22, 18] },
  PROJECTS: { artifact: 'DESK', hero: [72, 55], destination: [78, 18] },
  FILM: { artifact: 'MONITOR', hero: [82, 54], destination: [50, 18] },
  EXPERIMENTS: { artifact: 'CABINET', hero: [76, 39], destination: [22, 18] },
  CONTACT: { artifact: 'DOOR', hero: [92, 48], destination: [78, 18] },
} as const;

type MatchShot = keyof typeof STUDIO_MATCHES;

const MATCH_PROFILES: Record<MatchShot, { accent: string; action: string; detail: string }> = {
  PROFILE: { accent: '#bac8b9', action: 'OPEN PERSONAL FILE', detail: 'IDENTITY / ARCHIVE' },
  PROJECTS: { accent: '#d2ad73', action: 'LAY OUT THE DESK', detail: 'MAKING / WORKFLOW' },
  FILM: { accent: '#9dbdcc', action: 'POWER THE MONITOR', detail: 'SCREEN / TAKE' },
  EXPERIMENTS: { accent: '#a9ba8a', action: 'UNSEAL THE CABINET', detail: 'METHOD / TEST' },
  CONTACT: { accent: '#ce8f79', action: 'UNLATCH THE DOOR', detail: 'EXCHANGE / OUTBOUND' },
};

function StudioObjectGlyph({ artifact }: { artifact: (typeof STUDIO_MATCHES)[MatchShot]['artifact'] }) {
  if (artifact === 'DESK') {
    return (
      <div className="relative h-24 w-64 border-b border-current/58">
        <span className="absolute bottom-2 left-4 h-12 w-20 -rotate-3 border border-current/38" />
        <span className="absolute bottom-2 left-[38%] h-16 w-24 rotate-2 border border-current/30" />
        <span className="absolute bottom-3 right-2 h-10 w-16 -rotate-1 border border-current/25" />
      </div>
    );
  }
  if (artifact === 'MONITOR') {
    return (
      <div className="relative h-28 w-44 border border-current/58">
        <span className="absolute inset-3 border border-current/26" />
        <span className="absolute -bottom-5 left-1/2 h-5 border-l border-current/48" />
        <span className="absolute -bottom-5 left-[36%] right-[36%] border-b border-current/48" />
      </div>
    );
  }
  if (artifact === 'CABINET') {
    return (
      <div className="grid h-28 w-44 grid-cols-3 gap-1.5 border border-current/52 p-1.5">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="relative border border-current/24">
            <span className="absolute bottom-2 left-1/2 w-3 -translate-x-1/2 border-b border-current/38" />
          </span>
        ))}
      </div>
    );
  }
  if (artifact === 'DOOR') {
    return (
      <div className="relative h-40 w-28 border border-current/58">
        <span className="absolute inset-y-0 left-1/2 border-l border-current/24" />
        <span className="absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 border border-current/58" />
      </div>
    );
  }
  return (
    <div className="relative h-28 w-52 border border-current/52">
      <span className="absolute left-4 top-4 h-12 w-9 border border-current/36" />
      <span className="absolute left-16 right-4 top-5 border-t border-current/42" />
      <span className="absolute left-16 right-10 top-11 border-t border-current/26" />
      <span className="absolute bottom-6 left-4 right-4 border-t border-current/24" />
    </div>
  );
}

function StudioObjectMatch({ shot, toWorld, duration }: { shot: MatchShot; toWorld: boolean; duration: number }) {
  const match = STUDIO_MATCHES[shot];
  const profile = MATCH_PROFILES[shot];
  const start = toWorld ? match.destination : match.hero;
  const end = toWorld ? match.hero : match.destination;
  const center = [50, 48];
  const centerDeltaX = center[0] - start[0];
  const centerDeltaY = center[1] - start[1];
  const endDeltaX = end[0] - start[0];
  const endDeltaY = end[1] - start[1];

  return (
    <motion.div
      data-match-artifact={match.artifact.toLowerCase()}
      className="absolute z-[3] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${start[0]}%`, top: `${start[1]}%` }}
      initial={{ opacity: 0, scale: toWorld ? 0.82 : 0.7, filter: 'blur(5px)' }}
      animate={{
        x: ['0vw', `${centerDeltaX * 0.48}vw`, `${centerDeltaX}vw`, `${endDeltaX * 0.72}vw`, `${endDeltaX}vw`],
        y: ['0vh', `${centerDeltaY * 0.48}vh`, `${centerDeltaY}vh`, `${endDeltaY * 0.72}vh`, `${endDeltaY}vh`],
        opacity: [0, 0.45, 1, 0.86, 0],
        scale: toWorld ? [0.8, 1.08, 1.42, 1.16, 1.04] : [0.68, 1, 1.42, 1.12, 1.03],
        filter: ['blur(5px)', 'blur(2px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'],
      }}
      transition={{ duration, times: [0, 0.24, 0.45, 0.72, 1], ease: [0.45, 0, 0.2, 1] }}
    >
      <div className="relative text-[var(--match-accent)]" style={{ '--match-accent': profile.accent } as CSSProperties}>
        <span className="absolute -inset-8 bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_64%)] opacity-70 blur-xl" />
        <StudioObjectGlyph artifact={match.artifact} />
        <span className="absolute left-1/2 top-[calc(100%+14px)] -translate-x-1/2 whitespace-nowrap border-y border-current/35 py-1 font-mono-custom text-[7px] tracking-[0.18em]">
          {profile.detail}
        </span>
      </div>
    </motion.div>
  );
}

function SprocketRail({ edge, direction, duration }: { edge: 'top' | 'right' | 'bottom' | 'left'; direction: 'forward' | 'reverse'; duration: number }) {
  const horizontal = edge === 'top' || edge === 'bottom';
  const directionSign = direction === 'reverse' ? -1 : 1;
  return (
    <motion.div
      className={`absolute flex justify-around ${horizontal ? 'left-[4.3vw] right-[4.3vw]' : 'bottom-[6.2vh] top-[6.2vh] flex-col'} ${edge === 'top' ? 'top-[6.5vh]' : ''} ${edge === 'bottom' ? 'bottom-[6.3vh]' : ''} ${edge === 'left' ? 'left-[4.7vw]' : ''} ${edge === 'right' ? 'right-[4.7vw]' : ''}`}
      initial={{ opacity: 0, x: horizontal ? (edge === 'top' ? 20 : -20) * directionSign : 0, y: horizontal ? 0 : (edge === 'left' ? 20 : -20) * directionSign }}
      animate={{ opacity: [0, 0, 0.92, 0.92, 0], x: horizontal ? (edge === 'top' ? -18 : 18) * directionSign : 0, y: horizontal ? 0 : (edge === 'left' ? -18 : 18) * directionSign }}
      transition={{ duration, times: [0, 0.25, 0.38, 0.7, 1], ease: [0.45, 0, 0.2, 1] }}
    >
      {Array.from({ length: horizontal ? 22 : 10 }).map((_, index) => (
        <span key={index} className={`${horizontal ? 'h-2.5 w-5' : 'h-5 w-2.5'} rounded-[2px] border border-[#d7d1be]/72 bg-[#d7d1be]/18 shadow-[0_0_8px_rgba(215,209,190,0.12)]`} />
      ))}
    </motion.div>
  );
}

export default function FilmGate({ active, label, fromRoll, fromShot, toRoll, targetShot, direction = 'forward' }: FilmGateProps) {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0 : 3;
  const studioMatchShot = (
    fromShot === 'WORLD' && targetShot && targetShot in STUDIO_MATCHES
      ? targetShot
      : targetShot === 'WORLD' && fromShot && fromShot in STUDIO_MATCHES
        ? fromShot
        : null
  ) as MatchShot | null;
  const matchProfile = studioMatchShot ? MATCH_PROFILES[studioMatchShot] : null;
  const shutterTransition = {
    duration,
    times: [0, 0.36, 0.62, 1],
    ease: [0.45, 0, 0.2, 1] as const,
  };

  const gate = (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[65] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-[#07100f]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.42, 1, 0.18] }}
            transition={{ duration, times: [0, 0.28, 0.58, 1], ease: [0.45, 0, 0.2, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 w-[18vw] bg-[linear-gradient(90deg,transparent,rgba(244,231,184,0.72),rgba(255,255,255,0.88),rgba(244,231,184,0.52),transparent)] mix-blend-screen"
            initial={{ x: '-30vw', opacity: 0 }}
            animate={{ x: ['-30vw', '-30vw', '112vw', '112vw'], opacity: [0, 0, 0.9, 0] }}
            transition={{ duration, times: [0, 0.37, 0.57, 1], ease: [0.2, 0.8, 0.2, 1] }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,202,128,0.42),transparent_38%)] mix-blend-screen"
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: [0, 0, 0.66, 0], scale: [0.55, 0.55, 1.35, 1.6] }}
            transition={{ duration, times: [0, 0.39, 0.54, 0.72], ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div className="absolute left-[3.8vw] right-[3.8vw] top-[5.7vh] h-[44.4vh] origin-top bg-[#07100f]" initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 1, 0] }} transition={shutterTransition} />
          <motion.div className="absolute bottom-[5.5vh] left-[3.8vw] right-[3.8vw] h-[44.4vh] origin-bottom bg-[#07100f]" initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 1, 0] }} transition={shutterTransition} />
          <motion.div className="absolute bottom-[5.5vh] left-[3.8vw] top-[5.7vh] w-[46.2vw] origin-left bg-[#07100f]" initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 1, 0] }} transition={shutterTransition} />
          <motion.div className="absolute bottom-[5.5vh] right-[3.8vw] top-[5.7vh] w-[46.2vw] origin-right bg-[#07100f]" initial={{ scaleX: 0 }} animate={{ scaleX: [0, 1, 1, 0] }} transition={shutterTransition} />
          <motion.div
            className="absolute bottom-[5.5vh] left-[3.8vw] right-[3.8vw] top-[5.7vh] border border-white/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.8, 0] }}
            transition={{ duration, times: [0, 0.16, 0.68, 1] }}
          />
          {!prefersReducedMotion && (
            <>
              <SprocketRail edge="top" direction={direction} duration={duration} />
              <SprocketRail edge="right" direction={direction} duration={duration} />
              <SprocketRail edge="bottom" direction={direction} duration={duration} />
              <SprocketRail edge="left" direction={direction} duration={duration} />
            </>
          )}
          {studioMatchShot && (
            <StudioObjectMatch shot={studioMatchShot} toWorld={targetShot === 'WORLD'} duration={duration} />
          )}
          {fromRoll && toRoll && !studioMatchShot && (
            <motion.div
              className="absolute left-1/2 top-1/2 flex w-[min(72vw,620px)] -translate-x-1/2 -translate-y-1/2 items-center gap-5 text-[#d7d1be]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={{ duration, times: [0, 0.3, 0.42, 0.68, 1] }}
            >
              <motion.div
                className="relative h-20 w-20 shrink-0 rounded-full border border-current/55 md:h-24 md:w-24"
                animate={{ rotate: [0, 540, 720].map((value) => value * (direction === 'reverse' ? -1 : 1)) }}
                transition={{ duration, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span className="absolute inset-[24%] rounded-full border border-current/35" />
                <span className="absolute inset-[43%] rounded-full bg-current/70" />
                <span className="absolute left-1/2 top-[8%] h-[34%] w-px -translate-x-1/2 bg-current/35" />
                <span className="absolute bottom-[8%] left-1/2 h-[34%] w-px -translate-x-1/2 bg-current/35" />
              </motion.div>
              <div className="relative h-20 flex-1 overflow-hidden border-y border-current/35 md:h-24">
                <motion.div
                  className="absolute inset-x-0 top-0"
                  initial={{ y: 0, filter: 'blur(0px)' }}
                  animate={{ y: direction === 'reverse' ? ['-66.666%', '-30%', '0%'] : ['0%', '-30%', '-66.666%'], filter: ['blur(0px)', 'blur(6px)', 'blur(0px)'] }}
                  transition={{ duration: duration * 0.58, delay: duration * 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  {[fromRoll, 'LOAD', toRoll].map((roll, index) => (
                    <div key={`${roll}-${index}`} className="flex h-20 items-center justify-between px-5 font-mono-custom tracking-[0.18em] md:h-24">
                      <span className="text-[8px] opacity-48">ROLL</span>
                      <span className="font-heading text-4xl font-700 md:text-5xl">{roll}</span>
                      <span className="text-[8px] opacity-48">{index === 2 ? targetShot : 'MAGAZINE'}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
              <motion.div
                className="relative h-20 w-20 shrink-0 rounded-full border border-current/55 md:h-24 md:w-24"
                animate={{ rotate: [0, -540, -720].map((value) => value * (direction === 'reverse' ? -1 : 1)) }}
                transition={{ duration, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <span className="absolute inset-[24%] rounded-full border border-current/35" />
                <span className="absolute inset-[43%] rounded-full bg-current/70" />
              </motion.div>
            </motion.div>
          )}
          {studioMatchShot && matchProfile && (
            <motion.div
              className="absolute left-1/2 top-1/2 z-[2] w-[min(78vw,520px)] -translate-x-1/2 -translate-y-1/2 text-center"
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: [0, 0, 0.95, 0.95, 0], y: [10, 10, 0, 0, -8], filter: ['blur(4px)', 'blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(4px)'] }}
              transition={{ duration, times: [0, 0.31, 0.43, 0.66, 1], ease: [0.45, 0, 0.2, 1] }}
              style={{ color: matchProfile.accent }}
            >
              <div className="mx-auto flex w-fit items-center gap-3 border-y border-current/55 px-5 py-2 font-mono-custom text-[8px] tracking-[0.22em]">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {matchProfile.action}
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
              <div className="mt-3 font-heading text-[clamp(1.9rem,4vw,3.65rem)] font-700 tracking-[-0.06em]">{studioMatchShot}</div>
              <div className="mt-2 font-mono-custom text-[8px] tracking-[0.22em] opacity-70">{matchProfile.detail}</div>
            </motion.div>
          )}
          <div className={`absolute inset-x-[8vw] flex -translate-y-1/2 items-center gap-4 font-mono-custom text-[9px] tracking-[0.16em] text-white/74 ${fromRoll ? 'top-[67%]' : 'top-1/2'}`}>
            <span className="h-px flex-1 bg-white/30" />
            <span>{label}</span>
            <span className="h-px flex-1 bg-white/30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document === 'undefined' ? null : createPortal(gate, document.body);
}
