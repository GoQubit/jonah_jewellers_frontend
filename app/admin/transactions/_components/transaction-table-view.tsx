"use client"

import React, { useEffect, useState } from 'react'
import DataTable, { useDataTable } from '@/components/data-table'
import { transactionListData } from '../const'
import { transactionTableColumns } from './transaction-list-column'
import { getQRTransectionApi } from '@/lib/api/transection/qrTransectionApi'
import { useSearchParams } from 'next/navigation'

type initialTransection = { isLoading: boolean, data: null | any, error: null | string }
const initialTransection: initialTransection = { isLoading: false, data: null, error: null }


type Props = {}

const TransactionTableView = (props: Props) => {
    const searchParams = useSearchParams()
    const [QRTransectionData, setQRTransectionData] = useState(initialTransection)

    const fetchQRTransections = async () => {
        setQRTransectionData({ ...initialTransection, isLoading: true })

        try {
            const queryParams = {
                status: "SUCCESS",
                limit: 20,
                page: searchParams.get("page") || "1",
                q: searchParams.get("search") || "",
                fromDate: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate")!) : undefined,
                toDate: searchParams.get("toDate") ? new Date(searchParams.get("toDate")!) : undefined,
            }

            const response = await getQRTransectionApi(queryParams)
            if (response.status === 200) {
                setQRTransectionData(s => ({ ...s, data: response.data, error: null }))
            } else {
                throw new Error(response?.data?.message || response?.data?.error || "Products doesn't exists!")
            }
        } catch (e: any) {
            setQRTransectionData(s => ({ ...s, error: e?.message || "Something went wrong!", data: null }))
        } finally {
            setQRTransectionData(s => ({ ...s, isLoading: false }))
        }
    }

    useEffect(() => {
        fetchQRTransections()
    }, [searchParams])


    const { table } = useDataTable({
        data: QRTransectionData?.data?.results || [],
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