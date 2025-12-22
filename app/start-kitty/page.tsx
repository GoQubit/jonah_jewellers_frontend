"use client"

import { PageHeader } from "@/components/ui/PageHeader"
import { useState } from "react"
import { InvestmentConfiguration } from "./_components/InvestmentConfiguration"
import { KittySummary } from "./_components/KittySummary"
import { useSearchParams } from "next/navigation"
import { TermsAndConditions } from "@/components/ui/TermsAndConditions"

export default function KittyPlanPage() {
  const searchparams = useSearchParams()
  const plan = searchparams.get("plan")
  const [monthlyAmount, setMonthlyAmount] = useState(5000)
  const [selectedPlan, setSelectedPlan] = useState(plan || "12-month")
  const [investmentGoal, setInvestmentGoal] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)

  const planDetails = {
    "3-month": { duration: "3 Months", payMonths: 3, totalMonths: 3, discount: 0.2 },
    "6-month": { duration: "6 Months", payMonths: 6, totalMonths: 6, discount: 0.3 },
    "12-month": { duration: "12 Months", payMonths: 11, totalMonths: 12, discount: 0 },
  }

  const currentPlan = planDetails[selectedPlan as keyof typeof planDetails]
  const totalPayable = monthlyAmount * currentPlan.payMonths
  const totalValue = monthlyAmount * currentPlan.totalMonths
  const directSavings = monthlyAmount
  const totalSavings = monthlyAmount

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <PageHeader
          title="Setup Your Kitty Plan"
          subtitle="Configure your monthly investment and payment details"
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <InvestmentConfiguration
            monthlyAmount={monthlyAmount}
            setMonthlyAmount={setMonthlyAmount}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            investmentGoal={investmentGoal}
            setInvestmentGoal={setInvestmentGoal}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            totalSavings={totalSavings}
          />

          <KittySummary
            monthlyAmount={monthlyAmount}
            planDuration={currentPlan.duration}
            payMonths={currentPlan.payMonths}
            totalPayable={totalPayable}
            totalValue={totalValue}
            directSavings={directSavings}
            totalSavings={totalSavings}
          />
        </div>
      </div>
    </div>
  )
}
