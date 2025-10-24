"use client"

import { Button } from "@/components/ui/buttons/Button"
import Checkbox from "@/components/ui/Checkbox"
import { Input } from "@/components/ui/Input"
import { useState, useMemo } from "react"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { IoMdPricetag } from "react-icons/io"
import { useRouter, usePathname } from "next/navigation"
import useIsAuth from "@/hooks/useIsAuth"

type PromoCodeType = {
  code: string
  discount: number // flat discount in INR
}

const PROMO_CODES: PromoCodeType[] = [
  { code: "SAVE100", discount: 100 },
  { code: "WELCOME250", discount: 250 },
  { code: "FESTIVE500", discount: 500 },
]

type OrderSummaryProps = {
  nextStep?: () => void
  setUseWalletCash: Function
  useWalletCash: boolean
  setPromoCode: Function
  promoCode: string
  walletCash?: number
}

export function OrderSummary({
  nextStep,
  setUseWalletCash,
  useWalletCash,
  setPromoCode,
  promoCode,
  walletCash = 0
}: OrderSummaryProps) {
  const router = useRouter()
  const pathname = usePathname()

  // 🧠 Get user from Redux or any auth context
  const isAuth = useIsAuth()
  const { items } = useSelector((state: RootState) => state.cart)

  const [appliedPromo, setAppliedPromo] = useState<PromoCodeType | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [promoCodeInvalid, setPromoCodeInvalid] = useState(false)

  // 🔹 Calculate cart total
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1), 0)
  }, [items])

  // 🔹 Deduct promo first
  const discountedTotal = useMemo(() => {
    return appliedPromo ? Math.max(total - appliedPromo.discount, 0) : total
  }, [total, appliedPromo])

  // 🔹 Apply wallet cash
  const payableAmount = useMemo(() => {
    if (!useWalletCash) return discountedTotal
    return discountedTotal > walletCash ? discountedTotal - walletCash : 0
  }, [discountedTotal, useWalletCash])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("₹", "₹ ")

  // ✅ Handle Place Order
  const handlePlaceOrder = () => {
    // 🧾 Check if user is logged in
    if (!isAuth) {
      // save current page for redirect
      const redirectUrl = encodeURIComponent(pathname)
      router.push(`/login?redirect=${redirectUrl}`)
      return
    }

    // 🛒 Proceed to next step if logged in
    if (nextStep) nextStep()
    console.log("Placing order with payable:", payableAmount, "Applied promo:", appliedPromo)
  }

  // ✅ Handle promo apply
  const handleApply = () => {
    const found = PROMO_CODES.find(
      (promo) => promo.code.toLowerCase() === promoCode.trim().toLowerCase()
    )
    if (found) {
      setAppliedPromo(found)
      setPromoCode("")
      setPromoCodeInvalid(false)
    } else {
      setPromoCodeInvalid(true)
    }
  }

  const handleRemovePromo = () => setAppliedPromo(null)

  return (
    <>
      <div className="bg-[#F8F8F8] rounded-lg shadow-sm">
        <div className="p-3 md:p-6 border-b border-gray-200">
          <h2 className="text-lg font-normal text-[#585858]">Order Summary</h2>
        </div>

        <div className="p-3 md:p-6 space-y-4">
          <div className="flex items-center justify-between font-nunito">
            <span className="text-[#585858]">
              Total ({items.length} Item{items.length > 1 ? "s" : ""})
            </span>
            <span className="font-medium">{formatPrice(total)}</span>
          </div>

          <p className="text-xs text-gray-500">
            Tax included and shipping calculated at checkout
          </p>

          {appliedPromo && (
            <div className="flex items-center justify-between text-sm font-nunito text-blue-600">
              <span>
                Promo Applied (<strong>{appliedPromo.code}</strong>)
              </span>
              <div className="flex items-center gap-2">
                <span>- {formatPrice(appliedPromo.discount)}</span>
                <button onClick={handleRemovePromo} className="text-xs text-red-500 underline">
                  Remove
                </button>
              </div>
            </div>
          )}

          {/* Wallet Checkbox */}
          <div className="flex items-center space-x-2 py-2 font-nunito">
            <Checkbox
              id="wallet-cash"
              checked={useWalletCash}
              onCheckedChange={(checked) => setUseWalletCash(checked === true)}
            />
            <label
              htmlFor="wallet-cash"
              className=" text-sm md:text-base text-gray-700 cursor-pointer"
            >
              Use wallet cash (Available: {formatPrice(walletCash)})
            </label>
          </div>

          {useWalletCash && (
            <div className="flex items-center justify-between text-sm font-nunito text-green-600">
              <span>Wallet Applied</span>
              <span>- {formatPrice(Math.min(walletCash, discountedTotal))}</span>
            </div>
          )}

          {/* Payable rows */}
          <div className="border-t pt-4 font-nunito">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-normal">Total Cart Amount</span>
              <span className="text-lg font-medium">{formatPrice(payableAmount)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-normal">GST (3%):</span>
              <span className="text-lg font-medium">₹{(payableAmount * 0.03).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-normal">Total Payable</span>
              <span className="text-lg font-medium">₹{(payableAmount * 1.03).toFixed(2)}</span>
            </div>

            <Button
              variant="brand-outline"
              className="w-full !text-lg !font-nunito !p-2 md:!p-3"
              onClick={handlePlaceOrder}
            >
              {isAuth ? "Place Order" : "Login to Continue"}
            </Button>
          </div>

          <div className="text-sm text-[#585858] font-nunito">
            <p>Any Questions? Please feel free to reach us at: 18004190066</p>
          </div>
        </div>
      </div>

      {/* Promo section */}
      <div className="pt-4">
        {!appliedPromo && (
          <>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-brand transition-colors underline cursor-pointer "
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
                <Button variant="brand-solid" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            )}

            {promoCodeInvalid && (
              <span className="text-sm text-red-500 self-center">
                The coupon code entered is not valid.
              </span>
            )}
          </>
        )}
      </div>
    </>
  )
}
