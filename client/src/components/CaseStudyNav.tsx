/**
 * Shared navigation bar for Case Study pages.
 * Editorial Modernism — fixed top bar, back link + language toggle.
 */
import { useLanguage } from '@/contexts/LanguageContext';
import type { MouseEvent } from 'react';

export default function CaseStudyNav({ fixedLanguage }: { fixedLanguage?: 'cn' | 'en' }) {
  const { t, toggleLang, lang } = useLanguage();
  const label = (en: string, cn: string) => fixedLanguage === 'cn' ? cn : fixedLanguage === 'en' ? en : t(en, cn);
  const returnToProjects = () => sessionStorage.setItem('rey-return-target', 'projects');
  const goBack = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.history.length > 1) {
      event.preventDefault();
      window.history.back();
      return;
    }
    returnToProjects();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#E5E5E5]">
      <div className="container flex items-center justify-between h-14">
        <a href="/" className="font-heading font-700 text-[#0A0A0A] text-sm tracking-tight">Rey Wu</a>
        <div className="flex items-center gap-6">
          <a href="/#projects" onClick={goBack} className="font-mono-custom text-[10px] text-[#6B6B6B] tracking-widest uppercase hover:text-[#0A0A0A] transition-colors">
            ← {label('Back to Portfolio', '返回作品集')}
          </a>
          {!fixedLanguage && <button
              onClick={toggleLang}
              className="font-mono-custom text-[10px] text-[#6B6B6B] tracking-widest uppercase hover:text-[#0A0A0A] transition-colors border border-[#E5E5E5] px-2 py-1 hover:border-[#0A0A0A]"
            >
              {lang === 'en' ? '中文' : 'EN'}
            </button>}
        </div>
      </div>
    </nav>
  );
}
