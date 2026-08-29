"use client"

import { PiCalculator } from "react-icons/pi"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs"
import { KittyInvestmentPlanCard } from "./KittyInvestmentPlanCard"
import { TransectionHistorySection } from "./TransectionHistorySection"
import { useEffect, useState } from "react"
import { getUserkittiesApi } from "@/lib/api/kittyApis/kittyApis"
import { Pagination } from "../ui/Pagination"


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
  nextDueDate: string
  status: "ACTIVE" | "COMPLETED"
}

interface InvestmentPlansSectionProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const PLANS_PAGE_SIZE = 6

export function InvestmentPlansSection({ activeTab, setActiveTab }: InvestmentPlansSectionProps) {
  const [kittyList, setKittyList] = useState<InvestmentPlan[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchKitty = async (pageNumber: number) => {
    const params = { limit: PLANS_PAGE_SIZE, page: pageNumber, sortBy: "-createdAt" }
    const res = await getUserkittiesApi(params)
    if (res?.status === 200) {
      setKittyList(res.data.results)
      setTotalPages(res.data.totalPages || 1)
    }
  }
  // fetch User Kitty List
  useEffect(() => {
    fetchKitty(page)
  }, [page])


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
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
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
