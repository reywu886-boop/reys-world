import { useState } from 'react';

type CutRoomProps = { title: string; asset: string; unit: string };

/** Project details are cut rooms: a movable playhead links slate, visual material, and method. */
export default function CutRoom({ title, asset, unit }: CutRoomProps) {
  const [frame, setFrame] = useState(34);
  return <section className="my-16 bg-[#0c1210] py-10 text-[#edf0e9] md:my-20 md:py-14">
    <div className="container">
      <div className="mb-6 flex items-end justify-between gap-4"><div><p className="font-mono-custom text-[8px] tracking-[0.17em] text-white/48">CUT ROOM / PROJECT MATERIAL</p><h2 className="mt-2 font-heading text-2xl font-700 md:text-4xl">{title}</h2></div><span className="font-mono-custom text-[8px] tracking-[0.15em] text-[#d8c79a]">FRAME {String(frame).padStart(3, '0')}</span></div>
      <div className="grid border border-white/18 lg:grid-cols-[0.78fr_1.42fr_0.9fr]">
        <div className="border-b border-white/14 p-5 lg:border-b-0 lg:border-r"><span className="font-mono-custom text-[8px] tracking-[0.15em] text-white/45">SLATE / SOURCE</span><img className="mt-5 aspect-video w-full border border-white/14 object-cover" src={asset} alt="Project source material" /><p className="mt-3 font-mono-custom text-[8px] tracking-[0.14em] text-white/58">{unit} / SELECTED TAKE</p></div>
        <div className="border-b border-white/14 p-5 lg:border-b-0 lg:border-r"><span className="font-mono-custom text-[8px] tracking-[0.15em] text-white/45">EDITORIAL TIMELINE / DRAG</span><div className="mt-8 flex h-28 items-end gap-1">{[12,19,8,24,15,18,10,21,13].map((width, index) => <span key={index} className="bg-[#d8c79a]/70" style={{ width: `${width}%`, height: `${36 + ((index * 17) % 50)}%` }} />)}</div><input className="mt-7 w-full accent-[#d8c79a]" aria-label="Project timeline" type="range" min="0" max="120" value={frame} onChange={(event) => setFrame(Number(event.target.value))} /><div className="mt-2 flex justify-between font-mono-custom text-[7px] tracking-[0.14em] text-white/40"><span>ASSEMBLY</span><span>CONFORM</span></div></div>
        <div className="p-5"><span className="font-mono-custom text-[8px] tracking-[0.15em] text-white/45">METHOD / OUTPUT</span><p className="mt-6 font-mono-custom text-[10px] leading-relaxed text-white/72">Frame {frame}: creative intent, reference state, shot logic and evaluation signal remain linked through the cut.</p><div className="mt-8 border-l border-[#d8c79a] pl-3 font-mono-custom text-[8px] tracking-[0.14em] text-[#d8c79a]">CONTINUITY TRACE ACTIVE</div></div>
      </div>
    </div>
  </section>;
}
