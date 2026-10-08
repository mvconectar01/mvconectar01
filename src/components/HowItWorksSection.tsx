import React from 'react';
import { HOW_IT_WORKS_STEPS, OFFICIAL_LINKS } from '../data/content';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="como-funciona"
      className="relative min-h-[90vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Passo a Passo Descomplicado
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Como Funciona a <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">MV Conectar</span>?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Em apenas 4 passos simples, sua empresa sai do analógico e passa a operar com o que há de mais moderno em conexão digital.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-cyan-500/10 via-cyan-400/50 to-cyan-500/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <div
                key={step.number}
                className="group relative p-6 sm:p-7 rounded-2xl bg-[#090e1b]/90 border border-slate-800 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)] flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/25 group-hover:scale-110 transition-transform">
                      <div className="w-full h-full bg-[#080d19] rounded-[10px] flex items-center justify-center font-mono font-black text-cyan-300 text-lg">
                        {step.number}
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      Etapa 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-cyan-400/80 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>Sem burocracia</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA trigger */}
        <div className="mt-14 text-center">
          <a
            href={OFFICIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/25 whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-black/20" />
            <span>Iniciar Meu Projeto com a MV Conectar</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
