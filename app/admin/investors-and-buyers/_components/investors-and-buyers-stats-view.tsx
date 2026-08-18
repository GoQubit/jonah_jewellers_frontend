import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { BadgeCheck, CalendarRange, CircleStar, } from 'lucide-react'




const InvestorsAndBuyersStatsView = ({ analyticsData }: { analyticsData: any }) => {


    const statsData: StatsCardProp[] = [
        {
            key: "totalInvestments",
            title: "Total Kitty Members",
            value: analyticsData?.kittyUserCount || 0,
            icon: CalendarRange,
            textColor: "text-green-500",
            bgColor: "bg-green-50",
        },
        {
            key: "totalGoldInvestors",
            title: "Total Gold Investor",
            value: analyticsData?.investmentUserCount || 0,
            icon: CircleStar,
            textColor: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            key: "pendingVerifications",
            title: "Pending Verification",
            value: analyticsData?.pendingVerifications || 0,
            icon: BadgeCheck,
            textColor: "text-yellow-500",
            bgColor: "bg-yellow-50",
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

export default InvestorsAndBuyersStatsView