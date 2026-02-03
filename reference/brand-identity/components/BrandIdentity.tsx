
import React from 'react';
import { LogoIcon } from './LogoIcon';

export const BrandIdentity: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* Header */}
      <section className="text-center mb-20">
        <div className="flex justify-center mb-6">
          <LogoIcon size={120} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Ohboy Consultancy</h1>
        <p className="text-slate-400 text-lg mono max-w-2xl mx-auto">
          Hardware &bull; Software &bull; AI Systems Integration
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left: Design Concept */}
        <div className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Design Narrative
          </h2>
          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              The Ohboy Consultancy identity bridges the gap between physical circuits and digital logic. 
              The central <span className="text-emerald-400 font-medium">abstract "O"</span> is formed by 
              stylized terminal brackets <span className="text-emerald-400 mono">&lt; &gt;</span>, suggesting 
              a focus on code and software infrastructure.
            </p>
            <p>
              Hardware integration is represented by <span className="text-emerald-400 font-medium">circuit nodes</span> 
              placed at strategic geometric points. The <span className="text-cyan-400 font-medium">blinking cursor</span> 
              at the core symbolizes the pulse of AI and active innovation—the moment a thought becomes execution.
            </p>
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Primary Color</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#10B981]"></div>
                  <span className="mono text-sm">#10B981</span>
                </div>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Accent Glow</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#22D3EE]"></div>
                  <span className="mono text-sm">#22D3EE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Icon Variations */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Scalability & Variations
          </h2>
          
          {/* Sizes */}
          <div className="flex items-end gap-12 bg-slate-900/30 p-8 rounded-3xl border border-slate-800">
            <div className="flex flex-col items-center gap-3">
              <LogoIcon size={128} />
              <span className="text-xs text-slate-500 mono">128px</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <LogoIcon size={64} />
              <span className="text-xs text-slate-500 mono">64px</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <LogoIcon size={32} />
              <span className="text-xs text-slate-500 mono">32px</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <LogoIcon size={16} rx={4} />
              <span className="text-xs text-slate-500 mono">16px</span>
            </div>
          </div>

          {/* Context Previews */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#020617] p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <p className="text-xs text-slate-500 mb-4 self-start">Mobile App Launcher</p>
              <div className="w-24 h-24 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <LogoIcon size={96} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
              <p className="text-xs text-slate-400 mb-4 self-start">Print Context (Negative)</p>
              <LogoIcon size={96} showBackground={false} className="grayscale brightness-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Mockup Section */}
      <section className="mt-24">
        <h2 className="text-2xl font-bold mb-8 text-center">In Situ Application</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Web UI Mockup */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden h-64 flex flex-col">
            <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-4">
              <LogoIcon size={24} showBackground={false} />
              <span className="font-semibold text-sm">Ohboy</span>
              <div className="flex-1 flex gap-4 justify-end text-[10px] text-slate-500 uppercase tracking-widest">
                <span>Solutions</span>
                <span>Case Studies</span>
                <span>Team</span>
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-center">
              <div className="h-4 w-3/4 bg-slate-800 rounded mb-3"></div>
              <div className="h-4 w-1/2 bg-slate-800 rounded mb-6"></div>
              <div className="h-8 w-24 bg-emerald-600 rounded"></div>
            </div>
          </div>

          {/* Business Card Mockup */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden h-64 relative flex items-center justify-center shadow-emerald-500/5 shadow-2xl">
            <div className="absolute top-4 left-4">
               <LogoIcon size={32} />
            </div>
            <div className="text-center">
               <div className="text-emerald-400 mono text-lg font-bold mb-1">Jane Ohboy</div>
               <div className="text-slate-500 text-[10px] uppercase tracking-widest">Technical Consultant</div>
            </div>
          </div>

          {/* Hardware Label Mockup */}
          <div className="bg-slate-100 rounded-2xl border border-slate-300 overflow-hidden h-64 flex items-center justify-center p-12">
            <div className="w-full h-full bg-slate-200 rounded-lg border-2 border-slate-300 border-dashed flex flex-col items-center justify-center">
               <LogoIcon size={64} showBackground={false} className="grayscale opacity-50 mb-4" />
               <div className="text-[10px] mono text-slate-400">ENGINEERED BY OHBOY</div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
