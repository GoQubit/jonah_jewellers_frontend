"use client"
import { useEffect, useState } from "react"
import { StatsCards } from "./StatsCards"
import { ActionButtons } from "./ActionButtons"
import { InvestmentPlansSection } from "./InvestmentPlansSection"
import { getUserKittyDashboardInfoApi } from "@/lib/api/kittyApis/kittyApis"


export interface DashboardInfoDataType {
  totalInvestmentValue: number,
  availableForShopping: number,
  monthlyCommitment: number,
  activePlan: number,
  totalPlans: number
}

const KittyDashboard = () => {
  const [activeTab, setActiveTab] = useState("plans")
  const [kittyDashboardInfoData, setKittyDashboardInfoData] = useState<DashboardInfoDataType>({
    totalInvestmentValue: 0,
    availableForShopping: 0,
    monthlyCommitment: 0,
    activePlan: 0,
    totalPlans: 0
  })


  const fetchDashboardInfo = async () => {
    const res = await getUserKittyDashboardInfoApi()
    console.log("kitty dashboard Info Res:", res);
    if (res.status === 200) {
      setKittyDashboardInfoData(res.data)
    }
  }

  useEffect(() => {
    fetchDashboardInfo()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <HeaderWithAccount /> */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-8">
          <StatsCards data={kittyDashboardInfoData} />
          <ActionButtons />
          <InvestmentPlansSection activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  )
}

export default KittyDashboard