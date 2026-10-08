import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Slide {
  id: string;
  label: string;
  number: string;
}

interface VerticalSlideNavProps {
  slides: Slide[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const VerticalSlideNav: React.FC<VerticalSlideNavProps> = ({
  slides,
  activeSection,
  onNavigate,
}) => {
  const currentIndex = Math.max(0, slides.findIndex((s) => s.id === activeSection));

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(slides[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      onNavigate(slides[currentIndex + 1].id);
    }
  };

  return (
    <aside
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 bg-black/40 backdrop-blur-md border border-cyan-500/15 py-3 px-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.6)]"
      aria-label="Controle de Apresentação de Telas"
    >
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="p-1 text-slate-400 hover:text-cyan-300 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
        title="Slide anterior (Seta para Cima)"
        aria-label="Ir para seção anterior"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      <div className="flex flex-col gap-2.5 items-center my-1">
        {slides.map((slide, index) => {
          const isActive = slide.id === activeSection;
          return (
            <button
              key={slide.id}
              onClick={() => onNavigate(slide.id)}
              className="group relative flex items-center justify-center p-1 focus:outline-none"
              aria-label={`Ir para ${slide.label}`}
              title={`${slide.number} - ${slide.label}`}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.8)]'
                    : 'w-2 h-2 bg-slate-600 group-hover:bg-cyan-400/70 group-hover:scale-125'
                }`}
              />

              {/* Tooltip on hover */}
              <div className="absolute right-7 py-1 px-2.5 bg-slate-900/90 border border-cyan-500/30 text-xs font-medium text-cyan-200 rounded-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg shadow-black/80">
                <span className="text-cyan-400 font-mono text-[10px] mr-1.5">{slide.number}</span>
                {slide.label}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentIndex === slides.length - 1}
        className="p-1 text-slate-400 hover:text-cyan-300 disabled:opacity-20 disabled:hover:text-slate-400 transition-colors"
        title="Próximo slide (Seta para Baixo)"
        aria-label="Ir para próxima seção"
      >
        <ChevronDown className="w-4 h-4" />
      </button>

      <div className="text-[10px] font-mono text-cyan-400/80 pt-1 border-t border-slate-800">
        {String(currentIndex + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
      </div>
    </aside>
  );
};
