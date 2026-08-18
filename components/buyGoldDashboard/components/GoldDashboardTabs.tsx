"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { PiCalculator } from "react-icons/pi"
import { GoldInvestmentsTab } from "./GoldInvestmentsTab"
import { GoldWithdrawalRequestTab } from "./GoldWithdrawalRequestTab"
import { GoldWalletInfo } from "@/types/goldWalletType"

interface GoldDashboardTabsProps {
  onWithdrawalRequest: () => void
  goldWalletInfo: GoldWalletInfo | null
  refreshKey: number
  onRefresh: () => void
}

export function GoldDashboardTabs({ onWithdrawalRequest, goldWalletInfo, refreshKey, onRefresh }: GoldDashboardTabsProps) {
  const [activeTab, setActiveTab] = useState("investments")

  useEffect(() => {
    const titleMap: Record<string, string> = {
      investments: "My Gold Investments | Jonah Jewels",
      withdrawal: "Withdrawal Request | Jonah Jewels",
    }
    document.title = titleMap[activeTab] || "Gold Wallet | Jonah Jewels"
  }, [activeTab])

  return (
    <Tabs
      defaultValue="investments"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex flex-wrap items-center justify-between mb-6 mt-6">
        <h2 className="order-2 md:order-1 text-xl font-medium text-gray-900 flex items-center gap-2 font-nunito">
          <PiCalculator size={20} />
          {activeTab === "investments" && "My Gold Investments"}
          {activeTab === "withdrawal" && "Withdrawal Request"}
        </h2>

        <TabsList className="order-1 md:order-2 grid grid-cols-2 gap-2 mb-6 overflow-x-scroll whitespace-nowrap">
          <TabsTrigger value="investments" className="flex items-center gap-2">
            My Investments
          </TabsTrigger>
          <TabsTrigger value="withdrawal" className="flex items-center gap-2">
            Withdrawal Request
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="investments">
        <GoldInvestmentsTab refreshKey={refreshKey} />
      </TabsContent>

      <TabsContent value="withdrawal">
        <GoldWithdrawalRequestTab
          availableGoldWeight={goldWalletInfo?.availableGoldWeight || 0}
          onWithdrawalRequest={onWithdrawalRequest}
          refreshKey={refreshKey}
          onRefresh={onRefresh}
        />
      </TabsContent>
    </Tabs>
  )
}
