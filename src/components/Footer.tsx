import React, { useState, useEffect } from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import { MvLogo } from './MvLogo';
import { getSiteSettings, SiteSettings, DEFAULT_SITE_SETTINGS } from '../services/siteSettingsService';
import { MessageCircle, Instagram, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    const load = () => setSettings(getSiteSettings());
    load();
    const handleUpdate = () => load();
    window.addEventListener('mv_settings_updated', handleUpdate);
    return () => window.removeEventListener('mv_settings_updated', handleUpdate);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020306] border-t border-slate-900 py-12 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Logo MV Conectar */}
        <div className="mb-6 flex flex-col items-center">
          <MvLogo size="md" withGlow={false} />
          <span className="font-display font-bold text-lg tracking-wider text-white mt-2">
            MV CONECTAR
          </span>
        </div>

        {/* Official Channels */}
        <div className="flex items-center gap-6 mb-8">
          <a
            href={OFFICIAL_LINKS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors py-1 px-3 rounded-lg hover:bg-slate-900/60"
            aria-label="WhatsApp Oficial da MV Conectar"
          >
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span>WhatsApp</span>
          </a>

          <span className="text-slate-800">·</span>

          <a
            href={OFFICIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-pink-400 transition-colors py-1 px-3 rounded-lg hover:bg-slate-900/60"
            aria-label="Instagram Oficial da MV Conectar"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Instagram</span>
          </a>
        </div>

        {/* Required Quote */}
        <p className="text-sm font-medium text-slate-300 tracking-wide mb-3">
          {settings.texts.footerQuote || OFFICIAL_LINKS.footerQuote}
        </p>

        {/* Copyright */}
        <p className="text-xs text-slate-400 font-mono">
          © {new Date().getFullYear()} MV Conectar. Todos os direitos reservados.
        </p>

        {onOpenAdmin && (
          <button
            type="button"
            onClick={onOpenAdmin}
            className="mt-3 text-[11px] font-mono text-slate-600 hover:text-cyan-400 transition-colors"
          >
            🔒 Painel do Administrador (Projetos)
          </button>
        )}

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          type="button"
          className="mt-6 p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          title="Voltar ao topo"
          aria-label="Voltar ao início da página"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};
