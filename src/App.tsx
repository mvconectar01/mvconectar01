import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VerticalSlideNav } from './components/VerticalSlideNav';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SolutionsSection } from './components/SolutionsSection';
import { BioSiteMockupSection } from './components/BioSiteMockupSection';
import { NfcQrCodeSection } from './components/NfcQrCodeSection';
import { GoogleReviewsSection } from './components/GoogleReviewsSection';
import { SegmentsCarouselSection } from './components/SegmentsCarouselSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { WhyMvSection } from './components/WhyMvSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { AdminPanelModal } from './components/AdminPanelModal';

const SLIDES = [
  { id: 'hero', label: 'Início', number: '01' },
  { id: 'sobre', label: 'O que é a MV', number: '02' },
  { id: 'solucoes', label: 'Soluções', number: '03' },
  { id: 'biosite', label: 'BioSite no Celular', number: '04' },
  { id: 'nfc', label: 'NFC + QR Code', number: '05' },
  { id: 'avaliacoes', label: 'Google 5 Estrelas', number: '06' },
  { id: 'segmentos', label: 'Para Quem É', number: '07' },
  { id: 'como-funciona', label: 'Como Funciona', number: '08' },
  { id: 'por-que-mv', label: 'Por Que a MV', number: '09' },
  { id: 'projetos', label: 'Projetos Realizados', number: '10' },
  { id: 'cta-final', label: 'Conectar Agora', number: '11' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Track active section on scroll
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.1,
    });

    SLIDES.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation support for presentation feel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const currentIndex = SLIDES.findIndex((s) => s.id === activeSection);
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < SLIDES.length - 1) {
          e.preventDefault();
          scrollToSection(SLIDES[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(SLIDES[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 relative selection:bg-cyan-500 selection:text-black">
      {/* Top 3-Zone Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Presentation Slide Indicator (Desktop) */}
      <VerticalSlideNav
        slides={SLIDES}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Slide Sections */}
      <main className="relative z-10">
        <HeroSection onExploreClick={() => scrollToSection('sobre')} />
        <AboutSection />
        <SolutionsSection />
        <BioSiteMockupSection />
        <NfcQrCodeSection />
        <GoogleReviewsSection />
        <SegmentsCarouselSection />
        <HowItWorksSection />
        <WhyMvSection />
        <ProjectsSection onOpenAdmin={() => setIsAdminOpen(true)} />
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Mobile Floating Quick Conversion Dock */}
      <MobileQuickBar />

      {/* Administrative Projects Management Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
