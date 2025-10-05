import React from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import TransactionStatsView from './_components/transaction-stats-view'
import TransactionListFilterView from './_components/transaction-list-filter-view'
import TransactionTableView from './_components/transaction-table-view'

const TransactionsPage = () => {
    return (
        <ListPageLayout
            title='Transactions'
            description='Monitor and manage all financial transactions'
        >
            <TransactionStatsView />
            <div className="space-y-5">
                <TransactionListFilterView />
                <TransactionTableView />
            </div>
        </ListPageLayout>
    )
}

export default TransactionsPage