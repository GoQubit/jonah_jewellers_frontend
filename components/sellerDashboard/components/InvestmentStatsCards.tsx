
import { Card } from "@/components/ui/Card"
import { FaArrowTrendUp } from "react-icons/fa6"
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi"
import { RiShoppingBag4Line, RiWallet3Line } from "react-icons/ri"

export function InvestmentStatsCards({ sellerWallerInfo }: { sellerWallerInfo: any }) {
  const stats = [
    {
      title: "Total Invested Amount",
      value: `${sellerWallerInfo?.investedAmount}`,
      icon: RiWallet3Line,
      bgColor: "bg-amber-500",
      textColor: "text-white",
    },
    {
      title: "Available to Withdraw",
      value: `${sellerWallerInfo?.availableToWithdraw}`,
      icon: RiShoppingBag4Line,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Profit On Jewellery",
      value: `${sellerWallerInfo?.profitOnJewelry}`,
      icon: GiTakeMyMoney,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Current Gold Investment",
      value: `${sellerWallerInfo?.currentGoldInvestment}`,
      icon: FaArrowTrendUp,
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className={`${stat.bgColor} ${stat.textColor} border-0 p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <IconComponent className="w-8 h-8" />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
