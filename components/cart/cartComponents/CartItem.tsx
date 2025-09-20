"use client"

import { Button } from "@/components/ui/buttons/Button"
import GenericDropdown from "@/components/ui/GenericDropdown"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { BiTrash } from "react-icons/bi"


interface CartItemProps {
  item: {
    id: number
    name: string
    specifications: string
    price: number
    originalPrice: number
    image: string
    ringSize?: number
    quantity: number
    hasRingSize: boolean
  }
}


export function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity.toString())
  const [ringSize, setRingSize] = useState(item.ringSize?.toString() || "5")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("₹", "₹ ")
  }

  useEffect(() => {
    console.log("ringSize", ringSize);
    console.log("quantity", quantity);

  }, [ringSize, quantity])

  return (
    <div className="p-6 flex gap-4">
      <div className="flex-shrink-0">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-[200px] h-[200px] object-cover rounded-lg bg-gray-100"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-brand mb-3 font-nunito">{item.specifications}</p>

            <div className="flex items-center gap-2 mb-4 font-nunito">
              <span className="text-xl font-semibold text-gray-900">{formatPrice(item.price)}</span>
              <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
            </div>

            <div className="flex flex-col items-start gap-4">
              {item.hasRingSize && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-light font-nunito text-gray-700">Ring Size</label>
                  <GenericDropdown
                    options={Array.from({ length: 10 }, (_, i) => ({
                      label: `${i + 5}`,
                      value: i + 5,
                    }))}
                    value={ringSize}
                    onChange={setRingSize}
                    className="w-16"
                    placeholder="5"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <label className="text-sm font-light font-nunito text-gray-700">Quantity</label>
                <GenericDropdown
                  options={Array.from({ length: 10 }, (_, i) => ({
                    label: `${i + 1}`,
                    value: i + 1,
                  }))}
                  value={quantity}
                  onChange={setQuantity}
                  className="w-16"
                  placeholder="1"
                />
              </div>
            </div>
          </div>

          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 p-2">
            <BiTrash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
