import { Card } from "@/components/ui/Card"
import { GoldWalletInfo } from "@/types/goldWalletType"
import { AiFillGold } from "react-icons/ai"
import { RiWallet3Line } from "react-icons/ri"
import { GiLockedChest } from "react-icons/gi"
import { FaArrowTrendUp } from "react-icons/fa6"

export function GoldWalletStatsCards({ goldWalletInfo }: { goldWalletInfo: GoldWalletInfo | null }) {
  const formatCurrency = (amount?: number) => `₹${(amount || 0).toLocaleString()}`
  const formatGrams = (grams?: number) => `${(grams || 0).toFixed(3)}g`

  const stats = [
    {
      title: "Total Gold Owned",
      value: formatGrams(goldWalletInfo?.goldWeight),
      icon: AiFillGold,
      bgColor: "bg-amber-500",
      textColor: "text-white",
    },
    {
      title: "Available to Withdraw",
      value: formatGrams(goldWalletInfo?.availableGoldWeight),
      icon: RiWallet3Line,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Locked Gold",
      value: formatGrams(goldWalletInfo?.lockedGoldWeight),
      icon: GiLockedChest,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Current Value",
      value: formatCurrency(goldWalletInfo?.currentValueInr),
      icon: FaArrowTrendUp,
      bgColor: "bg-[#B8860B]",
      textColor: "text-white",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className={`${stat.bgColor} ${stat.textColor} border-0 p-3 md:p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm opacity-90 mb-1">{stat.title}</p>
                <p className="text-lg md:text-2xl font-medium">{stat.value}</p>
              </div>
              <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
