import { useState } from 'react';
import CaseStudyNav from '@/components/CaseStudyNav';
import Footer from '@/components/Footer';
import RuleLoopDiagrams from '@/components/RuleLoopDiagrams';

const COPY = {
  heroLabel: 'AI PRODUCT / RULELOOP',
  heroTitle: 'RuleLoop',
  heroKicker: '标注答疑与规则迭代平台',
  heroIntro: '面向视频生成模型数据生产，把标注现场的疑问、质检判断、案例沉淀与规则迭代留在同一条 Case 链路中。',
  responsibilityLabel: '\u6211\u8d1f\u8d23\u7684\u90e8\u5206',
  responsibility: '\u4ea7\u54c1\u673a\u5236\u4e0e\u539f\u578b\u8bbe\u8ba1',
  statusLabel: '\u5f53\u524d\u72b6\u6001',
  status: '\u53ef\u8fd0\u884c\u539f\u578b\uff0c\u9700\u6c42\u5df2\u63d0\u4ea4',
  viewerTitle: '跟着一个 Case，看清三类角色如何协作。',
  viewerIntro: '标注员在作业现场提问，Case 进入案例池，质检员答疑或升级，产品成员审核是否形成规则更新。',
  openPrototype: '新窗口打开完整 Demo',
  resultTitle: '\u539f\u578b\u6700\u7ec8\u8f6c\u6210\u4e86\u4ec0\u4e48\u9700\u6c42\uff1f',
  resultCopy: '标注侧原地提问、案例池统一沉淀、质检答疑与分流、产品侧审核规则更新，以及结果回到下一轮作业。这些机制已经通过可运行原型验证，并转化为平台需求。',
};

const VIEWS = [
  { src: '/prototypes/ruleloop/annotator-task.html', role: '标注侧', title: '标注工作台', copy: '在当前任务中直接带着 Case 和疑问向上提交。' },
  { src: '/prototypes/ruleloop/case-pool.html', role: '全员共用', title: '案例池', copy: '统一保存问题来源、当前负责人和处理轨迹。' },
  { src: '/prototypes/ruleloop/qa-console.html', role: '质检侧', title: '答疑看板', copy: '先答疑，再判断是直接关闭还是升级给产品成员。' },
  { src: '/prototypes/ruleloop/pm-decisions.html', role: '产品侧', title: '决策面板', copy: '查看 Case 和质检结论，审核修改类型、目标位置和合并结果。' },
];

export default function RuleLoopCaseStudy() {
  const [active, setActive] = useState(0);
  const view = VIEWS[active];
  return <div className="min-h-[100dvh] bg-[#eef1ed] text-[#111817]">
    <CaseStudyNav />
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
    </main>
    <Footer />
  </div>;
}
