/*
 * Editorial Modernism: About Section (v4 — Grid Background)
 * - Full-width positioning statement with left border
 * - Education & Experience in clean two-column layout
 * - Background: ultra-fine coordinate grid (SVG, opacity 0.045)
 *   + right-side vertical gradient fade
 *   + subtle grain overlay
 */
import { useLanguage } from '@/contexts/LanguageContext';
import SectionReveal from '@/components/SectionReveal';
import StudioContinuityLayer from '@/components/StudioContinuityLayer';
import RewindToStudio from '@/components/RewindToStudio';

// SVG grid pattern: 40px cells, 1px lines at #0A0A0A ~4.5% opacity
const GRID_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%230A0A0A' stroke-width='0.5'/%3E%3C/svg%3E`;

const CAREER_STAGES = [
  {
    code: '01', titleEn: 'The Year of Innocence', titleCn: '《清白之年》',
    roleEn: 'Writer, Director, Editor', roleCn: '编剧、导演、剪辑',
    descEn: 'A complete film-production proof: an original short film reaching 1.2M+ total views.',
    descCn: '以完整影视制作为方法验证：原创短片累计播放量超过 120 万。',
  },
  {
    code: '02', titleEn: 'Youku AIGC Short Drama', titleCn: '优酷 AIGC 短剧策划',
    roleEn: 'IP Selection and Visual Development', roleCn: 'IP 筛选与视觉开发',
    descEn: 'Moved from story judgment into generative content production, including script adaptation and 100+ concept and storyboard images.',
    descCn: '从故事判断进入生成式内容生产，参与剧本改编并完成 100+ 场景概念图与分镜参考。',
  },
  {
    code: '03', titleEn: 'Tencent Director Agent', titleCn: '腾讯导演 Agent',
    roleEn: 'Storyboard Generation Route', roleCn: '分镜生成路线',
    descEn: 'Structured the route from screenplay to scene, shot and storyboard with multi-agent and RAG methods.',
    descCn: '以多智能体和 RAG 方法，将剧本拆解为场景、镜头与分镜的结构化生成路线。',
  },
  {
    code: '04', titleEn: 'Tencent Video Model Strategy', titleCn: '腾讯视频生成模型数据策略',
    roleEn: 'Model Data and Evaluation', roleCn: '模型数据与评估',
    descEn: 'Translated cinematic judgment into caption layers, movement labels, quality dimensions and evaluation criteria.',
    descCn: '把影视判断转译为 Caption 层级、运镜标签、质量维度与评估标准。',
  },
] as const;

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden bg-[#F2F3EF] pb-24 md:pb-32">
      <StudioContinuityLayer artifact="NOTEBOOK" meaning="IDENTITY" accent="rgba(151,177,171,0.28)" origin="left" />
      <RewindToStudio from="about" object="NOTEBOOK" />

      {/* The exterior view is processed into the working archive: water lines resolve into the page grid. */}
      <div className="relative z-[2] h-[34vh] min-h-[260px] overflow-hidden border-b border-[#0A0A0A]/16">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#07100f_0%,#35403d_10%,#aebbb7_38%,#dce2df_68%,#F2F3EF_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] opacity-45 [background-image:repeating-linear-gradient(180deg,transparent_0_9px,rgba(255,255,255,0.38)_10px,transparent_11px_18px)] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="absolute inset-y-0 left-[3.8vw] border-l border-white/24" />
        <div className="absolute inset-y-0 right-[3.8vw] border-r border-white/24" />
        <div
          data-match-artifact="profile-dossier"
          className="absolute left-1/2 top-1/2 h-[154px] w-[min(68vw,360px)] -translate-x-1/2 -translate-y-1/2 border border-[#0A0A0A]/44 bg-[#F2F3EF]/72 text-[#0A0A0A] shadow-[0_22px_60px_rgba(35,49,46,0.12)] backdrop-blur-[3px] md:left-[61%] md:h-[178px] md:w-[360px]"
          aria-hidden="true"
        >
          <span className="absolute left-4 top-4 h-12 w-9 border border-current/38 bg-[#0A0A0A]/4" />
          <span className="absolute left-16 right-4 top-4 border-t border-current/48" />
          <span className="absolute left-16 right-16 top-9 border-t border-current/24" />
          <span className="absolute left-16 right-8 top-14 border-t border-current/24" />
          <span className="absolute bottom-11 left-4 right-4 border-t border-current/20" />
          <span className="absolute bottom-6 left-4 font-mono-custom text-[7px] tracking-[0.18em] opacity-68">PERSONAL FILE / REY WU</span>
          <span className="absolute bottom-6 right-4 font-mono-custom text-[7px] tracking-[0.18em] opacity-44">ROLL 02</span>
        </div>
        <div className="absolute bottom-8 left-[calc(3.8vw+18px)] font-mono-custom text-[8px] tracking-[0.16em] text-[#0A0A0A]/58">
          NOTEBOOK → PROFILE
        </div>
        <div className="absolute bottom-8 right-[calc(3.8vw+18px)] hidden font-mono-custom text-[8px] tracking-[0.16em] text-[#0A0A0A]/58 md:block">
          THE VIEW BECOMES THE METHOD
        </div>
      </div>

      {/* ── Background: ultra-fine coordinate grid, barely perceptible ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${GRID_SVG}")`,
          backgroundSize: '60px 60px',
          opacity: 0.035,
        }}
      />

      {/* ── Content ── */}
      <div className="container relative z-10 pt-24 md:pt-28">

        <SectionReveal>
          <div className="mb-12 grid grid-cols-2 items-end gap-6 border-b border-[#0A0A0A]/35 pb-4 font-mono-custom text-[9px] tracking-[0.14em] text-[#0A0A0A]/60 md:grid-cols-4">
            <span className="text-[#0A0A0A]">ROLL 02 / PROFILE</span>
            <span>CAM 01</span>
            <span className="hidden md:block">SHOT CONTINUES</span>
            <span className="text-right">SOURCE / REY WU</span>
          </div>
        </SectionReveal>

        {/* Section header */}
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="section-number text-5xl md:text-6xl font-heading font-700 text-[#0A0A0A]">02</span>
            <div className="flex-1 h-px bg-[#0A0A0A]" />
            <h2 className="font-heading font-700 text-[#0A0A0A] text-3xl md:text-4xl tracking-tight">
              {t('About', '关于')}
            </h2>
          </div>
        </SectionReveal>

        {/* Full-width positioning statement */}
        <div className="relative mb-24 px-6 py-12 md:px-12 md:py-16">
          <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-[#0A0A0A]/55" />
          <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-[#0A0A0A]/55" />
          <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-[#0A0A0A]/55" />
          <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-[#0A0A0A]/55" />
        <SectionReveal delay={80}>
          <div className="mb-6 border-l-2 border-[#0A0A0A] pl-6">
            <p className="text-[#0A0A0A] text-2xl md:text-3xl lg:text-4xl font-heading font-700 leading-tight tracking-tight">
              {t(
                'Film-trained, system-minded.',
                '从影视训练出发，以系统思维构建。'
              )}
            </p>
            <p className="text-[#0A0A0A] text-2xl md:text-3xl lg:text-4xl font-heading font-700 leading-tight tracking-tight">
              {t(
                'Turning cinematic judgment into AI content systems that can be learned, evaluated and executed.',
                '把影视创作判断转化为 AI 可以学习、评估和执行的内容系统。'
              )}
            </p>
          </div>
          <div className="mb-0 pl-6">
            <p className="text-[#6B6B6B] text-sm md:text-base font-body leading-relaxed max-w-[640px]">
              {t(
                'The path is progressive: film production, AIGC content, director agents, then model data strategy.',
                '这条路径逐步深入：影视制作、AIGC 内容、导演 Agent，再到模型数据策略。'
              )}
            </p>
          </div>
        </SectionReveal>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 border-t border-[#E5E5E5] pt-16">

          {/* Education (4 cols) */}
          <div className="lg:col-span-4">
            <SectionReveal delay={140}>
              <p className="font-mono-custom text-[10px] text-[#AAAAAA] tracking-[0.14em] uppercase mb-8 font-600">
                {t('Education', '教育背景')}
              </p>
              <div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-heading font-700 text-[#0A0A0A] text-base md:text-lg tracking-tight">
                    {t('Beijing Film Academy', '北京电影学院')}
                  </h4>
                  <span className="font-mono-custom text-[10px] text-[#AAAAAA] shrink-0 ml-4 mt-1.5">
                    2023 / PRESENT
                  </span>
                </div>
                <p className="text-[#6B6B6B] text-sm font-body mb-4">
                  {t('Film Studies (Production & Marketing)', '电影学（制片与市场）')}
                </p>
                <span className="inline-block font-mono-custom text-[10px] tracking-widest text-[#0A0A0A] border border-[#0A0A0A] px-2 py-0.5">
                  GPA 90.64
                </span>
              </div>
            </SectionReveal>
          </div>

          {/* Career sequence (8 cols) */}
          <div className="lg:col-span-8 lg:border-l lg:border-[#E5E5E5] lg:pl-12">
            <SectionReveal delay={220}>
              <p className="font-mono-custom text-[10px] text-[#AAAAAA] tracking-[0.14em] uppercase mb-8 font-600">
                {t('Career Sequence', '成长路径')}
              </p>
              <div className="grid gap-0 sm:grid-cols-2">
                {CAREER_STAGES.map((stage) => (
                  <article key={stage.code} className="border-t border-[#0A0A0A]/16 py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h4 className="font-heading text-base font-700 tracking-tight text-[#0A0A0A] md:text-lg">
                        {t(stage.titleEn, stage.titleCn)}
                      </h4>
                      <span className="font-mono-custom text-[9px] tracking-[0.14em] text-[#AAAAAA]">{stage.code}</span>
                    </div>
                    <p className="mb-3 font-mono-custom text-[9px] tracking-[0.12em] text-[#6B6B6B]">
                      {t(stage.roleEn, stage.roleCn)}
                    </p>
                    <p className="font-body text-sm leading-relaxed text-[#6B6B6B]">
                      {t(stage.descEn, stage.descCn)}
                    </p>
                  </article>
                ))}
              </div>

            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
