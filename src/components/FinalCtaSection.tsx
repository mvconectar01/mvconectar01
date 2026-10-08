import React, { useState } from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import { MvLogo } from './MvLogo';
import {
  MessageCircle,
  Instagram,
  Sparkles,
  Share2,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="cta-final"
      className="relative min-h-[90vh] flex items-center justify-center py-24 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Intense Blue Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[600px] bg-gradient-to-r from-cyan-500/25 via-blue-600/20 to-sky-400/25 rounded-full blur-[160px] opacity-80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black" />
      </div>

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        {/* Spotlight Emblem */}
        <div className="inline-flex p-3 rounded-2xl bg-[#090e1b]/90 border border-cyan-500/40 shadow-[0_0_40px_rgba(34,211,238,0.3)] mb-8">
          <MvLogo size="md" withGlow={false} />
        </div>

        {/* Headings */}
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight text-balance">
          Sua empresa já está conectada?
        </h2>

        <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 bg-clip-text text-transparent text-balance">
          Leve sua presença digital para outro nível.
        </p>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed text-balance">
          Junte-se às empresas que já utilizam a MV Conectar para transformar clientes físicos em seguidores, acelerar avaliações 5 estrelas e aumentar suas vendas.
        </p>

        {/* Big CTAs */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {/* Main Huge WhatsApp Button */}
          <a
            href={OFFICIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:flex-1 py-5 px-8 rounded-2xl text-base sm:text-lg font-black uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.7)] transition-all transform hover:-translate-y-1 active:translate-y-0 whitespace-nowrap flex items-center justify-center gap-3 group"
          >
            <MessageCircle className="w-6 h-6 fill-black/20 group-hover:scale-110 transition-transform" />
            <span>FALAR COM A MV CONECTAR</span>
          </a>

          {/* Instagram Button */}
          <a
            href={OFFICIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto py-5 px-7 rounded-2xl text-sm sm:text-base font-bold text-white bg-[#0b1222] hover:bg-[#0f1930] border border-cyan-500/30 hover:border-pink-500/50 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2.5 whitespace-nowrap"
          >
            <Instagram className="w-5 h-5 text-pink-400" />
            <span>Instagram Oficial</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Share / Copy Link Action & Additional Slot */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-cyan-300">Link copiado com sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Link do BioSite</span>
              </>
            )}
          </button>

          {/* Dedicated Slot for Additional Link Requested */}
          <a
            href={OFFICIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 text-xs font-semibold text-cyan-300 transition-colors"
            title="Canal de Suporte e Atendimento MV Conectar"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Atendimento Imediato via Link Direto</span>
          </a>
        </div>

        {/* Guarantee text */}
        <div className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
          <span>Resposta rápida no WhatsApp</span>
          <span>·</span>
          <span>Envio para todo o Brasil</span>
          <span>·</span>
          <span>Suporte dedicado</span>
        </div>
      </div>
    </section>
  );
};
