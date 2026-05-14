'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/* ─── Helpers ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO (original AI Pipeline)
   ═══════════════════════════════════════════ */
function Hero() {
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

  const pipelineNodes = [
    { label: 'INGEST', status: 'active' },
    { label: 'TOKENIZE', status: 'active' },
    { label: 'EMBED', status: 'active' },
    { label: 'INFERENCE', status: 'pulse' },
    { label: 'VALIDATE', status: 'idle' },
    { label: 'DEPLOY', status: 'idle' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-black flex items-center">
      {/* Stars background */}
      <div className="absolute inset-0 w-full h-full stars-bg" />

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
            <div className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest">C0DE</div>
            <div className="h-3 lg:h-4 w-px bg-white/40" />
          </div>
          <div className="flex items-center gap-3 text-[8px] lg:text-[10px] font-mono text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              CLUSTER: HEALTHY
            </span>
            <div className="w-1 h-1 bg-white/40 rounded-full" />
            <span>NODES: 128</span>
            <div className="hidden lg:block w-1 h-1 bg-white/40 rounded-full" />
            <span className="hidden lg:inline">GPU: A100×8</span>
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-l-2 border-white/30 z-20" />
      <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-t-2 border-r-2 border-white/30 z-20" />
      <div className="absolute bottom-0 left-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-l-2 border-white/30 z-20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 lg:w-12 lg:h-12 border-b-2 border-r-2 border-white/30 z-20" />

      {/* CTA Content */}
      <div className="relative z-10 w-full flex justify-center lg:justify-end pt-16 lg:pt-0">
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
                    <div className={`w-3 lg:w-5 h-px ${i < 3 ? 'bg-white/40' : 'bg-white/10'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Top decorative line */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div className="w-8 h-px bg-white" />
              <span className="text-white text-[10px] font-mono tracking-wider">◈</span>
              <div className="flex-1 h-px bg-white/30" />
            </div>

            {/* Title */}
            <h1 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight font-mono tracking-wider" style={{ letterSpacing: '0.08em' }}>
              LET YOUR PIPELINE<br />DO THE WORK
            </h1>

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

            {/* Description */}
            <p className="text-xs lg:text-base text-gray-300 mb-5 lg:mb-6 leading-relaxed font-mono opacity-80">
              Orchestrate end-to-end ML workflows — from data ingestion to model deployment. Real-time monitoring, auto-scaling inference, and zero-downtime rollouts.
            </p>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent text-white font-mono text-xs lg:text-sm border border-white hover:bg-white hover:text-black transition-all duration-200 group">
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity" />
                GET STARTED
              </button>
              <button className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent border border-white text-white font-mono text-xs lg:text-sm hover:bg-white hover:text-black transition-all duration-200">
                VIEW DOCUMENTATION
              </button>
            </div>

            {/* Bottom technical notation */}
            <div className="flex items-center gap-2 mt-6 opacity-40">
              <span className="text-white text-[9px] font-mono">◈</span>
              <div className="flex-1 h-px bg-white/20" />
              <span className="text-white/60 text-[9px] font-mono">PIPELINE.PROTOCOL.v3</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
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
          opacity: 0.3;
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════ */
const features = [
  {
    label: 'AUTO-SCALE',
    title: 'Elastic Inference',
    desc: 'Automatically scale GPU clusters from 0 to 1000+ nodes based on request volume. Pay only for what you use.',
  },
  {
    label: 'MONITOR',
    title: 'Real-Time Observability',
    desc: 'Track every token, every latency spike, every model drift anomaly across your entire pipeline in real-time.',
  },
  {
    label: 'DEPLOY',
    title: 'Zero-Downtime Rollouts',
    desc: 'Blue-green deployments, canary releases, and automatic rollback if accuracy metrics drop below threshold.',
  },
  {
    label: 'SECURE',
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II compliant. Data encrypted at rest and in transit. Full audit trail for every pipeline execution.',
  },
  {
    label: 'OPTIMIZE',
    title: 'Model Compression',
    desc: 'Automatic quantization, pruning, and distillation to reduce model size up to 80% without accuracy loss.',
  },
  {
    label: 'CONNECT',
    title: 'Universal Connectors',
    desc: 'Pre-built integrations with S3, BigQuery, Snowflake, Kafka, and 50+ data sources out of the box.',
  },
];

function Features() {
  return (
    <section className="relative bg-black py-24 md:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-white/40" />
            <span className="text-white/50 text-[10px] font-mono tracking-widest">CAPABILITIES</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white font-mono tracking-wider mb-4" style={{ letterSpacing: '0.06em' }}>
            BUILT FOR PRODUCTION
          </h2>
          <p className="text-gray-400 text-sm font-mono max-w-xl mb-16 opacity-70">
            Every component designed for enterprise-grade ML operations at any scale.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FadeIn key={f.label} delay={i * 0.08}>
              <div className="group p-6 border border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300">
                <span className="text-[9px] font-mono text-white/30 tracking-widest block mb-3">{f.label}</span>
                <h3 className="text-white font-mono text-base font-bold mb-2 tracking-wide">{f.title}</h3>
                <p className="text-white/40 text-xs font-mono leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ARCHITECTURE DIAGRAM
   ═══════════════════════════════════════════ */
function Architecture() {
  const layers = [
    { name: 'DATA LAYER', items: ['S3', 'BigQuery', 'Kafka', 'PostgreSQL'], active: true },
    { name: 'PROCESSING', items: ['Tokenizer', 'Embedder', 'Validator', 'Augmentor'], active: true },
    { name: 'MODEL LAYER', items: ['Training', 'Fine-tuning', 'Evaluation', 'Registry'], active: true },
    { name: 'INFERENCE', items: ['Serving', 'Caching', 'Load Balancer', 'Gateway'], active: false },
    { name: 'MONITORING', items: ['Metrics', 'Alerts', 'Logs', 'Traces'], active: false },
  ];

  return (
    <section className="relative bg-black py-24 md:py-32 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-white/40" />
            <span className="text-white/50 text-[10px] font-mono tracking-widest">ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white font-mono tracking-wider mb-16" style={{ letterSpacing: '0.06em' }}>
            PIPELINE OVERVIEW
          </h2>
        </FadeIn>

        <div className="space-y-3">
          {layers.map((layer, i) => (
            <FadeIn key={layer.name} delay={i * 0.1}>
              <div className={`flex items-center gap-4 p-4 border ${layer.active ? 'border-white/20 bg-white/[0.03]' : 'border-white/5 bg-transparent'} transition-all`}>
                <span className={`font-mono text-[10px] tracking-widest w-32 shrink-0 ${layer.active ? 'text-white/70' : 'text-white/20'}`}>
                  {layer.name}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className={`px-2 py-1 font-mono text-[9px] tracking-wider border ${
                        layer.active
                          ? 'border-white/30 text-white/60 bg-white/5'
                          : 'border-white/10 text-white/20'
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${layer.active ? 'bg-white animate-pulse' : 'bg-white/10'}`} />
                  <span className={`font-mono text-[8px] ${layer.active ? 'text-white/50' : 'text-white/15'}`}>
                    {layer.active ? 'ONLINE' : 'STANDBY'}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════ */
const tiers = [
  {
    name: 'STARTER',
    price: '$0',
    period: '/month',
    desc: 'For experimentation and small models.',
    features: ['1 pipeline', '10K tokens/day', 'Community support', 'Basic monitoring'],
    cta: 'START FREE',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '$199',
    period: '/month',
    desc: 'For production workloads at scale.',
    features: ['Unlimited pipelines', '10M tokens/day', 'Priority support', 'Advanced monitoring', 'Auto-scaling', 'Custom connectors'],
    cta: 'START TRIAL',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: 'Custom',
    period: '',
    desc: 'For organizations with compliance needs.',
    features: ['Everything in Pro', 'Unlimited tokens', 'Dedicated support', 'SOC 2 compliance', 'SLA guarantee', 'On-premise option'],
    cta: 'CONTACT US',
    highlighted: false,
  },
];

function Pricing() {
  return (
    <section className="relative bg-black py-24 md:py-32 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-px bg-white/40" />
            <span className="text-white/50 text-[10px] font-mono tracking-widest">PRICING</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white font-mono tracking-wider mb-16" style={{ letterSpacing: '0.06em' }}>
            CHOOSE YOUR PLAN
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <div className={`p-6 border ${tier.highlighted ? 'border-white/40 bg-white/[0.05]' : 'border-white/10 bg-white/[0.01]'} flex flex-col`}>
                <span className="font-mono text-[10px] tracking-widest text-white/40 mb-4">{tier.name}</span>
                <div className="mb-2">
                  <span className="text-3xl font-mono font-bold text-white">{tier.price}</span>
                  <span className="text-white/30 font-mono text-xs">{tier.period}</span>
                </div>
                <p className="text-white/40 text-xs font-mono mb-6">{tier.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-white/50 text-xs font-mono flex items-center gap-2">
                      <span className="text-white/30">›</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 font-mono text-xs tracking-widest border transition-all duration-200 ${
                    tier.highlighted
                      ? 'border-white bg-white text-black hover:bg-transparent hover:text-white'
                      : 'border-white/30 text-white/70 hover:bg-white hover:text-black'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function PipelineFooter() {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-white text-lg font-bold tracking-widest">C0DE</span>
          <span className="text-white/30 text-[9px] font-mono">PIPELINE.PROTOCOL.v3</span>
        </div>
        <div className="flex items-center gap-4 text-[9px] font-mono text-white/30">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            ALL SYSTEMS OPERATIONAL
          </span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FULL LANDING PAGE
   ═══════════════════════════════════════════ */
export default function AIPipelineLanding() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Architecture />
      <Pricing />
      <PipelineFooter />
    </div>
  );
}
