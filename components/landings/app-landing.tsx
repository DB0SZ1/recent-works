'use client';

import { useEffect, useState } from 'react';
import { easeInOut, motion, spring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Database, Sparkles, Zap, ArrowUpRight, Shield, Globe, Layers, Code } from 'lucide-react';

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
   HERO (original Nexus App Hero)
   ═══════════════════════════════════════════ */
function Hero() {
  const [stats, setStats] = useState({ users: 0, transactions: 0, networks: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => {
        const newUsers = prev.users >= 20000 ? 20000 : prev.users + 500;
        const newTransactions = prev.transactions >= 1500000 ? 1500000 : prev.transactions + 37500;
        const newNetworks = prev.networks >= 40 ? 40 : prev.networks + 1;
        if (newUsers === 20000 && newTransactions === 1500000 && newNetworks === 40) clearInterval(interval);
        return { users: newUsers, transactions: newTransactions, networks: newNetworks };
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: spring, stiffness: 100 } } };
  const glowAnimation = { opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1], transition: { duration: 3, repeat: Infinity, ease: easeInOut } };
  const tooltipVariants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: spring, stiffness: 100, delay: 1.2 } } };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black py-16 text-white sm:px-6 lg:px-8 lg:py-2">
      <div className="absolute inset-0 z-0 h-full w-full rotate-180 items-center px-5 py-24 opacity-80 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      <svg id="noice" className="absolute inset-0 z-10 h-full w-full opacity-30">
        <filter id="noise-filter-app">
          <feTurbulence type="fractalNoise" baseFrequency="1.34" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.46" />
            <feFuncG type="linear" slope="0.46" />
            <feFuncB type="linear" slope="0.47" />
            <feFuncA type="linear" slope="0.37" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.47" intercept="-0.23" />
            <feFuncG type="linear" slope="1.47" intercept="-0.23" />
            <feFuncB type="linear" slope="1.47" intercept="-0.23" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter-app)" />
      </svg>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black/70 to-gray-950 blur-3xl" />
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
        <div className="absolute top-20 -left-20 h-60 w-60 rounded-full bg-purple-600/20 blur-[100px]" />
        <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px]" />
        <motion.div animate={glowAnimation} className="absolute top-1/3 left-1/4 h-40 w-40 rounded-full bg-indigo-500/10 blur-[80px]" />
        <motion.div animate={glowAnimation} className="absolute right-1/4 bottom-1/3 h-40 w-40 rounded-full bg-purple-500/10 blur-[80px]" />
      </div>

      <div className="fadein-blur relative z-0 mx-auto mb-10 h-[300px] w-[300px] lg:absolute lg:top-1/2 lg:right-1/2 lg:mx-0 lg:mb-0 lg:h-[500px] lg:w-[500px] lg:translate-x-1/2 lg:-translate-y-2/3">
        <img
          src="https://i.postimg.cc/fLptvwMg/nexus.webp"
          alt="Nexus Platform 3D Visualization"
          className="h-full w-full object-contain drop-shadow-[0_0_35px_#3358ea85] transition-all duration-1000 hover:scale-110"
        />
        <motion.div variants={tooltipVariants} initial="hidden" animate="visible" className="absolute top-4 -left-4 rounded-lg border border-purple-500/30 bg-black/80 p-2 backdrop-blur-md lg:top-1/4 lg:-left-20">
          <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-purple-400" /><span className="text-xs font-medium text-purple-200">High Performance</span></div>
        </motion.div>
        <motion.div variants={tooltipVariants} initial="hidden" animate="visible" className="absolute top-1/2 -right-4 rounded-lg border border-blue-500/30 bg-black/80 p-2 backdrop-blur-md lg:-right-24">
          <div className="flex items-center gap-2"><Database className="h-4 w-4 text-blue-400" /><span className="text-xs font-medium text-blue-200">Decentralized Storage</span></div>
        </motion.div>
        <motion.div variants={tooltipVariants} initial="hidden" animate="visible" className="absolute bottom-4 left-4 rounded-lg border border-indigo-500/30 bg-black/80 p-2 backdrop-blur-md lg:bottom-1/4 lg:left-8">
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-indigo-400" /><span className="text-xs font-medium text-indigo-200">AI-Powered</span></div>
        </motion.div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 mb-10 flex w-full max-w-[1450px] flex-grow flex-col items-center justify-center px-4 text-center sm:px-8 lg:mb-0 lg:items-start lg:justify-end lg:text-left">
        <motion.div className="flex w-full flex-col items-center justify-between lg:flex-row lg:items-start">
          <div className="w-full lg:w-auto">
            <motion.div variants={itemVariants} className="mb-4 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
              <span className="mr-2 rounded-full bg-purple-500 px-2 py-0.5 text-xs font-semibold text-white">New</span>
              Introducing Nexus Platform
            </motion.div>
            <motion.h1 variants={itemVariants} className="mb-6 bg-gradient-to-r from-white/70 via-white to-slate-500/80 bg-clip-text text-3xl leading-tight text-transparent sm:text-4xl md:text-5xl lg:text-6xl">
              The Bridge Between <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">AI and Web3</span>
            </motion.h1>
            <motion.div variants={itemVariants} className="mb-6 flex flex-wrap justify-center gap-4 md:gap-6 lg:justify-start">
              <div className="rounded-lg border border-purple-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{stats.users.toLocaleString()}+</p>
                <p className="text-xs text-gray-400">Active Users</p>
              </div>
              <div className="rounded-lg border border-blue-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{stats.transactions.toLocaleString()}+</p>
                <p className="text-xs text-gray-400">Transactions</p>
              </div>
              <div className="rounded-lg border border-indigo-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-2xl font-bold text-white">{stats.networks}+</p>
                <p className="text-xs text-gray-400">Networks</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="mb-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="text-xs font-medium text-gray-400">Integrates with:</span>
              {[{ name: 'Ethereum', color: 'bg-blue-400' }, { name: 'Solana', color: 'bg-purple-400' }, { name: 'OpenAI', color: 'bg-green-400' }, { name: '+5 more', color: 'bg-yellow-400' }].map((item) => (
                <div key={item.name} className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-2 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-purple-950">
                  <div className={`h-2 w-2 rounded-full ${item.color}`} />{item.name}
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mt-6 flex flex-col items-center lg:mt-0 lg:items-end">
            <motion.p variants={itemVariants} className="mb-8 max-w-md px-6 text-center text-lg leading-relaxed text-slate-300/90 lg:text-end">
              Nexus connects AI tools with Web3 infrastructure, giving developers the power to build beyond limits. One platform. Endless potential.
            </motion.p>
            <motion.div variants={itemVariants} className="mb-8 flex flex-col flex-wrap gap-4 sm:flex-row lg:justify-end">
              <Button className="group rounded-full border-t border-purple-400 bg-gradient-to-b from-purple-700 to-slate-950/80 px-6 py-6 text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-purple-600/40" size="lg">
                Start Building<ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" className="rounded-full border-purple-500/30 bg-transparent text-white hover:bg-purple-500/10 hover:text-white" size="lg">View Demo</Button>
            </motion.div>
            <motion.div variants={itemVariants} className="mx-auto flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 backdrop-blur-sm lg:mx-0 lg:ml-auto">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 w-6 overflow-hidden rounded-full border-2 border-slate-900 bg-slate-800">
                    <div className="h-full w-full bg-gradient-to-br from-purple-500 to-blue-600 opacity-80" />
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-300"><span className="font-semibold text-white">500+</span> developers already building</span>
              <ArrowUpRight className="h-3 w-3 text-purple-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.main>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURES GRID
   ═══════════════════════════════════════════ */
const featureCards = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-millisecond cross-chain transactions powered by our optimistic execution engine.', color: 'purple' },
  { icon: Shield, title: 'Battle-Tested Security', desc: 'Multi-sig wallets, formal verification, and $50M bug bounty program protecting your assets.', color: 'blue' },
  { icon: Globe, title: 'Multi-Chain Native', desc: 'Seamlessly bridge assets and execute logic across 40+ blockchain networks.', color: 'indigo' },
  { icon: Sparkles, title: 'AI Model Marketplace', desc: 'Deploy, monetize, and compose AI models directly on-chain with automatic royalty distribution.', color: 'purple' },
  { icon: Layers, title: 'Composable Modules', desc: 'Plug-and-play infrastructure modules that snap together like building blocks.', color: 'blue' },
  { icon: Code, title: 'Developer-First SDK', desc: 'TypeScript SDK, CLI tools, and comprehensive APIs to ship your dApp in days, not months.', color: 'indigo' },
];

const colorMap: Record<string, string> = {
  purple: 'border-purple-500/20 hover:border-purple-500/40',
  blue: 'border-blue-500/20 hover:border-blue-500/40',
  indigo: 'border-indigo-500/20 hover:border-indigo-500/40',
};

const iconColorMap: Record<string, string> = {
  purple: 'text-purple-400',
  blue: 'text-blue-400',
  indigo: 'text-indigo-400',
};

function Features() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <FadeIn>
          <span className="text-purple-400 text-xs font-medium uppercase tracking-widest mb-3 block">Platform Features</span>
          <h2 className="text-3xl md:text-5xl bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent mb-4">
            Everything you need to <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">build the future</span>.
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mb-16">Infrastructure-grade components for the next wave of decentralized AI applications.</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className={`group p-8 rounded-2xl border bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] ${colorMap[f.color]}`}>
                <f.icon className={`h-8 w-8 mb-4 ${iconColorMap[f.color]}`} />
                <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="absolute top-20 -left-20 h-60 w-60 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 bottom-20 h-60 w-60 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════
   INTEGRATIONS
   ═══════════════════════════════════════════ */
const integrations = [
  { name: 'Ethereum', color: '#627EEA' },
  { name: 'Solana', color: '#9945FF' },
  { name: 'Polygon', color: '#8247E5' },
  { name: 'Arbitrum', color: '#28A0F0' },
  { name: 'OpenAI', color: '#10A37F' },
  { name: 'Anthropic', color: '#D4A574' },
  { name: 'Hugging Face', color: '#FFD21E' },
  { name: 'Pinecone', color: '#000000' },
];

function Integrations() {
  return (
    <section className="relative py-20 bg-black border-y border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 mb-10">Trusted Integrations</p>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-4">
          {integrations.map((item, i) => (
            <FadeIn key={item.name} delay={i * 0.05}>
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-purple-500/30 transition-all cursor-pointer">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-sm text-slate-300 font-medium">{item.name}</span>
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
    name: 'Explorer',
    price: 'Free',
    desc: 'Perfect for learning and prototyping.',
    features: ['100 API calls/day', '2 chains', 'Community support', 'Test networks'],
    highlighted: false,
  },
  {
    name: 'Builder',
    price: '$99/mo',
    desc: 'For teams shipping production dApps.',
    features: ['50K API calls/day', 'All chains', 'Priority support', 'Mainnet access', 'AI model hosting', 'Analytics dashboard'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'White-glove service for large deployments.',
    features: ['Unlimited calls', 'Dedicated nodes', '24/7 support', 'Custom SLAs', 'On-premise option', 'Co-development'],
    highlighted: false,
  },
];

function Pricing() {
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <span className="text-purple-400 text-xs font-medium uppercase tracking-widest mb-3 block">Pricing</span>
          <h2 className="text-3xl md:text-5xl bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent mb-16">
            Simple, transparent pricing.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 0.1}>
              <div className={`p-8 rounded-2xl border backdrop-blur-sm flex flex-col ${
                tier.highlighted
                  ? 'border-purple-500/40 bg-purple-500/5'
                  : 'border-slate-800 bg-white/[0.02]'
              }`}>
                <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
                <p className="text-3xl font-bold text-white mb-2">{tier.price}</p>
                <p className="text-slate-400 text-sm mb-6">{tier.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-slate-400 text-sm flex items-center gap-2">
                      <span className="text-purple-400 text-xs">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500'
                      : 'bg-white/5 text-white border border-slate-700 hover:bg-white/10'
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function NexusFooter() {
  return (
    <footer className="bg-black border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-white text-lg font-semibold">Nexus</span>
          <span className="text-slate-500 text-xs">The Bridge Between AI and Web3</span>
        </div>
        <div className="flex gap-6 text-xs text-slate-500">
          <span className="hover:text-purple-400 cursor-pointer transition-colors">Twitter</span>
          <span className="hover:text-purple-400 cursor-pointer transition-colors">Discord</span>
          <span className="hover:text-purple-400 cursor-pointer transition-colors">GitHub</span>
          <span className="hover:text-purple-400 cursor-pointer transition-colors">Docs</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FULL LANDING PAGE
   ═══════════════════════════════════════════ */
export default function AppLanding() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Integrations />
      <Pricing />
      <NexusFooter />
    </div>
  );
}
