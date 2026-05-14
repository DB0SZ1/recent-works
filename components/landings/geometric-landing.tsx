'use client';

import { easeInOut, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import { Pacifico } from 'next/font/google';
import { cn } from '@/lib/utils';

const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'], variable: '--font-pacifico' });

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function ElegantShape({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = 'from-white/[0.08]' }: { className?: string; delay?: number; width?: number; height?: number; rotate?: number; gradient?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: -150, rotate: rotate - 15 }} animate={{ opacity: 1, y: 0, rotate }} transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }} className={cn('absolute', className)}>
      <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} style={{ width, height }} className="relative">
        <div className={cn('absolute inset-0 rounded-full bg-gradient-to-r to-transparent', gradient, 'border-2 border-white/80 backdrop-blur-[2px]', 'shadow-[0_8px_32px_0_rgba(255,255,255,0.4)]', 'after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.6),transparent_70%)]')} />
      </motion.div>
    </motion.div>
  );
}

/* ═══ HERO ═══ */
function Hero() {
  const fadeUpVariants = { hidden: { opacity: 0, y: 30 }, visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 + i * 0.2, ease: easeInOut } }) };
  return (
    <div className="bg-background relative flex min-h-screen w-full items-center justify-center overflow-hidden dark:bg-black">
      <div className="from-primary/20 to-primary/20 absolute inset-0 bg-gradient-to-br via-transparent blur-3xl" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-indigo-500/70" className="top-[15%] left-[-10%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-rose-400" className="top-[70%] right-[-5%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-violet-400" className="bottom-[5%] left-[5%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-amber-500/70" className="top-[10%] right-[15%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-cyan-500/70" className="top-[5%] left-[20%]" />
      </div>
      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="mx-4 mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:mb-8 md:text-8xl">
              <span className="from-foreground to-foreground/80 bg-gradient-to-b bg-clip-text text-transparent">Build Faster</span><br />
              <span className={cn('from-primary via-primary/90 to-primary bg-gradient-to-r bg-clip-text p-4 text-transparent font-bold', pacifico.className)}>Ship Sooner</span>
            </h1>
          </motion.div>
          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-muted-foreground mx-auto mb-10 max-w-xl px-4 text-base leading-relaxed sm:text-lg md:text-xl">
              Streamline your CRM operations with a modern, flexible, and fully customizable system for managing leads, clients, and workflows efficiently.
            </p>
          </motion.div>
          <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="from-primary to-primary rounded-full border-none bg-gradient-to-r shadow-md">Get Started<ArrowRight className="ml-2 h-4 w-4" /></Button>
          </motion.div>
        </div>
      </div>
      <div className="from-background to-background/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent" />
    </div>
  );
}

/* ═══ FEATURES ═══ */
const features = [
  { title: 'Pipeline Builder', desc: 'Visual drag-and-drop workflow builder with conditional logic, automations, and real-time collaboration.', icon: '⚡' },
  { title: 'Smart Lead Scoring', desc: 'AI-driven lead qualification that learns from your sales patterns and prioritizes high-value prospects.', icon: '🎯' },
  { title: 'Unified Inbox', desc: 'Email, chat, calls, and social messages in one thread. Never lose context again.', icon: '📬' },
  { title: 'Analytics Dashboard', desc: 'Real-time revenue forecasting, funnel analysis, and team performance metrics.', icon: '📊' },
  { title: 'Custom Fields', desc: 'Model any data structure with custom fields, relations, and computed properties.', icon: '🔧' },
  { title: 'API-First', desc: 'Full REST & GraphQL APIs. Webhooks, SDKs, and 200+ native integrations.', icon: '🔌' },
];

function Features() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest uppercase text-primary/70 mb-3">Features</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">Everything your team needs.</h2>
          <p className="text-muted-foreground text-lg max-w-xl mb-16">Powerful tools that adapt to your workflow, not the other way around.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 0.08}>
              <div className="group p-8 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/20 hover:shadow-lg transition-all duration-500">
                <span className="text-3xl block mb-4">{f.icon}</span>
                <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ PRICING ═══ */
const tiers = [
  { name: 'Starter', price: '$0', period: '/mo', desc: 'For small teams getting started.', features: ['Up to 5 users', '1,000 contacts', 'Email integration', 'Basic reports'], highlighted: false },
  { name: 'Growth', price: '$49', period: '/user/mo', desc: 'For scaling sales teams.', features: ['Unlimited users', '100K contacts', 'AI lead scoring', 'Advanced analytics', 'API access', 'Priority support'], highlighted: true },
  { name: 'Enterprise', price: 'Custom', period: '', desc: 'For large organizations.', features: ['Everything in Growth', 'SSO & SCIM', 'Custom SLA', 'Dedicated CSM', 'On-premise option', 'Audit logs'], highlighted: false },
];

function Pricing() {
  return (
    <section className="bg-background py-24 md:py-32 border-t border-border/30">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest uppercase text-primary/70 mb-3">Pricing</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-16">Simple, predictable pricing.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className={`p-8 rounded-2xl border flex flex-col ${t.highlighted ? 'border-primary/40 bg-primary/5 shadow-lg' : 'border-border/50 bg-card/30'}`}>
                <h3 className="text-lg font-semibold text-foreground mb-1">{t.name}</h3>
                <div className="mb-2"><span className="text-4xl font-bold text-foreground">{t.price}</span><span className="text-muted-foreground text-sm">{t.period}</span></div>
                <p className="text-muted-foreground text-sm mb-6">{t.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {t.features.map(f => <li key={f} className="text-muted-foreground text-sm flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{f}</li>)}
                </ul>
                <Button className={`w-full rounded-full ${t.highlighted ? 'from-primary to-primary bg-gradient-to-r' : 'bg-secondary text-secondary-foreground'}`} size="lg">Get Started</Button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA ═══ */
function CTASection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Ready to <span className={cn(pacifico.className, 'text-primary')}>transform</span> your workflow?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">Join 10,000+ teams who&apos;ve already made the switch.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="from-primary to-primary rounded-full bg-gradient-to-r shadow-md">Start Free Trial<ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button variant="outline" size="lg" className="rounded-full">Talk to Sales</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function GeoFooter() {
  return (
    <footer className="bg-background border-t border-border/30 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-foreground font-semibold text-lg">FlowCRM</span>
        <div className="flex gap-6 text-xs text-muted-foreground">
          {['Twitter', 'LinkedIn', 'GitHub', 'Blog'].map(l => <span key={l} className="hover:text-foreground cursor-pointer transition-colors">{l}</span>)}
        </div>
      </div>
    </footer>
  );
}

/* ═══ FULL LANDING ═══ */
export default function GeometricLanding() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Pricing />
      <CTASection />
      <GeoFooter />
    </div>
  );
}
