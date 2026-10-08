import React, { useState, useEffect } from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import { MvLogo } from './MvLogo';
import { getSiteSettings, SiteSettings, DEFAULT_SITE_SETTINGS } from '../services/siteSettingsService';
import { MessageCircle, Instagram, ArrowDown, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    const load = () => setSettings(getSiteSettings());
    load();
    const handleUpdate = () => load();
    window.addEventListener('mv_settings_updated', handleUpdate);
    return () => window.removeEventListener('mv_settings_updated', handleUpdate);
  }, []);
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background Tech Lights & Grid Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        {/* Radial ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent rounded-full blur-[100px] opacity-70" />
        <div className="absolute -bottom-20 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[90px]" />
        
        {/* Subtle cyber grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ambient top light beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Spotlight Logo Card */}
        <div className="relative mb-6 sm:mb-8 group">
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/40 to-sky-400/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
          
          <div className="relative px-6 py-5 sm:px-10 sm:py-7 rounded-2xl sm:rounded-3xl bg-[#070b14]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_50px_rgba(14,165,233,0.25)] flex flex-col items-center justify-center">
            <MvLogo size="xl" withGlow={false} />
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-cyan-300/80 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              Presença Digital · Tecnologia & Inovação
            </div>
          </div>
        </div>

        {/* Main Brand Title & Headings */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white">
            <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              {settings.texts.title || 'MV CONECTAR'}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-cyan-400 tracking-tight text-balance">
            {settings.texts.slogan || 'Conecte sua empresa ao digital.'}
          </p>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance pt-1">
            {settings.texts.subSlogan || 'Centralize sua presença online, transforme clientes presenciais em seguidores fiéis e acelere suas vendas com BioSite profissional, NFC por aproximação e QR Code inteligente.'}
          </p>
        </div>

        {/* Primary Call-to-Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md sm:max-w-none">
          {/* WhatsApp Primary */}
          <a
            href={OFFICIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 rounded-xl hover:shadow-[0_0_35px_rgba(34,211,238,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap group"
          >
            <MessageCircle className="w-5 h-5 fill-black/20 group-hover:scale-110 transition-transform" />
            <span>FALAR NO WHATSAPP</span>
          </a>

          {/* Explore / Know MV Conectar */}
          <button
            onClick={onExploreClick}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold text-slate-200 bg-[#0a1122]/80 hover:bg-[#0e172e] border border-cyan-500/25 hover:border-cyan-400/50 rounded-xl transition-all hover:text-white transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shadow-lg shadow-black/40"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>CONHECER A MV CONECTAR</span>
          </button>

          {/* Instagram Official Channel */}
          <a
            href={OFFICIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-semibold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-pink-500/40 rounded-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            title="Siga a MV Conectar no Instagram"
          >
            <Instagram className="w-5 h-5 text-pink-400" />
            <span>@mvconectar</span>
          </a>
        </div>

        {/* Quiet Trust Proof Badges */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Sem mensalidades abusivas</span>
          </div>
          <span className="hidden sm:inline text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>NFC 1-Toque iOS & Android</span>
          </div>
          <span className="hidden sm:inline text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Avaliações 5★ no Google Meu Negócio</span>
          </div>
        </div>

        {/* Smooth scroll down indicator */}
        <button
          onClick={onExploreClick}
          type="button"
          aria-label="Rolar para baixo"
          className="mt-8 sm:mt-10 p-2 text-cyan-400/80 hover:text-cyan-300 animate-bounce transition-colors"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
