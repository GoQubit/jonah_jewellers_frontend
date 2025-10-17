"use client"
import { cn } from "@/utils/cn"
import { Button } from "./buttons/Button"
import { BsArrowRight } from "react-icons/bs"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  // ✅ Generate page numbers with ellipsis
  const getPages = () => {
    const pages: (number | string)[] = []
    const maxVisible = 3 // how many around current page

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (currentPage > maxVisible) {
      pages.push("...")
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)

    return pages
  }

  const pages = getPages()

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className=" flex items-center gap-1 "
      >
        <FiChevronLeft className="h-4 w-4" />
        Prev
      </Button>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={cn(
              "px-3 py-1 rounded-md text-sm",
              page === currentPage
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className="px-2 text-muted-foreground">
            {page}
          </span>
        )
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className=" flex items-center gap-1 "
      >
        Next
        <FiChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
