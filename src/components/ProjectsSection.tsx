import React, { useState, useEffect } from 'react';
import { ProjectItem, getStoredProjects } from '../services/projectsService';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Maximize2,
  X,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ProjectsSectionProps {
  onOpenAdmin?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenAdmin }) => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Load projects and listen for live updates from Admin Panel
  useEffect(() => {
    const load = () => {
      const all = getStoredProjects();
      const activeOnly = all.filter((p) => p.active);
      setProjects(activeOnly);
    };

    load();

    const handleUpdate = () => {
      load();
    };

    window.addEventListener('mv_projects_updated', handleUpdate);
    return () => window.removeEventListener('mv_projects_updated', handleUpdate);
  }, []);

  // Determine items per view based on responsive layout
  const totalProjects = projects.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : Math.max(0, totalProjects - 1)));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalProjects - 1 ? prev + 1 : 0));
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    }
    return url;
  };

  return (
    <section
      id="projetos"
      className="relative min-h-[92vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-transparent rounded-full blur-[170px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Cases de Sucesso
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
              PROJETOS REALIZADOS
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Confira alguns dos projetos e soluções desenvolvidos pela <span className="text-cyan-400 font-semibold">MV Conectar</span>.
            </p>
          </div>

          {/* Navigation Controls & Admin Trigger */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {totalProjects > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all shadow-md active:scale-95"
                  aria-label="Projeto anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-slate-800 transition-all shadow-md active:scale-95"
                  aria-label="Próximo projeto"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs font-semibold text-cyan-300 hover:text-white hover:bg-cyan-950/80 transition-colors"
                title="Acessar painel para gerenciar portfólio"
              >
                <span>Gerenciar</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty state safeguard */}
        {totalProjects === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#090e1b]/80 border border-slate-800 text-slate-400">
            <p className="text-base text-slate-300">Nenhum projeto ativo cadastrado no momento.</p>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="mt-4 px-5 py-2.5 rounded-xl bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-300"
              >
                + Adicionar Primeiro Projeto
              </button>
            )}
          </div>
        ) : (
          <div>
            {/* Projects Horizontal Carousel Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {/* Responsive View - groups slides for desktop vs mobile */}
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="w-full shrink-0 max-w-full sm:max-w-[calc(50%-12px)] lg:max-w-[calc(33.333%-16px)]"
                    style={{ flex: '0 0 auto' }}
                  >
                    <div className="group h-full flex flex-col justify-between rounded-3xl bg-[#080d19]/90 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(14,165,233,0.18)] overflow-hidden">
                      {/* Media Area */}
                      <div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-black">
                          <img
                            src={project.coverImage || project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                            onClick={() => setLightboxImage(project.coverImage || project.images[0])}
                          />

                          {/* Category Badge overlay */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-cyan-300 bg-black/75 backdrop-blur-md border border-cyan-500/30">
                              {project.category}
                            </span>
                          </div>

                          {/* Lightbox Trigger button */}
                          <button
                            type="button"
                            onClick={() => setLightboxImage(project.coverImage || project.images[0])}
                            className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 hover:bg-black text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Ver imagem ampliada"
                            aria-label="Ver imagem ampliada"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>

                          {/* Video Play Button Overlay if project has video */}
                          {project.videoUrl && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveVideoUrl(project.videoUrl || null);
                                }}
                                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400/90 hover:bg-cyan-300 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/40 hover:scale-105 transition-all"
                              >
                                <Play className="w-4 h-4 fill-black" />
                                <span>Assistir Projeto</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Extra Thumbnails Carousel Bar (if multiple photos) */}
                        {project.images && project.images.length > 1 && (
                          <div className="px-4 pt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            {project.images.map((img, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setLightboxImage(img)}
                                className="shrink-0 w-12 h-10 rounded-lg overflow-hidden border border-slate-800 hover:border-cyan-400 transition-colors"
                              >
                                <img
                                  src={img}
                                  alt={`${project.title} foto ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Content Area */}
                        <div className="p-5 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-3 mt-4">
                        {project.videoUrl ? (
                          <button
                            type="button"
                            onClick={() => setActiveVideoUrl(project.videoUrl || null)}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <Play className="w-3.5 h-3.5 fill-cyan-400" />
                            <span>▶️ Assistir Projeto</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-mono text-slate-500">
                            MV Conectar Oficial
                          </span>
                        )}

                        {project.externalLink ? (
                          <a
                            href={project.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40"
                          >
                            <span>Ver Detalhes</span>
                            <ExternalLink className="w-3 h-3 text-cyan-400" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setLightboxImage(project.coverImage || project.images[0])}
                            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
                          >
                            <span>Ver fotos</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Indicators (Dots) */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-7 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.7)]'
                      : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Ir para projeto ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Fullscreen Image Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            className="absolute top-5 right-5 p-3 rounded-full bg-slate-900/90 text-white border border-slate-700 hover:bg-slate-800 transition-colors z-50"
            aria-label="Fechar visualização ampliada"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Visualização ampliada do projeto"
              className="max-w-full max-h-[85vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200"
          onClick={() => setActiveVideoUrl(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-[#080d19] border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                Apresentação do Projeto
              </span>
              <button
                type="button"
                onClick={() => setActiveVideoUrl(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Fechar vídeo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {activeVideoUrl.includes('youtube.com') || activeVideoUrl.includes('youtu.be') ? (
                <iframe
                  src={getEmbedUrl(activeVideoUrl)}
                  title="Vídeo do Projeto"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
