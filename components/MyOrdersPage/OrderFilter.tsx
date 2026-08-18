"use client"

import { cn } from "@/utils/cn"
import { useState } from "react"

const filters = [
  { id: "all", label: "All Orders" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
]

export function OrderFilters() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div className="flex gap-1 bg-muted p-1 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
            activeFilter === filter.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
