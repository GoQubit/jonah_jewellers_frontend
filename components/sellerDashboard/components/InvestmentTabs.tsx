"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { YourInvestmentsTab } from "./YourInvestmentsSection"
import { TransactionHistoryTab } from "./TransactionHistoryTab"
import { WithdrawalRequestTab } from "./WidthrawalRequestTab"
import { PiCalculator } from "react-icons/pi"
import MyJewelleryTab from "./MyJewelleryTab"

interface InvestmentTabsProps {
  onWithdrawalRequest: () => void
  sellerWallerInfo: any
}

export function InvestmentTabs({ onWithdrawalRequest, sellerWallerInfo }: InvestmentTabsProps) {
  return (
    <Tabs defaultValue="investments" className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-6 mt-6">
        <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2  font-nunito">
          <PiCalculator size={20} />
          Your Investment Plans</h2>

        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="investments" className="flex items-center gap-2">
            Your Investments
          </TabsTrigger>
          <TabsTrigger value="jewellery" className="flex items-center gap-2">
            My Jewellery
          </TabsTrigger>
          {/* <TabsTrigger value="history" className="flex items-center gap-2">
            Transaction History
          </TabsTrigger> */}
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

      {/* <TabsContent value="history">
        <TransactionHistoryTab />
      </TabsContent> */}


      <TabsContent value="withdrawal">
        <WithdrawalRequestTab
          availableToWithdraw={sellerWallerInfo?.availableToWithdraw | 0}
          onWithdrawalRequest={onWithdrawalRequest} />
      </TabsContent>
    </Tabs>
  )
}
