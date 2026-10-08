import React from 'react';
import { Layers, Zap, Star, Smartphone, ArrowRight } from 'lucide-react';
import { OFFICIAL_LINKS } from '../data/content';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Presença Digital de Alto Nível',
      description: 'Sua empresa com uma identidade visual moderna, elegante e profissional, destacando-se imediatamente de concorrentes com visual ultrapassado.',
      icon: Layers,
    },
    {
      number: '02',
      title: 'Ponte Físico-Digital Sem Fricção',
      description: 'Transformamos o cliente que visita sua loja, restaurante ou clínica em um seguidor ativo nas redes e um contato direto no WhatsApp com NFC e QR Code.',
      icon: Smartphone,
    },
    {
      number: '03',
      title: 'Avaliações 5 Estrelas no Google',
      description: 'Facilitamos o processo para o cliente avaliar seu atendimento no Google Maps com 1 único toque no balcão, elevando sua posição no topo da busca local.',
      icon: Star,
    },
    {
      number: '04',
      title: 'Aceleração de Vendas & Atendimento',
      description: 'Eliminamos a perda de clientes com links organizados, cardápios instantâneos, agendamento descomplicado e mensagens diretas pré-formatadas.',
      icon: Zap,
    },
  ];

  return (
    <section
      id="sobre"
      className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Sobre a MV Conectar
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight text-balance">
            O que é a <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">MV Conectar</span>?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Somos a plataforma e parceira estratégica que ajuda empresas e profissionais a fortalecerem sua presença digital, modernizarem sua apresentação e criarem canais de conexão instantânea com seus clientes.
          </p>
        </div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="group relative p-7 sm:p-8 rounded-2xl bg-[#090e1b]/80 border border-cyan-500/15 hover:border-cyan-400/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-900/60 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm text-cyan-400/60 font-semibold tracking-wider">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-cyan-400 opacity-90 group-hover:opacity-100">
                  <span>Conexão inteligente</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick highlight banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-950/50 border border-cyan-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-base font-bold text-white">Pronto para digitalizar seu ponto de venda?</h4>
            <p className="text-xs sm:text-sm text-slate-400">Implementação rápida em poucos dias, com consultoria personalizada.</p>
          </div>
          <a
            href={OFFICIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors whitespace-nowrap shadow-md shadow-cyan-500/20"
          >
            Falar com Especialista
          </a>
        </div>
      </div>
    </section>
  );
};
