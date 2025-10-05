"use client"

import React from 'react'
import DataTable, { useDataTable } from '@/components/data-table'
import { transactionListData} from '../const'
import { transactionTableColumns } from './transaction-list-column'


type Props = {}

const TransactionTableView = (props: Props) => {

    const { table } = useDataTable({
        data: transactionListData,
        columns: transactionTableColumns,
        pageCount: 5,
        state: {
            pagination: { pageIndex: 0, pageSize: 10 },
        },
    })

    return (
        <DataTable
            table={table}
            message={"No transaction found"}
            className={"w-full flex flex-col border-b-4 rounded"}
        />
    )
}

export default TransactionTableView