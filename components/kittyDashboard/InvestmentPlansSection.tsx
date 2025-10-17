"use client"

import { PiCalculator } from "react-icons/pi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"
import { KittyInvestmentPlanCard } from "./KittyInvestmentPlanCard"
import { TransectionHistorySection } from "./TransectionHistorySection"
import { useEffect, useState } from "react"
import { getUserkittiesApi } from "@/lib/api/kittyApis/kittyApis"


export interface InvestmentPlan {
  id: string
  title: string
  userId: number
  monthlyInstallment: number
  amountPaid: number
  totalAmountToBePaid: number
  bonus?: number | string
  noOfInstallmentsDone: number
  planDuration: number
  status: "ACTIVE" | "COMPLETED"
}

interface InvestmentPlansSectionProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function InvestmentPlansSection({ activeTab, setActiveTab }: InvestmentPlansSectionProps) {
  const [kittyList, setKittyList] = useState<InvestmentPlan[]>([])

  const fetchKitty = async () => {
    const res = await getUserkittiesApi()
    console.log("res", res);
    if (res.status === 200) {
      setKittyList(res.data.results)
    }
  }
  // fetch User Kitty List
  useEffect(() => {
    fetchKitty()
  }, [])


  return (
    <div className="">
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
            {kittyList.length > 0 ? kittyList.map((plan) => (
              <KittyInvestmentPlanCard key={plan.id} plan={plan} />
            ))
              :
              <div>
                No Kitty Found
              </div>
            }
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
