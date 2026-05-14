'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';

/* ─── Helpers ─── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

/* ═══ HERO (original ecommerce) ═══ */
type AnimationPhase = 'scatter' | 'line' | 'circle';
const IMG_WIDTH = 60, IMG_HEIGHT = 85, TOTAL_IMAGES = 20, MAX_SCROLL = 3000;
const PRODUCTS = [
  { name: 'Silk Blazer', price: '$890', tag: 'New' },{ name: 'Cashmere Coat', price: '$1,240', tag: 'Bestseller' },
  { name: 'Leather Tote', price: '$675', tag: 'Limited' },{ name: 'Suede Boots', price: '$520', tag: 'Sale' },
  { name: 'Wool Scarf', price: '$185', tag: 'Trending' },{ name: 'Linen Dress', price: '$430', tag: 'New' },
  { name: 'Canvas Sneakers', price: '$295', tag: 'Popular' },{ name: 'Gold Watch', price: '$2,100', tag: 'Luxury' },
  { name: 'Pearl Earrings', price: '$340', tag: 'Exclusive' },{ name: 'Denim Jacket', price: '$380', tag: 'Classic' },
  { name: 'Merino Sweater', price: '$265', tag: 'Cozy' },{ name: 'Silk Tie', price: '$120', tag: 'Gift' },
  { name: 'Leather Belt', price: '$195', tag: 'Essential' },{ name: 'Velvet Clutch', price: '$450', tag: 'Evening' },
  { name: 'Tweed Vest', price: '$310', tag: 'Heritage' },{ name: 'Satin Blouse', price: '$275', tag: 'Elegant' },
  { name: 'Oxford Shoes', price: '$490', tag: 'Timeless' },{ name: 'Knit Beanie', price: '$85', tag: 'Casual' },
  { name: 'Trench Coat', price: '$980', tag: 'Icon' },{ name: 'Silk Pajamas', price: '$350', tag: 'Comfort' },
];
const IMAGES = [
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80',
  'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=300&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
  'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80',
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&q=80',
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80',
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80',
  'https://images.unsplash.com/photo-1434389677669-e08b4cda3a46?w=300&q=80',
  'https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=300&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80',
  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
  'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&q=80',
  'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&q=80',
  'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=300&q=80',
  'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&q=80',
  'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80',
];
const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;

function ProductCard({ src, index, total, phase, target, product }: { src: string; index: number; total: number; phase: AnimationPhase; target: { x: number; y: number; rotation: number; scale: number; opacity: number }; product: { name: string; price: string; tag: string } }) {
  return (
    <motion.div animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }} transition={{ type: 'spring', stiffness: 40, damping: 15 }} style={{ position: 'absolute', width: IMG_WIDTH, height: IMG_HEIGHT, transformStyle: 'preserve-3d', perspective: '1000px' }} className="cursor-pointer group">
      <motion.div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }} transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }} whileHover={{ rotateY: 180 }}>
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg" style={{ backfaceVisibility: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          <img src={src} alt={product.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute top-1 left-1 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider rounded" style={{ background: 'linear-gradient(135deg, #c9a96e, #d4b87a)', color: '#1a1612' }}>{product.tag}</div>
        </div>
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg flex flex-col items-center justify-center p-2" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(145deg, #1a1612, #2a2420)', border: '1px solid rgba(201,169,110,0.3)' }}>
          <p className="text-[7px] font-bold uppercase tracking-[0.15em] mb-1" style={{ color: '#c9a96e' }}>{product.name}</p>
          <p className="text-sm font-light" style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif' }}>{product.price}</p>
          <div className="mt-1.5 w-6 h-[1px] mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
          <p className="text-[6px] mt-1 uppercase tracking-widest" style={{ color: '#8a7e6d' }}>Add to bag</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const [introPhase, setIntroPhase] = useState<AnimationPhase>('scatter');
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => { for (const e of entries) setContainerSize({ width: e.contentRect.width, height: e.contentRect.height }); });
    observer.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);
  useEffect(() => {
    const c = containerRef.current; if (!c) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); scrollRef.current = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL); virtualScroll.set(scrollRef.current); };
    let ty = 0;
    const onTS = (e: TouchEvent) => { ty = e.touches[0].clientY; };
    const onTM = (e: TouchEvent) => { const d = ty - e.touches[0].clientY; ty = e.touches[0].clientY; scrollRef.current = Math.min(Math.max(scrollRef.current + d, 0), MAX_SCROLL); virtualScroll.set(scrollRef.current); };
    c.addEventListener('wheel', onWheel, { passive: false }); c.addEventListener('touchstart', onTS, { passive: false }); c.addEventListener('touchmove', onTM, { passive: false });
    return () => { c.removeEventListener('wheel', onWheel); c.removeEventListener('touchstart', onTS); c.removeEventListener('touchmove', onTM); };
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const c = containerRef.current; if (!c) return;
    const onMM = (e: MouseEvent) => { const r = c.getBoundingClientRect(); mouseX.set(((e.clientX - r.left) / r.width * 2 - 1) * 100); };
    c.addEventListener('mousemove', onMM); return () => c.removeEventListener('mousemove', onMM);
  }, [mouseX]);

  useEffect(() => { const t1 = setTimeout(() => setIntroPhase('line'), 500); const t2 = setTimeout(() => setIntroPhase('circle'), 2500); return () => { clearTimeout(t1); clearTimeout(t2); }; }, []);

  const isMobile = containerSize.width > 0 && containerSize.width < 768;
  const visibleCount = isMobile ? 12 : TOTAL_IMAGES;
  const scatterPositions = useMemo(() => IMAGES.map(() => ({ x: (Math.random() - 0.5) * (isMobile ? 600 : 1500), y: (Math.random() - 0.5) * (isMobile ? 500 : 1000), rotation: (Math.random() - 0.5) * 180, scale: 0.6, opacity: 0 })), [isMobile]);

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);
  useEffect(() => { const u1 = smoothMorph.on('change', setMorphValue); const u2 = smoothScrollRotate.on('change', setRotateValue); const u3 = smoothMouseX.on('change', setParallaxValue); return () => { u1(); u2(); u3(); }; }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden" style={{ background: 'linear-gradient(165deg, #f5f0e8 0%, #ebe4d8 40%, #e8e0d0 70%, #f0ead8 100%)' }}>
      <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: '1000px' }}>
        <div className="absolute z-[2] flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
          <motion.h1 initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} animate={introPhase === 'circle' && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }} transition={{ duration: 1 }} className="text-2xl md:text-4xl tracking-tight" style={{ color: '#1a1612', fontFamily: 'Georgia, serif', fontWeight: 300 }}>
            Curated for the <span style={{ fontStyle: 'italic', color: '#8a6f3e' }}>discerning</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={introPhase === 'circle' && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }} className="mt-4 text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: '#a09080' }}>Scroll to browse collection</motion.p>
        </div>
        <motion.div style={{ opacity: contentOpacity, y: contentY }} className="absolute top-[8%] z-10 flex flex-col items-center text-center pointer-events-none px-4">
          <h2 className="text-3xl md:text-5xl tracking-tight mb-3" style={{ color: '#1a1612', fontFamily: 'Georgia, serif', fontWeight: 300 }}>The Atelier Collection</h2>
          <p className="text-sm md:text-base max-w-lg leading-relaxed" style={{ color: '#6b5e4f' }}>Handcrafted luxury essentials, designed to transcend seasons.</p>
          <div className="flex items-center gap-6 mt-4">
            <button className="px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #1a1612, #2a2420)', color: '#f5f0e8' }}>Shop Now</button>
            <button className="px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all hover:scale-105" style={{ border: '1px solid rgba(26,22,18,0.2)', color: '#1a1612' }}>View Lookbook</button>
          </div>
        </motion.div>
        <div className="relative flex items-center justify-center w-full h-full">
          {IMAGES.slice(0, visibleCount).map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };
            if (introPhase === 'scatter') { target = scatterPositions[i]; }
            else if (introPhase === 'line') { const sp = isMobile ? 30 : 70; target = { x: i * sp - visibleCount * sp / 2, y: 0, rotation: 0, scale: isMobile ? 0.8 : 1, opacity: 1 }; }
            else {
              const minD = Math.min(containerSize.width, containerSize.height);
              const cR = isMobile ? Math.min(minD * 0.28, 130) : Math.min(minD * 0.35, 350);
              const cA = (i / visibleCount) * 360, cRad = (cA * Math.PI) / 180;
              const cP = { x: Math.cos(cRad) * cR, y: Math.sin(cRad) * cR, rotation: cA + 90 };
              const bR = Math.min(containerSize.width, containerSize.height * 1.5);
              const aR = bR * (isMobile ? 1.6 : 1.1), aY = containerSize.height * (isMobile ? 0.3 : 0.25), aCY = aY + aR;
              const sA = isMobile ? 80 : 130, stA = -90 - sA / 2, step = sA / (visibleCount - 1);
              const sP = Math.min(Math.max(rotateValue / 360, 0), 1), mR = sA * 0.8, bRot = -sP * mR;
              const curA = stA + i * step + bRot, aRad = (curA * Math.PI) / 180;
              const aP = { x: Math.cos(aRad) * aR + parallaxValue, y: Math.sin(aRad) * aR + aCY, rotation: curA + 90, scale: isMobile ? 1.2 : 1.8 };
              target = { x: lerp(cP.x, aP.x, morphValue), y: lerp(cP.y, aP.y, morphValue), rotation: lerp(cP.rotation, aP.rotation, morphValue), scale: lerp(isMobile ? 0.8 : 1, aP.scale, morphValue), opacity: 1 };
            }
            return <ProductCard key={i} src={src} index={i} total={visibleCount} phase={introPhase} target={target} product={PRODUCTS[i]} />;
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══ CATEGORIES ═══ */
const categories = [
  { name: 'Women', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80', count: '248 pieces' },
  { name: 'Men', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', count: '186 pieces' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80', count: '124 pieces' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', count: '92 pieces' },
];

function Categories() {
  return (
    <section className="py-24 md:py-32" style={{ background: '#f5f0e8' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3" style={{ color: '#a09080' }}>Collections</p>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-16" style={{ color: '#1a1612', fontFamily: 'Georgia, serif', fontWeight: 300 }}>Shop by Category</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-medium" style={{ color: '#1a1612', fontFamily: 'Georgia, serif' }}>{c.name}</h3>
                <p className="text-xs uppercase tracking-widest" style={{ color: '#a09080' }}>{c.count}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
const testimonials = [
  { quote: 'The quality is extraordinary. Each piece feels like it was made just for me.', author: 'Isabelle M.', role: 'Paris' },
  { quote: 'I have never experienced this level of craftsmanship from an online retailer.', author: 'Thomas K.', role: 'London' },
  { quote: 'Their curation is impeccable — every item I have purchased has become a staple.', author: 'Yuki S.', role: 'Tokyo' },
];

function Testimonials() {
  return (
    <section className="py-24 md:py-32 border-t" style={{ background: '#ebe4d8', borderColor: 'rgba(201,169,110,0.15)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-center" style={{ color: '#a09080' }}>Client Stories</p>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-16 text-center" style={{ color: '#1a1612', fontFamily: 'Georgia, serif', fontWeight: 300 }}>Words from our patrons</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.author} delay={i * 0.1}>
              <div className="text-center">
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: '#4a3f33', fontFamily: 'Georgia, serif' }}>"{t.quote}"</p>
                <div className="w-8 h-px mx-auto mb-4" style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#1a1612' }}>{t.author}</p>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: '#a09080' }}>{t.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ NEWSLETTER ═══ */
function Newsletter() {
  return (
    <section className="py-24 md:py-32" style={{ background: '#1a1612' }}>
      <div className="max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl tracking-tight mb-4" style={{ color: '#f5f0e8', fontFamily: 'Georgia, serif', fontWeight: 300 }}>Stay in the know</h2>
          <p className="text-sm mb-10" style={{ color: '#8a7e6d' }}>Early access to new collections, exclusive offers, and style inspiration.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-6 py-3 rounded-full text-sm bg-transparent border outline-none" style={{ borderColor: 'rgba(201,169,110,0.3)', color: '#f5f0e8' }} />
            <button className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: 'linear-gradient(135deg, #c9a96e, #d4b87a)', color: '#1a1612' }}>Subscribe</button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function EcomFooter() {
  return (
    <footer className="py-10 border-t" style={{ background: '#f5f0e8', borderColor: 'rgba(201,169,110,0.15)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-lg" style={{ color: '#1a1612', fontFamily: 'Georgia, serif' }}>Atelier</span>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest" style={{ color: '#a09080' }}>
          <span className="hover:text-[#1a1612] cursor-pointer transition-colors">Free Shipping</span>
          <span style={{ color: '#c9a96e' }}>◆</span>
          <span className="hover:text-[#1a1612] cursor-pointer transition-colors">Lifetime Warranty</span>
          <span style={{ color: '#c9a96e' }}>◆</span>
          <span className="hover:text-[#1a1612] cursor-pointer transition-colors">Ethical Sourcing</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══ FULL LANDING ═══ */
export default function EcommerceLanding() {
  return (
    <div className="w-full">
      <Hero />
      <Categories />
      <Testimonials />
      <Newsletter />
      <EcomFooter />
    </div>
  );
}
