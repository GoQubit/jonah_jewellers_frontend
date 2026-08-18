"use client"
import React, { useEffect, useState } from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import InvestorsAndBuyersStatsView from './_components/investors-and-buyers-stats-view'
import InvestorsAndBuyersTabsView from './_components/investors-and-buyers-tabs-view'
import { kittyInvestmentDashboardAnalyticsApi } from '@/lib/api/kittyApis/kittyApis'

type Props = {
    children: React.ReactNode
}

const InvestorsAndBuyersLayout = ({ children }: Props) => {

    const [analyticsData, setAnalyticsData] = useState<any>(null);

    const fetchAnalytics = async () => {
        try {
            const res = await kittyInvestmentDashboardAnalyticsApi()
            if (res.status === 200) {
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
            title='Gold Investors & Kitty Members'
            description='Manage gold investors and kitty plan participants'
        >
            <InvestorsAndBuyersStatsView analyticsData={analyticsData}  />
            <InvestorsAndBuyersTabsView />
            {children}
        </ListPageLayout>
    )
}

export default InvestorsAndBuyersLayout