"use client"

import { useState } from "react"
import { StatsCards } from "./StatsCards"
import { ActionButtons } from "./ActionButtons"
import { InvestmentPlansSection } from "./InvestmentPlansSection"

const KittyDashboard = () => {
  const [activeTab, setActiveTab] = useState("plans")

  const statsData = {
    totalInvestmentValue: 59048,
    availableForShopping: 26000,
    monthlyCommitment: 9500,
    activePlans: { current: 3, total: 4 },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <HeaderWithAccount /> */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-8">
          <StatsCards data={statsData} />
          <ActionButtons />
          <InvestmentPlansSection activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </main>
    </div>
  )
}

export default KittyDashboard