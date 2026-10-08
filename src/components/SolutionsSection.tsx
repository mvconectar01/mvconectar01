import React, { useState } from 'react';
import { SOLUTIONS, SolutionItem, OFFICIAL_LINKS } from '../data/content';
import {
  Layout,
  Radio,
  QrCode,
  Star,
  Globe,
  Instagram,
  MessageSquare,
  Share2,
  Users,
  Cpu,
  Sparkles,
  ArrowUpRight,
  Check,
  X
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Radio,
  QrCode,
  Star,
  Globe,
  Instagram,
  MessageSquare,
  Share2,
  Users,
  Cpu,
  Sparkles,
};

export const SolutionsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'nfc' | 'digital' | 'growth'>('all');

  const filteredSolutions = SOLUTIONS.filter((s) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'nfc') return s.id === 'nfc' || s.id === 'qrcode' || s.id === 'google';
    if (activeFilter === 'digital') return s.id === 'biosite' || s.id === 'presenca' || s.id === 'instagram' || s.id === 'whatsapp';
    if (activeFilter === 'growth') return s.id === 'google' || s.id === 'captacao' || s.id === 'divulgacao' || s.id === 'automacao';
    return true;
  });

  return (
    <section
      id="solucoes"
      className="relative min-h-[95vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Ecossistema Completo
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Soluções Digitais & Físicas da <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">MV Conectar</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Tecnologias de alta conversão para conectar sua marca aos clientes com velocidade, sofisticação e sem burocracia.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="mt-8 inline-flex p-1 bg-[#0a0f1d] border border-cyan-500/20 rounded-xl max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas as Soluções ({SOLUTIONS.length})
            </button>
            <button
              onClick={() => setActiveFilter('nfc')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === 'nfc'
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              NFC & Placas Físicas
            </button>
            <button
              onClick={() => setActiveFilter('digital')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === 'digital'
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BioSite & Redes
            </button>
            <button
              onClick={() => setActiveFilter('growth')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === 'growth'
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Google & Captação
            </button>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSolutions.map((solution) => {
            const Icon = iconMap[solution.iconName] || Sparkles;
            return (
              <div
                key={solution.id}
                onClick={() => setSelectedSolution(solution)}
                className={`group cursor-pointer relative p-6 sm:p-7 rounded-2xl bg-[#090e1b]/90 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  solution.highlight
                    ? 'border-cyan-500/40 shadow-[0_0_25px_rgba(14,165,233,0.12)]'
                    : 'border-slate-800 hover:border-cyan-500/35'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>

                    {solution.highlight && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                        Destaque
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {solution.title}
                  </h3>

                  <p className="text-xs font-medium text-cyan-400/90 mt-1 mb-2.5">
                    {solution.tagline}
                  </p>

                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {solution.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 group-hover:text-cyan-300 font-medium transition-colors">
                    Ver detalhes e vantagens
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-950 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal / Drawer for Detailed Solution View */}
      {selectedSolution && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedSolution(null)}
        >
          <div
            className="relative w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#0a1122] border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500" />
            
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-bold">
                {(() => {
                  const Icon = iconMap[selectedSolution.iconName] || Sparkles;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedSolution.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-medium">
                  {selectedSolution.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mt-3">
              {selectedSolution.description}
            </p>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Vantagens inclusas nesta solução:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedSolution.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`${OFFICIAL_LINKS.whatsapp}?text=Ol%C3%A1!%20Tenho%20interesse%20na%20solu%C3%A7%C3%A3o%20de%20*${encodeURIComponent(selectedSolution.title)}*%20da%20MV%20Conectar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20 whitespace-nowrap"
              >
                Solicitar no WhatsApp
              </a>
              <button
                onClick={() => setSelectedSolution(null)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
