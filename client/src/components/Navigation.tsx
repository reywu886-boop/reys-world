/*
 * Editorial Modernism Navigation
 * - Minimal top bar with fine line border bottom
 * - Left: Logo/Name, Right: Nav links + Language switcher
 * - Shrinks on scroll, transparent initially
 * - Active section highlighting via IntersectionObserver
 */
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWorld } from '@/contexts/WorldContext';
import { getCurrentRollId, MAJOR_ROLLS, requestUnitReel } from '@/components/UnitReelTransition';

const navItems = [
  { id: 'home', en: 'Home', cn: '首页' },
  { id: 'about', en: 'About', cn: '关于' },
  { id: 'projects', en: 'Projects', cn: '项目' },
  { id: 'film', en: 'Film', cn: '影片' },
  { id: 'experiments', en: 'Experiments', cn: '实验' },
  { id: 'contact', en: 'Contact', cn: '联系' },
];

export default function Navigation() {
  const { lang, toggleLang } = useLanguage();
  const { paused, togglePaused } = useWorld();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [heroDark, setHeroDark] = useState(false);

  useEffect(() => {
    const handleHeroTone = (event: Event) => {
      setHeroDark(Boolean((event as CustomEvent<{ dark: boolean }>).detail?.dark));
    };
    window.addEventListener('hero-tone-change', handleHeroTone);
    return () => window.removeEventListener('hero-tone-change', handleHeroTone);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map(item => item.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const currentId = getCurrentRollId();
    const fromIndex = MAJOR_ROLLS.findIndex((roll) => roll.id === currentId);
    const targetIndex = MAJOR_ROLLS.findIndex((roll) => roll.id === id);
    requestUnitReel({
      from: currentId,
      target: id,
      direction: targetIndex < fromIndex ? 'reverse' : 'forward',
    });
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleReelComplete = (event: Event) => {
      const target = (event as CustomEvent<{ target?: string }>).detail?.target;
      if (target && navItems.some((item) => item.id === target)) setActiveSection(target);
    };
    window.addEventListener('unit-reel-complete', handleReelComplete);
    return () => window.removeEventListener('unit-reel-complete', handleReelComplete);
  }, []);

  const useDarkHeroTone = !scrolled && heroDark;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E5E5E5]'
          : 'bg-transparent'
      }`}
    >
      <div className="container">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'h-14' : 'h-20'
        }`}>
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection('home')}
            className={`font-heading font-700 text-lg tracking-tight hover:opacity-70 transition-colors duration-500 ${
              useDarkHeroTone ? 'text-[#F3F4EF]' : 'text-[#0A0A0A]'
            }`}
          >
            Rey's World
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`link-underline text-sm font-body transition-colors duration-300 ${
                  activeSection === item.id
                    ? useDarkHeroTone ? 'text-[#F3F4EF] font-500' : 'text-[#0A0A0A] font-500'
                    : useDarkHeroTone ? 'text-[#F3F4EF]/68 hover:text-[#F3F4EF]' : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
                }`}
              >
                {lang === 'en' ? item.en : item.cn}
              </button>
            ))}

            {/* Language Switcher */}
            <div className={`flex items-center gap-1 ml-4 pl-4 border-l ${useDarkHeroTone ? 'border-[#F3F4EF]/28' : 'border-[#E5E5E5]'}`}>
              <button type="button" onClick={togglePaused} aria-pressed={paused} className={`mr-3 font-mono-custom text-[8px] tracking-[0.13em] transition-colors ${useDarkHeroTone ? 'text-[#F3F4EF]/68 hover:text-[#F3F4EF]' : 'text-[#6B6B6B] hover:text-[#0A0A0A]'}`}>
                {paused ? 'RESUME WORLD' : 'PAUSE WORLD'}
              </button>
              <button
                onClick={toggleLang}
                className={`font-mono-custom text-xs tracking-wider transition-colors ${useDarkHeroTone ? 'text-[#F3F4EF]/68 hover:text-[#F3F4EF]' : 'text-[#6B6B6B] hover:text-[#0A0A0A]'}`}
              >
                {lang === 'en' ? '中文' : 'EN'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1px] transition-all duration-300 ${useDarkHeroTone ? 'bg-[#F3F4EF]' : 'bg-[#0A0A0A]'} ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-[1px] transition-all duration-300 ${useDarkHeroTone ? 'bg-[#F3F4EF]' : 'bg-[#0A0A0A]'} ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-[#FAFAFA]/95 backdrop-blur-md border-b border-[#E5E5E5] px-5 pb-6 pt-2">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left py-3 text-sm font-body transition-colors border-b border-[#E5E5E5]/50 last:border-0 ${
                activeSection === item.id
                  ? 'text-[#0A0A0A] font-500'
                  : 'text-[#6B6B6B] hover:text-[#0A0A0A]'
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span className="section-number mr-3">0{i + 1}</span>
              {lang === 'en' ? item.en : item.cn}
            </button>
          ))}
          <button
            type="button"
            onClick={togglePaused}
            aria-pressed={paused}
            className="mt-4 mr-4 font-mono-custom text-xs tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
          >
            {paused ? 'Resume world' : 'Pause world'}
          </button>
          <button
            onClick={toggleLang}
            className="mt-4 font-mono-custom text-xs tracking-wider text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
          >
            {lang === 'en' ? '切换中文' : 'Switch to EN'}
          </button>
        </div>
      </div>
    </nav>
  );
}
