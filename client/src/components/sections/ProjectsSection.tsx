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
  href?: string;
  linkLabel?: string;
  linkLabelZh?: string;
  frames: Array<{ label: string; labelZh: string; title: string; titleZh: string; copy: string; copyZh: string; image: string; position?: string }>;
};

const PROJECTS: Project[] = [
  {
    id: 'director-agent', number: '01', category: 'CREATIVE AGENT', categoryZh: '\u521b\u4f5c Agent', title: 'DIRECTOR AGENT', titleZh: '\u5bfc\u6f14 Agent', role: 'Product Planning', roleZh: '\u4ea7\u54c1\u7b56\u5212\u4e0e\u7cfb\u7edf\u8bbe\u8ba1',
    question: 'How can directing work become a reviewable workflow?', questionZh: '\u5982\u4f55\u5c06\u5bfc\u6f14\u5224\u65ad\u6c89\u6dc0\u4e3a\u53ef\u590d\u6838\u7684\u4ea7\u54c1\u5de5\u4f5c\u6d41\uff1f', method: 'Structured screenplay analysis, directing intent, visual direction, shot design and prompt generation into a workflow.', methodZh: '\u5c06\u5267\u672c\u7406\u89e3\u3001\u5bfc\u6f14\u610f\u56fe\u3001\u89c6\u89c9\u65b9\u5411\u3001\u955c\u5934\u8bbe\u8ba1\u4e0e\u63d0\u793a\u8bcd\u751f\u6210\uff0c\u6c89\u6dc0\u4e3a\u56e2\u961f\u53ef\u5171\u540c\u4f7f\u7528\u3001\u8ba8\u8bba\u4e0e\u590d\u6838\u7684\u4ea7\u54c1\u5de5\u4f5c\u6d41\u3002', outcome: 'Participated in WorkRally storyboard-generation optimization.', outcomeZh: '\u53c2\u4e0e WorkRally \u5206\u955c\u751f\u6210\u80fd\u529b\u7684\u4ea7\u54c1\u4f18\u5316\u3002', href: '/projects/ai-storyboard',
    frames: [
      { label: 'ANALYSIS', labelZh: '\u5206\u6790', title: 'Screenplay analysis', titleZh: '\u5267\u672c\u7406\u89e3', copy: 'Start from the dramatic intent of each scene.', copyZh: '\u4ece\u4eba\u7269\u3001\u51b2\u7a81\u4e0e\u573a\u666f\u5173\u7cfb\u4e2d\u63d0\u70bc\u6bcf\u573a\u620f\u7684\u8868\u8fbe\u91cd\u70b9\u3002', image: '/storyboard-cover.webp' },
      { label: 'DIRECTION', labelZh: '\u5bfc\u6f14\u610f\u56fe', title: 'Visual direction', titleZh: '\u89c6\u89c9\u65b9\u5411', copy: 'Turn directing intent into explicit visual choices.', copyZh: '\u5c06\u5bfc\u6f14\u5224\u65ad\u843d\u5b9e\u4e3a\u53ef\u8ba8\u8bba\u7684\u89c6\u89c9\u9009\u62e9\u3002', image: '/storyboard-crew.webp' },
      { label: 'SHOTS', labelZh: '\u5206\u955c', title: 'Shot design', titleZh: '\u955c\u5934\u8bbe\u8ba1', copy: 'Build a reviewable route to storyboard generation.', copyZh: '\u5c06\u955c\u5934\u8bbe\u8ba1\u7ec4\u7ec7\u4e3a\u53ef\u590d\u6838\u7684\u5206\u955c\u751f\u6210\u8def\u5f84\u3002', image: '/storyboard-system-cover.webp' },
    ],
  },
  {
    id: 'data', number: '02', category: 'DATA STRATEGY', categoryZh: '\u6570\u636e\u7b56\u7565', title: 'VIDEO MODEL DATA STRATEGY', titleZh: '\u89c6\u9891\u751f\u6210\u6a21\u578b\u6570\u636e\u7b56\u7565',
    role: 'AIGC Product Planning', roleZh: 'AIGC \u4ea7\u54c1\u7b56\u5212',
    question: 'How can video-model data quality be defined and evaluated?', questionZh: '\u5982\u4f55\u8ba9\u89c6\u9891\u6a21\u578b\u7684\u6570\u636e\u8d28\u91cf\u53ef\u5b9a\u4e49\u3001\u53ef\u8bc4\u4f30\u3001\u53ef\u6301\u7eed\u751f\u4ea7\uff1f',
    method: 'Built training-data standards, a Caption schema and camera-movement VLM data strategy.', methodZh: '\u5efa\u7acb\u8bad\u7ec3\u6570\u636e\u6807\u51c6\u3001Caption \u6807\u6ce8\u4f53\u7cfb\u4e0e\u8fd0\u955c\u4e13\u9879 VLM \u6570\u636e\u7b56\u7565\uff0c\u5c06\u8d28\u91cf\u5224\u65ad\u5d4c\u5165\u6570\u636e\u751f\u4ea7\u4e0e\u8bc4\u4f30\u3002',
    outcome: 'Connected quality evaluation with data production and iteration.', outcomeZh: '\u5efa\u7acb\u4e86\u652f\u6491\u6570\u636e\u751f\u4ea7\u3001\u8d28\u68c0\u4e0e\u8fed\u4ee3\u7684\u8bc4\u4f30\u6846\u67b6\u3002', href: '/projects/model-data-strategy',
    frames: [
      { label: 'INPUT', labelZh: '\u8f93\u5165', title: 'Visual evidence', titleZh: '\u89c6\u89c9\u8bc1\u636e', copy: 'Film language is identified in real moving-image material.', copyZh: '\u4ece\u771f\u5b9e\u5f71\u50cf\u7d20\u6750\u4e2d\u8bc6\u522b\u53ef\u5b66\u4e60\u7684\u521b\u4f5c\u8bed\u8a00\u3002', image: '/data-strategy-triptych-v1.png', position: 'left center' },
      { label: 'SYSTEM', labelZh: '\u7cfb\u7edf', title: 'Quality taxonomy', titleZh: '\u8d28\u91cf\u4f53\u7cfb', copy: 'Camera movement and quality become structured dimensions.', copyZh: '\u5c06\u8fd0\u955c\u4e0e\u8d28\u91cf\u5224\u65ad\u7ed3\u6784\u5316\u4e3a\u53ef\u751f\u4ea7\u7684\u6570\u636e\u7ef4\u5ea6\u3002', image: '/data-strategy-triptych-v1.png', position: 'center' },
      { label: 'OUTPUT', labelZh: '\u8f93\u51fa', title: 'Evaluation signal', titleZh: '\u8bc4\u4f30\u4fe1\u53f7', copy: 'Creative judgment becomes a signal for review and iteration.', copyZh: '\u5c06\u521b\u4f5c\u5224\u65ad\u8f6c\u5316\u4e3a\u652f\u6491\u8d28\u68c0\u4e0e\u8fed\u4ee3\u7684\u6570\u636e\u4fe1\u53f7\u3002', image: '/data-strategy-triptych-v1.png', position: 'right center' },
    ],
  },
  {
    id: 'caption-flow', number: '03', category: 'VIBE CODING', categoryZh: 'Vibe Coding', title: 'CAPTION FLOW', titleZh: 'Caption \u56db\u5c97\u4f4d\u534f\u4f5c\u6807\u6ce8', role: 'Product Prototype', roleZh: '\u534f\u4f5c\u6d41\u7a0b\u8bbe\u8ba1\u4e0e\u539f\u578b\u9a8c\u8bc1',
    question: 'How can a Caption task be divided without losing quality control?', questionZh: '\u5982\u4f55\u964d\u4f4e\u957f Caption \u7684\u89c4\u5219\u5b66\u4e60\u4e0e\u8bb0\u5fc6\u8d1f\u62c5\uff0c\u540c\u65f6\u4fdd\u6301\u9ad8\u5ea6\u8026\u5408\u5b57\u6bb5\u7684\u4e00\u81f4\u6027\uff1f', method: 'Built a runnable four-role workflow for drafting, checking and merging one final caption.', methodZh: '\u5c06\u539f\u672c\u7531\u4e00\u4eba\u5b8c\u6210\u7684\u6574\u6761 Caption\uff0c\u6539\u4e3a\u56db\u4eba\u534f\u4f5c\u6807\u6ce8\uff1b\u6309\u5b57\u6bb5\u53ca\u5176\u903b\u8f91\u5173\u7cfb\u5207\u5206\u5185\u5bb9\uff0c\u5e76\u4ee5\u989c\u8272\u533a\u5206\u5404\u5c97\u4f4d\u7684\u8d23\u4efb\u8303\u56f4\u3002', outcome: 'Validated a role-based data-production mechanism before platform requirements were submitted.', outcomeZh: '\u5728\u5e73\u53f0\u9700\u6c42\u63d0\u4ea4\u524d\uff0c\u9a8c\u8bc1\u4e86\u56db\u5c97\u4f4d\u534f\u4f5c\u673a\u5236\u4e0e\u6570\u636e\u751f\u4ea7\u6d41\u7a0b\u3002', href: '/projects/caption-four-roles',
    frames: [
      { label: 'ROLES', labelZh: '\u5c97\u4f4d', title: 'Four focused roles', titleZh: '\u56db\u4e2a\u8fb9\u754c\u6e05\u6670\u7684\u5c97\u4f4d', copy: 'Each role handles one bounded part of the Caption task.', copyZh: '\u6bcf\u4e2a\u5c97\u4f4d\u8d1f\u8d23 Caption \u4efb\u52a1\u4e2d\u4e00\u7c7b\u660e\u786e\u7684\u4e13\u4e1a\u5224\u65ad\u3002', image: '/caption-flow-cover-v1.png', position: 'left center' },
      { label: 'FLOW', labelZh: '\u6d41\u7a0b', title: 'Draft to review', titleZh: '\u64b0\u5199\u5230\u590d\u6838', copy: 'The handoff remains visible from draft through checking.', copyZh: '\u4ece\u64b0\u5199\u5230\u6821\u9a8c\u7684\u4ea4\u63a5\u4fdd\u6301\u53ef\u89c1\u3002', image: '/caption-flow-cover-v1.png', position: 'center' },
      { label: 'OUTPUT', labelZh: '\u8f93\u51fa', title: 'One final caption', titleZh: '\u4e00\u6761\u6700\u7ec8 Caption', copy: 'The workflow merges reviewable work into a final result.', copyZh: '\u5c06\u53ef\u590d\u6838\u7684\u5de5\u4f5c\u5408\u5e76\u4e3a\u6700\u7ec8\u7ed3\u679c\u3002', image: '/caption-flow-cover-v1.png', position: 'right center' },
    ],
  },
  {
    id: 'rule-loop', number: '04', category: 'VIBE CODING', categoryZh: 'Vibe Coding', title: 'RULELOOP', titleZh: '\u89c4\u5219\u8fed\u4ee3\u5e73\u53f0', role: 'Product Prototype', roleZh: '\u4ea7\u54c1\u673a\u5236\u4e0e\u539f\u578b\u8bbe\u8ba1',
    question: 'How can difficult cases become reusable rules?', questionZh: '\u5982\u4f55\u5c06\u6807\u6ce8\u4e0e\u8d28\u68c0\u4e2d\u7684\u7591\u96be Case\uff0c\u6c89\u6dc0\u4e3a\u53ef\u590d\u7528\u7684\u89c4\u5219\uff1f', method: 'Built a Case-to-SOP loop that turns exceptions into reviewable rule updates.', methodZh: '\u5c06\u6807\u6ce8\u73b0\u573a\u7684\u95ee\u9898\u3001\u8d28\u68c0\u7ed3\u8bba\u4e0e\u89c4\u5219\u4fee\u6539\u653e\u5165\u540c\u4e00\u6761 Case \u94fe\u8def\uff0c\u7531\u4ea7\u54c1\u4fa7\u5ba1\u6838\u540e\u66f4\u65b0 SOP\u3002', outcome: 'Validated a concrete route from data cases to platform requirements.', outcomeZh: '\u901a\u8fc7\u53ef\u8fd0\u884c\u539f\u578b\u9a8c\u8bc1\uff0c\u5e76\u5c06 Case \u63a5\u5165\u3001\u5ba1\u6838\u4e0e SOP \u66f4\u65b0\u8f6c\u5316\u4e3a\u5e73\u53f0\u9700\u6c42\u3002', href: '/projects/ruleloop',
    frames: [
      { label: 'CASE', labelZh: 'Case', title: 'Difficult cases', titleZh: '\u7591\u96be Case', copy: 'Capture the cases that cannot be resolved by the current rule.', copyZh: '\u8bb0\u5f55\u73b0\u6709\u89c4\u5219\u65e0\u6cd5\u89e3\u51b3\u7684 Case\u3002', image: '/ruleloop-cover-v1.png', position: 'left center' },
      { label: 'RULE', labelZh: '\u89c4\u5219', title: 'Rule update', titleZh: '\u89c4\u5219\u66f4\u65b0', copy: 'Review each case before it becomes a proposed rule.', copyZh: '\u6bcf\u4e2a Case \u5747\u9700\u8bc4\u5ba1\u540e\u518d\u8f6c\u4e3a\u89c4\u5219\u3002', image: '/ruleloop-cover-v1.png', position: 'center' },
      { label: 'SOP', labelZh: 'SOP', title: 'Reusable SOP', titleZh: '\u53ef\u590d\u7528 SOP', copy: 'Approved rules return to the production process.', copyZh: '\u7ecf\u786e\u8ba4\u7684\u89c4\u5219\u56de\u5230\u6570\u636e\u751f\u4ea7\u6d41\u7a0b\u3002', image: '/ruleloop-cover-v1.png', position: 'right center' },
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
          <h2 className="font-heading text-4xl font-700 leading-[0.95] tracking-tight text-[#0A0A0A] md:text-7xl">{t('Selected AIGC product projects.', '\u628a\u521b\u4f5c\u5224\u65ad\uff0c\u505a\u6210\u53ef\u8fd0\u884c\u7684\u4ea7\u54c1')}</h2>
          <p className="mt-6 max-w-[58ch] font-body text-sm leading-relaxed text-[#53605d] md:text-base">{t('Director Agent, video-model data strategy, and two runnable product prototypes.', '\u4ece\u5267\u4f5c\u4e0e\u5bfc\u6f14\u65b9\u6cd5\u51fa\u53d1\uff0c\u5c06\u955c\u5934\u3001\u8868\u6f14\u3001\u8c03\u5ea6\u4e0e\u89c6\u89c9\u8282\u594f\u4e2d\u7684\u5224\u65ad\u6c89\u6dc0\u4e3a\u4ea7\u54c1\u6d41\u7a0b\uff1b\u518d\u5230\u5b9a\u4e49\u6a21\u578b\u6570\u636e\u3001\u7ec4\u7ec7\u751f\u4ea7\u534f\u4f5c\u4e0e\u8fed\u4ee3\u89c4\u5219\u3002\u56db\u4e2a\u9879\u76ee\u5171\u540c\u6784\u6210\u4e00\u6761\u9762\u5411 AI \u5185\u5bb9\u751f\u4ea7\u7684\u5de5\u4f5c\u94fe\u8def\u3002')}</p>
        </header>

        <div className="mt-12 grid overflow-hidden border border-[#0A0A0A]/18 bg-[#0A0A0A]/18 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { no: '01', title: t('Make judgment executable', '让判断可执行'), copy: t('Director Agent turns creative reasoning into a reviewable workflow.', '导演 Agent 将创作判断组织为可复核工作流。') },
            { no: '02', title: t('Make judgment learnable', '让判断可学习'), copy: t('Data strategy turns quality and film language into model signals.', '数据策略将质量与镜头语言转化为模型信号。') },
            { no: '03', title: t('Make standards scalable', '让标准可生产'), copy: t('Caption Flow reorganises complex rules into a collaborative unit.', '四岗位将复杂标准重组为可协作生产单元。') },
            { no: '04', title: t('Make rules evolvable', '让规则可迭代'), copy: t('RuleLoop returns difficult cases to the next version of the SOP.', 'RuleLoop 将疑难 Case 回流到下一版规则。') },
          ].map((step) => <div key={step.no} className="bg-[#eef0ec] p-5 md:min-h-40 md:p-6"><span className="font-mono-custom text-[8px] tracking-[0.15em] text-[#65736e]">{step.no}</span><h3 className="mt-5 font-heading text-lg font-700 text-[#101716]">{step.title}</h3><p className="mt-3 text-xs leading-5 text-[#53605d]">{step.copy}</p></div>)}
        </div>

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
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">{t('ROLE', '\u804c\u8d23')}</dt><dd className="mt-2 font-body text-sm leading-relaxed text-[#18201e]">{t(project.role, project.roleZh)}</dd></div>
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">{t('QUESTION', '\u6838\u5fc3\u95ee\u9898')}</dt><dd className="mt-2 font-heading text-lg font-700 leading-snug text-[#0A0A0A]">{t(project.question, project.questionZh)}</dd></div>
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">{t('METHOD', '\u5b9e\u73b0\u65b9\u5f0f')}</dt><dd className="mt-2 font-body text-sm leading-relaxed text-[#3d4d48]">{t(project.method, project.methodZh)}</dd></div>
                    <div><dt className="font-mono-custom text-[8px] tracking-[0.16em] text-[#687671]">{t('OUTCOME', '\u7ed3\u679c')}</dt><dd className="mt-2 font-body text-sm leading-relaxed text-[#3d4d48]">{t(project.outcome, project.outcomeZh)}</dd></div>
                  </dl>
                </div>
                {project.href && <a href={project.href} className="mt-10 inline-flex w-full items-center justify-between border border-[#0A0A0A] px-4 py-3 font-mono-custom text-[9px] tracking-[0.15em] text-[#0A0A0A] transition-colors hover:bg-[#0A0A0A] hover:text-white active:translate-y-px"><span>{t(project.linkLabel ?? 'VIEW CASE STUDY', project.linkLabelZh ?? '\u67e5\u770b\u5b8c\u6574\u6848\u4f8b')}</span><span aria-hidden="true">↗</span></a>}
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
