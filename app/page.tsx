"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortfolioTabs } from "@/components/portfolio-tabs";
import { pages } from "@/lib/registry";

export default function Page() {
  const [activeKey, setActiveKey] = useState("studio");
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top when switching pages
  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeKey]);

  const ActivePage = pages.find((p) => p.key === activeKey)?.component;

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <PortfolioTabs
        pages={pages}
        activeKey={activeKey}
        onSelect={setActiveKey}
      />

      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {ActivePage && <ActivePage />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}