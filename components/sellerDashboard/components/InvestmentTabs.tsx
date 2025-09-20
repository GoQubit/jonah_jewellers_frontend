"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { YourInvestmentsTab } from "./YourInvestmentsSection"
import { TransactionHistoryTab } from "./TransactionHistoryTab"
import { WithdrawalRequestTab } from "./WidthrawalRequestTab"
import { MyJewelleryTab } from "./MyJewelleryTab"
import { PiCalculator } from "react-icons/pi"

interface InvestmentTabsProps {
  onWithdrawalRequest: () => void
}

export function InvestmentTabs({ onWithdrawalRequest }: InvestmentTabsProps) {
  return (
    <Tabs defaultValue="investments" className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-6 mt-6">
        <h2 className="text-xl font-medium text-gray-900 flex items-center gap-2  font-nunito">
          <PiCalculator size={20} />
          Your Investment Plans</h2>

        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="investments" className="flex items-center gap-2">
            Your Investments
          </TabsTrigger>
          <TabsTrigger value="jewellery" className="flex items-center gap-2">
            My Jewellery
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            Transaction History
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

      <TabsContent value="history">
        <TransactionHistoryTab />
      </TabsContent>


      <TabsContent value="withdrawal">
        <WithdrawalRequestTab onWithdrawalRequest={onWithdrawalRequest} />
      </TabsContent>
    </Tabs>
  )
}
