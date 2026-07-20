import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import RewindToStudio from '@/components/RewindToStudio';
import StudioContinuityLayer from '@/components/StudioContinuityLayer';

type Project = {
  id: string;
  number: string;
  category: string;
  categoryZh: string;
  title: string;
  titleZh: string;
  role: string;
  roleZh: string;
  question: string;
  questionZh: string;
  method: string;
  methodZh: string;
  outcome: string;
  outcomeZh: string;
  href: string;
  frames: Array<{ label: string; labelZh: string; title: string; titleZh: string; copy: string; copyZh: string; image: string; position?: string }>;
};

const PROJECTS: Project[] = [
  {
    id: 'previz', number: '01', category: 'CREATIVE SYSTEMS', categoryZh: '\u521b\u4f5c\u7cfb\u7edf', title: 'LONG-FORM PRE-VIZ', titleZh: '\u957f\u89c6\u9891\u9884\u6f14',
    role: 'Creative systems and production route', roleZh: '\u521b\u4f5c\u7cfb\u7edf\u4e0e\u751f\u4ea7\u8def\u7ebf',
    question: 'How do generated shots retain one directing intention?', questionZh: '\u751f\u6210\u955c\u5934\u5982\u4f55\u4fdd\u6301\u540c\u4e00\u4e2a\u521b\u4f5c\u610f\u56fe\uff1f',
    method: 'Script, assets, continuity and sequential video become one production route.', methodZh: '\u5267\u672c\u3001\u8d44\u4ea7\u3001\u8fde\u7eed\u6027\u4e0e\u5e8f\u5217\u89c6\u9891\u88ab\u7ec4\u7ec7\u4e3a\u540c\u4e00\u6761\u751f\u4ea7\u8def\u7ebf\u3002',
    outcome: 'A repeatable route from story premise to a controllable pre-visualized sequence.', outcomeZh: '\u4ece\u6545\u4e8b\u547d\u9898\u5230\u53ef\u63a7\u9884\u6f14\u5e8f\u5217\u7684\u53ef\u590d\u7528\u8def\u7ebf\u3002', href: '/projects/ai-previz',
    frames: [
      { label: 'INPUT', labelZh: '\u8f93\u5165', title: 'Script premise', titleZh: '\u5267\u672c\u547d\u9898', copy: 'Narrative intent and visual constraints enter together.', copyZh: '\u53d9\u4e8b\u610f\u56fe\u4e0e\u89c6\u89c9\u7ea6\u675f\u4e00\u8d77\u8fdb\u5165\u7cfb\u7edf\u3002', image: '/previz-storyboard-original.webp' },
      { label: 'SYSTEM', labelZh: '\u7cfb\u7edf', title: 'Continuity route', titleZh: '\u8fde\u7eed\u6027\u8def\u7ebf', copy: 'Assets travel across shots without losing their logic.', copyZh: '\u8d44\u4ea7\u5728\u4e0d\u540c\u955c\u5934\u95f4\u8f6c\u79fb\uff0c\u4ecd\u4fdd\u6301\u5404\u81ea\u7684\u903b\u8f91\u3002', image: '/previz-storyboard-director-rag.webp' },
      { label: 'OUTPUT', labelZh: '\u8f93\u51fa', title: 'Sequence preview', titleZh: '\u5e8f\u5217\u9884\u6f14', copy: 'A sequence can be reviewed before expensive production begins.', copyZh: '\u5728\u8fdb\u5165\u9ad8\u6210\u672c\u751f\u4ea7\u524d\uff0c\u5df2\u7ecf\u80fd\u5b8c\u6210\u5e8f\u5217\u5ba1\u770b\u3002', image: '/previz-storyboard-multiagent.webp' },
    ],
  },
  {
    id: 'storyboard', number: '02', category: 'CREATIVE SYSTEMS', categoryZh: '\u521b\u4f5c\u7cfb\u7edf', title: 'STORYBOARD SYSTEM', titleZh: '\u5206\u955c\u751f\u6210\u7cfb\u7edf',
    role: 'Director strategy and multi-agent design', roleZh: '\u5bfc\u6f14\u7b56\u7565\u4e0e\u591a\u667a\u80fd\u4f53\u8bbe\u8ba1',
    question: 'Can a system retrieve style without flattening direction?', questionZh: '\u7cfb\u7edf\u80fd\u5426\u68c0\u7d22\u98ce\u683c\uff0c\u540c\u65f6\u4e0d\u628a\u5bfc\u6f14\u5224\u65ad\u62c9\u5e73\uff1f',
    method: 'Directing, cinematography, art direction and editing review one scene from different positions.', methodZh: '\u5bfc\u6f14\u3001\u6444\u5f71\u3001\u7f8e\u672f\u548c\u526a\u8f91\u4ece\u4e0d\u540c\u7acb\u573a\u5ba1\u89c6\u540c\u4e00\u573a\u620f\u3002',
    outcome: 'A storyboard route that keeps creative disagreement visible and reviewable.', outcomeZh: '\u4e00\u6761\u4fdd\u7559\u521b\u4f5c\u5206\u6b67\u3001\u53c8\u53ef\u4ee5\u5ba1\u9605\u7684\u5206\u955c\u8def\u7ebf\u3002', href: '/projects/ai-storyboard',
    frames: [
      { label: 'INPUT', labelZh: '\u8f93\u5165', title: 'Directing brief', titleZh: '\u5bfc\u6f14\u7b80\u62a5', copy: 'The scene begins with dramatic intention, not a generic prompt.', copyZh: '\u4e00\u573a\u620f\u4ece\u620f\u5267\u610f\u56fe\u5f00\u59cb\uff0c\u800c\u4e0d\u662f\u4e00\u4e2a\u6cdb\u5316\u63d0\u793a\u8bcd\u3002', image: '/storyboard-cover.webp' },
      { label: 'SYSTEM', labelZh: '\u7cfb\u7edf', title: 'Creative positions', titleZh: '\u521b\u4f5c\u7acb\u573a', copy: 'Specialist viewpoints challenge and refine the same shot list.', copyZh: '\u4e13\u4e1a\u89c6\u89d2\u5bf9\u540c\u4e00\u4efd\u5206\u955c\u63d0\u51fa\u8d28\u7591\u4e0e\u4fee\u6b63\u3002', image: '/storyboard-crew.webp' },
      { label: 'OUTPUT', labelZh: '\u8f93\u51fa', title: 'Reviewable board', titleZh: '\u53ef\u5ba1\u9605\u5206\u955c', copy: 'The final board shows the decisions behind each frame.', copyZh: '\u6700\u7ec8\u5206\u955c\u5c55\u793a\u6bcf\u4e00\u5e27\u80cc\u540e\u7684\u51b3\u7b56\u3002', image: '/storyboard-system-cover.webp' },
    ],
  },
  {
    id: 'data', number: '03', category: 'DATA STRATEGY', categoryZh: '\u6570\u636e\u7b56\u7565', title: 'MODEL DATA STRATEGY', titleZh: '\u89c6\u9891\u6a21\u578b\u6570\u636e\u7b56\u7565',
    role: 'Cinematic data and evaluation strategy', roleZh: '\u5f71\u89c6\u6570\u636e\u4e0e\u8bc4\u4f30\u7b56\u7565',
    question: 'How does cinematic judgment become a learnable signal?', questionZh: '\u5f71\u89c6\u5224\u65ad\u5982\u4f55\u6210\u4e3a\u6a21\u578b\u53ef\u5b66\u4e60\u7684\u4fe1\u53f7\uff1f',
    method: 'Movement language, quality taxonomy and evaluation criteria connect film craft to model training.', methodZh: '\u8fd0\u52a8\u8bed\u8a00\u3001\u8d28\u91cf\u5206\u7c7b\u4e0e\u8bc4\u4f30\u6807\u51c6\uff0c\u8fde\u63a5\u5f71\u89c6\u521b\u4f5c\u4e0e\u6a21\u578b\u8bad\u7ec3\u3002',
    outcome: 'A data route that makes subjective visual judgment inspectable and actionable.', outcomeZh: '\u628a\u4e3b\u89c2\u89c6\u89c9\u5224\u65ad\u53d8\u6210\u53ef\u68c0\u67e5\u3001\u53ef\u6267\u884c\u6570\u636e\u8def\u7ebf\u3002', href: '/projects/model-data-strategy',
    frames: [
      { label: 'INPUT', labelZh: '\u8f93\u5165', title: 'Visual evidence', titleZh: '\u89c6\u89c9\u8bc1\u636e', copy: 'Film language is identified in real moving-image material.', copyZh: '\u5728\u771f\u5b9e\u5f71\u50cf\u7d20\u6750\u4e2d\u8bc6\u522b\u7535\u5f71\u8bed\u8a00\u3002', image: '/data-strategy-triptych-v1.png', position: 'left center' },
      { label: 'SYSTEM', labelZh: '\u7cfb\u7edf', title: 'Quality taxonomy', titleZh: '\u8d28\u91cf\u5206\u7c7b', copy: 'Camera movement and quality become structured dimensions.', copyZh: '\u8fd0\u955c\u4e0e\u8d28\u91cf\u88ab\u7ed3\u6784\u5316\u4e3a\u53ef\u7528\u7ef4\u5ea6\u3002', image: '/data-strategy-triptych-v1.png', position: 'center' },
      { label: 'OUTPUT', labelZh: '\u8f93\u51fa', title: 'Evaluation signal', titleZh: '\u8bc4\u4f30\u4fe1\u53f7', copy: 'Creative judgment becomes a signal for review and iteration.', copyZh: '\u521b\u4f5c\u5224\u65ad\u6210\u4e3a\u53ef\u5ba1\u9605\u3001\u53ef\u8fed\u4ee3\u7684\u4fe1\u53f7\u3002', image: '/data-strategy-triptych-v1.png', position: 'right center' },
    ],
  },
  {
    id: 'data-products', number: '04', category: 'AI PRODUCT', categoryZh: 'AI \u4ea7\u54c1', title: 'DATA PRODUCTION PRODUCTS', titleZh: '\u6570\u636e\u751f\u4ea7\u4ea7\u54c1\u539f\u578b',
    role: 'AI product design for data production', roleZh: '\u9762\u5411\u6570\u636e\u751f\u4ea7\u7684 AI \u4ea7\u54c1\u8bbe\u8ba1',
    question: 'How can a data mechanism become concrete enough to review and request?', questionZh: '\u5982\u4f55\u8ba9\u6570\u636e\u673a\u5236\u5177\u4f53\u5230\u53ef\u4ee5\u88ab\u8bc4\u5ba1\u5e76\u8f6c\u6210\u5e73\u53f0\u9700\u6c42\uff1f',
    method: 'Built two runnable prototypes: a four-role Caption workflow and a Case-to-SOP rule loop.', methodZh: '\u6784\u5efa\u4e24\u4e2a\u53ef\u8fd0\u884c\u539f\u578b\uff1a\u56db\u5c97\u4f4d Caption \u6d41\u6c34\u7ebf\u4e0e Case \u5230 SOP \u7684\u89c4\u5219\u95ed\u73af\u3002',
    outcome: 'Turned workflow assumptions into reviewable product requirements.', outcomeZh: '\u5c06\u6d41\u7a0b\u5047\u8bbe\u8f6c\u5316\u4e3a\u53ef\u5ba1\u9605\u7684\u5e73\u53f0\u9700\u6c42\u3002', href: '/projects/data-production-products',
    frames: [
      { label: 'WORKFLOW', labelZh: '\u5de5\u4f5c\u6d41', title: 'Caption Flow', titleZh: 'Caption \u56db\u5c97\u4f4d\u6d41\u6c34\u7ebf', copy: 'One Caption task is split into four focused responsibilities.', copyZh: '\u5c06\u4e00\u4e2a Caption \u4efb\u52a1\u62c6\u6210\u56db\u4e2a\u805a\u7126\u804c\u8d23\u3002', image: '/data-production-products-triptych-v1.png', position: 'left center' },
      { label: 'RULES', labelZh: '\u89c4\u5219', title: 'Rule Loop', titleZh: '\u89c4\u5219\u8fed\u4ee3\u5e73\u53f0', copy: 'Difficult cases become the next rule instead of isolated exceptions.', copyZh: '\u7591\u96be Case \u88ab\u8f6c\u6210\u4e0b\u4e00\u8f6e\u89c4\u5219\uff0c\u4e0d\u518d\u53ea\u662f\u5b64\u7acb\u7684\u4f8b\u5916\u3002', image: '/data-production-products-triptych-v1.png', position: 'center' },
      { label: 'REQUEST', labelZh: '\u63d0\u9700', title: 'Runnable proof', titleZh: '\u53ef\u8fd0\u884c\u9a8c\u8bc1', copy: 'The prototypes make product requirements tangible enough to discuss.', copyZh: '\u539f\u578b\u8ba9\u5e73\u53f0\u9700\u6c42\u53ef\u4ee5\u88ab\u5177\u4f53\u8ba8\u8bba\u3002', image: '/data-production-products-triptych-v1.png', position: 'right center' },
    ],
  },
];

export default function ProjectsSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [frame, setFrame] = useState(0);
  const project = PROJECTS[active];
  const activeFrame = project.frames[frame];

  useEffect(() => setFrame(0), [active]);

  const chooseProject = (index: number) => {
    if (index === active) return;
    setActive(index);
    window.dispatchEvent(new CustomEvent('rey-world-interaction', { detail: { roll: 'projects', kind: 'project-select' } }));
  };

  return (
    <section id="projects" className="relative overflow-hidden bg-[#dfe4e2] py-28 md:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(223,228,226,0.38),rgba(223,228,226,0.94)_22%,rgba(223,228,226,0.98))]" />
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.16]" style={{ backgroundImage: 'url(/media/hero/reys-world-studio-master-v1.png)', maskImage: 'linear-gradient(to_bottom,black,transparent_32%,transparent_72%,black)', WebkitMaskImage: 'linear-gradient(to_bottom,black,transparent_32%,transparent_72%,black)' }} />
      <StudioContinuityLayer artifact="DESK" meaning="PROJECTS" accent="rgba(92,116,105,0.14)" origin="right" />
      <RewindToStudio from="projects" object="DESK" />

      <div className="container relative z-10">
        <header className="max-w-3xl">
          <div className="mb-5 flex items-center gap-4"><span className="section-number">03</span><div className="editorial-line w-20" /></div>
          <h2 className="font-heading text-4xl font-700 leading-[0.95] tracking-tight text-[#0A0A0A] md:text-7xl">{t('Selected systems for moving images.', '\u4e3a\u8fd0\u52a8\u5f71\u50cf\u800c\u505a\u7684\u7cfb\u7edf\u3002')}</h2>
          <p className="mt-6 max-w-[58ch] font-body text-sm leading-relaxed text-[#53605d] md:text-base">{t('Four projects, from moving-image creation to AI products and model data strategy.', '\u56db\u4e2a\u9879\u76ee\uff0c\u4ece\u8fd0\u52a8\u5f71\u50cf\u521b\u4f5c\u5230 AI \u4ea7\u54c1\u4e0e\u6a21\u578b\u6570\u636e\u7b56\u7565\u3002')}</p>
        </header>

        <nav className="mt-14 grid border-y border-[#0A0A0A]/18 md:grid-cols-4" aria-label="Project index">
          {PROJECTS.map((item, index) => {
            const selected = active === index;
            return <button key={item.id} type="button" onClick={() => chooseProject(index)} aria-current={selected ? 'true' : undefined} className={`group relative min-h-24 border-b border-[#0A0A0A]/12 px-5 py-5 text-left last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${selected ? 'bg-[#101716] text-white' : 'text-[#0A0A0A] hover:bg-white/35'}`}>
              <span className={`font-mono-custom text-[8px] tracking-[0.18em] ${selected ? 'text-[#d6c07f]' : 'text-[#5c6a66]'}`}>{item.number} / {t(item.category, item.categoryZh)}</span>
              <strong className="mt-2 block font-heading text-base font-700 tracking-[-0.02em] md:text-lg">{t(item.title, item.titleZh)}</strong>
              <span className={`absolute bottom-0 left-5 right-5 h-px origin-left ${selected ? 'bg-[#d6c07f]' : 'scale-x-0 bg-[#0A0A0A] transition-transform duration-300 group-hover:scale-x-100'}`} />
            </button>;
          })}
        </nav>

        <AnimatePresence mode="wait">
          <motion.article key={project.id} initial={reduced ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: -12 }} transition={{ duration: reduced ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }} className="mt-10 md:mt-14">
            <div className="grid gap-0 border border-[#0A0A0A]/20 bg-[#eef0ec]/74 lg:grid-cols-[1.45fr_0.75fr]">
              <div className="relative min-h-[360px] overflow-hidden bg-[#101716] md:min-h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.img key={`${activeFrame.image}-${activeFrame.position}`} src={activeFrame.image} alt={t(activeFrame.title, activeFrame.titleZh)} style={{ objectPosition: activeFrame.position }} className="absolute inset-0 h-full w-full object-cover" initial={reduced ? false : { scale: 1.055, opacity: 0 }} animate={{ scale: 1, opacity: 0.84 }} exit={reduced ? undefined : { scale: 0.985, opacity: 0 }} transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 0.7, 0.22, 1] }} />
                </AnimatePresence>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,13,12,0.28),transparent_55%),linear-gradient(0deg,rgba(5,13,12,0.48),transparent_48%)]" />
                <div className="absolute inset-5 border border-white/28" />
                <div className="absolute left-8 top-8 font-mono-custom text-[8px] tracking-[0.17em] text-white/72">{project.number} / {activeFrame.label} / {t('CURRENT FRAME', '\u5f53\u524d\u753b\u9762')}</div>
                <div className="absolute bottom-8 left-8 right-8 max-w-md"><span className="font-mono-custom text-[8px] tracking-[0.16em] text-[#d6c07f]">{t(activeFrame.label, activeFrame.labelZh)}</span><h3 className="mt-2 font-heading text-3xl font-700 tracking-tight text-white md:text-4xl">{t(activeFrame.title, activeFrame.titleZh)}</h3></div>
              </div>

              <div className="flex flex-col justify-between p-7 md:p-10">
                <div>
                  <span className="font-mono-custom text-[8px] tracking-[0.17em] text-[#586762]">{project.number} / {t('SELECTED PROJECT', '\u5f53\u524d\u9879\u76ee')}</span>
                  <h3 className="mt-4 font-heading text-3xl font-700 leading-[0.98] tracking-tight text-[#0A0A0A] md:text-4xl">{t(project.title, project.titleZh)}</h3>
                  <dl className="mt-9 space-y-6 border-t border-[#0A0A0A]/16 pt-6">
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">ROLE</dt><dd className="mt-2 font-body text-sm leading-relaxed text-[#18201e]">{t(project.role, project.roleZh)}</dd></div>
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">QUESTION</dt><dd className="mt-2 font-heading text-lg font-700 leading-snug text-[#0A0A0A]">{t(project.question, project.questionZh)}</dd></div>
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">METHOD</dt><dd className="mt-2 font-body text-sm leading-relaxed text-[#3d4d48]">{t(project.method, project.methodZh)}</dd></div>
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">OUTCOME</dt><dd className="mt-2 font-body text-sm leading-relaxed text-[#3d4d48]">{t(project.outcome, project.outcomeZh)}</dd></div>
                  </dl>
                </div>
                <a href={project.href} className="mt-10 inline-flex w-full items-center justify-between border border-[#0A0A0A] px-4 py-3 font-mono-custom text-[9px] tracking-[0.15em] text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white active:translate-y-px"><span>{t('VIEW CASE STUDY', '\u67e5\u770b\u5b8c\u6574\u6848\u4f8b')}</span><span aria-hidden="true">↗</span></a>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {project.frames.map((item, index) => {
                const selected = frame === index;
                return <button key={item.label} type="button" onClick={() => setFrame(index)} aria-pressed={selected} className={`group grid min-h-52 grid-cols-[104px_1fr] overflow-hidden border text-left transition-colors md:min-h-60 md:grid-cols-[42%_1fr] ${selected ? 'border-[#101716] bg-[#101716] text-white' : 'border-[#0A0A0A]/18 bg-white/42 text-[#0A0A0A] hover:bg-white/72'}`}>
                  <span className="relative overflow-hidden"><img src={item.image} alt="" style={{ objectPosition: item.position }} className={`h-full w-full object-cover transition duration-500 ${selected ? 'opacity-82' : 'opacity-62 group-hover:scale-[1.035] group-hover:opacity-82'}`} /><span className="absolute left-3 top-3 font-mono-custom text-[7px] tracking-[0.15em] text-white">{String(index + 1).padStart(2, '0')}</span></span>
                  <span className="flex flex-col justify-between p-4 md:p-5"><span><span className={`font-mono-custom text-[8px] tracking-[0.16em] ${selected ? 'text-[#d6c07f]' : 'text-[#5b6965]'}`}>{t(item.label, item.labelZh)}</span><strong className="mt-3 block font-heading text-base font-700 leading-snug">{t(item.title, item.titleZh)}</strong><span className={`mt-3 block font-body text-xs leading-relaxed ${selected ? 'text-white/68' : 'text-[#56645f]'}`}>{t(item.copy, item.copyZh)}</span></span><span className={`mt-5 h-px w-full ${selected ? 'bg-[#d6c07f]' : 'bg-[#0A0A0A]/18'}`} /></span>
                </button>;
              })}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  );
}
