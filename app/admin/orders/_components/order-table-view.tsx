"use client"

import React, { useEffect, useState } from 'react'
import DataTable, { useDataTable } from '@/components/data-table'
import { getOrderTableColumns } from './order-list-columns'
import { useSearchParams } from 'next/navigation'
import { getAllOrdersAdminApi } from '@/lib/api/order/orderApis'
import { OrderStatus } from '../types'
import { Loader } from '@/components/ui/Loader/Loader'

type Props = {}

type InitialOrders = { isLoading: boolean, data: null | any, error: null | string }
const initialOrders: InitialOrders = { isLoading: false, data: null, error: null }

const OrderTableView = (props: Props) => {

    const searchParams = useSearchParams()
    const [orders, setOrders] = useState(initialOrders)

    const getOrders = async () => {
        setOrders({ ...initialOrders, isLoading: true })
        try {
            const queryParams = {
                limit: 20,
                page: searchParams.get("page") || "1",
                q: searchParams.get("search") || "",
                status: (searchParams.get("status") as OrderStatus) || "",
                startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined,
                endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined,
            }
            const response = await getAllOrdersAdminApi(queryParams)
            if (response.status === 201) {
                setOrders(s => ({ ...s, data: response.data, error: null }))
            } else {
                throw new Error(response?.data?.message || response?.data?.error || "Orders doesn't exists!")
            }
        } catch (e: any) {
            setOrders(s => ({ ...s, error: e?.message || "Something went wrong!", data: null }))
        } finally {
            setOrders(s => ({ ...s, isLoading: false }))
        }
    }

    useEffect(() => {
        getOrders()
    }, [searchParams])

    const orderTableColumns = getOrderTableColumns(getOrders)

    const { table } = useDataTable({
        data: orders?.data?.results || [],
        columns: orderTableColumns,
        pageCount: orders?.data?.totalPages,
        state: {
            pagination: { pageIndex: 0, pageSize: orders?.data?.limit },
        },
    })

    if (orders.isLoading) {
        return (
            <Loader />
        )
    }

    if (orders.error) {
        return (
            <div>{orders.error}</div>
        )
    }

    return (
        <DataTable
            table={table}
            totalResults={orders?.data?.totalResults || 1}
            message={"No orders found"}
            className={"w-full flex flex-col border-b-4 rounded"}
        />
    )
}

export default OrderTableView