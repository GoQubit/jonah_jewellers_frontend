"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/buttons/Button"
import { ringSizes } from "@/data/ringSizes"

type ProductDetailsInfo = {
  name: string
  price: number
  metalDetails: any
  productCategory: string
  addToCartHandler?: (ringSize?: string) => void
  hasRingSize?: boolean
}
export default function ProductInfo({
  name,
  price,
  metalDetails,
  productCategory,
  addToCartHandler,
  hasRingSize = false, // 👈 default false
}: ProductDetailsInfo) {
  const [pincode, setPincode] = useState("")
  const [ringSize, setRingSize] = useState("")

  const metalQualityStr =
    productCategory === "GOLD"
      ? `${metalDetails.goldPurity}K Gold |`
      : productCategory === "DIAMOND"
        ? `${metalDetails.stoneWeightInCarat} ct. | ${metalDetails.metalPurity}K Gold |`
        : ""


  return (
    <div className="space-y-6">
      {/* Product Title & Price */}
      <div>
        <div className="mb-2 md:mb-6">
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">{name}</h1>
          <p className=" text-sm md:text-base font-besley text-brand">
            {metalQualityStr} {metalDetails?.grossWeight} Gram
          </p>
        </div>

        <div className="flex items-center gap-3 font-besley">
          <span className="text-xl md:text-3xl font-medium text-gray-900">₹ {price}</span>
        </div>
      </div>

      {/* Ring Size Dropdown — only if hasRingSize is true */}
      {
        hasRingSize && (
          <div className="mt-2 md:mt-4 flex gap-1 items-center">
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Ring Size
            </label>
            <select
              value={ringSize}
              onChange={(e) => setRingSize(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#e19924]"
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

      <div className="space-y-8">

        {/* Delivery Section */}
        {/* <div className="mt-4 md:mt-12 max-w-[400px]">
          <h3 className="font-medium text-xl font-barlow text-gray-900 mb-2">
            Estimated Delivery Time
          </h3>
          <div className="flex">
            <Input
              type="number"
              max={6}
              placeholder="Enter 6 digit pin code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 rounded-r-none !w-[300px] !py-4 text-base"
            />
            <Button className="bg-black text-white hover:bg-gray-800 rounded px-3 rounded-l-none">
              Check
            </Button>
          </div>
        </div> */}

        {/* Add to Cart */}
        <div className="mt-6">
          <Button
            onClick={() => addToCartHandler?.(ringSize)} // 👈 pass ring size
            variant="brand-solid"
            className="!w-[200px] text-base md:text-lg font-medium bg-[#e19924] !py-3"
          >
            Add To Cart
          </Button>


          <p className="text-lg font-nunito text-gray-600 mt-4">
            Any Questions? Please feel free to reach us at{" "}
            <span className="text-blue-600">1800413006</span>
          </p>
        </div>
      </div>
    </div>
  )
}
