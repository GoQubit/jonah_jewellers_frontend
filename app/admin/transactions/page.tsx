"use client"
import React, { useEffect, useState } from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import TransactionStatsView from './_components/transaction-stats-view'
import TransactionTableView from './_components/transaction-table-view'
import TransactionListFilterView from './_components/transaction-list-filter-view'
import { getTransactionAnalyticsApi } from '@/lib/api/admin/transactionAnalyticsApi'

const TransactionsPage = () => {
    const [transactionAnalytics, setTransactionAnalytics] = useState(null)

    const fetchAnalytics = async () => {
        try {
            const res = await getTransactionAnalyticsApi()
            if (res.status === 200) {
                setTransactionAnalytics(res.data)
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
            title='Transactions'
            description='Monitor and manage all financial transactions'
        >
            <TransactionStatsView transactionAnalytics={transactionAnalytics} />

            <div className="space-y-5">
                <TransactionListFilterView />
                <TransactionTableView />
            </div>
        </ListPageLayout>
    )
}

export default TransactionsPage