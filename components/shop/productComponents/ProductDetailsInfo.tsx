"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/buttons/Button"


type ProductDetailsInfo = {
  name: string
  price: number
  metalDetails: any
  productCategory: string
  addToCartHandler?: () => void
}


export default function ProductInfo({ name, price, metalDetails, productCategory, addToCartHandler }: ProductDetailsInfo) {
  const [pincode, setPincode] = useState("")

  // const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

  const metalQualityStr = productCategory === "GOLD" ?
    `${metalDetails.goldPurity}K Gold |` :
    productCategory === "DIAMOND" ?
      `${metalDetails.stoneWeightInCarat} ct. | ${metalDetails.metalPurity}K Gold |` : ""


  return (
    <div className="space-y-6">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2 ">{name}</h1>
          <p className="font-besley text-brand ">{metalQualityStr} {metalDetails?.grossWeight} Gram</p>
        </div>
        <div className="flex items-center gap-3 font-besley ">
          <span className="text-3xl font-medium text-gray-900">₹ {price}</span>
          {/* <span className="text-lg text-gray-500 line-through">₹ {originalPrice}</span> */}
          {/* <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">{discount}% OFF</span> */}
        </div>
      </div>

      <div className="space-y-8 ">
        <div className="mt-4 md:mt-12 max-w-[400px] ">
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
          <Button
            onClick={addToCartHandler}
            variant="brand-solid" className="!w-[200px] text-base md:text-lg font-medium bg-[#e19924] !py-3 ">
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
