import React from 'react';
import { WHY_MV_ITEMS, OFFICIAL_LINKS } from '../data/content';
import {
  Globe,
  Smile,
  ShieldCheck,
  TrendingUp,
  Share2,
  Trophy,
  Check,
  X
} from 'lucide-react';

const icons = [Globe, Smile, ShieldCheck, TrendingUp, Share2, Trophy];

export const WhyMvSection: React.FC = () => {
  return (
    <section
      id="por-que-mv"
      className="relative min-h-[90vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Diferenciais de Valor
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Por Que Escolher a <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">MV Conectar</span>?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Criamos tecnologia para gerar valor real, vendas e reputação. Veja o que sua marca ganha:
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {WHY_MV_ITEMS.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#090e1b]/80 border border-slate-800 hover:border-cyan-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(14,165,233,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Impacto Imediato</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Contrast Comparison Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#080d19] border border-cyan-500/30">
          <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6">
            Comparativo: O Jeito Antigo vs Com a MV Conectar
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* The Old Way */}
            <div className="p-5 rounded-2xl bg-black/40 border border-red-500/20 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-2">
                ✕ Sem a MV Conectar (Jeito Antigo)
              </span>
              {[
                'Cartões de papel amassados que vão para o lixo',
                'Cliente com preguiça de digitar nome da loja no Google',
                'Links desorganizados e feios no Instagram',
                'Perda de clientes que desistem de anotar o WhatsApp',
                'Visual amador que desvaloriza o seu preço',
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* With MV Conectar */}
            <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block mb-2">
                ✓ Com a MV Conectar (Padrão Premium)
              </span>
              {[
                'Placa física em acrílico moderna que impressiona no balcão',
                '1 toque no NFC abre direto na tela de 5 estrelas do Google',
                'BioSite profissional ultra-rápido com identidade da sua marca',
                'WhatsApp direto com mensagem pré-formatada em 1 clique',
                'Percepção de empresa tecnológica e autoridade no mercado',
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
