/*
 * Editorial Modernism: Experiments Section (v2 — Ambient Background)
 * - Four capability dimensions, each with hover-reveal skill tags
 * - Background: scattered dot noise + dual-corner radial glow
 *   + faint diagonal rule lines (45°, very sparse)
 */
import { useState } from "react";
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";
import SectionReveal from "@/components/SectionReveal";
import StudioContinuityLayer from "@/components/StudioContinuityLayer";
import RewindToStudio from '@/components/RewindToStudio';

const experiments = [
  {
    num: "01",
    titleEn: "Director Agent Systems",
    titleCn: "导演 Agent 系统",
    descEn:
      "Structuring screenplay understanding into scene, shot and storyboard routes. Multi-agent orchestration and RAG become tools for directing intent, not technical decoration.",
    descCn:
      "把剧本理解结构化为场景、镜头与分镜路线。多智能体编排和 RAG 服务于导演意图，而不是技术装饰。",
    tags: ["Multi-Agent", "RAG", "Screenplay Parsing", "Storyboard Route", "Evaluation Loop"],
  },
  {
    num: "02",
    titleEn: "Video Model Data Strategy",
    titleCn: "视频模型数据策略",
    descEn:
      "Turning cinematic judgment into data structures a model can learn from: caption layers, camera movement, quality dimensions and evaluation criteria.",
    descCn:
      "把影视判断转译成模型可以学习的数据结构：Caption 层级、运镜信息、质量维度与评估标准。",
    tags: ["Caption Design", "Camera Motion", "Quality Criteria", "Dataset Strategy", "Model Evaluation"],
  },
  {
    num: "03",
    titleEn: "AIGC Content Production",
    titleCn: "AIGC 内容生产",
    descEn:
      "From IP selection and script adaptation to more than 100 scene concepts and storyboard references, generative tools are organized around a concrete creative delivery.",
    descCn:
      "从 IP 筛选、剧本改编到 100+ 场景概念图与分镜参考，生成式工具始终围绕具体创意交付被组织。",
    tags: ["IP Selection", "Script Adaptation", "Concept Art", "Storyboard Reference", "Multimodal Generation"],
  },
  {
    num: "04",
    titleEn: "Film as a Testing Ground",
    titleCn: "影视作为压力测试场",
    descEn:
      "Film craft remains the foundation and the most honest stress test for an AI workflow. Directing, editing and color work provide the judgment used to assess the system.",
    descCn:
      "影视创作仍是基本功，也是验证 AI 工作流最真实的压力测试。导演、剪辑与调色经验构成评估系统的判断基础。",
    tags: ["DaVinci Resolve", "Premiere Pro", "Shot Design", "Color Grading", "End-to-End Production"],
  },
];

// Sparse diagonal hatching: 120px pitch, 1px lines at 45°
const HATCH_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cline x1='0' y1='120' x2='120' y2='0' stroke='%230A0A0A' stroke-width='0.6'/%3E%3C/svg%3E`;

function ExperimentCard({
  exp,
  delay,
}: {
  exp: (typeof experiments)[0];
  delay: number;
}) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <SectionReveal delay={delay}>
      <div
        className="bg-white p-8 md:p-10 transition-all duration-500 flex flex-col cursor-default hover:-translate-y-[2px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:bg-[#FAFAFA] border-b border-r border-[#E5E5E5]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Number */}
        <span
          className="font-mono-custom text-[10px] tracking-wider mb-6 block transition-colors duration-300"
          style={{ color: hovered ? "#0A0A0A" : "#CCCCCC" }}
        >
          {exp.num}
        </span>

        {/* Title */}
        <h3 className="font-heading font-600 text-[#0A0A0A] text-lg md:text-xl tracking-tight mb-3">
          {t(exp.titleEn, exp.titleCn)}
        </h3>

        {/* Description */}
        <p className="text-[#6B6B6B] text-sm font-body leading-relaxed mb-6">
          {t(exp.descEn, exp.descCn)}
        </p>

        {/* Skill tags — reveal on hover with staggered animation */}
        <div className="mt-auto">
          <div
            className="h-px bg-[#E5E5E5] mb-4"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          />
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {exp.tags.map((tag, j) => (
              <span
                key={j}
                className="text-[10px] font-mono-custom tracking-wider text-[#0A0A0A]"
                style={{
                  opacity: hovered ? 1 : 0,
                  transform: hovered ? "translateY(0)" : "translateY(8px)",
                  transition: `opacity 0.3s ease ${j * 60}ms, transform 0.3s ease ${j * 60}ms`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function ExperimentsSection() {
  const { t } = useLanguage();
  const [channel, setChannel] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section id="experiments" className="py-32 md:py-40 bg-white relative overflow-hidden">
      <StudioContinuityLayer artifact="CABINET" meaning="TESTING" accent="rgba(105,125,101,0.18)" origin="left" />
      <RewindToStudio from="experiments" object="CABINET" />

      {/* ── Background: single ultra-fine diagonal hatch ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${HATCH_SVG}")`,
          backgroundSize: '80px 80px',
          opacity: 0.025,
        }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10">
        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-number">05</span>
            <div className="editorial-line flex-1" />
            <h2 className="font-heading font-700 text-[#0A0A0A] text-3xl md:text-4xl tracking-tight">
              {t("Experiments", "实验")}
            </h2>
          </div>
        </SectionReveal>

        {/* Intro text */}
        <SectionReveal delay={100}>
          <p className="text-[#6B6B6B] text-base md:text-lg font-body leading-relaxed max-w-[640px] mb-16">
            {t(
              "Four working practices connect film judgment to AI content systems, from directing intent to model evaluation.",
              "四种工作方法连接影视判断与 AI 内容系统，从导演意图延伸到模型评估。"
            )}
          </p>
        </SectionReveal>

        <SectionReveal delay={130}>
          <div className="mb-14 grid overflow-hidden border border-[#17201d] bg-[#101716] text-[#edf0e9] md:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-white/12 p-6 md:border-b-0 md:border-r md:p-8">
              <div className="mb-7 flex items-center justify-between font-mono-custom text-[8px] tracking-[0.16em] text-white/50"><span>TEST CABINET / LIVE</span><span className="h-1.5 w-1.5 rounded-full bg-[#a9ba8a]" /></div>
              <div className="space-y-2">
                {experiments.map((item, index) => <button key={item.num} type="button" onClick={() => setChannel(index)} className={`flex w-full items-center justify-between border-l px-3 py-2 text-left font-mono-custom text-[9px] tracking-[0.13em] transition-colors ${channel === index ? 'border-[#a9ba8a] bg-white/10 text-white' : 'border-white/15 text-white/46 hover:text-white/80'}`}><span>{item.num} / {item.titleEn}</span><span>{channel === index ? 'RUNNING' : 'QUEUE'}</span></button>)}
              </div>
            </div>
            <div className="relative min-h-[250px] overflow-hidden p-6 md:p-8">
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(169,186,138,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(169,186,138,0.18)_1px,transparent_1px)] [background-size:22px_22px]" />
              {!reduced && <motion.span aria-hidden="true" className="absolute inset-x-0 h-px bg-[#d9e8a6]/85 shadow-[0_0_18px_rgba(209,232,162,0.72)]" initial={{ top: '8%', opacity: 0 }} animate={{ top: ['8%', '86%', '8%'], opacity: [0, 0.78, 0] }} transition={{ duration: 4.6 + channel * 0.38, repeat: Infinity, ease: 'linear' }} />}
              <div className="relative"><div className="font-mono-custom text-[8px] tracking-[0.16em] text-[#a9ba8a]">CHANNEL {experiments[channel].num} / EVALUATION LOG</div><h3 className="mt-7 font-heading text-2xl font-700">{t(experiments[channel].titleEn, experiments[channel].titleCn)}</h3><p className="mt-4 max-w-[520px] font-body text-sm leading-relaxed text-white/66">{t(experiments[channel].descEn, experiments[channel].descCn)}</p><div className="mt-8 flex gap-2 font-mono-custom text-[8px] tracking-[0.14em] text-white/46"><span>STATUS: STABLE</span><span>/</span><span>HUMAN REVIEW: ON</span></div></div>
            </div>
          </div>
        </SectionReveal>

        {/* Experiment cards — asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-[#E5E5E5]">
          {experiments.map((exp, i) => (
            <ExperimentCard key={i} exp={exp} delay={150 + i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
