"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/buttons/Button"
import { GiFoxTail } from "react-icons/gi"
import { IoMdPricetag } from "react-icons/io"

export function PromoCode() {
  const [promoCode, setPromoCode] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleApply = () => {
    // Handle promo code application
    console.log("Applying promo code:", promoCode)
  }

  return (
    <div className=" pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-brand  transition-colors underline cursor-pointer "
      >
        <IoMdPricetag className="w-4 h-4" />
        <span>Enter a Gift Card or Promo Code</span>
      </button>

      {isExpanded && (
        <div className="mt-3 flex gap-2">
          <Input
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1"
          />
          <Button variant="brand-solid" onClick={handleApply} className=" ">
            Apply
          </Button>
        </div>
      )}
    </div>
  )
}
