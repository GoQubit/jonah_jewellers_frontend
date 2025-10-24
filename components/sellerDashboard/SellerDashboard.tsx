"use client"
import { useEffect, useState } from "react"
import { InvestmentStatsCards } from "./components/InvestmentStatsCards"
import { InvestmentTabs } from "./components/InvestmentTabs"
import { WithdrawalModal } from "./components/WithdrawalModal"
import Modal from "../ui/Modal"
import { getSellerDashboardInfoApi } from "@/lib/api/sellerApis/sellerInvestmentsApis"
import { Button } from "../ui/buttons/Button"
import { FaPlus } from "react-icons/fa"
import { useRouter } from "next/navigation"

export default function SellerDashboard() {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)
  const [sellerWallerInfo, setSellerWalletInfo] = useState<any>(null)
  const router = useRouter()


  useEffect(() => {
    (async () => {
      const res = await getSellerDashboardInfoApi()
      console.log("res", res);
      if (res.status === 200) {
        setSellerWalletInfo(res.data)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className=" flex w-full items-center justify-end ">
          <Button
            variant="brand-solid"
            className=" self-end !p-3 "
            onClick={() => router.push('/invest-in-gold')}
          >
            <FaPlus /> Start Investment
          </Button>
        </div>
        {/* Stats Cards */}
        <InvestmentStatsCards
          sellerWallerInfo={sellerWallerInfo}
        />

        {/* Tabs Content */}
        <InvestmentTabs
          sellerWallerInfo={sellerWallerInfo}
          onWithdrawalRequest={() => setIsWithdrawalModalOpen(true)} />
      </main>

      {/* Withdrawal Modal */}

      <Modal isOpen={isWithdrawalModalOpen} onClose={() => setIsWithdrawalModalOpen(false)} >
        <WithdrawalModal
          availableToWithdraw={sellerWallerInfo?.availableToWithdraw | 0}
          isOpen={isWithdrawalModalOpen}
          onClose={() => setIsWithdrawalModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
