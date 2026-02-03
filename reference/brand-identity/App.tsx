
import React from 'react';
import { BrandIdentity } from './components/BrandIdentity';
import { BrandAssistant } from './components/BrandAssistant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-emerald-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full"></div>
      </div>

      <main className="relative z-10">
        <BrandIdentity />
        <BrandAssistant />
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center">
        <div className="text-slate-600 text-xs mono uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Ohboy Consultancy Identity System v1.0
        </div>
      </footer>
    </div>
  );
};

export default App;
