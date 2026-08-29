"use client"

import { useState } from "react"
import Toast from "@/components/Toast/Toast"
import { kittyEnrollmentApi, kittyEnrollmentData } from "@/lib/api/kittyApis/kittyApis"
import { useRouter } from "next/navigation"

interface ProceedButtonProps {
  termsAccepted: boolean,
  investmentGoal: string,
  monthlyAmount: number,
  selectedPlan: string,
  totalSavings: number
}

export function ProceedButton({ termsAccepted, investmentGoal, monthlyAmount, selectedPlan, totalSavings }: ProceedButtonProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleProceed = async () => {
    const duration = selectedPlan === "3-month" ? "3" : selectedPlan === "6-month" ? "6" : "12";

    const payload: kittyEnrollmentData = {
      monthlyInstallment: monthlyAmount,
      planDuration: +duration
    }

    setIsSubmitting(true)
    const res = await kittyEnrollmentApi(payload)
    setIsSubmitting(false)

    // Enrolling already creates the first installment + its Razorpay order,
    // so we carry that straight through to the payment page instead of
    // asking it to create a second (conflicting) installment.
    const kittyId = res?.data?.kitty?.id
    const razorpayOrderId = res?.data?.razorpayOrder?.id
    const keyId = res?.data?.keyId

    if (res?.status === 201 && kittyId && razorpayOrderId) {
      Toast.success("New Kitty Started Successfully!")
      const params = new URLSearchParams({
        planCategory: "kitty",
        kittyId: String(kittyId),
        plan: selectedPlan,
        monthlyAmount: String(monthlyAmount),
        duration,
        investmentGoal,
        razorpayOrderId,
        keyId: keyId || "",
      })
      router.push(`/payment?${params.toString()}`)
    } else {
      Toast.error("Failed to start kitty. Please try again.")
    }
  }

  return (
    <button
      onClick={handleProceed}
      disabled={!termsAccepted || isSubmitting}
      className={`w-full py-3 px-6 rounded-lg font-medium transition-colors bg-brand hover:bg-brandDark text-white ${(!termsAccepted || isSubmitting) ? " opacity-50  cursor-not-allowed font-besley" : ""
        }`}
    >
      {isSubmitting ? "Starting..." : "Proceed to Payment Gateway"}
    </button>
  )
}
