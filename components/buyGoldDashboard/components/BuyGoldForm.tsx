"use client"
import { useEffect, useState } from "react"
import { AiFillGold } from "react-icons/ai"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/buttons/Button"
import { Card } from "@/components/ui/Card"
import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Modal from "@/components/ui/Modal"
import useIsAuth from "@/hooks/useIsAuth"

export function BuyGoldForm() {
  const materials = useSelector((state: RootState) => state.materials)
  const user = useSelector((state: RootState) => state.user)
  const isAuth = useIsAuth()
  const router = useRouter()
  const pathname = usePathname()
  const redirectUrl = encodeURIComponent(pathname)

  const [amount, setAmount] = useState<string>("")
  const [goldQuantity, setGoldQuantity] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amountError, setAmountError] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const GOLD_RATE_PER_GRAM = materials?.gold?.price || 100000
  const quickAmounts = [1000, 5000, 10000, 25000]

  useEffect(() => {
    const amt = Number.parseFloat(amount) || 0
    setGoldQuantity(amt / GOLD_RATE_PER_GRAM)
  }, [amount])

  useEffect(() => {
    if (amount && Number.parseFloat(amount) < 100) {
      setAmountError("Minimum purchase amount is ₹100")
    } else setAmountError("")
  }, [amount])

  const handleQuickSelect = (value: number) => setAmount(value.toString())

  const handleBuySubmit = async () => {
    if (!user || !isAuth) {
      setModalOpen(true)
      return
    }

    setIsSubmitting(true)
    router.push(
      `/payment?planCategory=gold&investmentAmount=${amount}&gold=${goldQuantity.toFixed(3)}`
    )
    setIsSubmitting(false)
  }

  const isValidAmount = amount && Number.parseFloat(amount) >= 100

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <div className="pb-6">
        <div className="flex items-center gap-2 text-lg font-medium font-nunito text-gray-800">
          <AiFillGold size={20} className="text-brand" /> Buy Pure Gold
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Buy gold today at today's rate. It's stored safely in your wallet until you're ready to redeem it at our store.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="buy-gold-amount" className="block text-sm font-semibold text-gray-700 mb-2">
            Amount*
          </label>
          <Input
            id="buy-gold-amount"
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-lg py-3"
            min="100"
          />
          <p className="text-sm text-gray-500 mt-1">*Minimum purchase: ₹100</p>
          {amountError && <p className="text-red-600 text-xs mt-1">{amountError}</p>}
        </div>

        <div className="bg-amber-50 p-4 rounded-lg">
          <p className="text-lg font-medium text-[#818181] font-nunito">
            You'll get: <span className="text-brand">{goldQuantity.toFixed(3)} Gram</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Based on today's rate of ₹{GOLD_RATE_PER_GRAM.toLocaleString()}/gram
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-[#818181] mb-3">Quick select popular amounts:</p>
          <div className="flex gap-3 flex-wrap">
            {quickAmounts.map((value) => (
              <button
                key={value}
                onClick={() => handleQuickSelect(value)}
                className={`px-6 py-2 rounded-lg text-sm transition-colors font-nunito ${
                  +amount === value
                    ? "!bg-black text-white"
                    : "text-[#CACACA] hover:bg-gray-100 border"
                }`}
              >
                ₹{value.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <Button
          variant="brand-solid"
          onClick={handleBuySubmit}
          disabled={!isValidAmount || isSubmitting}
          className="w-full !bg-[#B8860B] hover:!bg-[#a07609]"
        >
          {isSubmitting ? "Processing..." : "Buy Gold"}
        </Button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="text-center p-4">
          <p className="text-lg font-semibold text-gray-800">Please log in first to buy gold.</p>
          <div className="mt-4">
            <Button
              variant="brand-solid"
              className="w-full"
              onClick={() => router.push(`/login?redirectTo=${redirectUrl}`)}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  )
}
