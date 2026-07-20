/**
 * AI Storyboard Generation System — Case Study Page
 * Editorial Modernism style, consistent with main portfolio
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, useRef, useCallback } from 'react';
import CaseStudyNav from '@/components/CaseStudyNav';
import Footer from '@/components/Footer';
import CutRoom from '@/components/CutRoom';

const STORYBOARD_IMG = '/storyboard-crew.webp';

const agents = [
  {
    num: '01',
    roleEn: 'Directing Agent',
    roleCn: '执行导演',
    descEn: 'Translates the screenplay\'s literary language into on-set directing language — shot-by-shot blocking, actor movement, dramatic rhythm, and spatial choreography.',
    descCn: '将剧本的编剧语言转化为可现场执行的导演调度语言：逐镜头场面调度、演员动线、戏剧节奏与空间编排。',
    outputEn: 'Scene Directing Plan',
    outputCn: '场景调度方案',
  },
  {
    num: '02',
    roleEn: 'Art Director Agent',
    roleCn: '艺术总监',
    descEn: 'Governs the visual world of each scene — color palette, production design, set entropy, costume logic, and the overall aesthetic register consistent with the director\'s style.',
    descCn: '统筹每个场景的视觉世界——色彩基调、美术设计、场景熵增细节、服装逻辑，以及与导演风格一致的整体美学基调。',
    outputEn: 'Visual Art Direction',
    outputCn: '视觉美术方案',
  },
  {
    num: '03',
    roleEn: 'Cinematographer Agent',
    roleCn: '摄影师',
    descEn: 'Controls camera grammar and lighting design — lens selection, focal length, camera movement, lighting arrays, and exposure logic for each shot.',
    descCn: '把控镜头语法与光影设计——镜头选型、焦段、运镜方式、光影阵列与每个镜头的曝光逻辑。',
    outputEn: 'Shot-level Camera & Lighting Plan',
    outputCn: '逐镜头摄影光影方案',
  },
  {
    num: '04',
    roleEn: 'Editor Agent',
    roleCn: '剪辑师',
    descEn: 'Defines the rhythm and pacing of the storyboard — shot duration, cut logic, cross-batch state injection to maintain visual continuity, and overall narrative flow.',
    descCn: '定义分镜的节奏与剪辑逻辑——镜头时长、剪切逻辑、跨批次状态注入以维持视觉连贯性，以及整体叙事流。',
    outputEn: 'Shot Rhythm & Continuity Plan',
    outputCn: '分镜节奏与连贯性方案',
  },
];

// ── Output Comparison Carousel ──────────────────────────────────────────────
const slides = [
  {
    num: '01',
    img: '/previz-storyboard-original.webp',
    altEn: 'Original pipeline storyboard contact sheet',
    altCn: '原链路分镜联系单',
    tagEn: 'BASELINE',
    tagCn: 'BASELINE',
    titleEn: 'Original Pipeline',
    titleCn: '原链路',
    type: 'issue' as const,
    pointsEn: [
      'Low visual quality — flat lighting, no cinematic feel',
      'Props rendered cheaply (newspaper, gift box)',
      'Rigid composition — limited shot language',
    ],
    pointsCn: [
      '画面质感匮乏，色调灰暗，缺乏电影感照明',
      '道具（报纸、礼盒）渲染显得廉价',
      '构图呆板，镜头语言较为单一',
    ],
  },
  {
    num: '02',
    img: '/previz-storyboard-director-rag.webp',
    altEn: 'Director Strategy RAG storyboard contact sheet',
    altCn: '导演策略 RAG 分镜联系单',
    tagEn: 'WONG KAR-WAI STYLE',
    tagCn: '王家卫风格',
    titleEn: 'Original + Director Strategy RAG',
    titleCn: '原链路 + 导演策略 RAG',
    type: 'mixed' as const,
    pointsEn: [
      'Visual quality and scene depth improved',
      'Narrative continuity insufficient — shots feel disconnected',
      'Too few shots to cover long dialogue sequences',
      'Transitions abrupt — missing reaction and over-shoulder shots',
    ],
    pointsCn: [
      '画面质感和场景有明显提升',
      '叙事连贯性不足，分镜节奏跳跃',
      '镜头数量过少，难以覆盖剧本中长段对话',
      '衔接生硬，缺乏必要的反应镜头和过肩镜头',
    ],
  },
  {
    num: '03',
    img: '/previz-storyboard-multiagent.webp',
    altEn: 'Multi-agent pipeline storyboard contact sheet',
    altCn: '多智能体新链路分镜联系单',
    tagEn: 'MULTI-AGENT ARCHITECTURE',
    tagCn: '多智能体架构',
    titleEn: 'New Pipeline + Director Strategy RAG',
    titleCn: '新链路（多智能体）+ 导演策略 RAG',
    type: 'win' as const,
    pointsEn: [
      'Shot count doubled — no redundancy, matches narrative pacing',
      'Multi-shot consistency across close-up, medium, and wide angles',
      'Cinematic-grade rendering — volumetric light, skin texture, material quality',
      'Seamless editing logic — resolves the jump-cut issues of v2',
    ],
    pointsCn: [
      '镜头数翻倍且不冗余，能够匹配并支撑剧本细腻的叙事节奏',
      '成功处理同一场景下不同景别（特写、中景、全景）的一致性',
      '光影质感达到电影级标准（体积光、皮肤纹理、物体材质）',
      '镜头组接符合影视剪辑逻辑，有效解决了第二版的跳戏问题',
    ],
  },
];


// ── Eval Dimension Grid ────────────────────────────────────────────────────
const evalDimensions = [
  {
    num: '01',
    weight: '15%',
    en: 'Logical Consistency',
    cn: '逻辑一致性',
    color: '#0A0A0A',
    items: [
      { code: '1.1', en: 'Character state continuity', cn: '角色状态连贯性' },
      { code: '1.2', en: 'Spatial logic coherence', cn: '空间逻辑一致性' },
      { code: '1.3', en: 'Prop continuity', cn: '道具连续性' },
      { code: '1.4', en: 'Temporal sequence accuracy', cn: '时序准确性' },
    ],
  },
  {
    num: '02',
    weight: '10%',
    en: 'Description Completeness',
    cn: '描述完整性',
    color: '#0A0A0A',
    items: [
      { code: '2.1', en: 'Shot type specified', cn: '景别明确' },
      { code: '2.2', en: 'Camera movement defined', cn: '运镜方式定义' },
      { code: '2.3', en: 'Character positioning described', cn: '人物位置描述' },
      { code: '2.4', en: 'Lighting & atmosphere noted', cn: '光影与氛围标注' },
      { code: '2.5', en: 'Duration estimated', cn: '时长估算' },
    ],
  },
  {
    num: '03',
    weight: '20%',
    en: 'Executability',
    cn: '可执行性',
    color: '#0A0A0A',
    items: [
      { code: '3.1', en: 'AI generation feasibility', cn: 'AI 生成可行性' },
      { code: '3.2', en: 'Prompt-image alignment', cn: 'Prompt 与画面对应性' },
      { code: '3.3', en: 'Character count per shot', cn: '单镜头人物数量合理性' },
      { code: '3.4', en: 'Interaction complexity control', cn: '交互动作复杂度控制' },
    ],
  },
  {
    num: '04',
    weight: '20%',
    en: 'Narrative Editing',
    cn: '叙事剪辑',
    color: '#0A0A0A',
    items: [
      { code: '4.1', en: 'Screen direction (180° rule)', cn: '轴线规则遵守' },
      { code: '4.2', en: 'Eyeline match', cn: '视线匹配' },
      { code: '4.3', en: 'Shot-reverse-shot coverage', cn: '正反打覆盖' },
      { code: '4.4', en: 'Cut motivation logic', cn: '剪切动机逻辑' },
      { code: '4.5', en: 'Emotional arc continuity', cn: '情绪弧线连贯性' },
    ],
  },
  {
    num: '05',
    weight: '10%',
    en: 'Rhythm & Pacing',
    cn: '节奏控制',
    color: '#0A0A0A',
    items: [
      { code: '5.1', en: 'Shot duration balance', cn: '镜头时长均衡性' },
      { code: '5.2', en: 'Emotional pacing alignment', cn: '情绪节奏匹配' },
      { code: '5.3', en: 'Scene-level rhythm coherence', cn: '场景整体节奏连贯' },
    ],
  },
  {
    num: '06',
    weight: '25%',
    en: 'Action Choreography',
    cn: '动作调度',
    color: '#CC0000',
    items: [
      { code: '6.1', en: 'Keyframe density vs. script actions', cn: '关键帧密度与剧本动词对应' },
      { code: '6.2', en: 'Action process continuity', cn: '动作过程完整还原' },
      { code: '6.3', en: 'Spatial blocking fidelity', cn: '空间调度还原度' },
      { code: '6.4', en: 'Interaction shot decomposition', cn: '交互动作拆解' },
      { code: '6.5', en: 'Motion direction match', cn: '动势方向衔接' },
      { code: '6.6', en: 'Dialogue-triggered blocking', cn: '对话触发式调度' },
      { code: '6.7', en: 'Spatial transition closure', cn: '空间位移闭环' },
      { code: '6.8', en: 'Action magnitude validity', cn: '动作幅度有效性' },
      { code: '6.9', en: 'Physiological state gradient', cn: '生理状态渐变拆解' },
    ],
  },
];

function EvalDimensionGrid({ t }: { t: (en: string, cn: string) => string }) {
  const [openDim, setOpenDim] = useState<string | null>(null);

  return (
    <div className="border border-[#E5E5E5] bg-white">
      {/* Column headers */}
      <div className="grid grid-cols-[40px_1fr_60px] border-b border-[#E5E5E5] px-5 py-2 bg-[#FAFAFA]">
        <span className="font-mono-custom text-[8px] text-[#AAAAAA] tracking-widest uppercase">#</span>
        <span className="font-mono-custom text-[8px] text-[#AAAAAA] tracking-widest uppercase">{t('Dimension', '维度')}</span>
        <span className="font-mono-custom text-[8px] text-[#AAAAAA] tracking-widest uppercase text-right">{t('Weight', '权重')}</span>
      </div>

      {evalDimensions.map((dim, di) => (
        <div key={dim.num} className={`border-b border-[#E5E5E5] last:border-b-0`}>
          {/* Dimension row — clickable to expand */}
          <button
            className="w-full grid grid-cols-[40px_1fr_60px] items-center px-5 py-4 hover:bg-[#FAFAFA] transition-colors duration-200 text-left"
            onClick={() => setOpenDim(openDim === dim.num ? null : dim.num)}
          >
            <span className="font-mono-custom text-[9px] text-[#AAAAAA]">{dim.num}</span>
            <div className="flex items-center gap-3">
              <span
                className="font-heading font-600 text-sm"
                style={{ color: dim.color }}
              >
                {t(dim.en, dim.cn)}
              </span>
              <span className="font-mono-custom text-[8px] text-[#AAAAAA] tracking-widest">
                {dim.items.length} {t('indicators', '项指标')}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span
                className="font-mono-custom text-[10px] font-600"
                style={{ color: dim.color }}
              >
                {dim.weight}
              </span>
              <span
                className="font-mono-custom text-[10px] text-[#AAAAAA] transition-transform duration-200"
                style={{ display: 'inline-block', transform: openDim === dim.num ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                ▾
              </span>
            </div>
          </button>

          {/* Sub-indicators — expand on click */}
          {openDim === dim.num && (
            <div className="px-5 pb-5 bg-[#FAFAFA] border-t border-[#F0F0F0]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 pt-3">
                {dim.items.map((item) => (
                  <div key={item.code} className="flex items-start gap-3 py-2 border-b border-[#F0F0F0] last:border-b-0">
                    <span className="font-mono-custom text-[9px] text-[#CCCCCC] shrink-0 pt-0.5 w-7">{item.code}</span>
                    <div className="flex-1">
                      <span className="font-heading font-500 text-[#0A0A0A] text-xs block leading-snug">{t(item.en, item.cn)}</span>
                    </div>
                    <span className="font-mono-custom text-[9px] text-[#CCCCCC] shrink-0 pt-0.5">✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Footer — total weight */}
      <div className="grid grid-cols-[40px_1fr_60px] px-5 py-3 bg-[#0A0A0A]">
        <span />
        <span className="font-mono-custom text-[9px] text-[#888] tracking-widest uppercase">
          {t('Total — 6 dimensions · 26 sub-indicators', '合计 — 6 个维度 · 26 项细分指标')}
        </span>
        <span className="font-mono-custom text-[10px] text-white font-600 text-right">100%</span>
      </div>
    </div>
  );
}

function OutputComparisonSection({ t }: { t: (en: string, cn: string) => string }) {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [textVisible, setTextVisible] = useState(true);
  const [textDir, setTextDir] = useState<'up' | 'down'>('up');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const wheelAccRef = useRef(0);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const n = slides.length;

  // Advance to a new slide with animation
  const goTo = useCallback((next: number, dir: 'up' | 'down') => {
    if (animating) return;
    setAnimating(true);
    setTextDir(dir);
    setTextVisible(false);
    setTimeout(() => {
      setActive(next);
      setTextVisible(true);
      setAnimating(false);
    }, 380);
  }, [animating]);

  // Wheel handler — accumulate delta, fire on threshold
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    wheelAccRef.current += e.deltaY;
    if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    wheelTimerRef.current = setTimeout(() => { wheelAccRef.current = 0; }, 150);
    if (Math.abs(wheelAccRef.current) < 80) return;
    const dir = wheelAccRef.current > 0 ? 'up' : 'down';
    wheelAccRef.current = 0;
    const next = dir === 'up'
      ? (active + 1) % n
      : (active - 1 + n) % n;
    goTo(next, dir);
  }, [active, n, goTo]);

  const slide = slides[active];

  // Stacking offsets for behind cards
  const stackOffsets = [8, 16]; // px offset per layer

  const pointPrefix = (type: string, i: number) => {
    if (type === 'win') return <span className="text-[#0A0A0A] font-700 text-xs mt-0.5 shrink-0 select-none">+</span>;
    if (type === 'mixed' && i === 0) return <span className="text-[#0A0A0A] text-xs mt-0.5 shrink-0 select-none">↑</span>;
    return <span className="text-[#BBBBBB] text-xs mt-0.5 shrink-0 select-none">—</span>;
  };

  const pointColor = (type: string, i: number) => {
    if (type === 'win') return 'text-[#0A0A0A] font-500';
    if (type === 'mixed' && i === 0) return 'text-[#0A0A0A]';
    return 'text-[#6B6B6B]';
  };

  return (
    <>
    <div className="border-t border-[#E5E5E5] py-20 md:py-24">
      <div className="container">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-number">04</span>
          <div className="editorial-line flex-1" />
          <h2 className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl tracking-tight">
            {t('Output Comparison', '输出对比')}
          </h2>
        </div>
        <p className="text-[#6B6B6B] text-sm font-body leading-relaxed mb-12 max-w-2xl">
          {t(
            'Three versions of the same scene — generated by the original pipeline, the original pipeline with Director Strategy RAG (Wong Kar-wai style), and the new multi-agent pipeline with Director Strategy RAG.',
            '同一场景的三个版本——分别由原链路、原链路 + 导演策略 RAG（王家卫风格）、以及新链路（多智能体）+ 导演策略 RAG 生成。'
          )}
        </p>

        {/* Step tabs */}
        <div className="flex items-center gap-0 mb-12">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? 'up' : 'down')}
              className={`flex items-center gap-2 pr-8 transition-all duration-300 ${
                i === active ? 'opacity-100' : 'opacity-35 hover:opacity-60'
              }`}
            >
              <span className={`font-mono-custom text-[10px] tracking-widest ${
                i === active ? 'text-[#0A0A0A]' : 'text-[#AAAAAA]'
              }`}>{s.num}</span>
              <span className={`font-heading text-xs font-600 ${
                i === active ? 'text-[#0A0A0A]' : 'text-[#AAAAAA]'
              }`}>{t(s.titleEn, s.titleCn)}</span>
              {i < slides.length - 1 && <span className="ml-2 text-[#DDDDDD] text-[10px]">→</span>}
            </button>
          ))}
        </div>

        {/* Main area: stacked cards + annotation */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* ── Stacked card deck ── */}
          {/* Outer wrapper: fixed height + extra bottom space for peeking layers */}
          <div
            style={{ paddingBottom: `${stackOffsets[stackOffsets.length - 1] + 4}px`, position: 'relative' }}
          >
            <div
              ref={containerRef}
              onWheel={handleWheel}
              className="relative cursor-ns-resize select-none"
              style={{ height: '480px' }}
              title={t('Scroll to navigate', '滚动鼠标切换')}
            >
              {/* Behind cards (layers 2 and 3) */}
              {stackOffsets.map((offset, layerIdx) => {
                const behindIdx = (active + layerIdx + 1) % n;
                const depth = layerIdx + 1;
                return (
                  <div
                    key={`behind-${layerIdx}`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      overflow: 'hidden',
                      transform: `translateY(${offset}px) scale(${1 - depth * 0.018})`,
                      transformOrigin: 'top center',
                      zIndex: n - depth,
                      opacity: 1 - depth * 0.30,
                      filter: `blur(${depth * 0.7}px)`,
                      transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s',
                      borderRadius: '2px',
                    }}
                  >
                    <img
                      src={slides[behindIdx].img}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                      draggable={false}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: `rgba(255,255,255,${depth * 0.12})` }} />
                  </div>
                );
              })}

              {/* Front card */}
              <div
                onClick={() => setLightboxImg(slide.img)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  overflow: 'hidden',
                  zIndex: n + 1,
                  borderRadius: '2px',
                  cursor: 'zoom-in',
                  transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s',
                  transform: animating
                    ? `translateY(${textDir === 'up' ? '-14px' : '14px'}) scale(0.982)`
                    : 'translateY(0) scale(1)',
                  opacity: animating ? 0 : 1,
                  boxShadow: '0 2px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={slide.img}
                  alt={t(slide.altEn, slide.altCn)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  draggable={false}
                />
                {/* Click-to-expand hint */}
                <div style={{
                  position: 'absolute', top: 8, left: 8, zIndex: 2,
                  display: 'flex', alignItems: 'center', gap: 4,
                  pointerEvents: 'none',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1h4M1 1v4M11 1H7M11 1v4M1 11h4M1 11V7M11 11H7M11 11V7" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: 8, color: '#FFFFFF', letterSpacing: '0.12em', fontFamily: 'monospace', opacity: 0.8 }}>CLICK TO EXPAND</span>
                </div>
              </div>

              {/* Scroll hint — bottom-right, above layers */}
              <div
                style={{ position: 'absolute', bottom: 8, right: 8, zIndex: n + 2, display: 'flex', alignItems: 'center', gap: 6, pointerEvents: 'none' }}
              >
                <span className="font-mono-custom" style={{ fontSize: 9, color: '#CCCCCC', letterSpacing: '0.12em' }}>
                  {t('SCROLL TO NAVIGATE', '滚动切换')}
                </span>
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                  <rect x="3.5" y="1" width="3" height="5" rx="1.5" stroke="#CCCCCC" strokeWidth="1"/>
                  <line x1="5" y1="8" x2="5" y2="13" stroke="#CCCCCC" strokeWidth="1"/>
                  <polyline points="3,11 5,13 7,11" fill="none" stroke="#CCCCCC" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── Annotation panel ── */}
          <div className="lg:pt-2">

            {/* Animated text block */}
            <div
              style={{
                transition: 'opacity 0.38s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1)',
                opacity: textVisible ? 1 : 0,
                transform: textVisible
                  ? 'translateY(0)'
                  : textDir === 'up' ? 'translateY(10px)' : 'translateY(-10px)',
              }}
            >
              <p className="font-mono-custom text-[10px] text-[#AAAAAA] tracking-widest uppercase mb-3">
                {t(slide.tagEn, slide.tagCn)}
              </p>
              <h3 className="font-heading font-700 text-[#0A0A0A] text-lg leading-tight mb-7">
                {t(slide.titleEn, slide.titleCn)}
              </h3>
              <div className="space-y-4 mb-10">
                {slide.pointsEn.map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {pointPrefix(slide.type, i)}
                    <p className={`text-xs font-body leading-relaxed ${pointColor(slide.type, i)}`}>
                      {t(slide.pointsEn[i], slide.pointsCn[i])}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#E5E5E5]">
              <button
                onClick={() => goTo((active - 1 + n) % n, 'down')}
                disabled={animating}
                className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-all duration-200 disabled:opacity-30"
                aria-label="Previous"
              >←</button>
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > active ? 'up' : 'down')}
                    className={`transition-all duration-300 ${
                      i === active ? 'w-6 h-px bg-[#0A0A0A]' : 'w-2 h-px bg-[#DDDDDD] hover:bg-[#AAAAAA]'
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => goTo((active + 1) % n, 'up')}
                disabled={animating}
                className="w-8 h-8 flex items-center justify-center border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-all duration-200 disabled:opacity-30"
                aria-label="Next"
              >→</button>
              <span className="font-mono-custom text-[10px] text-[#CCCCCC] ml-2">
                {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom note */}
        <div className="mt-14 pt-6 border-t border-[#E5E5E5] flex items-start gap-6">
          <span className="font-mono-custom text-[10px] text-[#CCCCCC] shrink-0 pt-0.5">NOTE</span>
          <p className="text-[#AAAAAA] text-xs font-body leading-relaxed">
            {t(
              'All three versions were generated from the same source screenplay. Images show storyboard contact sheets — each cell represents one generated shot with its timecode.',
              '三个版本均基于同一剧本生成。图示为分镜联系单，每格代表一个生成镜头及其时间码。'
            )}
          </p>
        </div>

      </div>
    </div>

    {/* ── Lightbox overlay ── */}
    {lightboxImg && (
      <div
        onClick={() => setLightboxImg(null)}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0,0,0,0.92)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'zoom-out',
          animation: 'fadeInLightbox 0.22s ease',
        }}
      >
        <style>{`
          @keyframes fadeInLightbox {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes scaleInLightbox {
            from { transform: scale(0.94); opacity: 0; }
            to   { transform: scale(1);    opacity: 1; }
          }
        `}</style>
        {/* Close button */}
        <button
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'absolute', top: 20, right: 24,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#FFFFFF', fontSize: 28, lineHeight: 1, opacity: 0.7,
            zIndex: 10000,
          }}
          aria-label="Close"
        >×</button>
        {/* Image */}
        <img
          src={lightboxImg}
          alt=""
          onClick={e => e.stopPropagation()}
          style={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '2px',
            boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
            animation: 'scaleInLightbox 0.28s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        {/* Hint */}
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          color: '#888', fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.1em',
          pointerEvents: 'none',
        }}>CLICK ANYWHERE TO CLOSE</div>
      </div>
    )}
    </>
  );
}
// ──────────────────────────────────────────────────────────────────────────────────

export default function AiStoryboard() {
  const { t, toggleLang, lang } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Navigation ── */}
      <CaseStudyNav />

      <div className="pt-24">

        {/* ── Hero ── */}
        <div className="container pt-16 pb-0">
          <div className="max-w-4xl">
            <span className="font-mono-custom text-[10px] text-[#AAAAAA] tracking-widest uppercase block mb-6">
              {t('Case Study · Project 02', '案例研究 · 项目 02')}
            </span>
            <h1 className="font-heading font-800 text-[#0A0A0A] text-4xl md:text-6xl leading-none tracking-tight mb-8">
              {t('AI Storyboard', 'AI 分镜脚本')}<br />
              {t('Generation System', '智能生成系统')}
            </h1>
            <p className="text-[#6B6B6B] text-base md:text-lg font-body leading-relaxed max-w-2xl mb-10">
              {t(
                'A multi-agent storyboard generation system with director style reverse-engineering, a RAG-powered strategy library built from cinematically significant films, and a human-in-the-loop evaluation pipeline — designed and built by Rey Wu.',
                '由 Rey Wu 设计并搭建的多智能体分镜生成系统：集成导演风格反求分析、基于经典影片构建的 RAG 分镜策略库，以及人机协同评估闭环。'
              )}
            </p>

            {/* Meta grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#E5E5E5]">
              {[
                { label: 'TYPE', value: t('Multi-Agent System', '多智能体系统') },
                { label: 'STACK', value: 'Multi-Agent · RAG · LLM' },
                { label: 'STATUS', value: t('Validated on 1 feature film', '已在单部影片验证') },
                { label: 'NEXT', value: t('BFA collaboration', '联合北电扩展中') },
              ].map((item, i) => (
                <div key={i} className={`p-4 ${i < 3 ? 'border-r border-[#E5E5E5]' : ''}`}>
                  <span className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase block mb-1">{item.label}</span>
                  <span className="font-body text-sm text-[#0A0A0A]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Hero Image ── */}
        <div className="mt-16 overflow-hidden bg-[#0A0A0A]">
          <img
            src={STORYBOARD_IMG}
            alt="AI Storyboard Generation System"
            className="w-full h-auto object-cover"
            style={{ maxHeight: '520px', objectPosition: 'center' }}
          />
        </div>

        <CutRoom title={t('Storyboard Assembly', '分镜剪辑台')} asset={STORYBOARD_IMG} unit="MULTI-AGENT / RAG" />

        {/* ── Section 01: System Architecture ── */}
        <div className="border-t border-[#E5E5E5] py-20 md:py-28">
          <div className="container">
            <div className="flex items-center gap-4 mb-16">
              <span className="section-number">01</span>
              <div className="editorial-line flex-1" />
              <h2 className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl tracking-tight">
                {t('System Architecture', '系统架构')}
              </h2>
            </div>

            {/* Description row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <p className="text-[#6B6B6B] text-sm font-body leading-relaxed">
                {t(
                  'The system is built around four specialized agents working in parallel, each embodying a distinct role in a professional film production crew. Their outputs are synthesized into a unified shot script that directly drives AI video generation.',
                  '系统围绕四个专业智能体并行运作，每个智能体对应专业影视制作团队中的一个独特职能。它们的输出被综合为统一的分镜脚本，直接驱动 AI 视频生成。'
                )}
              </p>
              <p className="text-[#6B6B6B] text-sm font-body leading-relaxed">
                {t(
                  'The entire system is grounded in a Director Strategy Library — built by reverse-engineering cinematically significant films to extract shot strategy, framing logic, and visual design patterns. This library is retrieved via RAG to elevate storyboard quality from the ground up.',
                  '整个系统以导演资料策略库为基础——通过对具有艺术价值的影片进行反求分析，提取分镜策略、构图逻辑与画面设计范式，并通过 RAG 检索来从整体上提升分镜质量。'
                )}
              </p>
            </div>

            {/* Architecture overview diagram — SVG with full closed loop, full width */}
            <div className="border border-[#E5E5E5] bg-[#FAFAFA] p-6 md:p-10">
              <div className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase mb-6 text-center">
                {t('System Flow Overview', '系统流程概览')}
              </div>

              <svg
                  viewBox="0 0 700 580"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
                >
                  {/* ── VERTICAL LAYOUT: top-to-bottom linear flow with closed loop on the left ── */}

                  {/* === ROW 1: Screenplay (left) + Director Library (right) === */}
                  {/* Screenplay box */}
                  <rect x="80" y="24" width="220" height="56" fill="white" stroke="#0A0A0A" strokeWidth="2"/>
                  <text x="190" y="46" textAnchor="middle" fontSize="9" fill="#AAAAAA" letterSpacing="1">INPUT</text>
                  <text x="190" y="67" textAnchor="middle" fontSize="17" fontWeight="700" fill="#0A0A0A">{t('Screenplay', '剧本')}</text>

                  {/* Director Library box (dashed, RAG) */}
                  <rect x="360" y="24" width="220" height="56" fill="#F9F9F9" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="5,3"/>
                  <text x="470" y="46" textAnchor="middle" fontSize="9" fill="#CC0000" letterSpacing="1">RAG</text>
                  <text x="470" y="67" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0A0A0A">{t('Director Library', '导演策略库')}</text>

                  {/* Merge: screenplay down + director library merges in */}
                  <line x1="190" y1="80" x2="190" y2="108" stroke="#0A0A0A" strokeWidth="1.5"/>
                  <line x1="470" y1="80" x2="470" y2="96" stroke="#CC0000" strokeWidth="1" strokeDasharray="4,3"/>
                  <line x1="190" y1="108" x2="470" y2="108" stroke="#0A0A0A" strokeWidth="1.5"/>
                  <line x1="330" y1="108" x2="330" y2="126" stroke="#0A0A0A" strokeWidth="1.5"/>
                  <polygon points="324,124 336,124 330,136" fill="#0A0A0A"/>

                  {/* === ROW 2: Parallel Agent Crew === */}
                  <rect x="80" y="136" width="500" height="72" fill="none" stroke="#0A0A0A" strokeWidth="1" strokeDasharray="5,3"/>
                  <text x="330" y="153" textAnchor="middle" fontSize="9" fill="#AAAAAA" letterSpacing="1">{t('PARALLEL AGENT CREW', '并行智能体团队')}</text>
                  {[
                    { en: 'Director', cn: '执行导演' },
                    { en: 'Art Dir.', cn: '艺术总监' },
                    { en: 'Cinematog.', cn: '摄影师' },
                    { en: 'Editor', cn: '剪辑师' },
                  ].map((a, i) => (
                    <g key={i}>
                      <rect x={88 + i * 124} y="162" width="112" height="34" fill="white" stroke="#CCCCCC" strokeWidth="1"/>
                      <text x={144 + i * 124} y="184" textAnchor="middle" fontSize="12" fill="#333">{t(a.en, a.cn)}</text>
                    </g>
                  ))}

                  {/* Arrow agents → output */}
                  <line x1="330" y1="208" x2="330" y2="228" stroke="#0A0A0A" strokeWidth="1.5"/>
                  <polygon points="324,226 336,226 330,238" fill="#0A0A0A"/>

                  {/* === ROW 3: Output (black) === */}
                  <rect x="80" y="238" width="500" height="56" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2"/>
                  <text x="330" y="258" textAnchor="middle" fontSize="9" fill="#888" letterSpacing="1">OUTPUT</text>
                  <text x="330" y="280" textAnchor="middle" fontSize="15" fontWeight="700" fill="white">{t('Shot Script + Visual Brief', '分镜脚本 + 视觉方案')}</text>

                  {/* Arrow output → eval */}
                  <line x1="330" y1="294" x2="330" y2="316" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                  <polygon points="324,314 336,314 330,326" fill="#CC0000"/>

                  {/* === ROW 4: Eval Agent === */}
                  <rect x="80" y="326" width="500" height="56" fill="white" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="5,3"/>
                  <text x="330" y="346" textAnchor="middle" fontSize="9" fill="#CC0000" letterSpacing="1">EVAL AGENT</text>
                  <text x="330" y="368" textAnchor="middle" fontSize="14" fontWeight="700" fill="#CC0000">{t('Assessment + Issue Detection', '评估 + 问题检测')}</text>

                  {/* Arrow eval → human */}
                  <line x1="330" y1="382" x2="330" y2="402" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                  <polygon points="324,400 336,400 330,412" fill="#CC0000"/>

                  {/* === ROW 5: Human Review === */}
                  <rect x="80" y="412" width="500" height="56" fill="white" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="5,3"/>
                  <text x="330" y="432" textAnchor="middle" fontSize="9" fill="#CC0000" letterSpacing="1">{t('HUMAN REVIEW', '专业人员审核')}</text>
                  <text x="330" y="453" textAnchor="middle" fontSize="13" fill="#0A0A0A">{t('Expert Review & Feedback', '专业人员审核与反馈')}</text>

                  {/* === CLOSED LOOP: bottom → left side → back to Screenplay === */}
                  {/* Down from Human Review */}
                  <line x1="330" y1="468" x2="330" y2="490" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                  {/* Horizontal to left */}
                  <line x1="30" y1="490" x2="330" y2="490" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                  {/* Up the left side */}
                  <line x1="30" y1="52" x2="30" y2="490" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                  {/* Arrow into Screenplay */}
                  <line x1="30" y1="52" x2="78" y2="52" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                  <polygon points="76,46 86,52 76,58" fill="#CC0000"/>

                  {/* Loop label */}
                  <text x="330" y="510" textAnchor="middle" fontSize="9" fill="#CC0000" fontWeight="600" letterSpacing="1">
                    ↺ {t('Optimise generation capability', '优化生成能力')}
                  </text>

                </svg>
              </div>
          </div>
        </div>

        {/* ── Section 02: Director Style Reverse-Engineering ── */}
        <div className="border-t border-[#E5E5E5] py-20 md:py-28 bg-[#FAFAFA]">
          <div className="container">
            <div className="flex items-center gap-4 mb-16">
              <span className="section-number">02</span>
              <div className="editorial-line flex-1" />
              <h2 className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl tracking-tight">
                {t('Director Style Reverse-Engineering', '导演风格反求')}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-[#6B6B6B] text-sm font-body leading-relaxed mb-6">
                  {t(
                    'Rather than prompting AI with vague stylistic descriptions, this system reverse-engineers cinematically significant films to extract precise, structured strategies — building a Director Strategy Library that can be retrieved via RAG to ground every storyboard decision.',
                    '这套系统并非用模糊的风格描述来提示 AI，而是对具有艺术价值的影片进行反求分析，提取精确、结构化的策略——构建可通过 RAG 检索的导演资料策略库，为每一个分镜决策提供依据。'
                  )}
                </p>

                {/* Blockquote */}
                <blockquote className="border-l-2 border-[#0A0A0A] pl-6 mb-6">
                  <p className="text-[#0A0A0A] text-sm font-body leading-relaxed italic">
                    {t(
                      '"The value is not in mimicking a director\'s surface style — it\'s in understanding the underlying logic: why this shot length, why this focal length, why this cut. That logic, once extracted, becomes executable."',
                      '"价值不在于模仿导演的表面风格——而在于理解其底层逻辑：为什么是这个镜头时长、这个焦段、这个剪切点。这种逻辑一旦被提取出来，就变得可执行。"'
                    )}
                  </p>
                </blockquote>

                <p className="text-[#6B6B6B] text-sm font-body leading-relaxed">
                  {t(
                    'The library is designed to scale: future expansion will cover diverse genres and script types, with contributions from Beijing Film Academy experts and students to ensure both cinematic rigor and breadth.',
                    '该策略库被设计为可扩展的：未来扩展将覆盖不同题材和类型的剧本，并联合北京电影学院的专家和学生共同完善，以确保电影艺术的严谨性与广度。'
                  )}
                </p>
              </div>

              {/* Reverse-engineering process */}
              <div className="space-y-3">
                <div className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase mb-4">
                  {t('Extraction Process', '反求分析流程')}
                </div>
                {[
                  {
                    step: '01',
                    en: 'Film Selection',
                    cn: '影片选取',
                    descEn: 'Curate cinematically significant films by director, genre, or visual style — prioritising works with distinct, analysable visual languages.',
                    descCn: '按导演、题材或视觉风格筛选具有艺术价值的影片——优先选取具有鲜明、可分析视听语言的作品。',
                  },
                  {
                    step: '02',
                    en: 'Shot Strategy Extraction',
                    cn: '分镜策略提取',
                    descEn: 'Analyse shot-by-shot: focal length choices, camera movement patterns, lighting logic, cut timing, and spatial composition principles.',
                    descCn: '逐镜头分析：焦段选择、运镜模式、光影逻辑、剪切时机与空间构图原则。',
                  },
                  {
                    step: '03',
                    en: 'Visual Design Pattern Extraction',
                    cn: '画面设计范式提取',
                    descEn: 'Extract colour palette logic, production design principles, character-space relationships, and the visual grammar that defines the film\'s aesthetic register.',
                    descCn: '提取色彩基调逻辑、美术设计原则、人物与空间关系，以及定义影片美学基调的视觉语法。',
                  },
                  {
                    step: '04',
                    en: 'Library Structuring & RAG Integration',
                    cn: '策略库构建与 RAG 集成',
                    descEn: 'Structure extracted strategies into retrievable documents — tagged by genre, mood, scene type, and director — enabling RAG-based retrieval during storyboard generation.',
                    descCn: '将提取的策略结构化为可检索文档——按题材、情绪、场景类型与导演标注——在分镜生成时通过 RAG 检索调用。',
                  },
                ].map((item) => (
                  <div key={item.step} className="border border-[#E5E5E5] bg-white p-4 hover:border-[#0A0A0A] transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <span className="font-mono-custom text-[#CCCCCC] text-[10px] shrink-0 pt-0.5">{item.step}</span>
                      <div>
                        <h4 className="font-heading font-600 text-[#0A0A0A] text-sm mb-1.5">{t(item.en, item.cn)}</h4>
                        <p className="text-[#6B6B6B] text-xs font-body leading-relaxed">{t(item.descEn, item.descCn)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 03: Agent Crew ── */}
        <div className="border-t border-[#E5E5E5] py-20 md:py-28">
          <div className="container">
            <div className="flex items-center gap-4 mb-6">
              <span className="section-number">03</span>
              <div className="editorial-line flex-1" />
              <h2 className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl tracking-tight">
                {t('Agent Crew', '智能体团队')}
              </h2>
            </div>

            <p className="text-[#6B6B6B] text-sm font-body leading-relaxed max-w-2xl mb-16">
              {t(
                'Four specialized agents work in parallel, each embodying a distinct professional role. Their outputs are synthesized by a Storyboard Skill into a unified, production-ready shot script.',
                '四个专业智能体并行工作，每个智能体对应一个独特的专业职能。它们的输出通过分镜脚本生成 Skill 综合为统一的、可直接用于制作的分镜脚本。'
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <div key={agent.num} className="border border-[#E5E5E5] p-6 hover:border-[#0A0A0A] transition-colors duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-mono-custom text-[#CCCCCC] text-[10px] block mb-1">AGENT {agent.num}</span>
                      <h4 className="font-heading font-700 text-[#0A0A0A] text-lg tracking-tight">{t(agent.roleEn, agent.roleCn)}</h4>
                    </div>
                    <div className="border border-[#E5E5E5] px-2 py-1 shrink-0 ml-4">
                      <span className="font-mono-custom text-[9px] text-[#AAAAAA]">OUTPUT</span>
                    </div>
                  </div>
                  <p className="text-[#6B6B6B] text-xs font-body leading-relaxed mb-4">{t(agent.descEn, agent.descCn)}</p>
                  <div className="border-t border-[#E5E5E5] pt-3">
                    <span className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase block mb-1">OUTPUT</span>
                    <span className="font-body text-xs text-[#0A0A0A]">{t(agent.outputEn, agent.outputCn)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Storyboard Skill note */}
            <div className="mt-8 border border-dashed border-[#0A0A0A] p-6 bg-[#FAFAFA]">
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <span className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase block mb-1">SKILL</span>
                  <h4 className="font-heading font-700 text-[#0A0A0A] text-base">{t('Storyboard Generation Skill', '分镜脚本生成 Skill')}</h4>
                </div>
                <div className="flex-1 border-l border-[#E5E5E5] pl-6">
                  <p className="text-[#6B6B6B] text-xs font-body leading-relaxed">
                    {t(
                      'A custom Skill designed to synthesize the outputs of all four agents into a unified shot script — enforcing strict single-line prompt format, cross-batch state injection for visual continuity, and RAG-retrieved director strategy application at the point of generation.',
                      '一个专门设计的 Skill，用于将四个智能体的输出综合为统一的分镜脚本——强制执行严格的单行提示词格式、用于视觉连贯性的跨批次状态注入，以及在生成时应用 RAG 检索的导演策略。'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* ── Section 04: Output Comparison ── */}
        <OutputComparisonSection t={t} />



        {/* ── Section 05: Evaluation Feedback Loop ── */}
        <div className="border-t border-[#E5E5E5] py-20 md:py-28 bg-[#FAFAFA]">
          <div className="container">
            <div className="flex items-center gap-4 mb-16">
              <span className="section-number">05</span>
              <div className="editorial-line flex-1" />
              <h2 className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl tracking-tight">
                {t('Evaluation Feedback Loop', '评估反馈闭环')}
              </h2>
            </div>

            {/* Intro */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <p className="text-[#6B6B6B] text-sm font-body leading-relaxed">
                {t(
                  'The evaluation system does not merely flag issues in generated storyboards — it learns from every human correction. Each cycle of agent assessment, expert review, and rule standardisation feeds directly back into the agent\'s prompt templates and RAG knowledge base, creating a self-improving quality control loop.',
                  '评估体系不仅仅是标记生成分镜中的问题——它从每一次人工修正中学习。每一轮 Agent 评估、专家审核与规则标准化的结果都会直接反馈到 Agent 的 Prompt 模板和 RAG 知识库中，形成自我优化的质量控制闭环。'
                )}
              </p>
              <p className="text-[#6B6B6B] text-sm font-body leading-relaxed">
                {t(
                  'The core design insight is that human expert intuition — the kind that detects subtle axis violations or emotionally inconsistent cuts — can be systematically translated into machine-readable rules. This bridges the gap between tacit professional knowledge and executable AI logic.',
                  '核心设计理念在于：人类专家的直觉——那种能察觉隐晦越轴或情绪不连贯剪切的能力——可以被系统性地转化为机器可读的规则。这弥合了隐性专业知识与可执行 AI 逻辑之间的鸿沟。'
                )}
              </p>
            </div>

            {/* Flow diagram */}
            <div className="border border-[#E5E5E5] bg-white p-6 md:p-10 mb-16">
              <div className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase mb-8 text-center">
                {t('Agent Evaluation Continuous Optimisation Workflow', 'Agent 分镜脚本评价体系持续优化工作流')}
              </div>

              <svg
                viewBox="0 0 700 640"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
              >
                {/* ── Step 1: Input ── */}
                <rect x="150" y="20" width="400" height="56" fill="white" stroke="#0A0A0A" strokeWidth="2"/>
                <text x="350" y="42" textAnchor="middle" fontSize="9" fill="#AAAAAA" letterSpacing="1">INPUT</text>
                <text x="350" y="63" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">{t('Storyboard Script', '待评估的分镜文字脚本')}</text>

                {/* Arrow 1→2 */}
                <line x1="350" y1="76" x2="350" y2="100" stroke="#0A0A0A" strokeWidth="1.5"/>
                <polygon points="344,98 356,98 350,110" fill="#0A0A0A"/>

                {/* ── Step 2: Agent Auto-Eval ── */}
                <rect x="100" y="110" width="500" height="64" fill="white" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="5,3"/>
                <text x="350" y="130" textAnchor="middle" fontSize="9" fill="#CC0000" letterSpacing="1">EVAL AGENT</text>
                <text x="350" y="152" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">{t('Agent Auto-Assessment', 'Agent 自动评估系统')}</text>
                <text x="350" y="168" textAnchor="middle" fontSize="10" fill="#6B6B6B">{t('Rule-based quality check · Issue detection · Pass/Reject', '基于当前版本规则与 Prompt 进行自动化质检')}</text>

                {/* Arrow 2→3 with label */}
                <line x1="350" y1="174" x2="350" y2="198" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                <polygon points="344,196 356,196 350,208" fill="#CC0000"/>
                <text x="360" y="192" fontSize="9" fill="#CC0000">1. {t('Preliminary assessment report', '输出初步评估结果')}</text>

                {/* ── Step 3: Human Review ── */}
                <rect x="100" y="208" width="500" height="64" fill="white" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="5,3"/>
                <text x="350" y="228" textAnchor="middle" fontSize="9" fill="#CC0000" letterSpacing="1">HUMAN-IN-THE-LOOP</text>
                <text x="350" y="250" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">{t('Expert Review Station', '专业人员人工核查台')}</text>
                <text x="350" y="266" textAnchor="middle" fontSize="10" fill="#6B6B6B">{t('Expert review · Cross-reference with agent findings', '专家深度审阅 · 与 Agent 评估结果交叉比对')}</text>

                {/* Arrow 3→4 */}
                <line x1="350" y1="272" x2="350" y2="296" stroke="#0A0A0A" strokeWidth="1.5"/>
                <polygon points="344,294 356,294 350,306" fill="#0A0A0A"/>
                <text x="360" y="290" fontSize="9" fill="#6B6B6B">2. {t('Expert verdict + cross-comparison', '识别真实问题，交叉比对')}</text>

                {/* ── Step 4: Precision/Recall ── */}
                <rect x="100" y="306" width="500" height="72" fill="white" stroke="#0A0A0A" strokeWidth="1.5"/>
                <text x="350" y="326" textAnchor="middle" fontSize="9" fill="#AAAAAA" letterSpacing="1">METRICS ANALYSIS</text>
                <text x="350" y="348" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">{t('Precision & Recall Evaluation', 'Agent 审核结果分析（精确率与召回率）')}</text>
                <text x="220" y="368" textAnchor="middle" fontSize="10" fill="#006600">✓ True Positives</text>
                <text x="350" y="368" textAnchor="middle" fontSize="10" fill="#CC0000">✗ False Positives</text>
                <text x="480" y="368" textAnchor="middle" fontSize="10" fill="#996600">△ False Negatives</text>

                {/* Arrow 4→5 */}
                <line x1="350" y1="378" x2="350" y2="402" stroke="#0A0A0A" strokeWidth="1.5"/>
                <polygon points="344,400 356,400 350,412" fill="#0A0A0A"/>
                <text x="360" y="396" fontSize="9" fill="#6B6B6B">3. {t('Extract missed & misidentified cases', '提取遗漏与误判典型案例')}</text>

                {/* ── Step 5: Standardisation ── */}
                <rect x="100" y="412" width="500" height="72" fill="white" stroke="#0A0A0A" strokeWidth="1.5"/>
                <text x="350" y="432" textAnchor="middle" fontSize="9" fill="#AAAAAA" letterSpacing="1">KNOWLEDGE DISTILLATION</text>
                <text x="350" y="454" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0A0A0A">{t('Issue Standardisation', '遗漏问题整理与标准化')}</text>
                <text x="220" y="474" textAnchor="middle" fontSize="10" fill="#6B6B6B">{t('Root cause analysis', '归因分析')}</text>
                <text x="350" y="474" textAnchor="middle" fontSize="10" fill="#6B6B6B">{t('Rule distillation', '规则提炼')}</text>
                <text x="480" y="474" textAnchor="middle" fontSize="10" fill="#6B6B6B">{t('Machine-readable format', '格式化为机器可读')}</text>

                {/* Arrow 5→6 */}
                <line x1="350" y1="484" x2="350" y2="508" stroke="#0A0A0A" strokeWidth="1.5"/>
                <polygon points="344,506 356,506 350,518" fill="#0A0A0A"/>
                <text x="360" y="502" fontSize="9" fill="#6B6B6B">4. {t('New rules + prompts + negative samples', '新规则、新 Prompt、新负样本')}</text>

                {/* ── Step 6: System Update (black) ── */}
                <rect x="100" y="518" width="500" height="64" fill="#0A0A0A" stroke="#0A0A0A" strokeWidth="2"/>
                <text x="350" y="538" textAnchor="middle" fontSize="9" fill="#888" letterSpacing="1">SYSTEM INTEGRATION</text>
                <text x="350" y="560" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">{t('Evaluation System Update & Agent Upgrade', '评估体系更新与 Agent 能力升级')}</text>
                <text x="350" y="576" textAnchor="middle" fontSize="10" fill="#888">{t('Prompt templates · RAG knowledge base · Scoring weights', '更新 Prompt · 扩充 RAG 知识库 · 调整评分权重')}</text>

                {/* ── Closed feedback loop: bottom → left → top ── */}
                <line x1="350" y1="582" x2="350" y2="610" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="40" y1="610" x2="350" y2="610" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="40" y1="48" x2="40" y2="610" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                <line x1="40" y1="48" x2="148" y2="48" stroke="#CC0000" strokeWidth="1.5" strokeDasharray="4,3"/>
                <polygon points="146,42 156,48 146,54" fill="#CC0000"/>
                <text x="350" y="630" textAnchor="middle" fontSize="9" fill="#CC0000" fontWeight="600" letterSpacing="1">
                  ↺ {t('Agent capability upgraded — re-enter evaluation pipeline', '5. 重新纳入评估体系，完成 Agent 能力升级')}
                </text>
              </svg>
            </div>

            {/* Metrics row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#E5E5E5] mb-16">
              {[
                {
                  symbol: 'P',
                  labelEn: 'Precision',
                  labelCn: '精确率',
                  colorClass: 'text-[#006600]',
                  descEn: 'Of all issues flagged by the Agent, what proportion are genuine problems? High precision reduces unnecessary rewrites by the generation model.',
                  descCn: 'Agent 标记的所有问题中，有多少是真实问题？高精确率减少生成模型的无效重写。',
                  chips: [
                    { label: 'TP', value: '✓', color: 'text-[#006600]' },
                    { label: 'FP', value: '✗', color: 'text-[#CC0000]' },
                  ],
                },
                {
                  symbol: 'R',
                  labelEn: 'Recall',
                  labelCn: '召回率',
                  colorClass: 'text-[#CC0000]',
                  descEn: 'Of all genuine issues identified by experts, how many did the Agent catch? Recall is the core metric — missed issues degrade storyboard quality.',
                  descCn: '专家识别的所有真实问题中，Agent 命中了多少？召回率是核心指标——遗漏问题直接降低分镜质量。',
                  chips: [
                    { label: 'TP', value: '✓', color: 'text-[#006600]' },
                    { label: 'FN', value: '△', color: 'text-[#996600]' },
                  ],
                },
                {
                  symbol: '↺',
                  labelEn: 'Iteration',
                  labelCn: '迭代周期',
                  colorClass: 'text-[#0A0A0A]',
                  descEn: 'Each cycle produces new rules, negative samples, and updated weights. Agent performance improves monotonically across iterations.',
                  descCn: '每个周期产生新规则、新负样本和更新权重。Agent 表现在迭代中单调提升。',
                  chips: [
                    { label: 'Cycle n', value: '→', color: 'text-[#6B6B6B]' },
                    { label: 'n+1', value: '↑', color: 'text-[#006600]' },
                  ],
                },
              ].map((m, i) => (
                <div key={i} className={`p-8 ${i < 2 ? 'border-r border-[#E5E5E5]' : ''}`}>
                  <div className={`font-heading font-800 text-5xl leading-none mb-3 ${m.colorClass}`}>{m.symbol}</div>
                  <div className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase mb-3">{t(m.labelEn, m.labelCn)}</div>
                  <p className="text-[#6B6B6B] text-xs font-body leading-relaxed mb-4">{t(m.descEn, m.descCn)}</p>
                  <div className="flex gap-2">
                    {m.chips.map((chip, j) => (
                      <div key={j} className="flex-1 border border-[#E5E5E5] p-2 text-center">
                        <span className="font-mono-custom text-[8px] text-[#AAAAAA] block mb-1">{chip.label}</span>
                        <span className={`font-heading font-800 text-lg ${chip.color}`}>{chip.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Six-Dimension Evaluation Framework (compact) ── */}
            <div className="mb-16 border border-[#E5E5E5] bg-white p-6">
              <div className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase mb-4">
                {t('Evaluation Dimensions · 6 Weighted Axes · 26 Sub-indicators', '质检维度 · 6 个加权轴 · 26 项细分指标')}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                {[
                  { num: '01', weight: '15%', en: 'Logical Consistency', cn: '逻辑一致性', items: 4, accent: false },
                  { num: '02', weight: '10%', en: 'Description Completeness', cn: '描述完整性', items: 5, accent: false },
                  { num: '03', weight: '20%', en: 'Executability', cn: '可执行性', items: 4, accent: false },
                  { num: '04', weight: '20%', en: 'Narrative Editing', cn: '叙事剪辑', items: 5, accent: false },
                  { num: '05', weight: '10%', en: 'Rhythm & Pacing', cn: '节奏控制', items: 3, accent: false },
                  { num: '06', weight: '25%', en: 'Action Choreography', cn: '动作调度', items: 9, accent: true },
                ].map((d) => (
                  <div key={d.num} className="flex items-baseline gap-2">
                    <span className="font-mono-custom text-[8px] text-[#CCCCCC] shrink-0">{d.num}</span>
                    <span
                      className="font-heading font-500 text-xs"
                      style={{ color: d.accent ? '#CC0000' : '#0A0A0A' }}
                    >
                      {t(d.en, d.cn)}
                    </span>
                    <span className="font-mono-custom text-[8px] text-[#AAAAAA] ml-auto shrink-0">{d.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rule standardisation cards */}
            <div className="font-mono-custom text-[9px] text-[#AAAAAA] tracking-widest uppercase mb-6">
              {t('From Intuition to Rule — Standardisation Process', '从直觉到规则 — 标准化流程')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {[
                {
                  step: '01',
                  en: 'Root Cause Analysis',
                  cn: '归因分析',
                  descEn: 'For each issue missed by the Agent, ask: why did it fail? Was it a gap in the prompt template, a missing rule category, or a case absent from the RAG knowledge base?',
                  descCn: '针对 Agent 遗漏的每个问题，追问：为什么没有检测到？是 Prompt 模板的缺口、规则类别的缺失，还是 RAG 知识库中未覆盖的案例？',
                },
                {
                  step: '02',
                  en: 'Rule Distillation',
                  cn: '规则提炼',
                  descEn: 'Translate tacit expertise into explicit logic. "A subtle axis violation in a two-person dialogue scene" becomes a structured rule with detection criteria and severity weighting.',
                  descCn: '将隐性专业知识转化为显性逻辑。"双人对话场景中的隐晦越轴"被转化为包含检测标准和严重程度权重的结构化规则。',
                },
                {
                  step: '03',
                  en: 'Machine-Readable Formatting',
                  cn: '格式化为机器可读',
                  descEn: 'Structure each rule: natural language description, detection logic, severity level (Critical / Major / Minor), and annotated negative sample cases for RAG retrieval.',
                  descCn: '将每条规则结构化：自然语言描述、检测逻辑、严重程度（严重/主要/次要），以及用于 RAG 检索的标注负样本案例。',
                },
                {
                  step: '04',
                  en: 'Integration & Validation',
                  cn: '集成与验证',
                  descEn: 'New rules are integrated into the Agent\'s prompt template and RAG knowledge base. The next evaluation cycle validates whether the Agent now correctly detects the previously missed issue type.',
                  descCn: '新规则被集成到 Agent 的 Prompt 模板和 RAG 知识库中。下一个评估周期将验证 Agent 是否能正确检测此前遗漏的问题类型。',
                },
              ].map((item) => (
                <div key={item.step} className="border border-[#E5E5E5] bg-white p-5 hover:border-[#0A0A0A] transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <span className="font-mono-custom text-[#CCCCCC] text-[10px] shrink-0 pt-0.5">{item.step}</span>
                    <div>
                      <h4 className="font-heading font-600 text-[#0A0A0A] text-sm mb-1.5">{t(item.en, item.cn)}</h4>
                      <p className="text-[#6B6B6B] text-xs font-body leading-relaxed">{t(item.descEn, item.descCn)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blockquote */}
            <blockquote className="border-l-2 border-[#0A0A0A] pl-6">
              <p className="text-[#0A0A0A] text-sm font-body leading-relaxed italic">
                {t(
                  '"The hardest part is not building the evaluation agent — it is systematically capturing what the agent misses. Human expert intuition, once translated into structured rules, becomes the most valuable training signal in the entire pipeline."',
                  '"最难的部分不是搭建评估 Agent——而是系统性地捕捉 Agent 遗漏的内容。人类专家的直觉，一旦被转化为结构化规则，就成为整个管线中最有价值的训练信号。"'
                )}
              </p>
              <p className="font-mono-custom text-[9px] text-[#AAAAAA] mt-3">— REY WU</p>
            </blockquote>
          </div>
        </div>


        {/* ── Section 06: Current Status & Next Steps ── */}
        <div className="border-t border-[#E5E5E5] py-20 md:py-28">
          <div className="container">
            <div className="flex items-center gap-4 mb-16">
              <span className="section-number">06</span>
              <div className="editorial-line flex-1" />
              <h2 className="font-heading font-700 text-[#0A0A0A] text-2xl md:text-3xl tracking-tight">
                {t('Status & Next Steps', '当前进展与后续计划')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-heading font-600 text-[#0A0A0A] text-base mb-4">{t('Current Status', '当前状态')}</h3>
                <div className="space-y-3">
                  {[
                    { en: 'System architecture designed and built', cn: '系统架构已设计并搭建完成' },
                    { en: 'Initial validation completed on one feature film', cn: '已在单部影片上完成初步验证' },
                    { en: 'Results demonstrate strong storyboard quality improvement', cn: '结果显示分镜质量有显著提升' },
                    { en: 'Evaluation loop operational with human review', cn: '评估闭环已运行，人工审核机制有效' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-mono-custom text-[9px] text-[#0A0A0A] shrink-0 pt-0.5">✓</span>
                      <span className="text-[#6B6B6B] text-sm font-body">{t(item.en, item.cn)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-heading font-600 text-[#0A0A0A] text-base mb-4">{t('Next Steps', '后续计划')}</h3>
                <div className="space-y-3">
                  {[
                    { en: 'Expand Director Strategy Library across diverse genres and script types', cn: '扩展导演资料策略库，覆盖不同题材和类型的剧本' },
                    { en: 'Organise Beijing Film Academy experts and students to contribute to the library and evaluation system', cn: '组织北京电影学院专家和学生共同完善策略库和评估体系' },
                    { en: 'Validate across multiple feature films to stress-test the system', cn: '在多部影片上进行验证，对系统进行压力测试' },
                    { en: 'Develop a more comprehensive evaluation rubric with professional film critics', cn: '与专业影评人共同开发更完善的评估标准体系' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="font-mono-custom text-[9px] text-[#AAAAAA] shrink-0 pt-0.5">→</span>
                      <span className="text-[#6B6B6B] text-sm font-body">{t(item.en, item.cn)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Interested? CTA ── */}
        <div className="border-t border-[#E5E5E5] py-16 md:py-20 bg-[#0A0A0A]">
          <div className="container text-center">
            <span className="font-mono-custom text-[10px] text-[#666] tracking-widest uppercase block mb-4">
              {t('INTERESTED IN THIS WORK?', '对这个项目感兴趣？')}
            </span>
            <h3 className="font-heading font-700 text-white text-2xl md:text-3xl tracking-tight mb-6">
              {t("Let's talk", '聊聊吧')}
            </h3>
            <p className="text-[#888] text-sm font-body leading-relaxed max-w-lg mx-auto mb-8">
              {t(
                'Open to AI content projects, creative technology collaborations, and product & storytelling experiments.',
                '欢迎 AI 内容项目、创意技术合作、产品与叙事实验方向的交流。'
              )}
            </p>
            <a
              href="mailto:18868497748@163.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] text-sm font-body font-500 tracking-wide hover:bg-[#E5E5E5] transition-all duration-300"
            >
              <span>{t('Get in Touch', '联系 Rey')}</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* ── Footer nav ── */}
        <div className="border-t border-[#E5E5E5] py-12">
          <div className="container flex items-center justify-between">
            <a href="/projects/ai-previz" className="font-mono-custom text-[10px] text-[#6B6B6B] tracking-widest uppercase hover:text-[#0A0A0A] transition-colors">
              ← {t('Previous: AI Pre-viz Workflow', '上一个：AI 预演工作流')}
            </a>
            <a href="/#projects" className="inline-flex items-center gap-2 text-[#0A0A0A] text-sm font-body border-b border-[#0A0A0A] pb-0.5 hover:gap-3 transition-all duration-300">
              <span>{t('Back to Portfolio', '返回作品集')}</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
