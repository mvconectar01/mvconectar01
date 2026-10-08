import React, { useEffect, useRef, useState } from 'react';
import { OFFICIAL_LINKS } from '../data/content';

interface MvLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
  priority?: boolean;
}

export const MvLogo: React.FC<MvLogoProps> = ({
  className = '',
  size = 'md',
  withGlow = true,
}) => {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = OFFICIAL_LINKS.logoUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!ctx) {
          setProcessedSrc(OFFICIAL_LINKS.logoUrl);
          setIsLoading(false);
          return;
        }

        ctx.drawImage(img, 0, 0);

        // Analyze and remove white / light background pixels
        try {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // If pixel is near-white or light grey
            const brightness = (r + g + b) / 3;
            if (brightness > 220) {
              data[i + 3] = 0; // Transparent
            } else if (brightness > 190) {
              // Smooth feathering
              const alphaRatio = (220 - brightness) / 30;
              data[i + 3] = Math.round(data[i + 3] * Math.max(0, Math.min(1, alphaRatio)));
            }
          }

          ctx.putImageData(imgData, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          setProcessedSrc(dataUrl);
        } catch {
          // If canvas tainted due to CORS, use image directly with CSS blending
          setProcessedSrc(OFFICIAL_LINKS.logoUrl);
        }
      } catch {
        setProcessedSrc(OFFICIAL_LINKS.logoUrl);
      } finally {
        setIsLoading(false);
      }
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };
  }, []);

  const sizeClasses = {
    sm: 'h-8 md:h-10 w-auto',
    md: 'h-12 md:h-16 w-auto',
    lg: 'h-20 md:h-28 w-auto',
    xl: 'h-28 md:h-40 w-auto',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {withGlow && (
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-blue-500/30 to-sky-400/20 rounded-full blur-xl opacity-80 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Hidden processing canvas if needed */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {hasError ? (
        // High fidelity vector fallback representing MV Conectar
        <div className={`flex items-center gap-3 font-display font-bold tracking-wider text-white ${size === 'lg' || size === 'xl' ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
              <span className="text-cyan-400 font-extrabold tracking-tighter text-xl">MV</span>
            </div>
          </div>
          <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
            CONECTAR
          </span>
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          <img
            src={processedSrc || OFFICIAL_LINKS.logoUrl}
            alt="MV Conectar Logomarca Oficial"
            referrerPolicy="no-referrer"
            loading="eager"
            className={`relative z-10 ${sizeClasses[size]} object-contain filter drop-shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all duration-300 ${isLoading ? 'opacity-70 scale-95' : 'opacity-100 scale-100'}`}
            style={{
              // Fallback blend mode in case image still has white pixels
              mixBlendMode: processedSrc?.startsWith('data:') ? 'normal' : 'screen',
            }}
          />
        </div>
      )}
    </div>
  );
};
