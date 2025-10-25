"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/buttons/Button"
import { Input } from "@/components/ui/Input"

interface PriceUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  materialPrices: any
  onUpdatePrice : ()=> void
}

const PriceUpdateModal = ({ isOpen, onClose, materialPrices, onUpdatePrice }: PriceUpdateModalProps) => {
  const [prices, setPrices] = useState(materialPrices)

  const handlePriceChange = (metal: keyof typeof prices, value: string) => {
    setPrices((prev: any) => ({
      ...prev,
      [metal]: value,
    }))
  }

  const handleSubmit = () => {
    // Handle price update logic here
    console.log("Updated prices:", prices)
    onUpdatePrice()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white " >
        <DialogHeader>
          <DialogTitle>Update Metal Prices</DialogTitle>
          <DialogDescription>Update the current market prices for precious metals</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="gold-price">Gold Price (per 10g)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="gold-price"
                type="number"
                value={prices.gold}
                onChange={(e) => handlePriceChange("gold", e.target.value)}
                placeholder="Enter gold price"
                className="w-full !p-3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diamond-price">Diamond Price (per carat)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="diamond-price"
                type="number"
                value={prices.diamond}
                onChange={(e) => handlePriceChange("diamond", e.target.value)}
                placeholder="Enter diamond price"
                className="w-full !p-3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="silver-price">Silver Price (per kg)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="silver-price"
                type="number"
                value={prices.silver}
                onChange={(e) => handlePriceChange("silver", e.target.value)}
                placeholder="Enter silver price"
                className="w-full !p-3"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="brand-solid" onClick={handleSubmit}>
            Update Prices
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PriceUpdateModal
