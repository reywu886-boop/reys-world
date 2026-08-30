import { useState } from 'react';
import CaseStudyNav from '@/components/CaseStudyNav';
import Footer from '@/components/Footer';
import RuleLoopDiagrams from '@/components/RuleLoopDiagrams';

const COPY = {
  heroLabel: 'AI PRODUCT / RULELOOP',
  heroTitle: 'RuleLoop',
  heroKicker: '每个问题都要有去向，但不是每个问题都要变成规则',
  heroIntro: '把疑难 Case、原始证据、质检答复与规则版本放回同一条链路：已有规则能够解释时直接答疑，只有真正暴露规则缺口的问题才升级给产品成员。',
  responsibilityLabel: '\u6211\u8d1f\u8d23\u7684\u90e8\u5206',
  responsibility: '\u95ee\u9898\u53d1\u73b0\u3001\u4ea7\u54c1\u6d41\u7a0b\u4e0e\u53ef\u8fd0\u884c\u539f\u578b\u8bbe\u8ba1',
  statusLabel: '\u5f53\u524d\u72b6\u6001',
  status: '\u53ef\u8fd0\u884c\u539f\u578b\uff0c\u9700\u6c42\u5df2\u63d0\u4ea4',
  viewerTitle: '跟着一个 Case，看清它如何变成规则',
  viewerIntro: '标注员提交带有任务上下文的问题，Case 进入案例池。质检员完成答疑或升级，产品成员据此决定是否修改规则。',
  openPrototype: '新窗口打开完整 Demo',
  resultTitle: '\u539f\u578b\u6700\u7ec8\u8f6c\u6210\u4e86\u4ec0\u4e48\u9700\u6c42',
  resultCopy: '原型覆盖标注员提问、案例池记录、质检答疑与分流、产品审核规则修改，以及规则回到下一轮作业的全过程。验证后，这些功能被整理为平台需求；当前证据属于产品原型与需求验证，不等同于已经上线的业务指标。',
};

const VIEWS = [
  { src: '/prototypes/ruleloop/annotator-task.html', role: '标注员', title: '标注工作台', copy: '在当前任务里提交问题，并保留对应的任务和标注结果。' },
  { src: '/prototypes/ruleloop/case-pool.html', role: '全员共用', title: '案例池', copy: '集中查看每个问题的来源、负责人、处理状态和历史记录。' },
  { src: '/prototypes/ruleloop/qa-console.html', role: '质检员', title: '质检答疑', copy: '处理已有规则能够回答的问题，并将需要改规则的 Case 升级。' },
  { src: '/prototypes/ruleloop/pm-decisions.html', role: '产品成员', title: '规则决策', copy: '根据 Case 和质检结论，确认是否修改规则以及修改到哪里。' },
];

export default function RuleLoopCaseStudy() {
  const [active, setActive] = useState(0);
  const view = VIEWS[active];
  return <div className="min-h-[100dvh] bg-[#eef1ed] text-[#111817]">
    <CaseStudyNav fixedLanguage="cn" />
    <main className="pt-14">
      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 xl:px-16">
        <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
          <div className="max-w-4xl">
            <p className="font-mono-custom text-[10px] tracking-[0.16em] text-[#68756f]">{COPY.heroLabel}</p>
            <h1 className="mt-5 font-heading text-5xl font-700 leading-[0.98] tracking-tight md:text-7xl">{COPY.heroTitle}</h1>
            <p className="mt-5 font-heading text-2xl font-700 tracking-tight text-[#33423b] md:text-3xl">{COPY.heroKicker}</p>
            <p className="mt-6 max-w-[62ch] text-base leading-8 text-[#52615b] md:text-lg">{COPY.heroIntro}</p>
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-[#c3ccc6] pt-5">
            <div>
              <p className="font-mono-custom text-[8px] tracking-[0.15em] text-[#76827c]">{COPY.responsibilityLabel}</p>
              <p className="mt-2 font-heading text-lg font-700">{COPY.responsibility}</p>
            </div>
            <div>
              <p className="font-mono-custom text-[8px] tracking-[0.15em] text-[#76827c]">{COPY.statusLabel}</p>
              <p className="mt-2 font-heading text-lg font-700">{COPY.status}</p>
            </div>
            </div>
          </div>
          <aside className="border border-[#aeb8b1] bg-[#f8f9f6] p-5 shadow-[0_18px_44px_rgba(30,45,37,.07)]">
            <div className="flex items-center justify-between border-b border-[#d1d8d3] pb-4">
              <span className="font-mono-custom text-[9px] tracking-[0.14em] text-[#68756f]">CASE TRACE</span>
              <span className="font-mono-custom text-[10px] font-700 text-[#806c31]">A017</span>
            </div>
            <div className="mt-5 space-y-0">
              {['标注现场提出疑问', '案例池保留上下文', '质检答疑并完成分流', '产品审核处理建议', '结果回到下一轮作业'].map((step, index) => <div key={step} className="relative flex gap-4 pb-5 last:pb-0">
                {index < 4 && <span className="absolute left-[5px] top-4 h-[calc(100%-7px)] border-l border-dashed border-[#b9a765]" />}
                <span className="relative mt-1 h-3 w-3 shrink-0 border border-[#806c31] bg-[#eef1ed]" />
                <p className="text-sm leading-5 text-[#3f4d47]">{step}</p>
              </div>)}
            </div>
          </aside>
        </div>
      </section>

      <RuleLoopDiagrams />

      <section className="border-y border-[#cbd2cd] bg-[#111b16] py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 md:px-12 xl:grid-cols-[0.72fr_1.28fr] xl:px-16">
          <div className="max-w-xl"><p className="font-mono-custom text-[9px] tracking-[0.16em] text-[#d6c07f]">AI / HUMAN BOUNDARY</p><h2 className="mt-4 font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">AI 负责整理与起草，人负责规则判断</h2><p className="mt-5 text-base leading-8 text-white/64">RuleLoop 不是让模型自动改 SOP，而是让 AI 降低检索、归档和起草成本，同时把是否升级、是否发布与影响范围保留给质检和产品成员。</p></div>
          <div className="grid gap-px bg-white/16 sm:grid-cols-2"><Boundary title="系统 / AI" items={['自动关联任务上下文', '检索相似 Case 与已有规则', '整理证据并起草修改建议', '同步处理状态与发布结果']} /><Boundary title="质检 / 产品成员" items={['判断已有规则能否回答', '确认是否构成规则缺口', '审核修改位置与影响范围', '决定发布、退回或驳回']} /></div>
        </div>
      </section>

      <section className="border-b border-[#cbd2cd] bg-[#e6ebe6] py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16">
          <div className="max-w-4xl">
            <h2 className="max-w-[20ch] font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">{COPY.viewerTitle}</h2>
            <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-[#53615c]">{COPY.viewerIntro}</p>
          </div>

          <div className="mt-10 grid border border-[#adb9b1] bg-[#adb9b1] md:grid-cols-4">
            {VIEWS.map((item, index) => <button key={item.title} type="button" onClick={() => setActive(index)} className={`min-h-24 p-5 text-left transition-colors ${active === index ? 'bg-[#131918] text-white' : 'bg-[#f7f8f5] text-[#111817] hover:bg-white'}`}>
              <span className={`font-mono-custom text-[8px] tracking-[0.12em] ${active === index ? 'text-[#d6c07f]' : 'text-[#6f7b75]'}`}>{item.role}</span>
              <strong className="mt-2 block font-heading text-lg">{item.title}</strong>
            </button>)}
          </div>

          <div className="mt-5 overflow-hidden border border-[#8f9d94] bg-[#17201d] shadow-[0_28px_80px_rgba(31,47,39,0.12)]">
            <div className="flex flex-col gap-4 border-b border-white/16 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
              <div>
                <p className="font-heading text-xl font-700 text-white">{view.title}</p>
                <p className="mt-1 max-w-[66ch] text-xs leading-5 text-white/58">{view.copy}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={view.src} target="_blank" rel="noreferrer" className="w-fit shrink-0 border border-white/35 px-4 py-3 text-sm font-700 text-white transition-colors hover:bg-white hover:text-[#17201d] active:translate-y-px">单独打开当前界面</a>
                <a href="/prototypes/ruleloop/index.html" target="_blank" rel="noreferrer" className="w-fit shrink-0 border border-[#d6c07f] px-4 py-3 text-sm font-700 text-[#d6c07f] transition-colors hover:bg-[#d6c07f] hover:text-[#17201d] active:translate-y-px">{COPY.openPrototype}</a>
              </div>
            </div>
            <div className="bg-[#dfe5df] p-2 md:p-4">
              <iframe key={view.src} title={view.title} src={view.src} className="h-[760px] w-full bg-white md:h-[920px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-16 md:px-12 md:py-24 xl:px-16">
        <div className="max-w-4xl">
          <h2 className="font-heading text-3xl font-700 tracking-tight md:text-5xl">{COPY.resultTitle}</h2>
          <p className="mt-6 max-w-[68ch] text-base leading-relaxed text-[#53615c]">{COPY.resultCopy}</p>
        </div>
      </section>

      <section className="border-t border-[#cbd2cd] bg-[#e6ebe6] py-12 md:py-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-12 xl:px-16">
          <div>
            <p className="font-mono-custom text-[9px] tracking-[0.15em] text-[#68756f]">DATA PRODUCTION PROTOTYPES</p>
            <h2 className="mt-3 font-heading text-2xl font-700 tracking-tight md:text-3xl">同组案例</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/projects/caption-four-roles" className="border border-[#17201d] px-4 py-3 text-sm font-700 text-[#17201d] transition-colors hover:bg-[#17201d] hover:text-white">查看 Caption 四岗位拆分 →</a>
            <a href="/projects/data-production-products" className="border border-[#8f9d94] px-4 py-3 text-sm font-700 text-[#34413b] transition-colors hover:bg-white">查看产品原型总览</a>
          </div>
        </div>
      </section>
    </main>
    <Footer fixedLanguage="cn" />
  </div>;
}

function Boundary({ title, items }: { title: string; items: string[] }) {
  return <article className="bg-[#111b16] p-6 md:p-8"><h3 className="font-heading text-2xl font-700">{title}</h3><ul className="mt-6 space-y-3">{items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-white/66"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#d6c07f]" />{item}</li>)}</ul></article>;
}
