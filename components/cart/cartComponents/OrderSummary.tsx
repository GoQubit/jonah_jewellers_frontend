"use client"
import { Button } from "@/components/ui/buttons/Button"
import { PromoCode } from "./PromoCode"
import Checkbox from "@/components/ui/Checkbox"
import { useEffect, useState } from "react"

export function OrderSummary({ nextStep }: { nextStep?: () => void }) {
  const [useWalletCash, setUseWalletCash] = useState(false)

  const total = 59048
  const walletCash = 25000

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
    console.log("useWalletCash", useWalletCash);
  }, [useWalletCash])

  const handlePlaceOrder = () => {
    if (nextStep) {
      nextStep()
    }
  }

  return (
    <>
      <div className="bg-[#F8F8F8] rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-normal text-[#585858]">Order Summary</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between font-nunito">
            <span className="text-[#585858]  ">Total (1 Item)</span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>

          <p className="text-xs text-gray-500">Tax included and shipping calculated at checkout</p>

          <div className="flex items-center space-x-2 py-2 font-nunito">
            <Checkbox
              id="wallet-cash"
              checked={useWalletCash}
              onCheckedChange={(checked) => {
                // Radix sends true | false | "indeterminate"
                setUseWalletCash(checked === true)
              }}
            />
            <label htmlFor="wallet-cash" className=" text-sm md:text-base text-gray-700 cursor-pointer">
              Use wallet cash (Available: {formatPrice(walletCash)})
            </label>
          </div>

          <div className="border-t pt-4 font-nunito">
            <div className="flex items-center justify-between mb-4 ">
              <span className="text-base font-normal">Total Payable</span>
              <span className="text-lg font-medium">{formatPrice(total)}</span>
            </div>

            <Button variant="brand-outline"
              className="w-full !text-lg !font-nunito "
              onClick={handlePlaceOrder}
            >Place Order</Button>
          </div>

          <div className=" text-sm text-[#585858] font-nunito ">
            <p>Any Questions? Please feel free to reach us at: 18004190066</p>
          </div>
        </div>
      </div>
      <PromoCode />
    </>
  )
}
