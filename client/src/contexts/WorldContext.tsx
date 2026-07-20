import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type WorldContextValue = { paused: boolean; togglePaused: () => void };
const WorldContext = createContext<WorldContextValue | null>(null);

export function WorldProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(() => {
    if (typeof window === 'undefined') return false;
    try { return window.localStorage.getItem('rey-world-paused') === 'true'; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.worldPaused = paused ? 'true' : 'false';
    try { window.localStorage.setItem('rey-world-paused', String(paused)); } catch { /* storage is optional */ }
    window.dispatchEvent(new CustomEvent('rey-world-pause-change', { detail: { paused } }));
  }, [paused]);
  const value = useMemo(() => ({ paused, togglePaused: () => setPaused((value) => !value) }), [paused]);
  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export function useWorld() {
  const context = useContext(WorldContext);
  if (!context) throw new Error('useWorld must be used within WorldProvider');
  return context;
}
