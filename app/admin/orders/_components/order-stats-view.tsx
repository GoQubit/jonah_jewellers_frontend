import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { CalendarRange, ShoppingCart, SquareX, Tickets } from 'lucide-react'


const statsData: StatsCardProp[] = [
    {
        title: "Total Orders",
        value: "1234",
        icon: ShoppingCart,
        textColor: "text-orange-500",
        bgColor: "bg-orange-50",
    },
    {
        title: "Pending Orders",
        value: "29",
        icon: Tickets,
        textColor: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        title: "Completed Orders",
        value: "10",
        icon: CalendarRange,
        textColor: "text-green-500",
        bgColor: "bg-green-50",
    },
    {
        title: "Canceled Orders",
        value: "12",
        icon: SquareX,
        textColor: "text-red-500",
        bgColor: "bg-red-50",
    },
]


const OrderStatsView = () => {
    return (
        <div className="flex flex-row items-center gap-5">
            {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
            ))}
        </div>
    )
}

export default OrderStatsView