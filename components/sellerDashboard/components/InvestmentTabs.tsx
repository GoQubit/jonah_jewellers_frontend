"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { YourInvestmentsTab } from "./YourInvestmentsSection"
import { WithdrawalRequestTab } from "./WidthrawalRequestTab"
import { PiCalculator } from "react-icons/pi"
import MyJewelleryTab from "./MyJewelleryTab"

interface InvestmentTabsProps {
  onWithdrawalRequest: () => void
  sellerWallerInfo: any
}

export function InvestmentTabs({ onWithdrawalRequest, sellerWallerInfo }: InvestmentTabsProps) {
  const [activeTab, setActiveTab] = useState("investments")

  // Dynamically update page title when tab changes
  useEffect(() => {
    const titleMap: Record<string, string> = {
      investments: "Your Investments | Kitty Investments",
      jewellery: "My Jewellery | Kitty Investments",
      history: "Transaction History | Kitty Investments",
      withdrawal: "Withdrawal Request | Kitty Investments",
    }

    document.title = titleMap[activeTab] || "Kitty Investments"
  }, [activeTab])

  return (
    <Tabs
      defaultValue="investments"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <div className="flex flex-wrap  items-center justify-between mb-6 mt-6">
        <h2 className="order-2 md:order-1 text-xl font-medium text-gray-900 flex items-center gap-2 font-nunito">
          <PiCalculator size={20} />
          {activeTab === "investments" && "Your Investment"}
          {activeTab === "jewellery" && "My Jewellery"}
          {activeTab === "withdrawal" && "Withdrawal Request"}
        </h2>

        <TabsList className=" order-1 md:order-2 grid grid-cols-3 gap-2 mb-6 overflow-x-scroll whitespace-nowrap ">
          <TabsTrigger value="investments" className="flex items-center gap-2">
            Your Investments
          </TabsTrigger>
          <TabsTrigger value="jewellery" className="flex items-center gap-2">
            My Jewellery
          </TabsTrigger>
          <TabsTrigger value="withdrawal" className="flex items-center gap-2">
            Withdrawal Request
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="investments">
        <YourInvestmentsTab />
      </TabsContent>

      <TabsContent value="jewellery">
        <MyJewelleryTab />
      </TabsContent>

      <TabsContent value="withdrawal">
        <WithdrawalRequestTab
          availableToWithdraw={sellerWallerInfo?.availableToWithdraw || 0}
          onWithdrawalRequest={onWithdrawalRequest}
        />
      </TabsContent>
    </Tabs>
  )
}
