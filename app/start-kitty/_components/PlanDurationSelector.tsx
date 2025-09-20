"use client"

import Link from "next/link"

interface PlanDurationSelectorProps {
  selectedPlan: string
  setSelectedPlan: (plan: string) => void
}

export function PlanDurationSelector({ selectedPlan, setSelectedPlan }: PlanDurationSelectorProps) {
  const plans = [
    {
      id: "3-month",
      title: "3 Month Quick Plan",
      subtitle: "20% off making charges",
      selected: false,
      link: "/start-kitty?plan=3-month",
    },
    {
      id: "6-month",
      title: "6 Month Balanced Plan",
      subtitle: "30% off making charges",
      selected: false,
      link: "/start-kitty?plan=6-month",
    },
    {
      id: "12-month",
      title: "12 Month Premium Plan",
      subtitle: "You Pay for 11 month and 12 month will paid by us",
      selected: true,
      link: "/start-kitty?plan=12-month",
    },
  ]

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-4">Plan Duration*</label>

      <div className="space-y-3">
        {plans.map((plan) => (
          <Link href={plan.link} >
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full p-4 rounded-lg border text-left transition-colors ${selectedPlan === plan.id
                ? "bg-orange-100 border-orange-300"
                : "bg-white border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className=" text-base text-[#333333]">{plan.title}</div>
              <div className="text-xs text-[#7F7F7F] mt-1">{plan.subtitle}</div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
