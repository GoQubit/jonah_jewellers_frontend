"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/buttons/Button"

interface ProductInfoProps {
  product: {
    name: string
    price: number
    originalPrice: number
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [pincode, setPincode] = useState("")

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 ">{product.name}</h1>
          <p className="font-besley text-brand ">22k Gold | 0.825 Gram</p>
        </div>
        <div className="flex items-center gap-3 font-besley ">
          <span className="text-3xl font-medium text-gray-900">₹ {product.price.toLocaleString()}</span>
          <span className="text-lg text-gray-500 line-through">₹ {product.originalPrice.toLocaleString()}</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">{discount}% OFF</span>
        </div>
      </div>

      <div className="space-y-8 ">
        <div className=" mt-12 max-w-[400px] ">
          <h3 className="font-medium text-xl font-barlow text-gray-900 mb-2">Estimated Delivery Time</h3>
          <div className="flex">
            <Input
              type="number"
              max={6}
              placeholder="Enter 6 digit pin code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 rounded-r-none !w-[300px] !py-4 text-base "
            />
            <Button
              className=" bg-black text-white hover:bg-gray-800 rounded px-3 rounded-l-none ">
              Check
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="brand-solid" className="!w-[200px] text-xl font-medium bg-[#e19924] ">
            Add To Cart
          </Button>

          <p className="text-lg font-nunito text-gray-600 mt-4">
            Any Questions? Please feel free to reach us at <span className="text-blue-600">1800413006</span>
          </p>
        </div>
      </div>
    </div>
  )
}
