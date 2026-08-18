import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { ShoppingCart, Wallet, } from 'lucide-react'
import { LuUsers } from 'react-icons/lu'
import { TbUserShield } from 'react-icons/tb'



const DashboarStatsView = ({ analyticsData }: { analyticsData: any }) => {

  const statsData: StatsCardProp[] = [
    {
      key: "totalRevenue",
      title: "Total Revenue",
      value: analyticsData?.orderRevenue || 0,
      icon: Wallet,
      textColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
      boxBgColor: "!bg-yellow-500 !text-white"
    },
    {
      key: "totalOrders",
      title: "Total Orders",
      value: analyticsData?.totalOrders || 0,
      icon: ShoppingCart,
      textColor: "text-green-500",
      bgColor: "bg-green-50",
      boxBgColor: "!bg-green-500 !text-white"
    },
    {
      key: "totalKittyMembers",
      title: "Total Kitty Members",
      value: analyticsData?.kittyUserCount || 0,
      icon: TbUserShield,
      textColor: "text-blue-500",
      bgColor: "bg-blue-50",
      boxBgColor: "!bg-blue-500 !text-white"
    },
    {
      key: "totalInvestors",
      title: "Total Investors",
      value: analyticsData?.investmentUserCount,
      icon: LuUsers,
      textColor: "text-purple-500",
      bgColor: "bg-purple-50",
      boxBgColor: "!bg-purple-500 !text-white"
    },
  ]

  return (
    <div className="flex flex-row flex-nowrap items-center gap-5 overflow-x-auto">
      {statsData.map(({key, ...stat}) => (
        <StatsCard key={key} {...stat} />
      ))}
    </div>
  )
}

export default DashboarStatsView