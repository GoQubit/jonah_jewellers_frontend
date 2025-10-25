import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { AiTwotoneGold } from 'react-icons/ai'
import { GiGoldBar } from 'react-icons/gi'
import { IoDiamondOutline } from 'react-icons/io5'





const MaterialPriceStats = ({ materialPrices }: { materialPrices: any }) => {

  const statsData: StatsCardProp[] = [
    {
      title: "Gold Price (per 10gm)",
      value: materialPrices.gold || 0,
      icon: GiGoldBar,
      textColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Diamond Price (per carat)",
      value: materialPrices.diamond || 0,
      icon: IoDiamondOutline,
      textColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Silver Price (per 10gm)",
      value: materialPrices.silver || 0,
      icon: AiTwotoneGold,
      textColor: "text-gray-500",
      bgColor: "bg-blue-50",
    },
  ]

  return (
    <div className="flex flex-row flex-nowrap items-center gap-5 overflow-x-auto">
      {statsData.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  )
}

export default MaterialPriceStats