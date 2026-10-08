import React, { useState } from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import { Star, MessageCircle, TrendingUp, CheckCircle2, Award, Sparkles } from 'lucide-react';

export const GoogleReviewsSection: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hasRated, setHasRated] = useState<boolean>(false);

  const handleStarClick = (star: number) => {
    setSelectedRating(star);
    setHasRated(true);
  };

  return (
    <section
      id="avaliacoes"
      className="relative min-h-[95vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[500px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Google Meu Negócio & Reputação
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Google Avaliações 5 Estrelas
          </h2>
          
          <div className="flex items-center justify-center gap-1.5 text-amber-400 my-4 text-2xl sm:text-3xl">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]">★</span>
            ))}
          </div>

          <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            “Sua avaliação ajuda sua empresa a crescer.”
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
            O maior motivo de clientes satisfeitos não deixarem avaliação no Google é a preguiça de pesquisar o nome da loja. Com a placa NFC da MV Conectar, a tela de 5 estrelas abre no celular em menos de 2 segundos.
          </p>
        </div>

        {/* 2-Column Layout: Visual & Interactive Review Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: High-Fidelity Photo Showcase (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#070b14] shadow-[0_0_50px_rgba(14,165,233,0.2)] group p-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src="/src/assets/images/google_review_booster_1791412554419.jpg"
                  alt="Aproximação NFC gerando avaliação 5 estrelas no Google"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/40">
                      5.0 ★★★★★ Excelente
                    </span>
                    <span className="text-[11px] text-slate-300">
                      +100 avaliações verificadas
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Mais destaque no Google Maps da sua região
                  </h4>
                </div>
              </div>

              {/* Data Proof Points */}
              <div className="p-4 grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-lg font-extrabold text-cyan-400 font-mono">+300%</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Mais avaliações espontâneas no balcão</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-lg font-extrabold text-cyan-400 font-mono">Top 3</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Posicionamento no mapa local da cidade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Google Review Card (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090f1e]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-black/80 relative">
              {/* Google Brand Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-slate-800 shadow-md">
                    <span className="text-lg">G</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Google Meu Negócio</h3>
                    <p className="text-xs text-slate-400">Avaliação rápida de atendimento</p>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                  1 Toque NFC
                </span>
              </div>

              {/* Interactive Rating Area */}
              <div className="my-6 text-center">
                <p className="text-xs text-slate-300 font-medium mb-3">
                  Toque nas estrelas para experimentar o fluxo do seu cliente:
                </p>

                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className="group p-1 focus:outline-none transition-transform hover:scale-125 active:scale-95"
                      aria-label={`Avaliar com ${star} estrelas`}
                    >
                      <Star
                        className={`w-9 h-9 sm:w-11 sm:h-11 transition-all duration-200 ${
                          star <= selectedRating
                            ? 'text-amber-400 fill-amber-400 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.7)]'
                            : 'text-slate-600 hover:text-amber-400/50'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-3 text-sm font-semibold text-amber-300">
                  {selectedRating === 5
                    ? '★★★★★ Excelente! Atendimento impecável'
                    : selectedRating >= 4
                    ? '★★★★☆ Muito bom! Recomendado'
                    : '★★★☆☆ Bom atendimento'}
                </div>

                {hasRated && (
                  <div className="mt-4 p-3 rounded-xl bg-cyan-950/60 border border-cyan-400/60 text-xs text-cyan-200 animate-in fade-in zoom-in-95 duration-200 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Perfeito! Com 1 toque na sua placa NFC, o cliente conclui a nota em 3 segundos.</span>
                  </div>
                )}
              </div>

              {/* Benefits checklist */}
              <div className="space-y-2.5 my-6">
                {[
                  'Elimina 100% da fricção: o cliente não precisa digitar nem buscar seu nome',
                  'Apareça antes dos concorrentes quando alguém pesquisar pelo seu serviço na cidade',
                  'Aumente a taxa de conversão de novos clientes que chegam pelo Google Maps',
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Required Big CTA Button */}
              <div className="pt-2">
                <a
                  href={`${OFFICIAL_LINKS.whatsapp}?text=Ol%C3%A1!%20QUERO%20ESSA%20SOLU%C3%87%C3%83O%20de%20Google%20Avalia%C3%A7%C3%B5es%20da%20MV%20Conectar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl text-sm sm:text-base font-extrabold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5 fill-black/20" />
                  <span>QUERO ESSA SOLUÇÃO</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
