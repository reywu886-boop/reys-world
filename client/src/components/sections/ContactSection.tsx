/*
 * Editorial Modernism: Contact Section (v2 — Typographic Background)
 * - Minimal contact info with editorial layout
 * - Background: oversized "→" arrow watermark (bottom-left)
 *   + ultra-fine horizontal scan lines
 *   + top-edge gradient fade
 */
import { useLanguage } from '@/contexts/LanguageContext';
import SectionReveal from '@/components/SectionReveal';
import StudioContinuityLayer from '@/components/StudioContinuityLayer';
import RewindToStudio from '@/components/RewindToStudio';
import { useEffect, useState } from 'react';

// Ultra-fine horizontal scan lines: 4px pitch
const SCANLINE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Crect y='3' width='4' height='0.5' fill='%230A0A0A'/%3E%3C/svg%3E`;

const openTo = [
  { en: 'AI Content Systems', cn: 'AI 内容系统' },
  { en: 'Director Agent Products', cn: '导演 Agent 产品' },
  { en: 'Video Model Strategy', cn: '视频模型策略' },
];

export default function ContactSection() {
  const { t } = useLanguage();
  const [doorOpen, setDoorOpen] = useState(false);
  const [weather, setWeather] = useState('afterRain');

  useEffect(() => {
    const updateWeather = (event: Event) => setWeather((event as CustomEvent<{ scene?: string }>).detail?.scene ?? 'afterRain');
    window.addEventListener('studio-weather', updateWeather);
    return () => window.removeEventListener('studio-weather', updateWeather);
  }, []);
  const doorLight = weather === 'lateAfternoon'
    ? 'linear-gradient(90deg,#121a19 0%,#263229 42%,#ddab68 100%)'
    : weather === 'starNight'
      ? 'linear-gradient(90deg,#080d11 0%,#101b25 48%,#526d91 100%)'
      : weather === 'blueHourRain'
        ? 'linear-gradient(90deg,#0b1418 0%,#1c2b37 48%,#7594b2 100%)'
        : 'linear-gradient(90deg,#121a19 0%,#1e2a28 48%,#7898a0 100%)';

  return (
    <section id="contact" className="py-32 md:py-40 bg-white relative overflow-hidden">
      <StudioContinuityLayer artifact="DOOR" meaning="EXCHANGE" accent="rgba(180,100,72,0.17)" origin="right" />
      <RewindToStudio from="contact" object="DOOR" />

      {/* ── Background: ultra-fine horizontal scan lines, barely perceptible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${SCANLINE_SVG}")`,
          backgroundSize: '4px 4px',
          opacity: 0.018,
        }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10">
        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-4 mb-20">
            <span className="section-number">07</span>
            <div className="editorial-line flex-1" />
            <h2 className="font-heading font-700 text-[#0A0A0A] text-3xl md:text-4xl tracking-tight">
              {t('Contact', '联系')}
            </h2>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: CTA text */}
          <div className="lg:col-span-7">
            <SectionReveal delay={100}>
              <h3
                className="font-heading font-800 text-[#0A0A0A] tracking-tight leading-[1.1] mb-8"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
              >
                {t("Let's create something together.", '一起创造点什么。')}
              </h3>
              <p className="text-[#6B6B6B] text-base md:text-lg font-body leading-relaxed max-w-[480px]">
                {t(
                  'Open to roles and collaborations that connect cinematic judgment, content production, AI products and model strategy.',
                  '期待连接影视判断、内容生产、AI 产品与模型策略的岗位和合作。'
                )}
              </p>
            </SectionReveal>
          </div>

          {/* Right: Contact details */}
          <div className="lg:col-span-5">
            <SectionReveal delay={200}>
              {/* Email */}
              <div className="mb-10">
                <span className="section-number block mb-3">{t('Email', '邮箱')}</span>
                <a
                  href="mailto:18868497748@163.com"
                  className="text-[#0A0A0A] text-lg font-body font-500 link-underline hover:text-[#4A4A4A] transition-colors duration-300"
                >
                  18868497748@163.com
                </a>
              </div>

              {/* Location */}
              <div className="mb-10">
                <span className="section-number block mb-3">{t('Location', '所在地')}</span>
                <p className="text-[#0A0A0A] text-lg font-body font-500">
                  {t('Beijing / Hangzhou', '北京 / 杭州')}
                </p>
              </div>

              {/* Open to */}
              <div>
                <span className="section-number block mb-3">{t('Open To', '开放合作')}</span>
                <div className="space-y-2">
                  {openTo.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <span className="font-mono-custom text-[10px] text-[#CCCCCC] group-hover:text-[#0A0A0A] transition-colors duration-300">0{i + 1}</span>
                      <span className="text-[#0A0A0A] text-sm font-body">{t(item.en, item.cn)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
        <SectionReveal delay={260}>
          <button type="button" onClick={() => { setDoorOpen((value) => !value); window.dispatchEvent(new CustomEvent('rey-world-interaction', { detail: { roll: 'contact', kind: 'door' } })); }} className="group relative mt-20 block h-[260px] w-full overflow-hidden border border-[#0A0A0A]/28 bg-[#17201d] text-left md:h-[330px]">
            <div className="absolute inset-0 transition-colors duration-[1400ms]" style={{ background: `radial-gradient(circle at 68% 45%,rgba(255,218,159,0.46),transparent 6%,transparent 36%),${doorLight}` }} />
            <div className="absolute inset-y-0 left-0 w-1/2 origin-left border-r border-white/18 bg-[#101716] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: doorOpen ? 'perspective(900px) rotateY(-72deg)' : 'perspective(900px) rotateY(0deg)' }} />
            <div className="absolute inset-y-0 right-0 w-1/2 origin-right border-l border-white/18 bg-[#101716] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: doorOpen ? 'perspective(900px) rotateY(72deg)' : 'perspective(900px) rotateY(0deg)' }} />
            <span className="absolute left-6 top-6 font-mono-custom text-[9px] tracking-[0.17em] text-white/76">{doorOpen ? `THRESHOLD OPEN / ${weather.toUpperCase()}` : 'OPEN THE DOOR / CONTACT'}</span>
            <span className="absolute bottom-6 left-6 max-w-[260px] font-heading text-2xl font-700 text-white md:text-3xl">{doorOpen ? t('The studio is open.', '工作室已向你打开。') : t('A collaboration begins at the threshold.', '合作从门槛处开始。')}</span>
          </button>
        </SectionReveal>
      </div>
    </section>
  );
}
