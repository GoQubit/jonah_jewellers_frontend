import { RiShoppingBag4Line, RiWallet3Line } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import { Card } from "../ui/Card";
import { useRouter } from "next/navigation";
import { DashboardInfoDataType } from "./KittyDashboard";


interface StatsCardsProps {
  data: DashboardInfoDataType
}

export function StatsCards({ data }: StatsCardsProps) {
  const formatCurrency = (amount: number) => `₹ ${amount.toLocaleString()}`

  const statsCards = [
    {
      title: "Total Investment Value",
      value: formatCurrency(data?.totalInvestmentValue),
      icon: RiWallet3Line,
      bgColor: "bg-amber-500",
      textColor: "text-white",

    },
    {
      title: "Available for Shopping",
      value: formatCurrency(data?.availableForShopping),
      icon: RiShoppingBag4Line,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Monthly Commitment",
      value: formatCurrency(data?.monthlyCommitment),
      icon: LuCalendarDays,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      title: "Active Plans",
      value: `${data?.activePlan}/${data?.totalPlans}`,
      icon: TbTargetArrow,
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {statsCards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index} className={`${card.bgColor} ${card.textColor} p-2 md:p-6 border-0`}>
            <div className="flex md:flex-row flex-col items-center justify-center md:justify-between text-white">
              <div className="order-2 md:order-1">
                <p className=" text-xs md:text-sm mb-1 font-nunito">{card.title}</p>
                <p className=" text-lg md:text-2xl font-medium font-besley">{card.value}</p>
              </div>
              <div className="order-1 md:order-2 mb-2 md:mb-0">
                <Icon className=" h-5 w-5 md:h-8 md:w-8  " />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
