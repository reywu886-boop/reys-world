/*
 * Editorial Modernism: Footer
 * - Minimal, fine line top border
 * - Copyright and back-to-top
 * - Enhanced hover effects
 */
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E5E5E5] py-8 bg-[#FAFAFA]">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-heading font-600 text-[#0A0A0A] text-sm">Rey Wu</span>
            <span className="text-[#CCCCCC] text-xs font-body">
              &copy; {new Date().getFullYear()} {t('All rights reserved.', '保留所有权利。')}
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="section-number hover:text-[#0A0A0A] transition-colors duration-300 group flex items-center gap-2"
          >
            {t('Back to top', '回到顶部')}
            <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
