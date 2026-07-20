import CaseStudyNav from '@/components/CaseStudyNav';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';

const COVER = '/pipeline-cover.webp';

export default function AiPreviz() {
  const { t } = useLanguage();
  const [frame, setFrame] = useState(42);

  const decisions = [
    {
      title: t('Dynamic asset library', '动态资产库'),
      body: t(
        'Generated video is not treated as an endpoint. Useful frames and assets become inputs for the next production pass.',
        '生成视频不是终点。可用的画面和资产会进入下一轮制作。',
      ),
    },
    {
      title: t('Keyframe continuity', '关键帧连续性'),
      body: t(
        'The final frame of one clip becomes the visual anchor of the next, preserving light, space, and physical state.',
        '上一段的结尾帧成为下一段的视觉锚点，维持光影、空间和物理状态。',
      ),
    },
    {
      title: t('Evaluation feedback', '评估反馈'),
      body: t(
        'Video evaluation informs both the shot script and the asset layer, so the workflow improves as it moves forward.',
        '视频评估会同时反馈给分镜脚本和资产层，让工作流在推进中持续改善。',
      ),
    },
  ];

  return (
    <div className="min-h-[100dvh] bg-[#fafafa] text-[#101214]">
      <CaseStudyNav />
      <main className="pt-14">
        <section className="container grid min-h-[72dvh] items-end gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div className="max-w-xl pb-2">
            <p className="mb-5 font-mono-custom text-[11px] tracking-[0.14em] text-[#6b7280]">
              AI PRE-VIZ SYSTEM
            </p>
            <h1 className="font-heading text-5xl font-700 leading-[0.94] tracking-tight md:text-7xl">
              {t('A production system for long-form AI video.', '为长视频 AI 创作建立制作系统。')}
            </h1>
            <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-[#5f6670] md:text-lg">
              {t(
                'A pre-visualization workflow that connects source material, shot scripts, asset continuity, and sequential video generation.',
                '一个连接原始素材、分镜脚本、资产连续性与顺序视频生成的预演工作流。',
              )}
            </p>
          </div>
          <figure className="overflow-hidden bg-[#e7e8e8]">
            <img src={COVER} alt="AI pre-visualization workflow" className="h-full w-full object-cover" />
          </figure>
        </section>

        <section className="border-y border-[#dedfe1] bg-white py-16 md:py-24">
          <div className="container grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
            <h2 className="font-heading text-3xl font-700 tracking-tight md:text-4xl">
              {t('The problem', '问题')}
            </h2>
            <p className="max-w-[60ch] text-lg leading-relaxed text-[#3d434b]">
              {t(
                'Long-form generation often breaks visual continuity. Characters, scenes, and cinematic intention can drift between clips. This project makes continuity a production decision, not a post-production repair.',
                '长视频生成常常失去视觉连续性。角色、场景和镜头意图会在片段之间漂移。这个项目把连续性变成制作阶段的决策，而不是后期补救。',
              )}
            </p>
          </div>
        </section>

        <section className="bg-[#101716] py-16 text-[#edf0e9] md:py-24">
          <div className="container">
            <div className="mb-8 flex items-end justify-between"><div><p className="font-mono-custom text-[9px] tracking-[0.16em] text-white/45">EDITING DESK / TAKE 01</p><h2 className="mt-3 font-heading text-3xl font-700 md:text-5xl">{t('Continuity is edited, not hoped for.', '连续性需要被剪辑，而不是被祈祷。')}</h2></div><span className="font-mono-custom text-[9px] tracking-[0.14em] text-[#d8c79a]">FRAME {String(frame).padStart(3, '0')}</span></div>
            <div className="grid border border-white/16 lg:grid-cols-[0.78fr_1.45fr_0.9fr]">
              <div className="border-b border-white/14 p-6 lg:border-b-0 lg:border-r"><p className="font-mono-custom text-[8px] tracking-[0.15em] text-white/44">SLATE / ASSET</p><div className="mt-6 border border-white/16 p-3"><img src="/previz-cover.webp" alt="Storyboard" className="aspect-video w-full object-cover opacity-85" /><p className="mt-3 font-mono-custom text-[8px] tracking-[0.13em] text-white/65">SCENE 12 / ROOFTOP / DUSK</p></div></div>
              <div className="border-b border-white/14 p-6 lg:border-b-0 lg:border-r"><p className="font-mono-custom text-[8px] tracking-[0.15em] text-white/44">TIMELINE / SCRUB</p><div className="mt-8 flex h-36 items-end gap-1">{[17,8,24,13,18,9,20,14].map((size,i)=><span key={i} className={`bg-[#d8c79a]/${i===3?'90':'55'} h-full`} style={{width:`${size}%`,height:`${45+(i%3)*18}%`}} />)}</div><input aria-label="Scrub shot timeline" className="mt-8 w-full accent-[#d8c79a]" type="range" min="0" max="120" value={frame} onChange={(event)=>setFrame(Number(event.target.value))}/><div className="mt-2 flex justify-between font-mono-custom text-[8px] tracking-[0.14em] text-white/42"><span>00:00:00</span><span>00:00:05</span></div></div>
              <div className="p-6"><p className="font-mono-custom text-[8px] tracking-[0.15em] text-white/44">PROMPT / OUTPUT</p><p className="mt-6 font-mono-custom text-[10px] leading-relaxed text-white/72">medium close-up, coastal rooftop, dusk spill, 50mm, restrained handheld, continuity from frame {frame}</p><div className="mt-6 border-l border-[#d8c79a] pl-3 font-mono-custom text-[8px] tracking-[0.13em] text-[#d8c79a]">KEYFRAME INJECTED / READY</div></div>
            </div>
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-heading text-3xl font-700 tracking-tight md:text-4xl">
              {t('Three decisions that hold the sequence together.', '让序列保持连贯的三个决定。')}
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#dedfe1] bg-[#dedfe1] md:grid-cols-3">
            {decisions.map((decision, index) => (
              <article key={decision.title} className="min-h-64 bg-[#fafafa] p-7 md:p-8">
                <p className="font-mono-custom text-[11px] tracking-[0.12em] text-[#7a818b]">0{index + 1}</p>
                <h3 className="mt-12 font-heading text-xl font-700 tracking-tight">{decision.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#5f6670]">{decision.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
