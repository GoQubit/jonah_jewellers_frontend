import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { BadgeCheck, CalendarRange, CircleStar, } from 'lucide-react'


const statsData: StatsCardProp[] = [
    {
        title: "Total Kitty Members",
        value: "10",
        icon: CalendarRange,
        textColor: "text-green-500",
        bgColor: "bg-green-50",
    },
    {
        title: "Total Gold Investor",
        value: "12",
        icon: CircleStar,
        textColor: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        title: "Pending Verification",
        value: "100",
        icon: BadgeCheck,
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-50",
    },
]


const InvestorsAndBuyersStatsView = () => {
    return (
        <div className="flex flex-row flex-nowrap items-center gap-5 overflow-x-auto">
            {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
            ))}
        </div>
    )
}

export default InvestorsAndBuyersStatsView