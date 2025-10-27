import React from 'react'
import StatsCard, { StatsCardProp } from '../../_components/stats-card'
import { CalendarRange, ShoppingCart, SquareX, Tickets } from 'lucide-react'

const OrderStatsView = ({ analyticsData }: { analyticsData: any }) => {
    console.log("analyticsData", analyticsData);

    const statsData: StatsCardProp[] = [
        {
            title: "Total Orders",
            value: analyticsData?.totalOrders || 0,
            icon: ShoppingCart,
            textColor: "text-orange-500",
            bgColor: "bg-orange-50",
        },
        {
            title: "Pending Orders",
            value: analyticsData?.pendingOrders || 0,
            icon: Tickets,
            textColor: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            title: "Completed Orders",
            value: analyticsData?.completedOrders || 0,
            icon: CalendarRange,
            textColor: "text-green-500",
            bgColor: "bg-green-50",
        },
        {
            title: "Canceled Orders",
            value: analyticsData?.cancelledOrders || 0,
            icon: SquareX,
            textColor: "text-red-500",
            bgColor: "bg-red-50",
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

export default OrderStatsView