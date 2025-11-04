"use client"

import Toast from "@/components/Toast/Toast"
import { kittyEnrollmentApi, kittyEnrollmentData } from "@/lib/api/kittyApis/kittyApis"
import { useRouter } from "next/navigation"

interface ProceedButtonProps {
  termsAccepted: boolean,
  investmentGoal: string,
  monthlyAmount: number,
  selectedPlan: string
}

export function ProceedButton({ termsAccepted, investmentGoal, monthlyAmount, selectedPlan }: ProceedButtonProps) {
  const router = useRouter()

  const handleProceed = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to proceed.")
      return
    }
    const duration = selectedPlan === "3-month" ? "3" : selectedPlan === "6-month" ? "6" : "12";

    const payload: kittyEnrollmentData = {
      title: investmentGoal,
      monthlyInstallment: monthlyAmount,
      planDuration: +duration
    }
    const res = await kittyEnrollmentApi(payload)
    console.log("res", res);

    if (res.status === 201) {
      const kittyId = res.data.id
      Toast.success("New Kitty Started Successfully!")
      router.push(`/payment?planCategory=kitty&kittyId=${kittyId}&plan=${selectedPlan}&monthlyAmount=${monthlyAmount}&duration=${duration}&investmentGoal=${investmentGoal}&planCategory='kitty'`)
    }

  }

  return (
    <button
      onClick={handleProceed}
      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors bg-brand hover:bg-brandDark text-white ${termsAccepted ? "" : " opacity-50  cursor-not-allowed font-besley"
        }`}
      disabled={!termsAccepted}
    >
      Proceed to Payment Gateway
    </button>
  )
}
