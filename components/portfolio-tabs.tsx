'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export interface PageEntry {
  key: string;
  label: string;
  accent: string;
  dark?: boolean;
}

interface PortfolioTabsProps {
  pages: PageEntry[];
  activeKey: string;
  onSelect: (key: string) => void;
}

export function PortfolioTabs({ pages, activeKey, onSelect }: PortfolioTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const activePage = pages.find((p) => p.key === activeKey);
  const isDark = activePage?.dark ?? true;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-tab-key="${activeKey}"]`) as HTMLElement;
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
      });
    }
  }, [activeKey]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-500"
      style={{
        background: isDark
          ? 'rgba(0,0,0,0.6)'
          : 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Animated indicator */}
          <motion.div
            className="absolute bottom-0 h-[2px] rounded-full"
            animate={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              background: activePage?.accent || '#fff',
            }}
          />

          {pages.map((page) => {
            const isActive = page.key === activeKey;
            return (
              <button
                key={page.key}
                data-tab-key={page.key}
                onClick={() => onSelect(page.key)}
                className="relative px-4 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap rounded-md transition-all duration-300"
                style={{
                  color: isActive
                    ? page.accent
                    : isDark
                      ? 'rgba(255,255,255,0.5)'
                      : 'rgba(0,0,0,0.4)',
                  background: isActive
                    ? isDark
                      ? 'rgba(255,255,255,0.06)'
                      : 'rgba(0,0,0,0.04)'
                    : 'transparent',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? page.accent : 'transparent',
                      border: isActive ? 'none' : isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
                      boxShadow: isActive ? `0 0 8px ${page.accent}60` : 'none',
                    }}
                  />
                  {page.label}
                </span>
              </button>
            );
          })}

          {/* Right-side label */}
          <div
            className="ml-auto pl-4 text-[10px] font-mono tracking-widest uppercase whitespace-nowrap hidden md:block"
            style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }}
          >
            Portfolio ◈ 2026
          </div>
        </div>
      </div>
    </div>
  );
}
