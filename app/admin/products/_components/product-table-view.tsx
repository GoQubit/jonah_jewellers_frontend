"use client"

import React from 'react'
import DataTable, { useDataTable } from '@/components/data-table'
import { productListData} from '../const'
import { productTableColumns } from './product-list-column'


type Props = {}

const ProductTableView = (props: Props) => {

    const { table } = useDataTable({
        data: productListData,
        columns: productTableColumns,
        pageCount: 5,
        state: {
            pagination: { pageIndex: 0, pageSize: 10 },
        },
    })

    return (
        <DataTable
            table={table}
            message={"No product found"}
            className={"w-full flex flex-col border-b-4 rounded"}
        />
    )
}

export default ProductTableView