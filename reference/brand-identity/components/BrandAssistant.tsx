
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

export const BrandAssistant: React.FC = () => {
  const [suggestion, setSuggestion] = useState<string>("Loading brand insights...");
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user has designed a logo for "Ohboy Consultancy". 
        Concept: A minimalist technical icon with an Emerald Green (#10B981) and Deep Slate (#020617) palette. 
        Visual elements: Terminal brackets, a blinking cyan cursor, and circuit traces forming an abstract "O".
        Business niche: Hardware, software, and AI integration.
        
        Provide 3 short, punchy brand taglines and a brief paragraph on why this visual identity builds trust in high-stakes technical consulting.`,
        config: {
          temperature: 0.7,
        }
      });
      setSuggestion(response.text || "No response from AI.");
    } catch (error) {
      setSuggestion("Connect your API key to see AI-generated brand insights.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <section className="mt-20 max-w-4xl mx-auto bg-emerald-950/20 border border-emerald-900/30 rounded-3xl p-8 mb-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/20 p-2 rounded-lg">
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-emerald-400">AI Brand Strategist</h2>
      </div>

      <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap mono text-sm leading-relaxed">
        {loading ? (
          <div className="animate-pulse">Analyzing visual semantics...</div>
        ) : (
          suggestion
        )}
      </div>
      
      {!loading && (
        <button 
          onClick={fetchInsights}
          className="mt-6 text-xs text-emerald-500 hover:text-emerald-400 transition-colors uppercase tracking-widest font-bold"
        >
          Regenerate Insights
        </button>
      )}
    </section>
  );
};
