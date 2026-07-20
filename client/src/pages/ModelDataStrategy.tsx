import CaseStudyNav from '@/components/CaseStudyNav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const COVER = '/creative-systems-hero-v1.png';

const STRATEGIES = [
  {
    number: '01', eyebrow: 'DATA DEFINITION', eyebrowZh: '\u6570\u636e\u5b9a\u4e49',
    title: 'What video is worth learning from.', titleZh: '\u4ec0\u4e48\u6837\u7684\u89c6\u9891\u503c\u5f97\u6a21\u578b\u5b66\u4e60\u3002',
    problem: 'Training data admission depended on individual judgment, so quality and aesthetic thresholds could drift between people.', problemZh: '\u8bad\u7ec3\u6570\u636e\u7684\u51c6\u5165\u4f9d\u8d56\u4e2a\u4eba\u5224\u65ad\uff0c\u8d28\u91cf\u548c\u5ba1\u7f8e\u9608\u503c\u5f88\u5bb9\u6613\u5728\u4e0d\u540c\u4eba\u4e4b\u95f4\u6f02\u79fb\u3002',
    work: 'Built a five-dimension, five-level standard across content quality, motion quality, motion intensity, clarity and aesthetics. Defined examples, counterexamples, SOPs and calibration cases.', workZh: '\u5efa\u7acb\u5305\u542b\u5185\u5bb9\u8d28\u91cf\u3001\u52a8\u6001\u8d28\u91cf\u3001\u52a8\u6001\u5f3a\u5ea6\u3001\u6e05\u6670\u5ea6\u4e0e\u5ba1\u7f8e\u7684\u4e94\u7ef4\u4e94\u7ea7\u6807\u51c6\uff0c\u5b9a\u4e49\u6b63\u53cd\u4f8b\u3001SOP \u4e0e\u6821\u51c6 Case\u3002',
    result: 'Made cinematic and aesthetic judgment discussable as a repeatable data-admission rule. Double-blind quality agreement reached 95%.', resultZh: '\u628a\u5f71\u89c6\u4e0e\u5ba1\u7f8e\u5224\u65ad\u8f6c\u6210\u53ef\u8ba8\u8bba\u3001\u53ef\u590d\u7528\u7684\u6570\u636e\u51c6\u5165\u89c4\u5219\uff1b\u53cc\u76f2\u8d28\u68c0\u4e00\u81f4\u7387\u8fbe 95%\u3002',
    tags: ['CONTENT', 'MOTION', 'AESTHETICS'],
  },
  {
    number: '02', eyebrow: 'CAPTION SYSTEM', eyebrowZh: 'CAPTION \u4f53\u7cfb',
    title: 'How a model learns to describe a video.', titleZh: '\u6a21\u578b\u5982\u4f55\u5b66\u4f1a\u63cf\u8ff0\u4e00\u6bb5\u89c6\u9891\u3002',
    problem: 'One person had to hold too many rules at once, making long-form video captions incomplete, inconsistent and slow.', problemZh: '\u5355\u4eba\u9700\u8981\u540c\u65f6\u8bb0\u5fc6\u592a\u591a\u89c4\u5219\uff0c\u4f7f\u957f\u89c6\u9891 Caption \u5bb9\u6613\u51fa\u73b0\u9057\u6f0f\u3001\u4e0d\u4e00\u81f4\u4e0e\u6548\u7387\u6ce2\u52a8\u3002',
    work: 'Participated in four-layer Caption Schema design and focused on turning the complex task into a collaborative production flow: summary, static visual information, motion and timing, then style and final review.', workZh: '\u53c2\u4e0e\u8bbe\u8ba1\u56db\u5c42 Caption Schema\uff0c\u5e76\u91cd\u70b9\u8d1f\u8d23\u628a\u590d\u6742\u4efb\u52a1\u62c6\u6210\u534f\u4f5c\u751f\u4ea7\u6d41\uff1a\u603b\u7ed3\u3001\u9759\u6001\u89c6\u89c9\u4fe1\u606f\u3001\u52a8\u6001\u4e0e\u65f6\u5e8f\uff0c\u4ee5\u53ca\u98ce\u683c\u4e0e\u7ec8\u5ba1\u3002',
    result: 'Caption accuracy improved from 40% to 80%, while production efficiency improved by 50%.', resultZh: 'Caption \u6807\u6ce8\u51c6\u786e\u7387\u4ece 40% \u63d0\u5347\u81f3 80%\uff0c\u751f\u4ea7\u6548\u7387\u63d0\u5347 50%\u3002',
    tags: ['SUMMARY', 'STATIC', 'MOTION', 'STYLE'],
  },
  {
    number: '03', eyebrow: 'CAMERA LANGUAGE', eyebrowZh: '\u955c\u5934\u8bed\u8a00',
    title: 'How professional camera movement enters the pipeline.', titleZh: '\u4e13\u4e1a\u8fd0\u955c\u5982\u4f55\u8fdb\u5165\u6570\u636e\u7ba1\u7ebf\u3002',
    problem: 'General VLMs struggle to distinguish professional camera movement, its direction, speed, duration and compound states.', problemZh: '\u901a\u7528 VLM \u96be\u4ee5\u533a\u5206\u4e13\u4e1a\u8fd0\u955c\u53ca\u5176\u65b9\u5411\u3001\u901f\u5ea6\u3001\u65f6\u957f\u4e0e\u590d\u5408\u72b6\u6001\u3002',
    work: 'Designed or contributed to a 29-class movement taxonomy, specialist data flow, calibration and corner-case iteration. Movement signals were mapped back into video Caption production.', workZh: '\u8bbe\u8ba1\u6216\u53c2\u4e0e\u8bbe\u8ba1 29 \u7c7b\u8fd0\u955c\u6807\u7b7e\u4f53\u7cfb\u3001\u4e13\u9879\u6570\u636e\u6d41\u7a0b\u3001\u6821\u51c6\u4e0e Corner Case \u8fed\u4ee3\uff0c\u5e76\u5c06\u8fd0\u955c\u4fe1\u53f7\u56de\u6d41\u8fdb\u89c6\u9891 Caption \u751f\u4ea7\u3002',
    result: 'Annotation accuracy improved from 40% to 90% in four weeks; film-oriented test-set recognition rose from 60% to 85%+.', resultZh: '\u56db\u5468\u5185\u6807\u6ce8\u51c6\u786e\u7387\u4ece 40% \u63d0\u5347\u81f3 90%\uff1b\u5f71\u89c6\u6d4b\u8bd5\u96c6\u8bc6\u522b\u51c6\u786e\u7387\u4ece 60% \u63d0\u5347\u81f3 85%+\u3002',
    tags: ['29 CLASSES', 'DIRECTION', 'TIMING'],
  },
];

export default function ModelDataStrategy() {
  const { t } = useLanguage();

  return <div className="min-h-[100dvh] bg-[#f3f5f2] text-[#101716]">
    <CaseStudyNav />
    <main className="pt-14">
      <section className="container grid min-h-[78dvh] items-end gap-10 py-16 md:grid-cols-[0.86fr_1.14fr] md:py-24">
        <div className="max-w-xl pb-2">
          <p className="mb-5 font-mono-custom text-[10px] tracking-[0.16em] text-[#66736f]">TENCENT / VIDEO MODEL DATA STRATEGY</p>
          <h1 className="font-heading text-5xl font-700 leading-[0.94] tracking-tight md:text-7xl">{t('Defining video data a model can learn from.', '\u5b9a\u4e49\u6a21\u578b\u503c\u5f97\u5b66\u4e60\u7684\u89c6\u9891\u6570\u636e\u3002')}</h1>
          <p className="mt-7 max-w-[54ch] text-base leading-relaxed text-[#4d5b56] md:text-lg">{t('I translate cinematic judgment, including video quality and aesthetics, into data standards, annotation systems and evaluation signals for video generation models.', '\u6211\u628a\u5f71\u89c6\u5224\u65ad\uff0c\u5305\u62ec\u89c6\u9891\u8d28\u91cf\u4e0e\u5ba1\u7f8e\uff0c\u8f6c\u5316\u4e3a\u89c6\u9891\u751f\u6210\u6a21\u578b\u7684\u6570\u636e\u6807\u51c6\u3001\u6807\u6ce8\u7cfb\u7edf\u548c\u8bc4\u4f30\u4fe1\u53f7\u3002')}</p>
          <div className="mt-10 border-l border-[#101716] pl-4"><p className="font-mono-custom text-[8px] tracking-[0.16em] text-[#6a7772]">ROLE</p><p className="mt-2 font-heading text-lg font-700">{t('Video model data strategy product', '\u89c6\u9891\u6a21\u578b\u6570\u636e\u7b56\u7565\u4ea7\u54c1')}</p></div>
        </div>
        <figure className="relative overflow-hidden border border-[#b9c1bc] bg-[#dce2dd]"><img src={COVER} alt={t('Video model data strategy', '\u89c6\u9891\u6a21\u578b\u6570\u636e\u7b56\u7565')} className="aspect-[16/10] h-full w-full object-cover" /><figcaption className="absolute bottom-0 left-0 right-0 bg-[#101716]/82 px-5 py-4 font-mono-custom text-[8px] tracking-[0.16em] text-white/76">CINEMATIC JUDGMENT → DATA DEFINITION → MODEL SIGNAL</figcaption></figure>
      </section>

      <section className="border-y border-[#cfd6d1] bg-white py-16 md:py-24"><div className="container grid gap-10 md:grid-cols-[0.7fr_1.3fr]"><h2 className="font-heading text-3xl font-700 tracking-tight md:text-5xl">{t('Three decisions inside the data pipeline.', '\u6570\u636e\u7ba1\u7ebf\u91cc\u7684\u4e09\u4e2a\u5173\u952e\u51b3\u7b56\u3002')}</h2><p className="max-w-[60ch] text-lg leading-relaxed text-[#384640]">{t('The work is not only about describing videos. It is about defining what counts as usable video data, what counts as aesthetic quality, and how those judgments can remain stable when data production scales.', '\u8fd9\u4efd\u5de5\u4f5c\u4e0d\u53ea\u662f\u63cf\u8ff0\u89c6\u9891\u3002\u5b83\u5173\u4e8e\u5b9a\u4e49\u4ec0\u4e48\u662f\u53ef\u7528\u89c6\u9891\u6570\u636e\u3001\u4ec0\u4e48\u662f\u5ba1\u7f8e\u8d28\u91cf\uff0c\u4ee5\u53ca\u5982\u4f55\u8ba9\u8fd9\u4e9b\u5224\u65ad\u5728\u89c4\u6a21\u5316\u751f\u4ea7\u4e2d\u4fdd\u6301\u7a33\u5b9a\u3002')}</p></div></section>

      <section className="container py-16 md:py-24"><div className="space-y-5">{STRATEGIES.map((strategy) => <article key={strategy.number} className="grid overflow-hidden border border-[#c9d0cb] bg-white md:grid-cols-[0.28fr_0.72fr]"><div className="flex min-h-52 flex-col justify-between bg-[#101716] p-7 text-white md:p-9"><span className="font-mono-custom text-[10px] tracking-[0.17em] text-[#d6c07f]">{strategy.number} / {t(strategy.eyebrow, strategy.eyebrowZh)}</span><div><h2 className="font-heading text-3xl font-700 leading-[0.98] tracking-tight md:text-4xl">{t(strategy.title, strategy.titleZh)}</h2><div className="mt-7 flex flex-wrap gap-2">{strategy.tags.map((tag) => <span key={tag} className="border border-white/24 px-2 py-1 font-mono-custom text-[7px] tracking-[0.14em] text-white/70">{tag}</span>)}</div></div></div><div className="grid gap-8 p-7 md:grid-cols-3 md:p-9"><div><p className="font-mono-custom text-[8px] tracking-[0.16em] text-[#697670]">PROBLEM</p><p className="mt-3 text-sm leading-relaxed text-[#44514c]">{t(strategy.problem, strategy.problemZh)}</p></div><div><p className="font-mono-custom text-[8px] tracking-[0.16em] text-[#697670]">MY WORK</p><p className="mt-3 text-sm leading-relaxed text-[#44514c]">{t(strategy.work, strategy.workZh)}</p></div><div><p className="font-mono-custom text-[8px] tracking-[0.16em] text-[#697670]">RESULT</p><p className="mt-3 font-heading text-lg font-700 leading-snug text-[#17231e]">{t(strategy.result, strategy.resultZh)}</p></div></div></article>)}</div></section>

      <section className="border-t border-[#cfd6d1] bg-[#e2e7e3] py-16 md:py-20"><div className="container grid gap-8 md:grid-cols-[0.7fr_1.3fr]"><p className="font-mono-custom text-[9px] tracking-[0.16em] text-[#64716c]">PUBLIC CASE STUDY NOTE</p><p className="max-w-[66ch] text-sm leading-relaxed text-[#4e5c56]">{t('This case study presents a public abstraction of methods and verified outcomes. Internal model names, datasets, schemas and platform screens are intentionally omitted.', '\u672c\u6848\u4f8b\u4ee5\u53ef\u516c\u5f00\u7684\u65b9\u5f0f\u5448\u73b0\u65b9\u6cd5\u4e0e\u7ecf\u6838\u9a8c\u7684\u7ed3\u679c\uff1b\u5185\u90e8\u6a21\u578b\u540d\u79f0\u3001\u6570\u636e\u96c6\u3001\u5b8c\u6574\u6807\u7b7e\u89c4\u5219\u4e0e\u5e73\u53f0\u622a\u56fe\u5747\u4e0d\u5c55\u793a\u3002')}</p></div></section>
    </main>
    <Footer />
  </div>;
}
