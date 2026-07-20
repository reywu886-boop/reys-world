import { useLanguage } from '@/contexts/LanguageContext';
import { useWorld } from '@/contexts/WorldContext';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { requestUnitReel } from '@/components/UnitReelTransition';

const HERO_SCENES = {
  afterRain: {
    poster: '/media/hero/reys-world-studio-master-v1.png',
    video: '/media/hero/reys-world-studio-after-rain-v2.mp4',
    condition: 'PEARL MORNING / AFTER RAIN',
    wind: 'N 02 KTS',
    sea: 'CALM',
  },
  lateAfternoon: {
    poster: '/media/hero/reys-world-studio-late-afternoon-v1.png',
    video: '/media/hero/reys-world-studio-late-afternoon-v2.mp4',
    condition: 'LATE AFTERNOON / CLEARING',
    wind: 'W 03 KTS',
    sea: 'LOW SWELL',
  },
  blueHourRain: {
    poster: '/media/hero/reys-world-studio-blue-hour-rain-v1.png',
    video: '/media/hero/reys-world-studio-blue-hour-rain-v2.mp4',
    condition: 'BLUE HOUR / LIGHT RAIN',
    wind: 'NE 05 KTS',
    sea: 'RAIN RIPPLES',
  },
  starNight: {
    poster: '/media/hero/reys-world-studio-star-night-v2.png',
    video: '/media/hero/reys-world-studio-star-night-v3.mp4',
    condition: 'DEEP NIGHT / OVERCAST',
    wind: 'N 01 KTS',
    sea: 'DARK CALM',
  },
} as const;

type HeroSceneKey = keyof typeof HERO_SCENES;

function selectLongLivedScene(): HeroSceneKey {
  if (typeof window === 'undefined') return 'afterRain';
  const previewScene = new URLSearchParams(window.location.search).get('scene');
  if (previewScene && previewScene in HERO_SCENES) return previewScene as HeroSceneKey;
  const stored = window.sessionStorage.getItem('rey-world-scene');
  if (stored && stored in HERO_SCENES) return stored as HeroSceneKey;

  const now = new Date();
  const hour = now.getHours();
  let scene: HeroSceneKey = 'afterRain';
  if (hour >= 15 && hour < 19) scene = 'lateAfternoon';
  else if (hour >= 19 && hour < 22) scene = now.getDate() % 3 === 0 ? 'blueHourRain' : 'starNight';
  else if (hour >= 22 || hour < 6) scene = 'starNight';
  window.sessionStorage.setItem('rey-world-scene', scene);
  return scene;
}

const STUDIO_HOTSPOTS = [
  {
    target: 'about', roll: '02', action: 'IDENTIFY', object: 'NOTEBOOK', titleEn: 'About', titleCn: '关于 Rey',
    summaryEn: 'Background, education and the path from film practice to AI-native creation.',
    summaryCn: '个人背景、教育经历，以及从电影实践走向 AI 原生创作的路径。',
    x: '61%', y: '53%', align: 'right', briefX: 49, briefY: 72, preview: '/creative-systems-hero-v1.png',
  },
  {
    target: 'projects', roll: '03', action: 'BUILD', object: 'DESK', titleEn: 'Projects', titleCn: '项目',
    summaryEn: 'Selected systems and product work across pre-viz, storyboards and production workflows.',
    summaryCn: '精选的预演、分镜系统与 AI 生产工作流项目。',
    x: '72%', y: '55%', align: 'right', briefX: 66, briefY: 76, preview: '/previz-cover.webp',
  },
  {
    target: 'film', roll: '04', action: 'STAGE', object: 'MONITOR', titleEn: 'Film', titleCn: '影片',
    summaryEn: 'The Year of Innocence: poster, stills, credits and the complete short film.',
    summaryCn: '《清白之年》的海报、剧照、主创信息与完整影片。',
    x: '82.3%', y: '53.8%', align: 'left', briefX: 81, briefY: 72, preview: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381321541/4kUyaQrvQwjTjCksyMRpb7/film-still-closeup_3a140cda.jpg',
  },
  {
    target: 'experiments', roll: '05', action: 'TEST', object: 'CABINET', titleEn: 'Experiments', titleCn: '实验',
    summaryEn: 'Ongoing tests in multi-agent systems, RAG, model evaluation and creative tooling.',
    summaryCn: '多智能体、RAG、模型评测与创意工具的持续实验。',
    x: '76%', y: '39%', align: 'right', briefX: 70, briefY: 22, preview: '/storyboard-system-cover.webp',
  },
  {
    target: 'contact', roll: '06', action: 'SEND', object: 'DOOR', titleEn: 'Contact', titleCn: '联系',
    summaryEn: 'Collaboration areas, location and a direct way to start a conversation.',
    summaryCn: '合作方向、所在城市，以及直接开启交流的方式。',
    x: '92%', y: '48%', align: 'left', briefX: 84, briefY: 34, preview: undefined,
  },
] as const;

function MeteringShape({ object }: { object: (typeof STUDIO_HOTSPOTS)[number]['object'] }) {
  if (object === 'DESK') {
    return (
      <div className="relative h-14 w-32 border-b border-[#f1ecda]/58">
        <span className="absolute bottom-1 left-2 h-7 w-10 -rotate-3 border border-[#f1ecda]/38" />
        <span className="absolute bottom-1 right-5 h-9 w-12 rotate-2 border border-[#f1ecda]/30" />
      </div>
    );
  }
  if (object === 'MONITOR') {
    return (
      <div className="relative h-16 w-24 border border-[#f1ecda]/58">
        <span className="absolute inset-1.5 border border-[#f1ecda]/26" />
        <span className="absolute -bottom-3 left-1/2 h-3 border-l border-[#f1ecda]/42" />
      </div>
    );
  }
  if (object === 'CABINET') {
    return (
      <div className="grid h-16 w-24 grid-cols-3 gap-1 border border-[#f1ecda]/50 p-1">
        {Array.from({ length: 6 }).map((_, index) => <span key={index} className="border border-[#f1ecda]/24" />)}
      </div>
    );
  }
  if (object === 'DOOR') {
    return (
      <div className="relative h-24 w-14 border border-[#f1ecda]/58">
        <span className="absolute inset-y-0 left-1/2 border-l border-[#f1ecda]/24" />
        <span className="absolute right-1.5 top-1/2 h-1 w-1 border border-[#f1ecda]/58" />
      </div>
    );
  }
  return (
    <div className="relative h-14 w-24 border border-[#f1ecda]/52">
      <span className="absolute left-2 top-2 h-6 w-5 border border-[#f1ecda]/32" />
      <span className="absolute left-10 right-2 top-3 border-t border-[#f1ecda]/38" />
      <span className="absolute bottom-3 left-10 right-4 border-t border-[#f1ecda]/24" />
    </div>
  );
}

function formatTimecode(seconds: number) {
  const whole = Math.max(0, Math.floor(seconds));
  const frames = Math.floor((seconds % 1) * 24);
  return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
}

export default function HeroSection() {
  const { t } = useLanguage();
  const { paused } = useWorld();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const livingVideoRef = useRef<HTMLVideoElement>(null);
  const hotspotButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const transitionTimers = useRef<number[]>([]);
  const touchStartY = useRef(0);
  const pointerActiveRef = useRef(false);
  const waterActiveRef = useRef(false);
  const activeHotspotRef = useRef<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [travelling, setTravelling] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [introReady, setIntroReady] = useState(Boolean(prefersReducedMotion));
  const [pointerActive, setPointerActive] = useState(false);
  const [waterActive, setWaterActive] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [livingVideoReady, setLivingVideoReady] = useState(false);
  const [livingVideoFailed, setLivingVideoFailed] = useState(false);
  const [engagingHotspot, setEngagingHotspot] = useState<string | null>(null);
  const [sceneKey] = useState<HeroSceneKey>(selectLongLivedScene);
  const heroScene = HERO_SCENES[sceneKey];

  useEffect(() => {
    document.documentElement.dataset.studioWeather = sceneKey;
    window.dispatchEvent(new CustomEvent('studio-weather', { detail: { scene: sceneKey } }));
  }, [sceneKey]);

  const updateActiveHotspot = useCallback((target: string | null) => {
    if (activeHotspotRef.current === target) return;
    activeHotspotRef.current = target;
    setActiveHotspot(target);
  }, []);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const focusX = useMotionValue(0);
  const focusY = useMotionValue(0);
  const cameraPanX = useSpring(useTransform(pointerX, [-1, 1], [-12, 12]), { stiffness: 90, damping: 24, mass: 0.7 });
  const cameraPanY = useSpring(useTransform(pointerY, [-1, 1], [-7, 7]), { stiffness: 90, damping: 24, mass: 0.7 });
  const reflectionX = useSpring(useTransform(pointerX, [-1, 1], [-170, 170]), { stiffness: 70, damping: 28, mass: 0.8 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const cameraScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.075]);
  const cameraLift = useTransform(scrollYProgress, [0, 1], ['0%', prefersReducedMotion ? '0%' : '-2%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const transitionVeil = useTransform(scrollYProgress, [0.45, 1], [0, 1]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroReady(true), prefersReducedMotion ? 0 : 1650);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hero-tone-change', { detail: { dark: true } }));
  }, []);

  useEffect(() => {
    const video = livingVideoRef.current;
    if (!video || prefersReducedMotion) return;

    const resumeLivingScene = () => {
      if (document.visibilityState !== 'visible' || paused) return;
      void video.play().catch(() => undefined);
    };

    resumeLivingScene();
    document.addEventListener('visibilitychange', resumeLivingScene);
    window.addEventListener('focus', resumeLivingScene);
    return () => {
      document.removeEventListener('visibilitychange', resumeLivingScene);
      window.removeEventListener('focus', resumeLivingScene);
    };
  }, [paused, prefersReducedMotion, livingVideoReady]);

  useEffect(() => {
    const video = livingVideoRef.current;
    if (!video) return;
    if (paused) video.pause();
    else if (!prefersReducedMotion) void video.play().catch(() => undefined);
  }, [paused, prefersReducedMotion]);

  useEffect(() => () => {
    transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  useEffect(() => {
    const resetRecording = () => {
      transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
      transitionTimers.current = [];
      setRecording(false);
      setTravelling(false);
      setRecordTime(0);
      setIntroReady(true);
    };
    window.addEventListener('hero-reset-recording', resetRecording);
    return () => window.removeEventListener('hero-reset-recording', resetRecording);
  }, []);

  useEffect(() => {
    if (!recording) return;
    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      setRecordTime((performance.now() - startedAt) / 1000);
    }, 125);
    return () => window.clearInterval(timer);
  }, [recording]);

  const startRecording = useCallback(() => {
    if (!introReady || recording) return;
    setRecording(true);
    setTravelling(true);
    transitionTimers.current.push(window.setTimeout(() => {
      requestUnitReel({ from: 'home', target: 'about', direction: 'forward' });
    }, prefersReducedMotion ? 0 : 420));
  }, [introReady, recording, prefersReducedMotion]);

  useEffect(() => {
    const handleComplete = () => setTravelling(false);
    window.addEventListener('unit-reel-complete', handleComplete);
    return () => window.removeEventListener('unit-reel-complete', handleComplete);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0) return;
      event.preventDefault();
      if (!recording) startRecording();
    };
    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? 0;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const distance = touchStartY.current - (event.touches[0]?.clientY ?? touchStartY.current);
      if (distance <= 0) return;
      event.preventDefault();
      if (distance > 12 && !recording) startRecording();
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      section.removeEventListener('wheel', handleWheel);
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchmove', handleTouchMove);
    };
  }, [recording, startRecording]);

  const openRoll = useCallback((target: string) => {
    if (engagingHotspot) return;
    setEngagingHotspot(target);
    const delay = prefersReducedMotion ? 0 : 160;
    transitionTimers.current.push(window.setTimeout(() => {
      requestUnitReel({ from: 'home', target, direction: 'forward' });
      setEngagingHotspot(null);
    }, delay));
  }, [engagingHotspot, prefersReducedMotion]);

  const handleHotspotKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>, index: number, target: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openRoll(target);
      return;
    }
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const step = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
    const nextIndex = (index + step + STUDIO_HOTSPOTS.length) % STUDIO_HOTSPOTS.length;
    hotspotButtonRefs.current[nextIndex]?.focus();
  }, [openRoll]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (paused || prefersReducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    pointerX.set((localX / bounds.width) * 2 - 1);
    pointerY.set((localY / bounds.height) * 2 - 1);
    focusX.set(localX);
    focusY.set(localY);
    if (!pointerActiveRef.current) {
      pointerActiveRef.current = true;
      setPointerActive(true);
    }

    let nearestTarget: string | null = null;
    let nearestDistance = 76;
    for (const hotspot of STUDIO_HOTSPOTS) {
      const hotspotX = bounds.width * (Number.parseFloat(hotspot.x) / 100);
      const hotspotY = bounds.height * (Number.parseFloat(hotspot.y) / 100);
      const distance = Math.hypot(localX - hotspotX, localY - hotspotY);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestTarget = hotspot.target;
      }
    }
    const overWater = !nearestTarget && localX < bounds.width * 0.54 && localY > bounds.height * 0.43;
    if (waterActiveRef.current !== overWater) {
      waterActiveRef.current = overWater;
      setWaterActive(overWater);
    }
    updateActiveHotspot(nearestTarget);
  }, [focusX, focusY, paused, pointerX, pointerY, prefersReducedMotion, updateActiveHotspot]);

  const handlePointerLeave = useCallback(() => {
    pointerActiveRef.current = false;
    setPointerActive(false);
    waterActiveRef.current = false;
    setWaterActive(false);
    updateActiveHotspot(null);
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY, updateActiveHotspot]);

  const introTransition = useMemo(
    () => ({ duration: prefersReducedMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] as const }),
    [prefersReducedMotion],
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#101716]"
    >
      <motion.div
        className="absolute inset-0"
        style={{ scale: cameraScale, y: cameraLift }}
        animate={{ scale: travelling && !prefersReducedMotion ? 1.105 : undefined }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <motion.div data-camera-plane className="absolute inset-[-18px]" style={{ x: cameraPanX, y: cameraPanY }}>
          <img
            src={heroScene.poster}
            alt=""
            className="h-full w-full object-cover object-[66%_center] md:object-center"
          />
          {!prefersReducedMotion && !livingVideoFailed && (
            <motion.video
              ref={livingVideoRef}
              data-hero-scene={sceneKey}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={heroScene.poster}
              aria-hidden="true"
              initial={false}
              animate={{ opacity: livingVideoReady ? 1 : 0 }}
              transition={{ duration: 1.2, ease: [0.45, 0, 0.2, 1] }}
              onCanPlay={(event) => {
                setLivingVideoReady(true);
                void event.currentTarget.play().catch(() => undefined);
              }}
              onError={() => setLivingVideoFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover object-[66%_center] md:object-center ${sceneKey === 'starNight' ? 'brightness-[1.16] contrast-[1.08]' : 'brightness-[1.04] contrast-[1.03]'}`}
            >
              <source src={heroScene.video} type="video/mp4" />
            </motion.video>
          )}
          <div className={`absolute inset-0 ${sceneKey === 'starNight' ? 'bg-[linear-gradient(90deg,rgba(5,13,16,0.70)_0%,rgba(5,13,16,0.56)_27%,rgba(5,13,16,0.22)_47%,rgba(5,13,16,0.04)_66%,transparent_100%)]' : 'bg-[linear-gradient(90deg,rgba(5,13,16,0.80)_0%,rgba(5,13,16,0.62)_27%,rgba(5,13,16,0.24)_47%,rgba(5,13,16,0.04)_66%,transparent_100%)]'}`} />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#061013]/58 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_54%,transparent_0%,transparent_38%,rgba(3,9,9,0.2)_100%)]" />
          {!prefersReducedMotion && livingVideoReady && (
            <div className="pointer-events-none absolute bottom-0 left-0 h-[57%] w-[63%] overflow-hidden [mask-image:linear-gradient(to_top,black_16%,rgba(0,0,0,0.86)_62%,transparent_100%)]">
              <motion.div
                className="absolute -inset-x-[20%] bottom-[2%] h-[46%] bg-[linear-gradient(102deg,transparent_18%,rgba(167,204,216,0.12)_38%,transparent_54%,rgba(205,226,229,0.08)_70%,transparent_84%)] blur-[12px] mix-blend-screen"
                animate={{ x: ['-5%', '4%', '-1%', '6%', '-5%'], y: ['1%', '-2%', '0%', '-1%', '1%'], opacity: waterActive ? [0.5, 0.82, 0.62, 0.86, 0.5] : [0.34, 0.58, 0.42, 0.62, 0.34] }}
                transition={{ duration: 13.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.24, 0.5, 0.76, 1] }}
              />
              <motion.div
                className="absolute -inset-x-[12%] bottom-[10%] h-[34%] bg-[repeating-linear-gradient(176deg,transparent_0px,transparent_15px,rgba(196,220,224,0.075)_17px,transparent_21px)] blur-[5px] mix-blend-screen"
                animate={{ x: ['3%', '-4%', '1%', '3%'], scaleY: waterActive ? [0.92, 1.1, 0.97, 0.92] : [0.96, 1.04, 0.99, 0.96], opacity: waterActive ? [0.45, 0.7, 0.56, 0.45] : [0.3, 0.5, 0.4, 0.3] }}
                transition={{ duration: 9.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.38, 0.72, 1] }}
              />
            </div>
          )}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute -bottom-[20%] right-[4%] h-[88%] w-[48%] bg-[radial-gradient(ellipse_at_center,rgba(255,227,166,0.18)_0%,rgba(255,227,166,0.06)_38%,transparent_72%)] mix-blend-soft-light"
              animate={{ x: ['-3%', '2%', '-3%'], opacity: [0.2, 0.46, 0.2], scale: [0.99, 1.025, 0.99] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <motion.div
            className="pointer-events-none absolute -inset-y-[12%] left-[52%] w-[16vw] -skew-x-12 bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-0 mix-blend-screen"
            style={{ x: reflectionX }}
            animate={{ opacity: pointerActive ? 0.24 : 0 }}
            transition={{ duration: 0.35 }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={false}
            animate={{
              opacity: activeHotspot ? 1 : 0,
              background: activeHotspot
                ? `radial-gradient(circle at ${STUDIO_HOTSPOTS.find((hotspot) => hotspot.target === activeHotspot)?.x ?? '76%'} ${STUDIO_HOTSPOTS.find((hotspot) => hotspot.target === activeHotspot)?.y ?? '52%'}, rgba(244,239,218,0.17) 0%, rgba(244,239,218,0.05) 9%, rgba(3,10,10,0.08) 20%, rgba(3,10,10,0.42) 58%, rgba(3,10,10,0.52) 100%)`
                : 'radial-gradient(circle at 76% 52%, transparent 0%, transparent 100%)',
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 0.7, 0.22, 1] }}
          />
          {activeHotspot && (() => {
            const hotspot = STUDIO_HOTSPOTS.find((item) => item.target === activeHotspot);
            if (!hotspot) return null;
            return (
              <motion.div
                key={hotspot.target}
                className="pointer-events-none absolute z-[2] -translate-x-1/2 -translate-y-1/2 text-[#f1ecda]"
                style={{ left: hotspot.x, top: hotspot.y }}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.18, filter: 'blur(4px)' }}
                animate={{ opacity: 0.92, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden="true"
              >
                <MeteringShape object={hotspot.object} />
              </motion.div>
            );
          })()}
        </motion.div>
      </motion.div>

      <motion.nav
        className="absolute inset-[-18px] z-[18] hidden lg:block"
        style={{ x: cameraPanX, y: cameraPanY }}
        aria-label="Studio routes"
      >
        {STUDIO_HOTSPOTS.map((hotspot, index) => (
          <button
            key={hotspot.target}
            ref={(node) => { hotspotButtonRefs.current[index] = node; }}
            type="button"
            onClick={() => openRoll(hotspot.target)}
            onKeyDown={(event) => handleHotspotKeyDown(event, index, hotspot.target)}
            onPointerEnter={() => updateActiveHotspot(hotspot.target)}
            onFocus={() => updateActiveHotspot(hotspot.target)}
            onBlur={() => updateActiveHotspot(null)}
            className={`group pointer-events-auto absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-left transition-opacity duration-300 focus-visible:outline-none ${activeHotspot === hotspot.target || engagingHotspot === hotspot.target ? 'z-20 opacity-100' : 'z-0 opacity-[0.82] hover:opacity-100'}`}
            style={{ left: hotspot.x, top: hotspot.y }}
            aria-label={`Open ${hotspot.target}`}
            aria-describedby={`hotspot-${hotspot.target}-preview`}
          >
            <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 border border-[#f1ecda]/34 bg-[#07100f]/12 shadow-[0_0_20px_rgba(241,236,218,0.16)]" />
            <motion.span
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 border border-[#f1ecda] bg-[#07100f]/72 shadow-[0_0_13px_rgba(241,236,218,0.5)]"
              animate={engagingHotspot === hotspot.target ? { scale: [1, 1.8, 0.82], opacity: [1, 0.72, 1] } : { scale: 1, opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
            />
            <span className="absolute left-1/2 top-[calc(50%+16px)] -translate-x-1/2 whitespace-nowrap bg-[#07100f]/42 px-1 py-0.5 font-mono-custom text-[7px] tracking-[0.14em] text-[#f1ecda]/82">
              {hotspot.roll} / {t(hotspot.titleEn, hotspot.titleCn).toUpperCase()}
            </span>
            <span className={`absolute top-1/2 h-px w-8 bg-[#f1ecda]/70 transition-transform duration-300 ${activeHotspot === hotspot.target ? 'scale-x-100' : 'scale-x-0'} ${hotspot.align === 'left' ? 'right-1/2 origin-right' : 'left-1/2 origin-left'}`} />
            <span
              id={`hotspot-${hotspot.target}-preview`}
              role="tooltip"
              aria-hidden={activeHotspot !== hotspot.target}
              className="hidden"
            >
              <span className="mb-1.5 flex items-center justify-between gap-3 text-[7px] tracking-[0.17em] text-[#f1ecda]/58">
                <span>{hotspot.action}</span>
                <span>ROLL {hotspot.roll}</span>
              </span>
              <span className="block font-heading text-[14px] font-700 tracking-[-0.02em] text-[#f3f0e5]">
                {t(hotspot.titleEn, hotspot.titleCn)}
              </span>
              <span className="mt-1 block font-body text-[9px] leading-[1.4] text-[#f3f0e5]/86">
                {t(hotspot.summaryEn, hotspot.summaryCn)}
              </span>
              <span className={`absolute top-0 h-px w-7 bg-[#f1ecda]/78 ${hotspot.align === 'left' ? '-right-7' : '-left-7'}`} />
              <span className={`absolute top-0 h-5 w-px rotate-45 bg-[#f1ecda]/52 ${hotspot.align === 'left' ? '-right-[34px]' : '-left-[34px]'}`} />
            </span>
          </button>
        ))}
      </motion.nav>

      <AnimatePresence>
        {activeHotspot && (() => {
          const hotspot = STUDIO_HOTSPOTS.find((item) => item.target === activeHotspot);
          if (!hotspot) return null;
          const sourceX = Number.parseFloat(hotspot.x);
          const sourceY = Number.parseFloat(hotspot.y);
          const elbowX = (sourceX + hotspot.briefX) / 2;
          return (
            <motion.div key={`brief-${hotspot.target}`} className="pointer-events-none absolute inset-0 z-[21] hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}>
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <motion.path d={`M ${sourceX} ${sourceY} L ${elbowX} ${sourceY} L ${hotspot.briefX} ${hotspot.briefY}`} fill="none" stroke="rgba(241,236,218,0.82)" strokeWidth="0.12" vectorEffect="non-scaling-stroke" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.46, ease: [0.16, 1, 0.3, 1] }} />
                <circle cx={hotspot.briefX} cy={hotspot.briefY} r="0.34" fill="#f1ecda" />
              </svg>
              <motion.div className="absolute w-[220px] border-l border-[#f1ecda]/80 bg-[linear-gradient(90deg,rgba(5,13,14,0.84),rgba(5,13,14,0.48),transparent)] px-3 py-2 text-left shadow-[0_8px_28px_rgba(0,0,0,0.22)]" style={{ left: `${hotspot.briefX}%`, top: `${hotspot.briefY}%` }} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.28, delay: prefersReducedMotion ? 0 : 0.16 }}>
                <div className="flex items-center justify-between font-mono-custom text-[7px] tracking-[0.18em] text-[#f1ecda]/64"><span>{hotspot.action}</span><span>ROLL {hotspot.roll}</span></div>
                <div className="mt-2 flex gap-2.5">
                  {hotspot.preview ? <img src={hotspot.preview} alt="" className="h-11 w-[68px] shrink-0 border border-[#f1ecda]/35 object-cover" /> : <span className="relative h-11 w-[68px] shrink-0 border border-[#f1ecda]/42"><span className="absolute inset-y-0 left-1/2 border-l border-[#f1ecda]/28" /><span className="absolute bottom-2 right-2 h-1.5 w-1.5 border border-[#f1ecda]/70" /></span>}
                  <div><div className="font-heading text-[14px] font-700 tracking-[-0.02em] text-[#f3f0e5]">{t(hotspot.titleEn, hotspot.titleCn)}</div><p className="mt-0.5 font-body text-[8px] leading-[1.4] text-[#f3f0e5]/88">{t(hotspot.summaryEn, hotspot.summaryCn)}</p></div>
                </div>
                <div className="mt-1.5 border-t border-[#f1ecda]/18 pt-1 font-mono-custom text-[6px] tracking-[0.16em] text-[#f1ecda]/56">LIVE MATERIAL / {hotspot.object}</div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {!prefersReducedMotion && (
        <motion.div
          data-focus-reticle
          className="pointer-events-none absolute left-0 top-0 z-[19] hidden md:block"
          style={{ x: focusX, y: focusY }}
          animate={{ opacity: pointerActive ? 0.7 : 0, scale: pointerActive ? 1 : 0.82 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          <div className="relative h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-[#ece8d7] mix-blend-difference">
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-current" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-current" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-current" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-current" />
            <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-current" />
          </div>
        </motion.div>
      )}

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[28vh] bg-gradient-to-b from-transparent via-[#f2f3ef]/20 to-[#f2f3ef]"
        style={{ opacity: transitionVeil }}
        aria-hidden="true"
      />

      {!prefersReducedMotion && (
        <>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.25, delay: 0.2, ease: [0.22, 0.7, 0.22, 1] }}
            className="pointer-events-none absolute inset-0 z-[22] bg-[#0b1211]"
          />
          <motion.div
            initial={{ scaleY: 0.04, opacity: 0 }}
            animate={{ scaleY: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 1.05, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute inset-y-0 left-1/2 z-[23] w-px origin-center bg-[#efead1] shadow-[0_0_34px_12px_rgba(229,211,157,0.2)]"
          />
        </>
      )}

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 text-[#F3F4EF]"
        animate={prefersReducedMotion ? undefined : { opacity: [1, 0.92, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {['left-[3.8vw] top-[5.7vh] border-l border-t', 'right-[3.8vw] top-[5.7vh] border-r border-t', 'bottom-[5.5vh] left-[3.8vw] border-b border-l', 'bottom-[5.5vh] right-[3.8vw] border-b border-r'].map((position) => (
          <motion.span
            key={position}
            initial={prefersReducedMotion ? false : { opacity: 0, filter: 'blur(4px)' }}
            animate={introReady ? { opacity: 0.76, filter: 'blur(0px)' } : { opacity: 0 }}
            transition={introTransition}
            className={`absolute h-14 w-14 ${position} md:h-20 md:w-20`}
          />
        ))}
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
        animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ ...introTransition, delay: prefersReducedMotion ? 0 : 0.15 }}
        className="absolute left-[calc(3.8vw+18px)] top-[calc(5.7vh+18px)] z-20 font-mono-custom text-[9px] tracking-[0.12em] text-[#F3F4EF]"
      >
        <div className="flex items-center gap-2.5">
          {recording && <span className="h-1.5 w-1.5 rounded-full bg-[#b4473e]" />}
          <span>{recording ? 'REC' : 'CAM 01'}</span>
          {recording && <time className="tabular-nums">{formatTimecode(recordTime)}</time>}
        </div>
        {recording && (
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-[#F3F4EF]/45 pt-2">
            <span className="text-[#F3F4EF]/70">CAREER ROLL</span>
            <time>2023 - PRESENT</time>
            <span className="col-span-2 text-[#F3F4EF]/70">SOURCE / REY WU</span>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={introReady && !recording ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
        className="absolute bottom-[calc(5.5vh+18px)] right-[calc(3.8vw+18px)] z-20 hidden items-center gap-3 font-mono-custom text-[8px] tracking-[0.13em] text-[#F3F4EF]/72 md:flex"
      >
        <span>{heroScene.condition}</span>
        <span className="opacity-45">/</span>
        <span>WIND {heroScene.wind}</span>
        <span className="opacity-45">/</span>
        <span>SEA {heroScene.sea}</span>
      </motion.div>

      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={introReady && !recording ? { opacity: 1, y: 0 } : { opacity: 0, y: recording ? -10 : 14 }}
        transition={introTransition}
        className="pointer-events-none relative z-20 w-full px-[max(5vw,1.25rem)] py-24"
        style={{ opacity: titleOpacity }}
      >
        <div className="max-w-[540px]">
          <h1
            className="font-heading font-800 leading-[0.84] tracking-[-0.065em] text-[#F3F4EF]"
            style={{ fontSize: 'clamp(4rem, 7.5vw, 7.25rem)' }}
          >
            <span className="block">Rey&rsquo;s</span>
            <span className="block">World</span>
          </h1>
          <p className="mt-7 max-w-[390px] font-body text-sm leading-[1.65] text-[#F3F4EF]/76 md:text-base">
            {t(
              'Film, creative systems and AI production, built from one working world.',
              '从同一个创作世界出发，连接电影、创意系统与 AI 生产。',
            )}
          </p>
          <button
            type="button"
            onClick={startRecording}
            disabled={!introReady}
            className="pointer-events-auto mt-8 border border-[#F3F4EF]/48 bg-[#07100f]/32 px-5 py-3 font-mono-custom text-[10px] tracking-[0.16em] text-[#F3F4EF] backdrop-blur-sm transition-colors duration-300 hover:bg-[#F3F4EF]/12 active:translate-y-px disabled:cursor-default disabled:opacity-30"
          >
            {t('START RECORDING', '开始记录')}
          </button>
        </div>
      </motion.div>

      <nav
        className="absolute bottom-[calc(5.5vh+14px)] left-[calc(3.8vw+14px)] right-[calc(3.8vw+14px)] z-20 flex gap-4 overflow-x-auto border-b border-[#F3F4EF]/34 pb-2 lg:hidden"
        aria-label="Studio routes"
      >
        {STUDIO_HOTSPOTS.map((hotspot) => (
          <button
            key={hotspot.target}
            type="button"
            onClick={() => openRoll(hotspot.target)}
            className="shrink-0 font-mono-custom text-[8px] tracking-[0.14em] text-[#F3F4EF]/72 transition-colors hover:text-[#F3F4EF]"
          >
            {t(hotspot.titleEn, hotspot.titleCn)}
          </button>
        ))}
      </nav>
    </section>
  );
}
