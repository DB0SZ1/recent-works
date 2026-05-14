"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Types ---
export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface ProductCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    product: { name: string; price: string; tag: string };
}

// --- ProductCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

const PRODUCTS = [
    { name: "Silk Blazer", price: "$890", tag: "New" },
    { name: "Cashmere Coat", price: "$1,240", tag: "Bestseller" },
    { name: "Leather Tote", price: "$675", tag: "Limited" },
    { name: "Suede Boots", price: "$520", tag: "Sale" },
    { name: "Wool Scarf", price: "$185", tag: "Trending" },
    { name: "Linen Dress", price: "$430", tag: "New" },
    { name: "Canvas Sneakers", price: "$295", tag: "Popular" },
    { name: "Gold Watch", price: "$2,100", tag: "Luxury" },
    { name: "Pearl Earrings", price: "$340", tag: "Exclusive" },
    { name: "Denim Jacket", price: "$380", tag: "Classic" },
    { name: "Merino Sweater", price: "$265", tag: "Cozy" },
    { name: "Silk Tie", price: "$120", tag: "Gift" },
    { name: "Leather Belt", price: "$195", tag: "Essential" },
    { name: "Velvet Clutch", price: "$450", tag: "Evening" },
    { name: "Tweed Vest", price: "$310", tag: "Heritage" },
    { name: "Satin Blouse", price: "$275", tag: "Elegant" },
    { name: "Oxford Shoes", price: "$490", tag: "Timeless" },
    { name: "Knit Beanie", price: "$85", tag: "Casual" },
    { name: "Trench Coat", price: "$980", tag: "Icon" },
    { name: "Silk Pajamas", price: "$350", tag: "Comfort" },
];

function ProductCard({
    src,
    index,
    total,
    phase,
    target,
    product,
}: ProductCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face — Product Image */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg"
                    style={{
                        backfaceVisibility: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 1px 4px rgba(0,0,0,0.1)",
                    }}
                >
                    <img
                        src={src}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                    {/* Subtle warm overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-colors group-hover:from-black/10" />
                    {/* Tag badge */}
                    <div
                        className="absolute top-1 left-1 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider rounded"
                        style={{
                            background: "linear-gradient(135deg, #c9a96e, #d4b87a)",
                            color: "#1a1612",
                            letterSpacing: "0.08em",
                        }}
                    >
                        {product.tag}
                    </div>
                </div>

                {/* Back Face — Product Info */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-lg flex flex-col items-center justify-center p-2"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "linear-gradient(145deg, #1a1612, #2a2420)",
                        border: "1px solid rgba(201, 169, 110, 0.3)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(201,169,110,0.1)",
                    }}
                >
                    <div className="text-center">
                        <p
                            className="text-[7px] font-bold uppercase tracking-[0.15em] mb-1"
                            style={{ color: "#c9a96e" }}
                        >
                            {product.name}
                        </p>
                        <p
                            className="text-sm font-light"
                            style={{
                                color: "#f5f0e8",
                                fontFamily: "'Georgia', serif",
                            }}
                        >
                            {product.price}
                        </p>
                        <div
                            className="mt-1.5 w-6 h-[1px] mx-auto"
                            style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
                        />
                        <p className="text-[6px] mt-1 uppercase tracking-widest" style={{ color: "#8a7e6d" }}>
                            Add to bag
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;

// E-commerce product images (fashion, accessories, luxury goods)
const IMAGES = [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&q=80", // blazer
    "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=300&q=80", // coat
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80", // leather bag
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", // shoes
    "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=300&q=80", // scarf
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80", // dress
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&q=80", // sneakers
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&q=80", // watch
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80", // earrings
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&q=80", // denim jacket
    "https://images.unsplash.com/photo-1434389677669-e08b4cda3a46?w=300&q=80", // sweater
    "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=300&q=80", // tie
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", // belt
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80", // clutch
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", // vest
    "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&q=80", // blouse
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=300&q=80", // oxford shoes
    "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=300&q=80", // beanie
    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&q=80", // trench coat
    "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300&q=80", // pajamas
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function EcommerceHero() {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;
            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // --- Mouse Parallax ---
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // --- Intro Sequence ---
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    // --- Responsive card count ---
    const isMobile = containerSize.width > 0 && containerSize.width < 768;
    const visibleCount = isMobile ? 12 : TOTAL_IMAGES;

    // --- Random Scatter Positions ---
    const scatterPositions = useMemo(() => {
        const spreadX = isMobile ? 600 : 1500;
        const spreadY = isMobile ? 500 : 1000;
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * spreadX,
            y: (Math.random() - 0.5) * spreadY,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, [isMobile]);

    // --- Render Loop ---
    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full overflow-hidden"
            style={{
                background: "linear-gradient(165deg, #f5f0e8 0%, #ebe4d8 40%, #e8e0d0 70%, #f0ead8 100%)",
            }}
        >
            {/* Subtle grain texture overlay */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-[1]">
                <filter id="ecom-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#ecom-grain)" />
            </svg>

            {/* Warm ambient glow spots */}
            <div
                className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
                }}
            />
            <div
                className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(180,150,100,0.06) 0%, transparent 70%)",
                }}
            />

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: "1000px" }}>

                {/* Intro Text */}
                <div className="absolute z-[2] flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={introPhase === "circle" && morphValue < 0.5
                            ? { opacity: 1 - morphValue * 2, y: 0 }
                            : { opacity: 0 }
                        }
                        transition={{ duration: 0.8 }}
                        className="mb-3"
                    >
                        <span
                            className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] rounded-full"
                            style={{
                                background: "linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05))",
                                color: "#8a7a5a",
                                border: "1px solid rgba(201,169,110,0.2)",
                            }}
                        >
                            New Collection 2026
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5
                            ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, filter: "blur(10px)" }
                        }
                        transition={{ duration: 1 }}
                        className="text-2xl md:text-4xl tracking-tight"
                        style={{
                            color: "#1a1612",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            fontWeight: 300,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Curated for the <span style={{ fontStyle: "italic", color: "#8a6f3e" }}>discerning</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5
                            ? { opacity: 0.5 - morphValue }
                            : { opacity: 0 }
                        }
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-[10px] font-bold tracking-[0.3em] uppercase"
                        style={{ color: "#a09080" }}
                    >
                        Scroll to browse collection
                    </motion.p>
                </div>

                {/* Arc Active Content */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[8%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <div
                        className="mb-3 inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] rounded-full"
                        style={{
                            background: "linear-gradient(135deg, rgba(201,169,110,0.12), rgba(201,169,110,0.04))",
                            color: "#8a7a5a",
                            border: "1px solid rgba(201,169,110,0.15)",
                        }}
                    >
                        ✦ Exclusive Pieces
                    </div>
                    <h2
                        className="text-3xl md:text-5xl tracking-tight mb-3"
                        style={{
                            color: "#1a1612",
                            fontFamily: "'Georgia', 'Times New Roman', serif",
                            fontWeight: 300,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        The Atelier Collection
                    </h2>
                    <p
                        className="text-sm md:text-base max-w-lg leading-relaxed"
                        style={{ color: "#6b5e4f" }}
                    >
                        Handcrafted luxury essentials, designed to transcend seasons. <br className="hidden md:block" />
                        Hover any piece to reveal details.
                    </p>
                    <div className="flex items-center gap-6 mt-4">
                        <button
                            className="px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #1a1612, #2a2420)",
                                color: "#f5f0e8",
                                boxShadow: "0 4px 20px rgba(26,22,18,0.3)",
                            }}
                        >
                            Shop Now
                        </button>
                        <button
                            className="px-6 py-2.5 text-xs font-bold uppercase tracking-[0.15em] rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: "transparent",
                                color: "#1a1612",
                                border: "1px solid rgba(26,22,18,0.2)",
                            }}
                        >
                            View Lookbook
                        </button>
                    </div>
                </motion.div>

                {/* Product Cards */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, visibleCount).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            // Responsive line spacing: fit cards within container
                            const lineSpacing = isMobile ? 30 : 70;
                            const lineTotalWidth = visibleCount * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: isMobile ? 0.8 : 1, opacity: 1 };
                        } else {
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // Circle Position — smaller radius on mobile
                            const circleRadius = isMobile
                                ? Math.min(minDimension * 0.28, 130)
                                : Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / visibleCount) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            // Bottom Arc Position
                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.6 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.3 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;
                            const spreadAngle = isMobile ? 80 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (visibleCount - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.2 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(isMobile ? 0.8 : 1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <ProductCard
                                key={i}
                                src={src}
                                index={i}
                                total={visibleCount}
                                phase={introPhase}
                                target={target}
                                product={PRODUCTS[i]}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Bottom branding strip */}
            <motion.div
                style={{ opacity: contentOpacity }}
                className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-center gap-8 pointer-events-none"
            >
                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#a09080" }}>Free Shipping</span>
                <span style={{ color: "#c9a96e", fontSize: "8px" }}>◆</span>
                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#a09080" }}>Lifetime Warranty</span>
                <span style={{ color: "#c9a96e", fontSize: "8px" }}>◆</span>
                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#a09080" }}>Ethical Sourcing</span>
            </motion.div>
        </div>
    );
}
