import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import FilmGate from '@/components/FilmGate';

export const MAJOR_ROLLS = [
  { id: 'home', roll: '01', shot: 'WORLD' },
  { id: 'about', roll: '02', shot: 'PROFILE' },
  { id: 'projects', roll: '03', shot: 'PROJECTS' },
  { id: 'film', roll: '04', shot: 'FILM' },
  { id: 'experiments', roll: '05', shot: 'EXPERIMENTS' },
  { id: 'contact', roll: '06', shot: 'CONTACT' },
] as const;

export type UnitReelRequest = {
  target: string;
  from?: string;
  direction?: 'forward' | 'reverse';
};

export function requestUnitReel(detail: UnitReelRequest) {
  window.dispatchEvent(new CustomEvent<UnitReelRequest>('unit-reel-request', { detail }));
}

export function getCurrentRollId() {
  const marker = window.scrollY + Math.min(160, window.innerHeight * 0.25);
  let current = MAJOR_ROLLS[0].id as string;
  for (const roll of MAJOR_ROLLS) {
    const section = document.getElementById(roll.id);
    if (section && section.offsetTop <= marker) current = roll.id;
  }
  return current;
}

export default function UnitReelTransition() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [fromId, setFromId] = useState('home');
  const [targetId, setTargetId] = useState('about');
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
  const locked = useRef(false);
  const timers = useRef<number[]>([]);

  const runTransition = useCallback((request: UnitReelRequest) => {
    if (locked.current) return;
    const currentId = getCurrentRollId();
    if (request.target === currentId) {
      if (currentId === 'home') {
        window.dispatchEvent(new CustomEvent('hero-reset-recording'));
        window.scrollTo({ top: 0, behavior: 'auto' });
        window.history.replaceState(null, '', `${window.location.pathname}#home`);
      }
      return;
    }
    const target = MAJOR_ROLLS.find((roll) => roll.id === request.target);
    if (!target) return;
    const from = MAJOR_ROLLS.find((roll) => roll.id === (request.from ?? currentId)) ?? MAJOR_ROLLS[0];
    const fromIndex = MAJOR_ROLLS.findIndex((roll) => roll.id === from.id);
    const targetIndex = MAJOR_ROLLS.findIndex((roll) => roll.id === target.id);
    const resolvedDirection = request.direction ?? (targetIndex < fromIndex ? 'reverse' : 'forward');

    locked.current = true;
    setFromId(from.id);
    setTargetId(target.id);
    setDirection(resolvedDirection);
    setActive(true);
    document.body.style.overflow = 'hidden';

    const switchAt = prefersReducedMotion ? 0 : 1320;
    const finishAt = prefersReducedMotion ? 0 : 3000;
    const moveToTarget = () => {
      const targetSection = document.getElementById(target.id);
      if (targetSection) window.scrollTo({ top: targetSection.offsetTop, behavior: 'auto' });
      window.history.replaceState(null, '', `${window.location.pathname}#${target.id}`);
    };
    timers.current.push(window.setTimeout(() => {
      if (target.id === 'home') window.dispatchEvent(new CustomEvent('hero-reset-recording'));
      document.body.style.overflow = '';
      moveToTarget();
    }, switchAt));
    timers.current.push(window.setTimeout(() => {
      setActive(false);
      locked.current = false;
      document.body.style.overflow = '';
      // Reassert the physical position after the gate and late-loading media settle.
      // replaceState keeps the visible route in sync without a second native anchor jump.
      moveToTarget();
      window.dispatchEvent(new CustomEvent('unit-reel-complete', { detail: { target: target.id } }));
    }, finishAt));
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleRequest = (event: Event) => runTransition((event as CustomEvent<UnitReelRequest>).detail);
    window.addEventListener('unit-reel-request', handleRequest);
    return () => window.removeEventListener('unit-reel-request', handleRequest);
  }, [runTransition]);

  useEffect(() => () => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    document.body.style.overflow = '';
  }, []);

  const from = MAJOR_ROLLS.find((roll) => roll.id === fromId) ?? MAJOR_ROLLS[0];
  const target = MAJOR_ROLLS.find((roll) => roll.id === targetId) ?? MAJOR_ROLLS[1];

  return (
    <FilmGate
      active={active}
      label={`${targetId === 'home' ? 'REWIND' : 'LOAD NEXT ROLL'} / ${target.shot}`}
      fromRoll={from.roll}
      fromShot={from.shot}
      toRoll={target.roll}
      targetShot={target.shot}
      direction={direction}
    />
  );
}
