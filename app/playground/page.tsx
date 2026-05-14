"use client"

import { useState } from "react"
import { pages } from "@/lib/registry"

export default function Playground() {
  const [active, setActive] = useState(pages[0].key)

  const ActiveComponent = pages.find((p) => p.key === active)?.component

  return (
    <div className="h-screen w-full overflow-y-auto">
      {/* Switcher */}
      <div className="fixed top-4 left-4 z-50 flex gap-2 flex-wrap">
        {pages.map((page) => (
          <button
            key={page.key}
            onClick={() => setActive(page.key)}
            className={`px-3 py-1 rounded border text-xs ${
              active === page.key ? "bg-white text-black" : "text-white border-white/30"
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      {/* Render active page */}
      {ActiveComponent && <ActiveComponent />}
    </div>
  )
}