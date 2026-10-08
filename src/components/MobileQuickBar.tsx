import React from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import { MessageCircle, Instagram } from 'lucide-react';

export const MobileQuickBar: React.FC = () => {
  return (
    <div
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 max-w-md mx-auto"
      style={{ maxHeight: '54px' }}
    >
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#070b16]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <a
          href={OFFICIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/30 active:scale-95 whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 fill-black/20" />
          <span>Falar no WhatsApp</span>
        </a>

        <a
          href={OFFICIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-pink-400 hover:text-pink-300 transition-colors active:scale-95 shrink-0"
          title="Abrir Instagram @mvconectar"
          aria-label="Abrir Instagram oficial da MV Conectar"
        >
          <Instagram className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
