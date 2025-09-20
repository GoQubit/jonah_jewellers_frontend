"use client"

import { useRouter } from "next/navigation"

interface ProceedButtonProps {
  termsAccepted: boolean,
  investmentGoal: string,
  monthlyAmount: number,
  selectedPlan: string
}

export function ProceedButton({ termsAccepted, investmentGoal, monthlyAmount, selectedPlan }: ProceedButtonProps) {
  const router = useRouter()

  const handleProceed = () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.")
      return
    }

    const duration = selectedPlan === "3-month" ? "3" : selectedPlan === "6-month" ? "6" : "12";
    
    router.push(`/payment?plan=${selectedPlan}&monthlyAmount=${monthlyAmount}&duration=${duration}&investmentGoal=${investmentGoal}`)
  }

  return (
    <button
      onClick={handleProceed}
      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors bg-brand hover:bg-brandDark text-white ${termsAccepted && investmentGoal ? "" : " opacity-50  cursor-not-allowed font-besley"
        }`}
      disabled={!termsAccepted && !investmentGoal}
    >
      Proceed to Payment Gateway
    </button>
  )
}
