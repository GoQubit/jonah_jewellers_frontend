"use client"

import { Button } from "@/components/ui/buttons/Button"
import GenericDropdown from "@/components/ui/GenericDropdown"
import { ringSizes } from "@/data/ringSizes"
import { removeFromCart, updateQuantity, updateRingSize } from "@/redux/Features/cartSlice/cartSlice"
import { useEffect, useState } from "react"
import { BiTrash } from "react-icons/bi"
import { useDispatch } from "react-redux"

export function CartItem({ item }: any) {
  const [quantity, setQuantity] = useState(item.quantity.toString())
  const [ringSize, setRingSize] = useState(item.ringSize)
  const dispatch = useDispatch()

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

  // 🟢 When user changes ring size in dropdown
  const handleRingSizeChange = (newSize: string) => {
    setRingSize(newSize)
    dispatch(
      updateRingSize({
        id: item.id,
        oldRingSize: item.ringSize,
        newRingSize: Number(newSize),
      })
    )
  }

  const increaseQty = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1, ringSize: item.ringSize }))
  }

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1, ringSize: item.ringSize }))
    } else {
      dispatch(removeFromCart({ id: item.id, ringSize: item.ringSize }))
    }
  }

  const removeItem = () => {
    dispatch(removeFromCart({ id: item.id, ringSize: item.ringSize }))
  }

  return (
    <div className="p-3 md:p-6 flex gap-4">
      <div className="flex-shrink">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-[100px] md:w-[200px] max-h-[200px] object-cover rounded-lg bg-gray-100"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm md:text-lg font-medium text-gray-900 mb-1">{item.name}</h3>

            <div className="flex items-center gap-2 mb-4 font-nunito">
              <span className="text-base md:text-xl font-semibold text-gray-900">
                {formatPrice(item.price)}
              </span>
            </div>

            <div className="flex flex-col items-start gap-4">
              {/* 🟡 Only show if item has ringSize */}
              {item.ringSize !== undefined && (
                <div className="flex items-center gap-2">
                  <label className="text-sm font-light font-nunito text-gray-700">
                    Ring Size:
                  </label>
                  <select
                    value={ringSize || ""}
                    onChange={(e) => handleRingSizeChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 outline-none focus:border-brand "
                  >
                    <option value="">Select Size</option>
                    {ringSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={decreaseQty}
                  className="px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={increaseQty}
                  className="px-2 py-1 border rounded-md text-gray-700 hover:bg-gray-100"
                >
                  +
                </button>

                {/* Remove */}
                <Button
                  onClick={removeItem}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <BiTrash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
