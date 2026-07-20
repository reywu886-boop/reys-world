/*
 * Editorial Modernism: Film Section
 * - Poster (left, tall) + info + stills (right)
 * - Campus image as subtle atmospheric background
 * - Bilibili video embed below
 * - Cinematic widescreen layout with real film stills
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import StudioContinuityLayer from '@/components/StudioContinuityLayer';
import RewindToStudio from '@/components/RewindToStudio';

const FILM_POSTER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381321541/4kUyaQrvQwjTjCksyMRpb7/film-poster_2776230b.jpg';
const FILM_CLASSROOM_SHADOW = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381321541/4kUyaQrvQwjTjCksyMRpb7/film-still-desk_4fab70ec.jpg';
const FILM_GIRL_BACK = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381321541/4kUyaQrvQwjTjCksyMRpb7/film-still-closeup_3a140cda.jpg';
const FILM_CAMPUS = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663381321541/4kUyaQrvQwjTjCksyMRpb7/film-campus_35cc6f5a.jpg';

export default function FilmSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [wipe, setWipe] = useState(54);
  const [screening, setScreening] = useState(false);

  return (
    <section id="film" className="py-32 md:py-40 bg-[#FAFAFA] relative overflow-hidden">
      <StudioContinuityLayer artifact="MONITOR" meaning="FILM" accent="rgba(98,128,141,0.18)" origin="center" />
      <RewindToStudio from="film" object="MONITOR" />
      {/* Atmospheric campus background — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${FILM_CAMPUS})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.04,
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">04</span>
            <div className="editorial-line flex-1" />
            <h2 className="font-heading font-700 text-[#0A0A0A] text-3xl md:text-4xl tracking-tight">
              {t('Film', '影片')}
            </h2>
          </div>
          <p className="text-[#AAAAAA] text-xs font-mono-custom tracking-widest uppercase mb-16">
            {t('Poster · Stills · Full Film. Watch the complete work below.', '海报 · 剧照 · 完整正片。在下方观看完整影片。')}
          </p>
          <button type="button" onClick={() => { setScreening(true); window.dispatchEvent(new CustomEvent('rey-world-interaction', { detail: { roll: 'film', kind: 'screening' } })); }} className="mb-10 border border-[#0A0A0A]/38 px-4 py-2 font-mono-custom text-[9px] tracking-[0.16em] text-[#0A0A0A] transition hover:bg-[#0A0A0A] hover:text-white">ENTER SCREENING MODE</button>
        </SectionReveal>

        {/* Main editorial layout: Poster + Info + Stills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">

          {/* LEFT: Tall poster */}
          <SectionReveal delay={100} className="lg:col-span-4">
            <div className="relative group overflow-hidden" style={{ aspectRatio: '2/3' }}>
              <img
                src={FILM_POSTER}
                alt="清白之年 Where the flowers gone 电影海报"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Subtle vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </SectionReveal>

          {/* RIGHT: Info + Stills */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-8">

            {/* Film title & description */}
            <SectionReveal delay={150}>
              <div>
                <p className="text-[#AAAAAA] text-xs font-mono tracking-widest uppercase mb-3">
                  {t('Short Film · 2024', '短片 · 2024')}
                </p>
                <h3 className="font-heading font-800 text-[#0A0A0A] text-4xl md:text-5xl lg:text-6xl tracking-tight mb-2 leading-none">
                  {t('The Year of', '清白')}
                </h3>
                <h3 className="font-heading font-800 text-[#0A0A0A] text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 leading-none">
                  {t('Innocence', '之年')}
                </h3>
                <p className="text-[#6B6B6B] text-sm italic font-body mb-6 tracking-wide">
                  Where the flowers gone
                </p>
                <p className="text-[#4A4A4A] text-base font-body leading-relaxed max-w-[480px]">
                  {t(
                    'A story about what we carry from youth, and what we leave behind.',
                    '一个关于我们从青春带走什么、又放下什么的故事。'
                  )}
                </p>
              </div>
            </SectionReveal>

            {/* Two film stills side by side */}
            <SectionReveal delay={200}>
              <div className="relative overflow-hidden border border-[#0A0A0A]/22 bg-[#101716]" style={{ aspectRatio: '16/9' }} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setWipe(Math.min(96, Math.max(4, ((event.clientX - rect.left) / rect.width) * 100))); }}>
                {/* Still 1: Classroom shadow — cinematic, dark */}
                <div className="absolute inset-0 group overflow-hidden">
                  <img
                    src={FILM_CLASSROOM_SHADOW}
                    alt="剧照：教室光影"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                </div>
                {/* Still 2: Girl back in classroom — warm, narrative */}
                <div className="hidden">
                  <img
                    src={FILM_GIRL_BACK}
                    alt="剧照：教室背影"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
                </div>
                <motion.div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden border-r border-white/80 shadow-[5px_0_18px_rgba(255,255,255,0.5)]" animate={{ width: `${wipe}%` }} transition={{ duration: reduced ? 0 : 0.1 }}>
                  <img src={FILM_GIRL_BACK} alt="" className="h-full w-full object-cover" />
                </motion.div>
                <span className="pointer-events-none absolute left-3 top-3 z-20 bg-black/52 px-2 py-1 font-mono-custom text-[8px] tracking-[0.16em] text-white/84">TAKE 04 / {String(Math.round(wipe)).padStart(2, '0')}</span>
                <span className="pointer-events-none absolute bottom-2 right-2 z-20 font-mono-custom text-[7px] tracking-[0.14em] text-white/82">SCRUB TO COMPARE</span>
              </div>
            </SectionReveal>

            {/* Stats + Credits row */}
            <SectionReveal delay={250}>
              <div className="flex flex-wrap items-end justify-between gap-6 pt-4 border-t border-[#E8E8E8]">
                {/* Stats */}
                <div className="flex gap-10">
                  <div>
                    <span className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl block">1.2M+</span>
                    <span className="text-[#AAAAAA] text-xs font-body mt-1 block tracking-wide">{t('Total Views', '总播放量')}</span>
                  </div>
                  <div>
                    <span className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl block">1M+</span>
                    <span className="text-[#AAAAAA] text-xs font-body mt-1 block tracking-wide">{t('Bilibili Views', 'B站播放量')}</span>
                  </div>
                </div>
                {/* Credits */}
                <div className="flex flex-wrap gap-6">
                  {[
                    { role: t('Writer', '编剧'), name: 'Rey Wu' },
                    { role: t('Director', '导演'), name: 'Rey Wu' },
                    { role: t('Editor', '剪辑'), name: 'Rey Wu' },
                  ].map((credit, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[#AAAAAA] text-[10px] font-body tracking-widest uppercase">{credit.role}</span>
                      <span className="text-[#0A0A0A] text-sm font-body font-500 mt-0.5">{credit.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* Video embed — full width below */}
        <SectionReveal delay={300}>
          <div className="mb-4">
            <p className="text-[#AAAAAA] text-xs font-mono tracking-widest uppercase mb-4">
              {t('Watch Film', '观看影片')}
            </p>
          </div>
          <div
            className="relative w-full bg-[#0A0A0A] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.10)]"
            style={{ aspectRatio: '16/9' }}
          >
            <iframe
              src="https://player.bilibili.com/player.html?bvid=BV1FirCYYE4P&page=1&high_quality=1&danmaku=0"
              title={t('The Year of Innocence player', '《清白之年》播放器')}
              loading="lazy"
              tabIndex={-1}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              allow="fullscreen"
              sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups"
              style={{ border: 'none' }}
            />
          </div>
        </SectionReveal>
      </div>
      <AnimatePresence>
        {screening && <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050807] p-5 text-white md:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" onClick={() => setScreening(false)} className="absolute right-6 top-6 border border-white/32 px-3 py-2 font-mono-custom text-[8px] tracking-[0.15em] text-white/76">EXIT SCREENING</button>
          <div className="w-full max-w-[1500px]"><div className="mb-3 flex justify-between font-mono-custom text-[8px] tracking-[0.16em] text-white/48"><span>REY'S WORLD / SCREENING ROOM</span><span>THE YEAR OF INNOCENCE / 2024</span></div><div className="relative aspect-video overflow-hidden border border-white/22 bg-black"><iframe src="https://player.bilibili.com/player.html?bvid=BV1FirCYYE4P&page=1&high_quality=1&danmaku=0" title="The Year of Innocence screening" className="absolute inset-0 h-full w-full" allowFullScreen allow="fullscreen" style={{ border: 'none' }} /></div></div>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}
