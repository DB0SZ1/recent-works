"use client"

import { ArrowRight } from "lucide-react"
import { useState, Suspense, lazy } from "react"

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      className="relative w-screen h-screen overflow-hidden bg-background flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fullscreen dithering shader background */}
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

      {/* Hero content */}
      <div className="relative z-10 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
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

      {/* Bottom fade for scroll hint */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
