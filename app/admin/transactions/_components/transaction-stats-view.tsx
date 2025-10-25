import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { CalendarRange, ShoppingCart, Tickets } from 'lucide-react'


const statsData: StatsCardProp[] = [
    {
        title: "Total Revenue",
        value: "₹ 59,00,480",
        icon: Tickets,
        textColor: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        title: "Total Kitty Plans Revenue",
        value: "₹ 10,00,048",
        icon: ShoppingCart,
        textColor: "text-yellow-500",
        bgColor: "bg-yellow-50",
    },
    {
        title: "Total Gold Investment Revenue",
        value: "₹ 2,00,048",
        icon: CalendarRange,
        textColor: "text-green-500",
        bgColor: "bg-green-50",
    },
]


const TransactionStatsView = () => {
    return (
        <div className="flex flex-row flex-nowrap items-center gap-5 overflow-x-auto">
            {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
            ))}
        </div>
    )
}

export default TransactionStatsView