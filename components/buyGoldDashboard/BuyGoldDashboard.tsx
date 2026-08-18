"use client"
import { useEffect, useState } from "react"
import { GoldWalletStatsCards } from "./components/GoldWalletStatsCards"
import { GoldDashboardTabs } from "./components/GoldDashboardTabs"
import { GoldWithdrawalModal } from "./components/GoldWithdrawalModal"
import Modal from "../ui/Modal"
import { Button } from "../ui/buttons/Button"
import { getGoldWalletApi } from "@/lib/api/goldWalletApis/goldInvestmentApis"
import { GoldWalletInfo } from "@/types/goldWalletType"
import { FaPlus } from "react-icons/fa"
import { useRouter } from "next/navigation"

export default function BuyGoldDashboard() {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)
  const [goldWalletInfo, setGoldWalletInfo] = useState<GoldWalletInfo | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const router = useRouter()

  const fetchWallet = async () => {
    const res = await getGoldWalletApi()
    if (res?.status === 200) {
      setGoldWalletInfo(res.data)
    }
  }

  useEffect(() => {
    fetchWallet()
  }, [refreshKey])

  const handleRefresh = () => setRefreshKey((k) => k + 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex w-full items-center justify-end">
          <Button
            variant="brand-solid"
            className="self-end !p-3 !bg-[#B8860B] hover:!bg-[#a07609]"
            onClick={() => router.push('/buy-gold')}
          >
            <FaPlus /> Buy More Gold
          </Button>
        </div>

        {/* Stats Cards */}
        <GoldWalletStatsCards goldWalletInfo={goldWalletInfo} />

        {/* Tabs Content */}
        <GoldDashboardTabs
          goldWalletInfo={goldWalletInfo}
          refreshKey={refreshKey}
          onRefresh={handleRefresh}
          onWithdrawalRequest={() => setIsWithdrawalModalOpen(true)}
        />
      </main>

      {/* Withdrawal Modal */}
      <Modal isOpen={isWithdrawalModalOpen} onClose={() => setIsWithdrawalModalOpen(false)}>
        <GoldWithdrawalModal
          availableGoldWeight={goldWalletInfo?.availableGoldWeight || 0}
          isOpen={isWithdrawalModalOpen}
          onClose={() => setIsWithdrawalModalOpen(false)}
          onSuccess={handleRefresh}
        />
      </Modal>
    </div>
  )
}
