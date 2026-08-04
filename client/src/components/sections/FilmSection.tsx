/*
 * Editorial Modernism: Film Section
 * - Original short-film layout preserved
 * - AI documentary receives its own focused visual treatment
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
  const { lang, t } = useLanguage();
  const reduced = useReducedMotion();
  const [wipe, setWipe] = useState(54);
  const [screening, setScreening] = useState(false);
  const displayFont = lang === 'cn' ? 'font-cn' : 'font-heading';

  return (
    <section id="film" className="relative overflow-hidden bg-[#FAFAFA] py-32 md:py-40">
      <StudioContinuityLayer artifact="MONITOR" meaning="FILM" accent="rgba(98,128,141,0.18)" origin="center" />
      <RewindToStudio from="film" object="MONITOR" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `url(${FILM_CAMPUS})`, backgroundPosition: 'center 30%', backgroundSize: 'cover', opacity: 0.04 }}
      />

      <div className="container relative z-10">
        <SectionReveal>
          <div className="mb-4 flex items-center gap-4">
            <span className="section-number">04</span>
            <div className="editorial-line flex-1" />
            <h2 className={`${displayFont} text-3xl font-700 tracking-tight text-[#0A0A0A] md:text-4xl`}>
              {t('Film', '影片')}
            </h2>
          </div>
          <p className="mb-16 font-mono-custom text-xs uppercase tracking-widest text-[#AAAAAA]">
            {t('Poster · Stills · Full Film.', '海报 · 剧照 · 完整正片')}
          </p>
          <button type="button" onClick={() => { setScreening(true); window.dispatchEvent(new CustomEvent('rey-world-interaction', { detail: { roll: 'film', kind: 'screening' } })); }} className="mb-10 border border-[#0A0A0A]/38 px-4 py-2 font-mono-custom text-[9px] tracking-[0.16em] text-[#0A0A0A] transition hover:bg-[#0A0A0A] hover:text-white">
            ENTER SCREENING MODE
          </button>
        </SectionReveal>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <SectionReveal delay={100} className="lg:col-span-4">
            <div className="group relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
              <img src={FILM_POSTER} alt="清白之年 Where the flowers gone 电影海报" className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </SectionReveal>

          <div className="flex flex-col justify-between gap-8 lg:col-span-8">
            <SectionReveal delay={150}>
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-[#AAAAAA]">{t('Short Film · 2024', '短片 · 2024')}</p>
                <h3 className={`${displayFont} mb-2 text-4xl font-700 leading-none tracking-[-0.015em] text-[#0A0A0A] md:text-5xl lg:text-6xl`}>
                  {t('Where the flowers', '清白')}
                </h3>
                <h3 className={`${displayFont} mb-6 text-4xl font-700 leading-none tracking-[-0.015em] text-[#0A0A0A] md:text-5xl lg:text-6xl`}>
                  {t('gone', '之年')}
                </h3>
                {lang === 'cn' && <p className="mb-6 font-body text-sm italic tracking-wide text-[#6B6B6B]">Where the flowers gone</p>}
                <p className="max-w-[480px] font-body text-base leading-relaxed text-[#4A4A4A]">
                  {t('An original short film written, directed and produced by Rey Wu.', '原创短片《清白之年》，由我担任编剧、导演及制片。')}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div className="relative overflow-hidden border border-[#0A0A0A]/22 bg-[#101716]" style={{ aspectRatio: '16/9' }} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setWipe(Math.min(96, Math.max(4, ((event.clientX - rect.left) / rect.width) * 100))); }}>
                <div className="group absolute inset-0 overflow-hidden">
                  <img src={FILM_CLASSROOM_SHADOW} alt="剧照：教室光影" className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </div>
                <motion.div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden border-r border-white/80 shadow-[5px_0_18px_rgba(255,255,255,0.5)]" animate={{ width: `${wipe}%` }} transition={{ duration: reduced ? 0 : 0.1 }}>
                  <img src={FILM_GIRL_BACK} alt="" className="h-full w-full object-cover" />
                </motion.div>
                <span className="pointer-events-none absolute left-3 top-3 z-20 bg-black/52 px-2 py-1 font-mono-custom text-[8px] tracking-[0.16em] text-white/84">TAKE 04 / {String(Math.round(wipe)).padStart(2, '0')}</span>
                <span className="pointer-events-none absolute bottom-2 right-2 z-20 font-mono-custom text-[7px] tracking-[0.14em] text-white/82">SCRUB TO COMPARE</span>
              </div>
            </SectionReveal>

            <SectionReveal delay={250}>
              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[#E8E8E8] pt-4">
                <div className="flex gap-10">
                  <div><span className="block font-heading text-2xl font-700 text-[#0A0A0A] md:text-3xl">1.2M+</span><span className="mt-1 block font-body text-xs tracking-wide text-[#AAAAAA]">{t('Total Views', '总播放量')}</span></div>
                  <div><span className="block font-heading text-2xl font-700 text-[#0A0A0A] md:text-3xl">18 MIN</span><span className="mt-1 block font-body text-xs tracking-wide text-[#AAAAAA]">{t('Original Short Film', '原创短片')}</span></div>
                </div>
                <div className="flex flex-wrap gap-6">
                  {[{ role: t('Writer', '编剧'), name: 'Rey Wu' }, { role: t('Director', '导演'), name: 'Rey Wu' }, { role: t('Producer', '制片人'), name: 'Rey Wu' }].map((credit) => (
                    <div key={credit.role} className="flex flex-col"><span className="font-body text-[10px] uppercase tracking-widest text-[#AAAAAA]">{credit.role}</span><span className="mt-0.5 font-body text-sm font-500 text-[#0A0A0A]">{credit.name}</span></div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

        <SectionReveal delay={300}>
          <div className="mb-4"><p className="mb-4 font-mono text-xs uppercase tracking-widest text-[#AAAAAA]">{t('Watch Film', '观看影片')}</p></div>
          <div className="relative w-full overflow-hidden bg-[#0A0A0A] shadow-[0_8px_40px_rgba(0,0,0,0.10)]" style={{ aspectRatio: '16/9' }}>
            <iframe src="https://player.bilibili.com/player.html?bvid=BV1FirCYYE4P&page=1&high_quality=1&danmaku=0" title={t('Where the flowers gone player', '《清白之年》播放器')} loading="lazy" tabIndex={-1} className="absolute inset-0 h-full w-full" allowFullScreen allow="fullscreen" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups" style={{ border: 'none' }} />
          </div>
        </SectionReveal>

        <SectionReveal delay={360}>
          <article className="mt-24 border-t border-[#0A0A0A]/25 pt-10 md:mt-32 md:pt-12">
            <div className="mb-8 flex items-baseline justify-between gap-6 md:mb-10">
              <p className="font-body text-sm font-500 text-[#52645f]">{t('AI documentary', 'AI 纪录片')}</p>
              <p className="font-body text-sm tabular-nums text-[#52645f]">2026 / 14:01</p>
            </div>

            <video controls playsInline preload="metadata" poster="/media/later-cover-final.png" className="block aspect-video w-full bg-[#10110f] object-contain" aria-label={t('Play And Then, Life Went On', '播放《后来还有后来》')}>
              <source src="/media/mother-ai-documentary.mp4" type="video/mp4" />
            </video>

            <div className="grid gap-7 border-b border-[#0A0A0A]/18 py-8 md:grid-cols-[1.05fr_1.45fr] md:gap-12 md:py-10">
              <div>
                <p className={`${displayFont} text-balance text-xl font-600 leading-[1.5] tracking-[-0.01em] text-[#123d32] md:text-2xl`}>
                  {t('Every image and sound in the film was created with AI.', '全片影像与声音均由 AI 创作。')}
                </p>
                <p className="mt-3 max-w-[38ch] font-body text-sm leading-7 text-[#4A5F58]">
                  {t('Not AI-assisted live action. A complete documentary produced through one continuous AI audiovisual process.', '不是 AI 辅助实拍，而是一部通过完整 AI 音视频流程完成的纪录片。')}
                </p>
              </div>

              <div className="md:border-l md:border-[#0A0A0A]/14 md:pl-12">
                <p className="font-body text-sm font-600 text-[#173f34]">{t('Complete AI production', 'AI 全流程制作')}</p>
                <p className="mt-3 max-w-[68ch] font-body text-sm leading-7 text-[#52645f]">
                  {t('Oral memory / narrative design / AI image and sound / directing and editing / final delivery', '口述记忆 / 叙事设计 / AI 影像与声音 / 导演剪辑 / 成片交付')}
                </p>
              </div>
            </div>
          </article>
        </SectionReveal>
      </div>

      <AnimatePresence>
        {screening && <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050807] p-5 text-white md:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" onClick={() => setScreening(false)} className="absolute right-6 top-6 border border-white/32 px-3 py-2 font-mono-custom text-[8px] tracking-[0.15em] text-white/76">EXIT SCREENING</button>
          <div className="w-full max-w-[1500px]"><div className="mb-3 flex justify-between font-mono-custom text-[8px] tracking-[0.16em] text-white/48"><span>REY'S WORLD / SCREENING ROOM</span><span>WHERE THE FLOWERS GONE / 2024</span></div><div className="relative aspect-video overflow-hidden border border-white/22 bg-black"><iframe src="https://player.bilibili.com/player.html?bvid=BV1FirCYYE4P&page=1&high_quality=1&danmaku=0" title="Where the flowers gone screening" className="absolute inset-0 h-full w-full" allowFullScreen allow="fullscreen" style={{ border: 'none' }} /></div></div>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}
