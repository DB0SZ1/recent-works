'use client';

import { useEffect, useState } from 'react';

export default function AIPipelineHero() {
  const [pipelineStats, setPipelineStats] = useState({
    latency: '0.00',
    throughput: 0,
    accuracy: 0,
  });

  useEffect(() => {
    let frame = 0;
    const maxFrames = 60;
    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / maxFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPipelineStats({
        latency: (eased * 12.4).toFixed(2),
        throughput: Math.round(eased * 847000),
        accuracy: parseFloat((eased * 99.7).toFixed(1)),
      });
      if (frame >= maxFrames) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
      ];
      selectors.forEach(selector => {
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
          const allElements = container.querySelectorAll('*');
          allElements.forEach(el => {
            const text = ((el as HTMLElement).textContent || '').toLowerCase();
            const title = (el.getAttribute('title') || '').toLowerCase();
            const href = (el.getAttribute('href') || '').toLowerCase();
            if (
              text.includes('made with') ||
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              (el as HTMLElement).style.display = 'none';
              try { el.remove(); } catch (e) { /* noop */ }
            }
          });
        });
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 50);
    setTimeout(hideBranding, 500);
    setTimeout(hideBranding, 1000);
    setTimeout(hideBranding, 2000);
    setTimeout(hideBranding, 5000);

    return () => {
      clearInterval(interval);
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  const pipelineNodes = [
    { label: 'INGEST', status: 'active' },
    { label: 'TOKENIZE', status: 'active' },
    { label: 'EMBED', status: 'active' },
    { label: 'INFERENCE', status: 'pulse' },
    { label: 'VALIDATE', status: 'idle' },
    { label: 'DEPLOY', status: 'idle' },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div
          data-us-project="OMzqyUv6M3kSnv0JeAtC"
          style={{ width: '100%', height: '100%', minHeight: '100vh' }}
        />
      </div>

      {/* Mobile stars background */}
      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg"></div>

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[5] opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
        }}
      />

      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/20">
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest">
              C0DE
            </div>
            <div className="h-3 lg:h-4 w-px bg-white/40"></div>
            <span className="text-white/60 text-[8px] lg:text-[10px] font-mono tracking-wider"></span>
          </div>

          <div className="flex items-center gap-3 text-[8px] lg:text-[10px] font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              CLUSTER: HEALTHY
            </span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>NODES: 128</span>
            <div className="hidden lg:block w-1 h-1 bg-white/40 rounded-full"></div>
            <span className="hidden lg:inline">GPU: A100×8</span>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20"></div>
      <div className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>
      <div className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" style={{ bottom: '5vh' }}></div>

      {/* CTA Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-end pt-16 lg:pt-0" style={{ marginTop: '5vh' }}>
        <div className="w-full lg:w-1/2 px-6 lg:px-16 lg:pr-[10%]">
          <div className="max-w-lg relative lg:ml-auto">

            {/* Pipeline Flow Indicator */}
            <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-1">
              {pipelineNodes.map((node, i) => (
                <div key={i} className="flex items-center gap-1 shrink-0">
                  <div className={`
                    px-1.5 py-0.5 border font-mono text-[7px] lg:text-[8px] tracking-wider
                    ${node.status === 'active'
                      ? 'border-white/60 text-white bg-white/10'
                      : node.status === 'pulse'
                        ? 'border-white/40 text-white/80 bg-white/5 animate-pulse'
                        : 'border-white/20 text-white/30 bg-transparent'
                    }
                  `}>
                    {node.label}
                  </div>
                  {i < pipelineNodes.length - 1 && (
                    <div className={`w-3 lg:w-5 h-px ${i < 3 ? 'bg-white/40' : 'bg-white/10'}`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white"></div>
              <span className="text-white text-[10px] font-mono tracking-wider">◈</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* Title */}
            <div className="relative">
              <div className="absolute -right-3 top-0 bottom-0 w-1 dither-pattern opacity-40"></div>
              <h1 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider lg:-ml-[5%]" style={{ letterSpacing: '0.08em' }}>
                LET YOUR PIPELINE<br />DO THE WORK
              </h1>
            </div>

            {/* Stat cards row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="border border-white/20 bg-white/5 px-2 py-1.5 lg:px-3 lg:py-2">
                <div className="text-white text-sm lg:text-lg font-mono font-bold">{pipelineStats.latency}<span className="text-[8px] text-white/50 ml-0.5">ms</span></div>
                <div className="text-[7px] lg:text-[8px] font-mono text-white/40 tracking-wider">LATENCY</div>
              </div>
              <div className="border border-white/20 bg-white/5 px-2 py-1.5 lg:px-3 lg:py-2">
                <div className="text-white text-sm lg:text-lg font-mono font-bold">{(pipelineStats.throughput / 1000).toFixed(0)}<span className="text-[8px] text-white/50 ml-0.5">K</span></div>
                <div className="text-[7px] lg:text-[8px] font-mono text-white/40 tracking-wider">TOKENS/S</div>
              </div>
              <div className="border border-white/20 bg-white/5 px-2 py-1.5 lg:px-3 lg:py-2">
                <div className="text-white text-sm lg:text-lg font-mono font-bold">{pipelineStats.accuracy}<span className="text-[8px] text-white/50 ml-0.5">%</span></div>
                <div className="text-[7px] lg:text-[8px] font-mono text-white/40 tracking-wider">ACCURACY</div>
              </div>
            </div>

            {/* Decorative data flow — desktop only */}
            <div className="flex gap-1 mb-3 opacity-30">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-white rounded-full"
                  style={{ height: `${Math.round(Math.sin(i * 0.4) * 400 + 500) / 100}px` }}
                ></div>
              ))}
            </div>

            {/* Description */}
            <div className="relative">
              <p className="text-xs lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80">
                Orchestrate end-to-end ML workflows — from data ingestion to model deployment. Real-time monitoring, auto-scaling inference, and zero-downtime rollouts.
              </p>

              {/* Technical corner accent — desktop only */}
              <div className="absolute -left-4 top-1/2 w-3 h-3 border border-white/30" style={{ transform: 'translateY(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white" style={{ transform: 'translate(-50%, -50%)' }}></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group">
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                GET STARTED
              </button>

              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200" style={{ borderWidth: '1px' }}>
                VIEW DOCUMENTATION
              </button>
            </div>

            {/* Bottom technical notation — desktop only */}
            <div className="flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">◈</span>
              <div className="flex-1 h-px bg-white/20"></div>
              <span className="text-white/60 text-[9px] font-mono">PIPELINE.PROTOCOL.v3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="absolute left-0 right-0 z-20 border-t border-white/20 bg-black/40 backdrop-blur-sm" style={{ bottom: '5vh' }}>
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              <span className="hidden lg:inline">PIPELINE.ACTIVE</span>
            <span className="lg:hidden">ACTIVE</span>
            </span>
            <div className="flex gap-0.5 items-end">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-white/30 rounded-sm animate-pulse"
                  style={{
                    height: `${Math.round(Math.sin(i * 0.6) * 600 + 800) / 100}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
            <span>V3.2.1</span>
          </div>

          <div className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/50">
            <span className="inline">◈ INFERENCE</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
              <div className="w-1 h-1 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <span className="hidden lg:inline">UPTIME: 99.99%</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dither-pattern {
          background-image:
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }

        .stars-bg {
          background-image:
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.3;
        }
      `}</style>
    </main>
  );
}
