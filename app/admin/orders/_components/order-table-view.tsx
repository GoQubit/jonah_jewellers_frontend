"use client"

import DataTable, { useDataTable } from '@/components/data-table'
import React from 'react'
import { orderListData, orderTableColumns } from '../const'

type Props = {}

const OrderTableView = (props: Props) => {

    const { table } = useDataTable({
        data: orderListData,
        columns: orderTableColumns,
        pageCount: 5,
        state: {
            pagination: { pageIndex: 0, pageSize: 10 },
        },
    })

    return (
        <DataTable
            table={table}
            message={"No orders found"}
            className={"w-full flex flex-col border-b-4 rounded"}
        />
    )
}

export default OrderTableView