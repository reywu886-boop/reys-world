import { useState } from 'react';
import CaseStudyNav from '@/components/CaseStudyNav';
import Footer from '@/components/Footer';

const ROLES = [
  { id: 'r1', number: '01', name: '预审岗', system: '承担总结描述与主体判断', colour: '#28aede', soft: '#e5f6fc', scope: '主体定义、坏例判断、总结描述', question: '这条任务能否进入后续标注？', copy: '先确认主体与整体事件，为后续两岗建立统一的语义框架。' },
  { id: 'r2', number: '02', name: '画面描述岗', system: '负责静态视觉信息', colour: '#2d8152', soft: '#e4f2e9', scope: '主体、物体、环境、画面文字', question: '画面里有什么，处在什么环境中？', copy: '集中观察稳定的视觉信息，不必同时判断动作、时序与运镜。' },
  { id: 'r3', number: '03', name: '镜头叙事岗', system: '负责动态与镜头信息', colour: '#e4c23e', soft: '#fff8d8', scope: '动作、运镜、方向、速度、时序', question: '谁在变化，镜头如何表达？', copy: '把最容易漏写、错写的运动信息交给专门岗位。' },
  { id: 'r4', number: '04', name: '终审岗', system: '负责风格描述与最终校对', colour: '#ed2323', soft: '#fee8e8', scope: '风格字段、全文一致性、合并导出', question: '四个字段能否合成一条完整 Caption？', copy: '检查风格、重复、事实冲突与遗漏后完成最终交付。' },
];

const PAINS = [
  ['记忆成本高', '一个人要同时记住四类信息、规则和字段格式。'],
  ['关注点不断切换', '刚看完人物和场景，就要判断动作、运镜和风格。'],
  ['质量与效率都不稳定', '长字段面对空白输入框，容易漏写、重复、流水账，质检返修也随之增加。'],
];

export default function CaptionFourRolesCaseStudy() {
  const [activeId, setActiveId] = useState('r1');
  const [demoOpen, setDemoOpen] = useState(false);
  const active = ROLES.find((role) => role.id === activeId) ?? ROLES[0];

  return <div className="min-h-[100dvh] bg-[#f3f6f3] text-[#101716]">
    <CaseStudyNav />
    <main className="pt-14">
      <section className="mx-auto grid max-w-[1440px] gap-10 px-6 py-16 md:px-12 md:py-20 xl:grid-cols-[.92fr_1.08fr] xl:px-16">
        <div className="max-w-3xl self-end">
          <p className="font-mono-custom text-[10px] tracking-[.16em] text-[#66746d]">AI PRODUCT / CAPTION PRODUCTION</p>
          <h1 className="mt-5 font-heading text-5xl font-700 leading-[.95] tracking-tight md:text-7xl">Caption<br />四岗位流水标注平台</h1>
          <p className="mt-7 max-w-[58ch] text-base leading-8 text-[#4b5a53] md:text-lg">把依赖个人综合能力的长 Caption 标注，重构为可分工、可协作、可质检的规模化生产流程。</p>
          <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-[#c4cec7] pt-5"><Meta label="我负责的部分" value="流程产品化、原型设计与平台提需" /><Meta label="验证结果" value="准确率约 40% → 80%，效率约 +50%" /></div>
        </div>
        <CaptionStructure />
      </section>

      <section className="border-y border-[#c9d3cc] bg-white py-16 md:py-24"><div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16">
        <div className="max-w-4xl"><h2 className="font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">原来的作业，是一个标注员独自完成一整条 Caption。</h2><p className="mt-5 max-w-[70ch] text-base leading-8 text-[#516059] md:text-lg">视频生成模型需要从 Caption 中学习画面里有什么、元素如何运动、镜头如何表达，以及整体呈现什么视觉风格。原有规范把这些要求同时交给同一个人完成。</p></div>
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.12fr_.88fr]"><FullCaption /><div className="border border-[#bdc9c1] bg-[#f4f7f4] p-6 md:p-8"><p className="font-mono-custom text-[9px] tracking-[.15em] text-[#6d7c74]">痛点 / 为什么继续补 SOP 不够</p><div className="mt-7 space-y-7">{PAINS.map(([title, copy], index) => <div key={title} className="grid grid-cols-[34px_1fr] gap-4"><span className="font-mono-custom text-sm text-[#7a887f]">0{index + 1}</span><div><h3 className="font-heading text-xl font-700">{title}</h3><p className="mt-2 text-sm leading-6 text-[#526059]">{copy}</p></div></div>)}</div><p className="mt-8 border-l-2 border-[#101716] pl-4 text-sm leading-6 text-[#33433b]">继续增加规则、补充 Case、反复培训，只会让单个标注员需要记忆的内容越来越多。问题已经不只在 SOP，而在生产关系。</p></div></div>
      </div></section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 xl:px-16"><div className="max-w-4xl"><p className="font-mono-custom text-[9px] tracking-[.16em] text-[#68766f]">A / 重新拆解生产关系</p><h2 className="mt-4 font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">把一条长 Caption 看成四种专业判断，而不是一段等待填写的长文本。</h2><p className="mt-5 max-w-[70ch] text-base leading-8 text-[#516059]">拆分不等于把字段交给四个人。每个岗位的观察对象、学习内容、交接关系和质检重点都重新定义；平台再把这些边界落实到可编辑区域、任务状态与合并逻辑中。</p></div>
        <div className="mt-12 grid gap-px overflow-hidden border border-[#b8c5bd] bg-[#b8c5bd] md:grid-cols-2">{ROLES.map((role) => <button key={role.id} type="button" onClick={() => setActiveId(role.id)} className={`min-h-64 p-6 text-left transition-colors md:p-8 ${activeId === role.id ? 'bg-[#101716] text-white' : 'bg-white text-[#101716] hover:bg-[#f6f8f5]'}`}><span className="block h-2 w-12" style={{ background: role.colour }} /><p className={`mt-7 font-mono-custom text-[9px] tracking-[.15em] ${activeId === role.id ? 'text-white/55' : 'text-[#75827b]'}`}>{role.number} / {role.system}</p><h3 className="mt-3 font-heading text-2xl font-700">{role.name}</h3><p className={`mt-3 text-sm leading-6 ${activeId === role.id ? 'text-white/72' : 'text-[#56645d]'}`}>{role.scope}</p></button>)}</div>
        <div className="border border-t-0 border-[#b8c5bd] bg-[#f9fbf8] p-6 md:grid md:grid-cols-[.7fr_1.3fr] md:gap-8 md:p-8"><div><span className="inline-block h-2 w-12" style={{ background: active.colour }} /><p className="mt-4 font-heading text-2xl font-700">{active.name}</p><p className="mt-2 text-sm text-[#65736b]">{active.system}</p></div><div><p className="font-heading text-xl font-700 leading-7">“{active.question}”</p><p className="mt-3 max-w-[58ch] text-base leading-7 text-[#4e5d55]">{active.copy}</p></div></div>
      </section>

      <section className="border-y border-[#c8d2cb] bg-[#e5ece7] py-16 md:py-24"><div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16"><div className="max-w-4xl"><h2 className="font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">平台让四岗能够协作，不把分工变成四份互不相干的文档。</h2><p className="mt-5 max-w-[70ch] text-base leading-8 text-[#516059]">岗位之间需要有明确的上下游依赖：总结先建立语义框架，静态与动态围绕同一主体补充，风格与终审再检查完整性、重复和事实冲突。任何一处疑问都能回传到对应的负责人。</p></div><Workflow /></div></section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 xl:px-16"><div className="grid gap-10 xl:grid-cols-[.72fr_1.28fr]"><div><p className="font-mono-custom text-[9px] tracking-[.16em] text-[#68766f]">R / 试点与结果</p><h2 className="mt-4 font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">先小范围验证，再把流程变成平台需求。</h2><p className="mt-5 text-base leading-8 text-[#516059]">试点持续观察单字段准确率、学习周期、单位时间产量、返修率与字段合并冲突。拆分后，标注员更容易理解自己的任务，字段质量和产能也更稳定。</p></div><div className="grid gap-5 sm:grid-cols-2"><Outcome value="约 40% → 80%" title="Caption 标注准确率" copy="复杂任务由单人记忆与判断，转为岗位边界、规则与质检共同保障。" /><Outcome value="约 +50%" title="整体标注效率" copy="每个人专注稳定维度，减少在画面、运动和风格之间反复切换。" /><Outcome value="4 个岗位" title="可复制的生产单元" copy="各岗位可独立培训、配置 SOP、观察产能和定位质量问题。" /><Outcome value="已提交" title="平台改造需求" copy="多岗作业、字段流转、问题反馈、案例沉淀和规则迭代进入正式方案。" /></div></div></section>

      <section className="border-t border-[#c8d2cb] bg-[#111b16] py-16 text-white md:py-20"><div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div className="max-w-3xl"><p className="font-mono-custom text-[9px] tracking-[.16em] text-[#d6c07f]">ORIGINAL RUNNABLE PROTOTYPE</p><h2 className="mt-4 font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">直接在页面里阅览原型与后台测速。</h2><p className="mt-5 text-base leading-7 text-white/67">Demo 会自动登录并保留原有的数据包、工作台、总览、流水线与测速功能。任何出现 Caption 正文的位置都会以遮蔽条替代，避免公开样本内容。</p></div><button type="button" onClick={() => setDemoOpen((open) => !open)} aria-expanded={demoOpen} className="shrink-0 border border-[#d6c07f] px-5 py-3 text-sm font-700 text-[#d6c07f] transition-colors hover:bg-[#d6c07f] hover:text-[#132019] active:translate-y-px">{demoOpen ? '收起 Demo' : '展开 Demo 与测速'}</button></div>{demoOpen && <div className="mt-10 overflow-hidden border border-white/20 bg-white"><iframe title="Caption 平台公开阅览" src="http://localhost:3001/?preview=1&view=dash" className="h-[760px] w-full bg-white md:h-[820px]" /></div>}</div></section>
    </main><Footer /></div>;
}

function CaptionStructure() { return <figure className="border border-[#aebbb3] bg-white p-5 shadow-[0_22px_60px_rgba(23,39,30,.09)] md:p-7"><figcaption className="flex justify-between border-b border-[#d7dfd9] pb-4 font-mono-custom text-[9px] tracking-[.14em] text-[#66746d]"><span>脱敏结构图</span><span>四段式 Caption</span></figcaption><div className="mt-6 grid gap-2"><StructureBlock title="总结描述" colour="#28aede" /><StructureBlock title="静态描述" colour="#2d8152" /><StructureBlock title="动态描述" colour="#e4c23e" /><StructureBlock title="风格描述" colour="#ed2323" /></div><p className="mt-6 text-sm leading-6 text-[#5b6961]">公开页面仅保留四个字段及其颜色，不展示字段内容、内部规则和样本细节。</p></figure>; }
function StructureBlock({ title, colour }: { title: string; colour: string }) { return <div className="flex min-h-12 items-center px-4 text-sm font-700 text-white" style={{ background: colour }}>{title}</div>; }
function FullCaption() { return <article className="border border-[#b8c5bd] bg-[#101a15] p-6 text-white md:p-8"><p className="font-mono-custom text-[9px] tracking-[.15em] text-[#d6c07f]">原来由一个人完成的一整条 Caption</p><p className="mt-3 text-sm leading-6 text-white/64">以下只保留字段结构。实际作业中，每一段都有大量观察信息、格式要求与禁用表达，需要标注员在同一条任务中持续切换判断。</p><div className="mt-7 space-y-3"><MaskedField name="总结描述" colour="#28aede" /><MaskedField name="静态描述" colour="#2d8152" /><MaskedField name="动态描述" colour="#e4c23e" /><MaskedField name="风格描述" colour="#ed2323" /></div></article>; }
function MaskedField({ name, colour }: { name: string; colour: string }) { return <div className="border border-white/15 p-4"><span className="text-xs font-700" style={{ color: colour }}>{name}</span><div className="mt-3 flex gap-2"><span className="h-2 w-5/12 bg-white/16" /><span className="h-2 w-3/12 bg-white/16" /><span className="h-2 flex-1 bg-white/16" /></div></div>; }
function Workflow() { return <div className="mt-12 overflow-hidden border border-[#aebbb3] bg-[#f8faf7]"><div className="grid gap-px bg-[#b8c5bd] md:grid-cols-[1fr_auto_1fr_auto_1fr]"><Flow label="1. 总结" title="先建立整体语义" copy="定义主体、场景与事件" colour="#28aede" /><Arrow /><div className="grid gap-px bg-[#b8c5bd] sm:grid-cols-2"><Flow label="2. 静态" title="补画面信息" copy="主体、场景、文字" colour="#2d8152" /><Flow label="3. 动态" title="补运动与镜头" copy="动作、时序、运镜" colour="#e4c23e" /></div><Arrow /><Flow label="4. 风格 / 终审" title="合并并检查一致性" copy="避免重复、冲突与遗漏" colour="#ed2323" /></div><div className="grid gap-6 p-6 md:grid-cols-3"><p className="text-sm leading-6 text-[#4f5d56]">每个岗位只编辑自己的字段，降低记忆成本。</p><p className="text-sm leading-6 text-[#4f5d56]">静态和动态在同一语义框架下协作，避免各自描述不同的主体或事件。</p><p className="text-sm leading-6 text-[#4f5d56]">合并与质检检查字段是否互补、重复、冲突或漏掉核心动作。</p></div></div>; }
function Flow({ label, title, copy, colour }: { label: string; title: string; copy: string; colour: string }) { return <div className="min-h-48 bg-white p-6"><span className="block h-2 w-10" style={{ background: colour }} /><p className="mt-5 font-mono-custom text-[9px] tracking-[.14em] text-[#75827b]">{label}</p><h3 className="mt-2 font-heading text-xl font-700">{title}</h3><p className="mt-3 text-sm leading-6 text-[#57655e]">{copy}</p></div>; }
function Arrow() { return <div className="hidden items-center justify-center bg-[#e5ece7] font-mono-custom text-xl text-[#647269] md:flex">→</div>; }
function Meta({ label, value }: { label: string; value: string }) { return <div><p className="font-mono-custom text-[8px] tracking-[.15em] text-[#738079]">{label}</p><p className="mt-2 font-heading text-lg font-700">{value}</p></div>; }
function Outcome({ value, title, copy }: { value: string; title: string; copy: string }) { return <article className="border border-[#b8c5bd] bg-white p-6"><p className="font-heading text-3xl font-700 tracking-tight">{value}</p><h3 className="mt-5 font-heading text-lg font-700">{title}</h3><p className="mt-2 text-sm leading-6 text-[#596760]">{copy}</p></article>; }
