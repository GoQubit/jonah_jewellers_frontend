"use client"

import React, { useEffect, useState } from 'react'
import StatsCard, { StatsCardProp as StatsData } from '../../_components/stats-card'
import { CalendarRange, ShoppingCart, SquareX, Tickets } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { getOrdersAnalyticsAdminApi } from '@/lib/api/order/orderApis'


const statsData: StatsData[] = [
    {
        key: "totalOrders",
        title: "Total Orders",
        value: <Skeleton className="h-5 w-16 bg-slate-200" />,
        icon: ShoppingCart,
        textColor: "text-orange-500",
        bgColor: "bg-orange-50",
    },
    {
        key: "pendingOrders",
        title: "Pending Orders",
        value: <Skeleton className="h-5 w-16 bg-slate-200" />,
        icon: Tickets,
        textColor: "text-blue-500",
        bgColor: "bg-blue-50",
    },
    {
        key: "completedOrders",
        title: "Completed Orders",
        value: <Skeleton className="h-5 w-16 bg-slate-200" />,
        icon: CalendarRange,
        textColor: "text-green-500",
        bgColor: "bg-green-50",
    },
    {
        key: "cancelledOrders",
        title: "Canceled Orders",
        value: <Skeleton className="h-5 w-16 bg-slate-200" />,
        icon: SquareX,
        textColor: "text-red-500",
        bgColor: "bg-red-50",
    },
]


const OrderStatsView = () => {

    const [stats, setStats] = useState<{
        isLoading: boolean;
        data: StatsData[];
    }>({
        isLoading: false,
        data: statsData,
    })

    const getOrderStats = async () => {
        setStats((prev) => ({ ...prev, isLoading: true }))
        try {
            const response = await getOrdersAnalyticsAdminApi()
            setStats((prev) => ({ ...prev, data: prev.data.map((stat) => {
                let value = ''
                switch (stat.key) {
                    case 'totalOrders':
                        value = response.data.totalOrders.toString()
                        break
                    case 'pendingOrders':
                        value = response.data.pendingOrders.toString()
                        break
                    case 'completedOrders':
                        value = response.data.completedOrders.toString()
                        break
                    case 'cancelledOrders':
                        value = response.data.cancelledOrders.toString()
                        break
                    default:
                        value = ''
                }
                return {
                    ...stat,
                    value: value,
                }
            }) }))
        } catch (error: any) {

        } finally {
            setStats((prev) => ({ ...prev, isLoading: false }))
        }
    }

    useEffect(() => {
        getOrderStats()
    }, [])

    return (
        <div className="flex flex-row flex-nowrap items-center gap-5 overflow-x-auto">
            {stats.data.map(({key, ...rest}) => (
                <StatsCard key={key} {...rest} />
            ))}
        </div>
    )
}

export default OrderStatsView