import React, { useState, useRef } from 'react';
import { SEGMENTS, SegmentItem, OFFICIAL_LINKS } from '../data/content';
import { ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, MessageCircle, X } from 'lucide-react';

export const SegmentsCarouselSection: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<SegmentItem>(SEGMENTS[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const openPreview = (seg: SegmentItem) => {
    setSelectedSegment(seg);
    setModalOpen(true);
  };

  return (
    <section
      id="segmentos"
      className="relative min-h-[95vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Nicho & Aplicação Prática
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Para Quem É a <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">MV Conectar</span>?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Descubra como nossa tecnologia se adapta perfeitamente ao seu modelo de negócio para fidelizar clientes e gerar resultados imediatos.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-slate-800 transition-colors shadow-md"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-slate-800 transition-colors shadow-md"
              aria-label="Rolar para direita"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Horizontal Carousel of Segment Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-thin scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {SEGMENTS.map((seg) => {
            const isSelected = selectedSegment.id === seg.id;
            return (
              <div
                key={seg.id}
                onClick={() => {
                  setSelectedSegment(seg);
                  setModalOpen(true);
                }}
                className={`group cursor-pointer shrink-0 w-[270px] sm:w-[300px] p-6 rounded-2xl bg-[#090e1b]/90 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-400/60 shadow-[0_0_25px_rgba(34,211,238,0.2)] bg-[#0c1424]'
                    : 'border-slate-800 hover:border-cyan-500/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl filter drop-shadow">
                      {seg.emoji}
                    </span>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                      Ver Aplicação
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {seg.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {seg.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span>Toque para ver prévia</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Live Preview Spotlight Box for the Selected Segment */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0a1224] to-[#070b16] border border-cyan-500/30 shadow-xl shadow-black/80">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl sm:text-5xl shrink-0 p-3 rounded-2xl bg-black/40 border border-cyan-500/20">
                {selectedSegment.emoji}
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Como a MV Conectar transforma: {selectedSegment.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-cyan-300 font-medium mb-3">
                  {selectedSegment.shortDesc}
                </p>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  <strong className="text-white">Na prática:</strong> {selectedSegment.useCase}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 sm:gap-3">
                  {selectedSegment.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-950/70 border border-cyan-500/25 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto">
              <a
                href={`${OFFICIAL_LINKS.whatsapp}?text=Ol%C3%A1!%20Tenho%20um%20neg%C3%B3cio%20no%20segmento%20de%20*${encodeURIComponent(selectedSegment.title)}*%20e%20quero%20conhecer%20as%20solu%C3%A7%C3%B5es%20da%20MV%20Conectar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/25 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-black/20" />
                <span>Quero Solução para {selectedSegment.title}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for In-depth Segment Preview */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#0a1122] border border-cyan-500/40 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <span className="text-4xl">{selectedSegment.emoji}</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedSegment.title}
                </h3>
                <p className="text-xs sm:text-sm text-cyan-400 font-medium">
                  {selectedSegment.shortDesc}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-slate-800 my-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">
                Caso de uso real:
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedSegment.useCase}
              </p>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Resultados imediatos no seu negócio:
            </h4>
            <div className="space-y-2 mb-6">
              {selectedSegment.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`${OFFICIAL_LINKS.whatsapp}?text=Ol%C3%A1!%20Gostaria%20de%20aplicar%20a%20MV%20Conectar%20em%20*${encodeURIComponent(selectedSegment.title)}*.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20 whitespace-nowrap"
              >
                Falar no WhatsApp
              </a>
              <button
                onClick={() => setModalOpen(false)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
