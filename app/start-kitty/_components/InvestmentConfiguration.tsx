import { TbCalculator } from "react-icons/tb"
import { AmountSelector } from "./AmountSelection"
import { InvestmentGoalSelector } from "./InvestmentGoalSelector"
import { PlanDurationSelector } from "./PlanDurationSelector"
import { ProceedButton } from "./ProceedButton"

interface InvestmentConfigurationProps {
  monthlyAmount: number
  setMonthlyAmount: (amount: number) => void
  selectedPlan: string
  setSelectedPlan: (plan: string) => void
  investmentGoal: string
  setInvestmentGoal: (goal: string) => void
  termsAccepted: boolean
}

export function InvestmentConfiguration({
  monthlyAmount,
  setMonthlyAmount,
  selectedPlan,
  setSelectedPlan,
  investmentGoal,
  setInvestmentGoal,
  termsAccepted,
}: InvestmentConfigurationProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
          <TbCalculator size={18} />
        </div>
        <h2 className="text-lg font-medium text-gray-900 font-nunito">Investment Configuration</h2>
      </div>

      <div className="space-y-6">
        <AmountSelector
          monthlyAmount={monthlyAmount}
          setMonthlyAmount={setMonthlyAmount}
        />

        <PlanDurationSelector
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        <InvestmentGoalSelector
          investmentGoal={investmentGoal}
          setInvestmentGoal={setInvestmentGoal}
        />

        <ProceedButton
          termsAccepted={termsAccepted}
          monthlyAmount={monthlyAmount}
          selectedPlan={selectedPlan}
          investmentGoal={investmentGoal}
        />
      </div>
    </div>
  )
}
