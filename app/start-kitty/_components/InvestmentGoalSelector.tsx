"use client"

import { useState } from "react"

interface InvestmentGoalSelectorProps {
  investmentGoal: string
  setInvestmentGoal: (goal: string) => void
}

export function InvestmentGoalSelector({ investmentGoal, setInvestmentGoal }: InvestmentGoalSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const goals = [
    "Emergency Fund",
    "Vacation",
    "Home Down Payment",
    "Education",
    "Retirement",
    "Wedding",
    "Car Purchase",
    "Other",
  ]

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">Investment Goal*</label>

      <div className="relative font-nunito">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left bg-white focus:border-brand outline-none"
        >
          <span className={investmentGoal ? "text-gray-900" : "text-gray-500"}>
            {investmentGoal || "What are you saving for?"}
          </span>
          <svg
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => {
                  setInvestmentGoal(goal)
                  setIsOpen(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {goal}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
