import React, { useState } from 'react';
import { OFFICIAL_LINKS } from '../data/content';
import {
  Radio,
  QrCode,
  Smartphone,
  ShieldCheck,
  Zap,
  BatteryCharging,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const NfcQrCodeSection: React.FC = () => {
  const [isSimulatingTap, setIsSimulatingTap] = useState(false);
  const [tapSuccess, setTapSuccess] = useState(false);

  const handleSimulateTap = () => {
    if (isSimulatingTap) return;
    setIsSimulatingTap(true);
    setTapSuccess(false);

    // After animation approaches NFC chip
    setTimeout(() => {
      setTapSuccess(true);
      setIsSimulatingTap(false);
    }, 1500);
  };

  return (
    <section
      id="nfc"
      className="relative min-h-[95vh] py-20 px-4 sm:px-6 overflow-hidden border-t border-slate-900"
    >
      {/* Background Lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Tecnologia Físico & Digital
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            NFC + QR CODE
          </h2>
          <p className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-cyan-400 max-w-2xl mx-auto text-balance">
            “Transforme um simples toque ou escaneamento em uma nova oportunidade para sua empresa.”
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Nossas placas físicas inteligentes combinam tecnologia contactless de aproximação instantânea e QR Code de alta resolução para conectar 100% dos clientes.
          </p>
        </div>

        {/* 2-Column Showcase: Interactive NFC Demo & Technical Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Plaque Visual & Interactive NFC Simulation (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#070b14] shadow-[0_0_50px_rgba(14,165,233,0.2)] group p-2">
              {/* Actual Generated Image of the NFC Plaque */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src="/src/assets/images/nfc_smart_plaque_1791412545685.jpg"
                  alt="Placa Inteligente NFC e QR Code MV Conectar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Cyber HUD Overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                        NTAG Contactless + QR Ultra-HD
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1">
                        Display de Balcão MV Conectar
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                        <Radio className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                        <QrCode className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated NFC Signal Ripples when simulating */}
                {isSimulatingTap && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32 rounded-full border-2 border-cyan-400 animate-ping opacity-75" />
                    <div className="w-48 h-48 rounded-full border border-sky-300 animate-ping delay-150 opacity-50" />
                    <div className="w-64 h-64 rounded-full border border-blue-400 animate-ping delay-300 opacity-25" />
                  </div>
                )}
              </div>

              {/* Interactive Simulation Control Bar */}
              <div className="p-4 bg-[#0a1020]/90 rounded-2xl mt-2 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Simulador Interativo de Aproximação
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Veja o que acontece quando o cliente aproxima o celular
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateTap}
                  disabled={isSimulatingTap}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-cyan-500/30 whitespace-nowrap"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{isSimulatingTap ? 'Aproximando celular...' : 'Aproximar Celular (NFC)'}</span>
                </button>
              </div>

              {/* Simulated Notification Dropping in */}
              {tapSuccess && (
                <div className="mt-2 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border border-cyan-400 text-left animate-in slide-in-from-top-3 fade-in duration-300 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-400 text-black flex items-center justify-center shrink-0">
                        <Radio className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">
                          📱 Conexão NFC Estabelecida com Sucesso!
                        </p>
                        <p className="text-[11px] text-cyan-300">
                          BioSite da sua empresa abriu instantaneamente no smartphone do cliente.
                        </p>
                      </div>
                    </div>
                    <a
                      href={OFFICIAL_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase font-bold text-black bg-cyan-400 px-3 py-1.5 rounded-md hover:bg-cyan-300 transition-colors whitespace-nowrap ml-2"
                    >
                      Quero a Minha
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Technical Highlights & Physical Specifications (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {[
              {
                icon: Zap,
                title: 'Velocidade Instantânea (Menos de 1 segundo)',
                desc: 'Basta encostar o celular na placa. Não é necessário desbloquear tela para escanear nem abrir câmera no NFC.',
              },
              {
                icon: BatteryCharging,
                title: 'Não Precisa de Baterias nem Energia',
                desc: 'Tecnologia passiva por indução magnética. A placa dura anos intacta no seu balcão sem nunca descarregar.',
              },
              {
                icon: Layers,
                title: 'Acabamento Nobre em Acrílico Black',
                desc: 'Material sofisticado, corte preciso e gravação tecnológica que harmoniza com qualquer balcão de alta classe.',
              },
              {
                icon: ShieldCheck,
                title: 'QR Code Integrado para 100% de Cobertura',
                desc: 'Para os raros aparelhos antigos sem NFC, o QR Code de alta precisão garante que nenhum cliente fique de fora.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-[#090e1b]/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">{item.title}</h4>
                      <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-2">
              <a
                href={`${OFFICIAL_LINKS.whatsapp}?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20as%20placas%20NFC%20e%20QR%20Code%20da%20MV%20Conectar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/25 whitespace-nowrap"
              >
                <span>Solicitar Placa NFC para Meu Negócio</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
