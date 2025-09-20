"use client"

import { useState, useEffect } from "react"
import { FaCoins } from "react-icons/fa"
import { Input } from "../ui/Input"
import { Button } from "../ui/buttons/Button"
import { AiFillGold } from "react-icons/ai"
import { useRouter } from "next/navigation"

const GOLD_RATE_PER_GRAM = 6500 // Example rate in INR

export function InvestmentForm() {
  const [investmentAmount, setInvestmentAmount] = useState<string>("")
  const [goldQuantity, setGoldQuantity] = useState<number>(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [investmentAmountError, setInvestmentAmountError] = useState('')
  const router = useRouter()

  const quickAmounts = [10000, 25000, 50000]

  // Calculate gold quantity based on investment amount
  useEffect(() => {
    const amount = Number.parseFloat(investmentAmount) || 0
    const quantity = amount / GOLD_RATE_PER_GRAM
    setGoldQuantity(quantity)
  }, [investmentAmount])

  const handleQuickSelect = (amount: number) => {
    setInvestmentAmount(amount.toString())
  }

  const handleInvestSubmit = async () => {
    setIsSubmitting(true)
    router.push(`/payment?planCategory=investment&investmentAmount=${investmentAmount}&gold=${goldQuantity.toFixed(3)}`)
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (investmentAmount && Number.parseFloat(investmentAmount) < 10000) {
      setInvestmentAmountError("Minimum investment amount is ₹10,000")
    } else setInvestmentAmountError("")
  }, [investmentAmount])

  const isValidAmount = investmentAmount && Number.parseFloat(investmentAmount) >= 10000

  return (
    <section id="investment-form" className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="shadow-xl bg-white/80 backdrop-blur-sm p-6 rounded-md border ">
          <div className="pb-6">
            <div className="flex items-center gap-2 text-lg font-medium font-nunito text-gray-800">
              <AiFillGold size={20} className="text-brand" />
              Invest in Gold
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label htmlFor="investment-amount" className="block text-sm font-semibold text-gray-700 mb-2">
                Investment Amount*
              </label>
              <Input
                id="investment-amount"
                type="number"
                placeholder="Enter Amount"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className=" w-full text-lg py-3  "
                min="10000"
              />
              <p className="text-sm text-gray-500 mt-1">*Minimum investment: ₹10,000 per month</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-lg font-medium text-[#818181] font-nunito">
                Gold Quantity: <span className="text-brand">{goldQuantity.toFixed(3)} Gram</span>
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-[#818181] mb-3">Quick select popular amounts:</p>
              <div className="flex gap-3 flex-wrap">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickSelect(amount)}
                    className={`px-6 py-2 rounded-lg text-sm transition-colors font-nunito ${+investmentAmount === amount ? "!bg-black text-white" : " text-[#CACACA] hover:bg-gray-100 border"
                      }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Button
                variant="brand-solid"
                onClick={handleInvestSubmit}
                disabled={!isValidAmount || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Processing..." : "Invest In Gold"}
              </Button>
              {investmentAmountError && (
                <p className="text-red-600 text-xs">{investmentAmountError}</p>
              )}
            </div>

          </div>
        </div>
        <div className=" rounded-lg mt-2">
          <p className="text-red-600 font-medium text-sm">*Limited Time Opportunity!</p>
          <p className="text-red-600 text-sm">
            Gold prices are surging. Analysts predict 20%+ growth in next 12 months. Lock in today's rate!
          </p>
        </div>
      </div>
    </section>
  )
}
