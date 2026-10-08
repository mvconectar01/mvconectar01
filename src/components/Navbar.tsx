import React, { useState, useEffect } from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import { MvLogo } from './MvLogo';
import { MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'O que é', href: '#sobre', id: 'sobre' },
    { label: 'Soluções', href: '#solucoes', id: 'solucoes' },
    { label: 'BioSite', href: '#biosite', id: 'biosite' },
    { label: 'NFC & QR Code', href: '#nfc', id: 'nfc' },
    { label: 'Google 5★', href: '#avaliacoes', id: 'avaliacoes' },
    { label: 'Projetos', href: '#projetos', id: 'projetos' },
    { label: 'Segmentos', href: '#segmentos', id: 'segmentos' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070f]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Zone 1: Single Brand Zone */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg py-1 px-1.5"
            aria-label="MV Conectar Início"
          >
            <MvLogo size="sm" withGlow={false} />
            <span className="font-display font-bold text-lg md:text-xl tracking-wide bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent group-hover:to-cyan-200 transition-colors">
              MV CONECTAR
            </span>
          </a>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="Navegação Principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-cyan-400 font-semibold'
                      : 'hover:text-cyan-300 text-slate-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action Zone */}
          <div className="flex items-center gap-3">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-950 border border-cyan-500/30 rounded-lg transition-colors"
                title="Painel Administrativo MV Conectar"
              >
                <span>📁 Admin</span>
              </button>
            )}

            <a
              href={OFFICIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 rounded-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-black/20" />
              <span>Falar no WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b14]/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-base font-medium transition-colors border-b border-slate-800/60 ${
                  activeSection === link.id ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={OFFICIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-black bg-cyan-400 rounded-lg hover:bg-cyan-300 shadow-md shadow-cyan-500/30 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-black/20" />
              <span>Falar no WhatsApp</span>
            </a>
            <a
              href={OFFICIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-300 bg-slate-800/80 border border-slate-700 rounded-lg hover:text-white"
            >
              <span>Ver Instagram Oficial</span>
            </a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 rounded-lg hover:text-white"
              >
                <span>📁 Painel Administrativo de Projetos</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
