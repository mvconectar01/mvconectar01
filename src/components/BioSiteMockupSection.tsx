import React, { useState, useEffect } from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import { MvLogo } from './MvLogo';
import {
  getSiteSettings,
  SiteSettings,
  DEFAULT_SITE_SETTINGS
} from '../services/siteSettingsService';
import {
  MessageCircle,
  Instagram,
  MapPin,
  Star,
  ShoppingBag,
  CreditCard,
  Phone,
  Share2,
  Check,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Globe,
  Navigation
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  MessageCircle,
  Instagram,
  MapPin,
  Star,
  ShoppingBag,
  CreditCard,
  Phone,
  Globe,
  Navigation,
};

export const BioSiteMockupSection: React.FC = () => {
  const [phoneTheme, setPhoneTheme] = useState<'cyan' | 'dark' | 'sapphire'>('cyan');
  const [clickedItemToast, setClickedItemToast] = useState<string | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    const load = () => {
      setSettings(getSiteSettings());
    };
    load();

    const handleUpdate = () => load();
    window.addEventListener('mv_settings_updated', handleUpdate);
    return () => window.removeEventListener('mv_settings_updated', handleUpdate);
  }, []);

  const handlePhoneAction = (label: string, url?: string) => {
    setClickedItemToast(label);
    setTimeout(() => setClickedItemToast(null), 2500);

    if (url) {
      if (url.startsWith('#')) {
        const el = document.getElementById(url.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const activeLinks = settings.customLinks.filter((l) => l.active).sort((a, b) => a.order - b.order);

  return (
    <section
      id="biosite"
      className="relative min-h-[95vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            A Experiência no Celular
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Seu <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">BioSite Profissional</span> em um Celular Real
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Tudo o que seu cliente precisa em um único lugar, acessível em menos de 1 segundo pelo link da bio do Instagram ou aproximando o celular na sua placa NFC.
          </p>
        </div>

        {/* Content & Interactive Mockup Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Explanations & Value Proposition (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#090e1b]/80 border border-cyan-500/20 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Tudo centralizado em 1 toque
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Chega de perder vendas porque o cliente não achou seu WhatsApp ou não conseguiu localizar seu endereço no mapa. Com o BioSite da MV Conectar, seu negócio ganha um hub digital moderno e direto ao ponto.
              </p>
            </div>

            {/* List of Channels included */}
            <div className="space-y-3">
              {[
                { title: 'WhatsApp Direto', desc: 'Inicia conversa sem precisar salvar número' },
                { title: 'Google Avaliações 5★', desc: 'Abre direto na tela de avaliação da sua empresa' },
                { title: 'Localização Google Maps', desc: 'Traça rota via Waze ou Google Maps com 1 clique' },
                { title: 'Catálogo & Serviços', desc: 'Vitrine organizada de produtos, fotos e preços' },
                { title: 'Chave Pix Copia e Cola', desc: 'Receba pagamentos com agilidade no balcão' },
                { title: 'Redes Sociais & Contatos', desc: 'Instagram, telefone e links importantes' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-400/80 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Public Action Buttons including 📍 COMO CHEGAR */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={OFFICIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/25 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 fill-black/20" />
                <span>Pedir Meu BioSite</span>
              </a>

              {/* Requirement: 📍 COMO CHEGAR button opening Google Maps */}
              <a
                href={settings.location.mapsUrl || 'https://maps.google.com/?q=MV+Conectar'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-md whitespace-nowrap"
                title={`Endereço: ${settings.location.address}, ${settings.location.city} - ${settings.location.state}`}
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>📍 COMO CHEGAR</span>
              </a>
            </div>

            {/* Address quick hint */}
            {settings.location.address && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <span>📍 {settings.location.address} · {settings.location.city} - {settings.location.state}</span>
              </p>
            )}
          </div>

          {/* Right: Interactive 3D Smartphone Device Mockup (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            {/* Phone Theme Selector */}
            <div className="mb-4 flex items-center gap-2 p-1 bg-black/60 border border-slate-800 rounded-full text-xs">
              <span className="text-[11px] text-slate-400 px-3 font-medium">Tema do Mockup:</span>
              <button
                onClick={() => setPhoneTheme('cyan')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  phoneTheme === 'cyan' ? 'bg-cyan-400 text-black' : 'text-slate-300 hover:text-white'
                }`}
              >
                Azul Tech
              </button>
              <button
                onClick={() => setPhoneTheme('dark')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  phoneTheme === 'dark' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Preto Ônix
              </button>
              <button
                onClick={() => setPhoneTheme('sapphire')}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  phoneTheme === 'sapphire' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Safira Nobre
              </button>
            </div>

            {/* Smartphone Outer Casing */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] p-3 sm:p-3.5 bg-gradient-to-b from-slate-700 via-slate-900 to-slate-950 rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(14,165,233,0.3)] border-2 border-slate-600/60">
              {/* Dynamic Island / Speaker notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-between px-3">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
              </div>

              {/* Smartphone Screen Viewport */}
              <div
                className={`relative w-full rounded-[38px] overflow-hidden pt-8 pb-6 px-4 flex flex-col justify-between min-h-[580px] max-h-[640px] overflow-y-auto ${
                  phoneTheme === 'cyan'
                    ? 'bg-[#060a14] text-slate-100'
                    : phoneTheme === 'dark'
                    ? 'bg-[#030406] text-slate-100'
                    : 'bg-[#070e1f] text-slate-100'
                }`}
              >
                {/* Simulated Toast inside Phone */}
                {clickedItemToast && (
                  <div className="absolute top-12 left-4 right-4 z-40 p-2.5 rounded-xl bg-cyan-400 text-black text-xs font-bold text-center shadow-lg animate-in fade-in slide-in-from-top-2">
                    ✓ {clickedItemToast}
                  </div>
                )}

                {/* Profile Header inside Phone */}
                <div className="text-center pt-4 pb-3 flex flex-col items-center">
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 p-0.5 shadow-md shadow-cyan-500/30">
                      <div className="w-full h-full bg-[#070b14] rounded-[14px] flex items-center justify-center p-1 overflow-hidden">
                        <MvLogo size="sm" withGlow={false} />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-black border-2 border-[#070b14]">
                      ✓
                    </div>
                  </div>

                  <h4 className="font-display font-bold text-base text-white">{settings.texts.title}</h4>
                  <p className="text-[11px] text-cyan-300 font-medium">@mvconectar · Soluções Digitais</p>
                  <p className="text-[10px] text-slate-400 max-w-[240px] mt-1 leading-snug">
                    {settings.texts.slogan}
                  </p>
                </div>

                {/* Interactive Action Buttons inside Phone (Rendered dynamically from settings customLinks) */}
                <div className="space-y-2 my-2">
                  {activeLinks.map((link, idx) => {
                    const Icon = iconMap[link.icon] || Globe;
                    const isFirst = idx === 0;
                    return (
                      <button
                        key={link.id}
                        type="button"
                        onClick={() => handlePhoneAction(link.name, link.url)}
                        className={`w-full group text-left p-2.5 rounded-xl transition-all duration-200 flex items-center justify-between border ${
                          isFirst
                            ? 'bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 text-black border-cyan-300 shadow-md shadow-cyan-500/25 font-bold hover:brightness-105'
                            : 'bg-slate-900/80 hover:bg-slate-800 text-white border-slate-800 hover:border-cyan-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              isFirst
                                ? 'bg-black/15 text-black'
                                : 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/25'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] font-bold truncate leading-tight">
                              {link.name}
                            </div>
                            <div
                              className={`text-[9px] truncate ${
                                isFirst ? 'text-black/75' : 'text-slate-400'
                              }`}
                            >
                              {link.url.startsWith('#') ? 'Navegar no BioSite' : link.url.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isFirst ? 'text-black/60' : 'text-slate-500 group-hover:text-cyan-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Footer inside Phone */}
                <div className="pt-3 text-center border-t border-slate-800/80 flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                    <Share2 className="w-2.5 h-2.5 text-cyan-400" />
                    <span>Compartilhar este perfil</span>
                  </div>
                  <span className="text-[8px] font-mono text-slate-500">
                    Powered by MV Conectar
                  </span>
                </div>
              </div>

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-500 rounded-full" />
            </div>

            <p className="mt-3 text-xs text-slate-400 text-center">
              💡 Experimente tocar nos botões do celular acima para simular a experiência do seu cliente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

