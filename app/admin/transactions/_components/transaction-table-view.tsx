"use client"

import React, { useEffect, useState } from 'react'
import DataTable, { useDataTable } from '@/components/data-table'
import { transactionTableColumns } from './transaction-list-column'
import { getTransactionsApi } from '@/lib/api/transection/transactionApi'
import { useSearchParams } from 'next/navigation'

type initialTransection = { isLoading: boolean, data: null | any, error: null | string }
const initialTransection: initialTransection = { isLoading: false, data: null, error: null }


type Props = {}

const TransactionTableView = (props: Props) => {
    const searchParams = useSearchParams()
    const [transactionData, setTransactionData] = useState(initialTransection)

    const fetchTransactions = async () => {
        setTransactionData({ ...initialTransection, isLoading: true })

        try {
            const queryParams = {
                status: searchParams.get("transactionStatus") || undefined,
                limit: 20,
                page: searchParams.get("page") || "1",
                q: searchParams.get("search") || "",
                startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined,
                endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined,
                sortBy: "-createdAt",
            }

            const response = await getTransactionsApi(queryParams)
            if (response.status === 200) {
                setTransactionData(s => ({ ...s, data: response.data, error: null }))
            } else {
                throw new Error(response?.data?.message || response?.data?.error || "Couldn't load transactions!")
            }
        } catch (e: any) {
            setTransactionData(s => ({ ...s, error: e?.message || "Something went wrong!", data: null }))
        } finally {
            setTransactionData(s => ({ ...s, isLoading: false }))
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [searchParams])


    const { table } = useDataTable({
        data: transactionData?.data?.results || [],
        columns: transactionTableColumns,
        pageCount: transactionData?.data?.totalPages || 1,
        state: {
            pagination: { pageIndex: 0, pageSize: 20 },
        },
    })

    return (
        <DataTable
            table={table}
            totalResults={transactionData?.data?.totalResults}
            message={"No transaction found"}
            className={"w-full flex flex-col border-b-4 rounded"}
        />
    )
}

export default TransactionTableView