import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { CalendarRange, ShoppingCart, Tickets } from 'lucide-react'

const TransactionStatsView = ({ transactionAnalytics }: { transactionAnalytics: any }) => {

    const statsData: StatsCardProp[] = [
        {
            title: "Total Revenue",
            value: transactionAnalytics?.totalRevenue || 0,
            icon: Tickets,
            textColor: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            title: "Total Kitty Plans Revenue",
            value: transactionAnalytics?.kitty || 0,
            icon: ShoppingCart,
            textColor: "text-yellow-500",
            bgColor: "bg-yellow-50",
        },
        {
            title: "Total Gold Investment Revenue",
            value: transactionAnalytics?.goldInvestment || 0,
            icon: CalendarRange,
            textColor: "text-green-500",
            bgColor: "bg-green-50",
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

export default TransactionStatsView