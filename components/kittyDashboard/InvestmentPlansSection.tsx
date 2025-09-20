"use client"

import { PiCalculator } from "react-icons/pi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"
import { KittyInvestmentPlanCard } from "./KittyInvestmentPlanCard"
import { TransectionHistorySection } from "./TransectionHistorySection"


interface InvestmentPlan {
  id: string
  name: string
  description: string
  status: "completed" | "active"
  progress: { current: number; total: number }
  monthlyAmount: number
  currentBalance: number
  totalValue?: number
  bonus?: number | string
  nextPayment: string
}

interface InvestmentPlansSectionProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function InvestmentPlansSection({ activeTab, setActiveTab }: InvestmentPlansSectionProps) {
  const investmentPlans: InvestmentPlan[] = [
    {
      id: "1",
      name: "Wedding Collection",
      description: "Saving for wedding jewellery collection",
      status: "completed",
      progress: { current: 12, total: 12 },
      monthlyAmount: 7000,
      currentBalance: 84000,
      totalValue: 36000,
      bonus: 7000,
      nextPayment: "2025-01-15",
    },
    {
      id: "2",
      name: "Gift Fund",
      description: "Special Gift to Special Person",
      status: "active",
      progress: { current: 8, total: 12 },
      monthlyAmount: 5000,
      currentBalance: 40000,
      totalValue: 60000,
      bonus: 2000,
      nextPayment: "2025-02-10",
    },
    {
      id: "3",
      name: "Festival Special",
      description: "Festival jewellery purchase",
      status: "active",
      progress: { current: 2, total: 9 },
      monthlyAmount: 2000,
      currentBalance: 4000,
      totalValue: 18000,
      bonus: '30% off on making charges',
      nextPayment: "2025-02-18",
    },
    {
      id: "4",
      name: "Personal Collection",
      description: "Personal jewellery collection",
      status: "active",
      progress: { current: 2, total: 3 },
      monthlyAmount: 2000,
      currentBalance: 4000,
      totalValue: 6000,
      bonus: '20% off on making charges',
      nextPayment: "2025-03-10",
    },
  ]

  return (
    <div className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2  font-nunito">
            <PiCalculator size={20} />
            Your Investment Plans</h2>
          <TabsList className="grid w-auto grid-cols-2 mt-4 md:mt-0">
            <TabsTrigger value="plans">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {investmentPlans.map((plan) => (
              <KittyInvestmentPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="text-center text-gray-500">
            <TransectionHistorySection />
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
