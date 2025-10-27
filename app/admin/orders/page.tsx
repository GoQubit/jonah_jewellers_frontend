"use client"
import React, { useEffect, useState } from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import OrderStatsView from './_components/order-stats-view'
import OrderListFilterView from './_components/order-list-filter-view'
import OrderTableView from './_components/order-table-view'
import { OrderAnalyticsApi } from '@/lib/api/order/orderApis'

const OrdersPage = () => {

    const [analyticsData, setAnalyticsData] = useState<any>(null);

    const fetchAnalytics = async () => {
        try {
            const res = await OrderAnalyticsApi()
            if (res.status === 201) {
                setAnalyticsData(res.data)
            }
        } catch (error) {
            console.error("error:", error)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    return (
        <ListPageLayout
            title='Order Management'
            description='Handling and tracking all customer orders efficiently, from placement to fulfillment'
        >
            <OrderStatsView analyticsData={analyticsData} />
            <div className="space-y-5">
                <OrderListFilterView />
                <OrderTableView />
            </div>
        </ListPageLayout>
    )
}

export default OrdersPage