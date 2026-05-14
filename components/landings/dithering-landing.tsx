'use client';

import { ArrowRight } from 'lucide-react';
import { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

const Dithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({ default: mod.Dithering }))
);

/* ─── Section wrapper ─── */
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      {children}
    </section>
  );
}

/* ─── Fade-in on scroll ─── */
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
   HERO (original)
   ═══════════════════════════════════════════ */
function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Section className="h-screen bg-background flex items-center justify-center">
      <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
          <Dithering
            colorBack="#00000000"
            colorFront="#EC4E02"
            shape="warp"
            type="4x4"
            speed={isHovered ? 0.6 : 0.2}
            className="size-full"
            minPixelRatio={1}
          />
        </div>
      </Suspense>

      <div
        className="relative z-10 px-6 max-w-5xl mx-auto text-center flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Now Accepting Projects for Q3
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-foreground mb-8 leading-[1.05]">
          We design brands <br />
          <span className="text-foreground/80">that move people.</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          A multidisciplinary studio crafting identities, interfaces &amp; digital
          experiences for ambitious companies ready to stand apart.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95 hover:ring-4 hover:ring-primary/20">
            <span className="relative z-10">View Our Work</span>
            <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border px-10 text-base font-medium text-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95 backdrop-blur-sm">
            Book a Call
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </Section>
  );
}

/* ═══════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════ */
const services = [
  {
    title: 'Brand Identity',
    desc: 'Logos, brand systems, visual language and guidelines that define who you are across every touchpoint.',
    icon: '◎',
  },
  {
    title: 'UI/UX Design',
    desc: 'Interfaces that feel intuitive and look stunning — from SaaS dashboards to consumer mobile apps.',
    icon: '◈',
  },
  {
    title: 'Web Development',
    desc: 'High-performance sites and web applications built with modern frameworks and best practices.',
    icon: '⬡',
  },
  {
    title: 'Motion Design',
    desc: 'Micro-interactions, explainer videos, and animated experiences that bring brands to life.',
    icon: '◇',
  },
];

function Services() {
  return (
    <Section className="bg-background py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest uppercase text-primary/70 mb-3">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground tracking-tight mb-6">
            Crafted with purpose,<br />
            <span className="text-foreground/60">delivered with precision.</span>
          </h2>
          <div className="w-16 h-px bg-primary/30 mb-16" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <div className="group relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:bg-accent/50 transition-all duration-500">
                <span className="text-2xl text-primary/60 block mb-4 group-hover:text-primary transition-colors">{s.icon}</span>
                <h3 className="text-xl font-medium text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-4 w-4 text-primary/50" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   SELECTED WORK / PORTFOLIO
   ═══════════════════════════════════════════ */
const projects = [
  {
    title: 'Meridian Finance',
    category: 'Brand Identity + Web',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    color: '#EC4E02',
  },
  {
    title: 'Volta Energy',
    category: 'UI/UX + Development',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    color: '#2563eb',
  },
  {
    title: 'Bloom Cosmetics',
    category: 'Brand System + Motion',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    color: '#d946ef',
  },
];

function SelectedWork() {
  return (
    <Section className="bg-background py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest uppercase text-primary/70 mb-3">Selected Work</p>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground tracking-tight mb-16">
            Recent projects.
          </h2>
        </FadeIn>

        <div className="space-y-8">
          {projects.map((proj, i) => (
            <FadeIn key={proj.title} delay={i * 0.15}>
              <div className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card/30 cursor-pointer">
                <div className="aspect-[16/7] overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-white/60 mb-1">{proj.category}</p>
                    <h3 className="text-2xl md:text-3xl font-serif font-medium text-white">{proj.title}</h3>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4"
                    style={{ background: proj.color }}
                  >
                    <ArrowRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
const testimonials = [
  {
    quote: "They transformed our entire brand presence. The attention to detail is unmatched.",
    author: 'Sarah Chen',
    role: 'CEO, Meridian Finance',
  },
  {
    quote: "Working with this team felt like having an in-house design department from day one.",
    author: 'Marcus Rivera',
    role: 'Founder, Volta Energy',
  },
  {
    quote: "Our conversion rate increased 340% after the redesign. The ROI speaks for itself.",
    author: 'Elena Kowalski',
    role: 'CMO, Bloom Cosmetics',
  },
];

function Testimonials() {
  return (
    <Section className="bg-background py-24 md:py-32 border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm font-medium tracking-widest uppercase text-primary/70 mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground tracking-tight mb-16">
            What they say.
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.1}>
              <div className="p-8 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm">
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════ */
function CTABanner() {
  return (
    <Section className="bg-background py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-serif font-medium text-foreground tracking-tight mb-6">
            Ready to stand apart?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Let's talk about your next project. We're currently booking for Q3 2026.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-primary px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:scale-105 active:scale-95">
              Start a Project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border px-10 text-base font-medium text-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95">
              hello@studio.com
            </button>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-background border-t border-border/30 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="text-foreground font-serif text-lg font-medium">Studio</span>
          <span className="text-muted-foreground text-xs">© 2026</span>
        </div>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Twitter</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Dribbble</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">LinkedIn</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Instagram</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   FULL LANDING PAGE
   ═══════════════════════════════════════════ */
export default function DitheringLanding() {
  return (
    <div className="w-full">
      <Hero />
      <Services />
      <SelectedWork />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
}
