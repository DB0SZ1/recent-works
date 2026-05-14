'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

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
   HERO (original Lunexa)
   ═══════════════════════════════════════════ */
function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden pb-10 pt-32 font-light text-white antialiased md:pb-16 md:pt-20 min-h-screen flex flex-col justify-center"
      style={{ background: 'linear-gradient(135deg, #0a0613 0%, #150d27 100%)' }}
    >
      <div
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)',
        }}
      />
      <div
        className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(155, 135, 245, 0.15) 0%, rgba(13, 10, 25, 0) 60%)',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="mb-6 inline-block rounded-full border border-[#9b87f5]/30 px-3 py-1 text-xs text-[#9b87f5]">
            NEXT GENERATION OF CRYPTO TRADING
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
            Trade Smarter with{' '}
            <span className="text-[#9b87f5]">AI-Powered</span> Crypto Insights
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60 md:text-xl">
            Lunexa combines artificial intelligence with cutting-edge trading
            strategies to help you maximize your crypto investments with
            precision and ease.
          </p>

          <div className="mb-10 sm:mb-0 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="#features"
              className="relative w-full overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-8 py-4 text-white shadow-lg transition-all duration-300 hover:border-[#9b87f5]/30 sm:w-auto"
            >
              Get Started
            </Link>
            <a
              href="#how-it-works"
              className="flex w-full items-center justify-center gap-2 text-white/70 transition-colors hover:text-white sm:w-auto"
            >
              <span>Learn how it works</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <div className="w-full flex h-40 md:h-64 relative overflow-hidden">
            <img
              src="https://blocks.mvp-subha.me/assets/earth.png"
              alt="Earth"
              className="absolute px-4 top-0 left-1/2 -translate-x-1/2 mx-auto -z-10 opacity-80"
            />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[0_0_50px_rgba(155,135,245,0.2)]">
            <Image
              src="https://blocks.mvp-subha.me/assets/lunexa-db.png"
              alt="Lunexa Dashboard"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg border border-white/10"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES
   ═══════════════════════════════════════════ */
const features = [
  {
    title: 'AI Signal Engine',
    desc: 'Our proprietary ML models analyze 10,000+ data points per second, generating high-confidence trade signals before the market moves.',
    icon: '⚡',
    color: '#9b87f5',
  },
  {
    title: 'Portfolio Intelligence',
    desc: 'Smart rebalancing algorithms optimize your portfolio allocation across 200+ assets based on real-time market conditions.',
    icon: '📊',
    color: '#6366f1',
  },
  {
    title: 'Risk Shield',
    desc: 'Automated stop-loss, position sizing, and exposure management to protect your capital during extreme volatility events.',
    icon: '🛡️',
    color: '#8b5cf6',
  },
  {
    title: 'Cross-Chain Execution',
    desc: 'Execute trades across Ethereum, Solana, Arbitrum, and 15+ chains from a single unified interface.',
    icon: '🔗',
    color: '#a78bfa',
  },
];

function Features() {
  return (
    <section
      id="features"
      className="relative py-24 md:py-32"
      style={{ background: 'linear-gradient(180deg, #0a0613 0%, #0f0a1f 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <span className="text-[#9b87f5] text-xs font-medium uppercase tracking-widest mb-3 block">Features</span>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-4 tracking-tight">
            The edge you've been <span className="text-[#9b87f5]">waiting for</span>.
          </h2>
          <p className="text-white/50 text-lg max-w-xl mb-16">
            Every feature is designed to give you an unfair advantage in the fastest-moving market on earth.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.1}>
              <div className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-[#9b87f5]/20 transition-all duration-500 hover:bg-white/[0.04]">
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#9b87f5]/5 blur-[150px] pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */
const steps = [
  { num: '01', title: 'Connect', desc: 'Link your exchange accounts via secure API keys. We never hold your funds.' },
  { num: '02', title: 'Configure', desc: 'Set your risk tolerance, preferred assets, and trading strategy parameters.' },
  { num: '03', title: 'Trade', desc: 'Our AI executes optimized trades 24/7, adapting to market conditions in real-time.' },
  { num: '04', title: 'Grow', desc: 'Monitor performance, compound returns, and scale your portfolio with confidence.' },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32"
      style={{ background: '#0a0613' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <span className="text-[#9b87f5] text-xs font-medium uppercase tracking-widest mb-3 block">How It Works</span>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-16 tracking-tight">
            Four steps to <span className="text-[#9b87f5]">smarter trading</span>.
          </h2>
        </FadeIn>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <div className="group flex gap-8 py-8 border-b border-white/5 hover:border-[#9b87f5]/20 transition-colors cursor-pointer">
                <span className="text-[#9b87f5]/40 text-4xl font-light font-mono shrink-0 group-hover:text-[#9b87f5]/80 transition-colors">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 group-hover:text-[#9b87f5] transition-colors">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-lg">{step.desc}</p>
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
   STATS
   ═══════════════════════════════════════════ */
const stats = [
  { value: '$2.4B+', label: 'Trading Volume' },
  { value: '50K+', label: 'Active Traders' },
  { value: '99.97%', label: 'Uptime' },
  { value: '340+', label: 'Crypto Assets' },
];

function Stats() {
  return (
    <section
      className="relative py-20 border-y border-white/5"
      style={{ background: 'linear-gradient(180deg, #0f0a1f 0%, #0a0613 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-light text-white mb-2">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-[#9b87f5]/60">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-24 md:py-32" style={{ background: '#0a0613' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Start trading <span className="text-[#9b87f5]">smarter</span> today.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
            Join 50,000+ traders who trust Lunexa to navigate the crypto markets with AI-powered precision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="rounded-full border border-white/10 bg-gradient-to-b from-[#9b87f5] to-[#6366f1] px-10 py-4 text-white text-base font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,135,245,0.3)] hover:scale-105">
              Create Free Account
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-10 py-4 text-white/70 text-base font-medium transition-all duration-300 hover:text-white hover:bg-white/10">
              View Live Demo
            </button>
          </div>
        </FadeIn>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#9b87f5]/5 blur-[120px] pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function CryptoFooter() {
  return (
    <footer className="border-t border-white/5 py-10" style={{ background: '#0a0613' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-white font-light text-lg">Lunexa</span>
          <span className="text-white/30 text-xs">© 2026</span>
        </div>
        <div className="flex gap-6 text-xs text-white/40">
          <span className="hover:text-[#9b87f5] cursor-pointer transition-colors">Twitter</span>
          <span className="hover:text-[#9b87f5] cursor-pointer transition-colors">Discord</span>
          <span className="hover:text-[#9b87f5] cursor-pointer transition-colors">GitHub</span>
          <span className="hover:text-[#9b87f5] cursor-pointer transition-colors">Docs</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FULL LANDING PAGE
   ═══════════════════════════════════════════ */
export default function CryptoLanding() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <HowItWorks />
      <Stats />
      <CTASection />
      <CryptoFooter />
    </div>
  );
}
