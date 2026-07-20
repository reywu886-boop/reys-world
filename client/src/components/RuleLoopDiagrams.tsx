const LEGACY_STATIONS = [
  {
    tool: '标注台 / 质检台',
    action: '作业中出现一个难以判断的 case。',
    detail: '此时素材位置、原标注、修正标注和完整上下文都还在同一个任务里。',
    record: '为了请产品确认，只能先截图，再补一句文字说明。',
    missing: '离开任务后，原文位置和上下文开始丢失。',
  },
  {
    tool: '群聊 / 会议纪要',
    action: '大家围绕截图讨论应该怎么标。',
    detail: '群里通常能得到一句处理结论，但判断依据散落在前后消息和会议口头讨论里。',
    record: '留下的是截图、聊天记录和一句临时答案。',
    missing: '很难追溯是谁决定的，也不知道这条结论是否已经生效。',
  },
  {
    tool: 'Excel 答疑表',
    action: '质检员再把问题和结论登记进表格。',
    detail: '表格用于跟进处理状态，但素材、聊天讨论和最终规则分别在别的地方。',
    record: '留下的是一行摘要、负责人和待处理状态。',
    missing: '查一个问题，要同时翻任务、群聊和表格。',
  },
  {
    tool: '腾讯文档 / SOP',
    action: '产品成员手动把结论改写成 SOP 补丁。',
    detail: '改完文档后还要通知标注员。谁看过、谁还在用旧版本，无法直接确认。',
    record: '留下的是一段更新后的规则文字。',
    missing: '规则和最初的 case、讨论过程、决策记录断开了。',
  },
];

const TRANSFERS = [
  { label: '截图转述', note: '第一次搬运' },
  { label: '重新登记', note: '第二次搬运' },
  { label: '手写补丁', note: '第三次搬运' },
];

const RULELOOP_STAGES = [
  {
    actor: '标注员',
    title: '在作业中直接提交疑问',
    description: '不用退出任务，也不用重新截图。系统自动带上素材、标注结果、任务位置和关联模块。',
    output: '得到：一条带着完整作业上下文的 Case',
    position: 'col-start-1 row-start-1',
  },
  {
    actor: '系统',
    title: '把问题放入案例池',
    description: '同一个编号保存问题来源、证据、处理人和状态。标注员、质检员和产品成员看到的是同一条记录。',
    output: '得到：可以追踪、检索和分派的待答疑 Case',
    position: 'col-start-5 row-start-1',
  },
  {
    actor: '质检员',
    title: '先答疑，再判断要不要改规则',
    description: '已有规则能够解释时，质检员直接答复并关闭。只有确认存在规则缺口，才升级给产品成员。',
    output: '两种结果：直接答复，或升级为规则迭代',
    position: 'col-start-5 row-start-3',
  },
  {
    actor: '系统 / AI',
    title: '只为规则缺口起草修改建议',
    description: '系统查找相似内容，整理 Case，并生成修改类型、建议位置和修改草稿，最终决定仍然交给人。',
    output: '生成：一项等待产品成员审核的修改建议',
    position: 'col-start-5 row-start-5',
  },
  {
    actor: '产品成员',
    title: '审核修改，并发布新版本',
    description: '产品成员确认是否要改、改在哪里和影响哪些作业。通过后形成版本记录，也可以退回或驳回。',
    output: '留下：产品决策、修改位置和可撤回的版本',
    position: 'col-start-1 row-start-5',
  },
  {
    actor: '系统',
    title: '把答复或规则更新送回作业现场',
    description: '直接答复和已发布更新都会回到原任务。标注员可以继续作业，也能从结果追溯完整处理过程。',
    output: '结果：问题有去向，结论也真正回到使用它的人',
    position: 'col-start-1 row-start-3',
  },
];

function LegacyStation({ station }: { station: typeof LEGACY_STATIONS[number] }) {
  return <article className="flex min-h-[420px] flex-col border border-[#aeb8b1] bg-[#f8f9f6] p-6 shadow-[0_14px_36px_rgba(28,42,35,.07)]">
    <p className="font-mono-custom text-[10px] tracking-[0.08em] text-[#77652e]">{station.tool}</p>
    <h3 className="mt-5 font-heading text-[24px] font-700 leading-[1.12] text-[#111817]">{station.action}</h3>
    <p className="mt-4 text-[14px] leading-7 text-[#53615c]">{station.detail}</p>
    <div className="mt-auto border-t border-[#d0d7d2] pt-5">
      <p className="text-[12px] font-700 text-[#28342f]">这个工具里留下了什么</p>
      <p className="mt-2 text-[13px] leading-6 text-[#53615c]">{station.record}</p>
      <p className="mt-5 border-l-2 border-[#9f8740] bg-[#ece8dc] px-4 py-3 text-[13px] font-700 leading-6 text-[#56491f]">{station.missing}</p>
    </div>
  </article>;
}

function LegacyDesktopDiagram() {
  return <div data-ruleloop-old-diagram className="hidden border border-[#abb5ae] bg-[#dfe5e0] p-7 xl:block">
    <div className="grid grid-cols-[minmax(0,1fr)_76px_minmax(0,1fr)_76px_minmax(0,1fr)_76px_minmax(0,1fr)] items-stretch">
      {LEGACY_STATIONS.map((station, index) => <div key={station.tool} className={`col-start-${index * 2 + 1}`} style={{ gridColumnStart: index * 2 + 1 }}>
        <LegacyStation station={station} />
      </div>)}
      {TRANSFERS.map((transfer, index) => <div key={transfer.label} style={{ gridColumnStart: index * 2 + 2, gridRowStart: 1 }} className="flex flex-col items-center justify-center px-2 text-center">
        <span className="font-heading text-3xl text-[#806c31]">→</span>
        <p className="mt-3 font-heading text-[13px] font-700 leading-5 text-[#37443e]">{transfer.label}</p>
        <p className="mt-1 font-mono-custom text-[8px] leading-4 text-[#78837d]">{transfer.note}</p>
      </div>)}
    </div>

    <div className="mt-7 grid grid-cols-[1.1fr_1fr] border border-[#9faaa3] bg-[#f8f9f6]">
      <div className="p-7">
        <p className="font-heading text-2xl font-700 leading-snug text-[#111817]">每处理一次，都要再复制一份不完整的记录。</p>
      </div>
      <div className="border-l border-[#c5cdc8] p-7">
        <p className="text-sm leading-7 text-[#4e5b56]">质检员和产品成员把时间花在整理截图、补表格、改文档和通知版本上。真正需要人的规则判断，反而被这些搬运工作挤压。</p>
      </div>
    </div>

    <div className="mt-5 flex items-center justify-between border-l-4 border-[#9f8740] bg-[#18201e] px-7 py-6 text-white">
      <div>
        <p className="font-heading text-xl font-700">回到下一轮作业时，标注员看到的是一段更新文字，不是一个完整判例。</p>
        <p className="mt-2 text-sm leading-6 text-white/62">如果通知漏掉、版本没同步，或者只记住了临时答复，同类错误就会再次出现。</p>
      </div>
      <p className="ml-10 shrink-0 font-mono-custom text-[10px] tracking-[0.08em] text-[#d6c07f]">同类问题重新讨论</p>
    </div>
  </div>;
}

function LegacyMobileDiagram() {
  return <div className="space-y-4 xl:hidden">
    {LEGACY_STATIONS.map((station, index) => <div key={station.tool}>
      <LegacyStation station={station} />
      {index < TRANSFERS.length && <div className="ml-6 border-l-2 border-[#9f8740] py-5 pl-5">
        <p className="font-heading text-sm font-700 text-[#37443e]">↓ {TRANSFERS[index].label}</p>
        <p className="mt-1 font-mono-custom text-[9px] text-[#78837d]">{TRANSFERS[index].note}</p>
      </div>}
    </div>)}
    <div className="border-l-4 border-[#9f8740] bg-[#18201e] p-6 text-white">
      <p className="font-heading text-xl font-700 leading-snug">最终规则和最初的 case 断开了，同类问题很容易重新讨论一遍。</p>
    </div>
  </div>;
}

function RuleLoopCard({ stage }: { stage: typeof RULELOOP_STAGES[number] }) {
  return <article className={`${stage.position} relative flex min-h-[236px] flex-col border border-[#8f9c94] bg-white p-6 shadow-[0_14px_36px_rgba(28,42,35,.07)]`}>
    <p className="font-mono-custom text-[10px] tracking-[0.08em] text-[#806c31]">{stage.actor}</p>
    <h3 className="mt-4 font-heading text-[21px] font-700 leading-[1.18] text-[#111817]">{stage.title}</h3>
    <p className="mt-4 text-[13px] leading-6 text-[#53615c]">{stage.description}</p>
    <p className="mt-auto border-t border-[#d0d7d2] pt-4 text-[12px] font-700 leading-5 text-[#394640]">{stage.output}</p>
  </article>;
}

function LoopConnector({ direction, label, className }: { direction: 'right' | 'down' | 'left' | 'up'; label: string; className: string }) {
  const horizontal = direction === 'right' || direction === 'left';
  const arrow = direction === 'right' ? '→' : direction === 'left' ? '←' : direction === 'down' ? '↓' : '↑';

  return <div className={`${className} relative flex items-center justify-center`} aria-hidden="true">
    {horizontal ? <>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-[#9f8740]" />
      <span className={`absolute top-1/2 -translate-y-1/2 bg-[#f7f8f5] px-2 font-heading text-3xl leading-none text-[#806c31] ${direction === 'right' ? 'right-0' : 'left-0'}`}>{arrow}</span>
      <span className="relative bg-[#f7f8f5] px-3 py-2 text-center font-mono-custom text-[9px] leading-4 text-[#625528]">{label}</span>
    </> : <>
      <span className="absolute bottom-0 left-1/2 top-0 w-px bg-[#9f8740]" />
      <span className={`absolute left-1/2 -translate-x-1/2 bg-[#f7f8f5] px-2 font-heading text-3xl leading-none text-[#806c31] ${direction === 'down' ? 'bottom-0' : 'top-0'}`}>{arrow}</span>
      <span className="relative max-w-[100px] bg-[#f7f8f5] px-2 py-1 text-center font-mono-custom text-[8px] leading-4 text-[#625528]">{label}</span>
    </>}
  </div>;
}

function RuleLoopDesktopDiagram() {
  return <div data-ruleloop-new-diagram className="relative hidden overflow-hidden border border-[#aab5ae] bg-[#f7f8f5] p-8 xl:block">
    <div className="grid grid-cols-[minmax(0,1fr)_92px_minmax(260px,.88fr)_92px_minmax(0,1fr)] grid-rows-[auto_72px_auto_72px_auto] items-stretch">
      {RULELOOP_STAGES.map((stage) => <RuleLoopCard key={stage.title} stage={stage} />)}
      <LoopConnector direction="right" label="提交后进入案例池" className="col-start-2 col-end-5 row-start-1" />
      <LoopConnector direction="down" label="交给质检答疑" className="col-start-5 row-start-2" />
      <LoopConnector direction="down" label="规则缺口才升级" className="col-start-5 row-start-4" />
      <LoopConnector direction="left" label="产品审核后发布" className="col-start-2 col-end-5 row-start-5" />
      <LoopConnector direction="up" label="结果返回作业" className="col-start-1 row-start-4" />
      <LoopConnector direction="up" label="新的疑问继续进入" className="col-start-1 row-start-2" />

      <div className="col-start-3 row-start-3 flex min-h-[236px] flex-col border border-[#27332e] bg-[#18201e] p-6 text-white shadow-[0_18px_48px_rgba(24,32,30,.16)]">
        <p className="font-mono-custom text-[9px] tracking-[0.08em] text-[#d6c07f]">RULELOOP 的分工</p>
        <div className="mt-5 grid grid-cols-2 gap-5">
          <div>
            <p className="font-heading text-lg font-700">系统负责</p>
            <p className="mt-2 text-[12px] leading-6 text-white/66">保留上下文、管理状态、查找相似 Case、起草和同步结果。</p>
          </div>
          <div>
            <p className="font-heading text-lg font-700">人负责</p>
            <p className="mt-2 text-[12px] leading-6 text-white/66">质检员完成答疑和分流，产品成员决定规则是否修改。</p>
          </div>
        </div>
        <p className="mt-auto border-t border-white/18 pt-4 text-[11px] leading-5 text-white/62">问题、素材、答复、升级原因、产品决策和最终结果，始终关联在同一个 Case 上。</p>
      </div>
    </div>

    <div className="mt-8 border-l-4 border-[#9f8740] bg-[#e8ece7] px-7 py-6">
      <p className="font-heading text-xl font-700 text-[#111817]">每个问题都要有去向，但不是每个问题都要变成新规则。</p>
      <p className="mt-2 max-w-[82ch] text-sm leading-6 text-[#53615c]">已有规则能够解释时，答案直接回到标注员。真正暴露规则缺口的 Case 才继续进入起草和产品审核，避免 SOP 被重复内容撑大。</p>
    </div>
  </div>;
}

function RuleLoopMobileDiagram() {
  return <div className="xl:hidden">
    <div className="border border-[#aab5ae] bg-[#f7f8f5] p-4">
      {RULELOOP_STAGES.map((stage, index) => <div key={stage.title}>
        <RuleLoopCard stage={{ ...stage, position: '' }} />
        {index < RULELOOP_STAGES.length - 1 && <div className="ml-6 border-l-2 border-[#9f8740] py-5 pl-5 font-mono-custom text-[9px] text-[#6c5d2d]">↓ {index === 0 ? '进入统一案例池' : index === 1 ? '质检开始答疑' : index === 2 ? '规则缺口才升级' : index === 3 ? '交给产品成员审核' : '把结果送回作业'}</div>}
      </div>)}
      <div className="mt-5 border-l-4 border-[#9f8740] bg-[#18201e] p-6 text-white">
        <p className="font-heading text-xl font-700 leading-snug">新的疑问继续进入案例池，已答复的问题和规则更新都留在同一条记录里。</p>
        <p className="mt-3 font-mono-custom text-[9px] text-[#d6c07f]">提问 → 答疑与分流 → 返回作业或升级规则</p>
      </div>
    </div>
  </div>;
}

export default function RuleLoopDiagrams() {
  return <>
    <section className="border-y border-[#c7cfca] bg-[#eef1ed] py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16">
        <div className="max-w-[900px]">
          <p className="font-mono-custom text-[9px] tracking-[0.12em] text-[#76652f]">原来的工作方式</p>
          <h2 className="mt-4 max-w-[20ch] font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">同一个疑难 case，要在四个工具之间反复搬运。</h2>
          <p className="mt-6 max-w-[62ch] text-base leading-8 text-[#53615c]">每换一个工具，都要重新截图、转述和登记。原始证据、讨论依据、处理状态和最终结果也随之分散。</p>
        </div>
        <div className="mt-12">
          <LegacyDesktopDiagram />
          <LegacyMobileDiagram />
        </div>
      </div>
    </section>

    <section className="border-b border-[#c7cfca] bg-[#eef1ed] py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 xl:px-16">
        <div className="max-w-[900px]">
          <p className="font-mono-custom text-[9px] tracking-[0.12em] text-[#76652f]">RuleLoop 的处理方式</p>
          <h2 className="mt-4 max-w-[21ch] font-heading text-3xl font-700 leading-[1.06] tracking-tight md:text-5xl">把“发现问题到更新规则”放回同一个平台里完成。</h2>
          <p className="mt-6 max-w-[64ch] text-base leading-8 text-[#53615c]">标注员在作业中直接提问，质检员先答疑和分流。已有规则能够解释时直接返回，只有规则缺口才交给产品成员审核。</p>
        </div>
        <div className="mt-12">
          <RuleLoopDesktopDiagram />
          <RuleLoopMobileDiagram />
        </div>
      </div>
    </section>
  </>;
}
