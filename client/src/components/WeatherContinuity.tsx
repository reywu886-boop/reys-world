import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

type WeatherState = 'afterRain' | 'lateAfternoon' | 'blueHourRain' | 'starNight';

const TONES: Record<WeatherState, { wash: string; label: string }> = {
  afterRain: { wash: 'rgba(110,145,154,0.12)', label: 'AFTER RAIN' },
  lateAfternoon: { wash: 'rgba(204,157,94,0.11)', label: 'LATE LIGHT' },
  blueHourRain: { wash: 'rgba(88,118,151,0.14)', label: 'BLUE RAIN' },
  starNight: { wash: 'rgba(46,69,92,0.16)', label: 'NIGHT WATCH' },
};

/** Carries the hero's weather into every chapter as a subtle exposure condition. */
export default function WeatherContinuity() {
  const reduced = useReducedMotion();
  const [weather, setWeather] = useState<WeatherState>('afterRain');

  useEffect(() => {
    const handle = (event: Event) => {
      const next = (event as CustomEvent<{ scene?: WeatherState }>).detail?.scene;
      if (next && TONES[next]) setWeather(next);
    };
    window.addEventListener('studio-weather', handle);
    return () => window.removeEventListener('studio-weather', handle);
  }, []);

  const tone = TONES[weather];
  return <AnimatePresence mode="wait"><motion.div key={weather} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[2] mix-blend-multiply" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 1.4 }} style={{ background: `linear-gradient(155deg, ${tone.wash}, transparent 38%, ${tone.wash})` }}>
    <span className="absolute bottom-5 left-5 hidden border-l border-[#0a0a0a]/30 pl-2 font-mono-custom text-[7px] tracking-[0.16em] text-[#0a0a0a]/45 lg:block">WORLD LIGHT / {tone.label}</span>
  </motion.div></AnimatePresence>;
}
