"use client"

import { useState } from "react"
import { InvestmentStatsCards } from "./components/InvestmentStatsCards"
import { InvestmentTabs } from "./components/InvestmentTabs"
import { WithdrawalModal } from "./components/WithdrawalModal"
import Modal from "../ui/Modal"
// import { InvestmentTabs } from "@/components/investment-dashboard/investment-tabs"
// import { WithdrawalModal } from "@/components/investment-dashboard/withdrawal-modal"

export default function SellerDashboard() {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
            <h1 className="text-lg font-semibold text-gray-900">My Gold Investment</h1>
          </div>
          <Menu className="w-6 h-6 text-gray-600" />
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <InvestmentStatsCards />

        {/* Tabs Content */}
        <InvestmentTabs onWithdrawalRequest={() => setIsWithdrawalModalOpen(true)} />
      </main>

      {/* Withdrawal Modal */}

      <Modal isOpen={isWithdrawalModalOpen} onClose={() => setIsWithdrawalModalOpen(false)} >
        <WithdrawalModal isOpen={isWithdrawalModalOpen} onClose={() => setIsWithdrawalModalOpen(false)} />
      </Modal>
    </div>
  )
}
