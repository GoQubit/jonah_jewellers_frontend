"use client"
import DataTable, { useDataTable } from '@/components/data-table'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getGoldWithdrawalsAdminApi } from '@/lib/api/admin/goldWithdrawalAdminApi'
import { getGoldWithdrawalsTableColumns } from './gold-withdrawals-list-column'

type initialWithdrawals = { isLoading: boolean, data: null | any, error: null | string }
const initialWithdrawals: initialWithdrawals = { isLoading: false, data: null, error: null }

const GoldWithdrawalsTableView = () => {

  const searchParams = useSearchParams()
  const [withdrawalsData, setWithdrawalsData] = useState(initialWithdrawals)

  const fetchGoldWithdrawals = async () => {
    setWithdrawalsData({ ...initialWithdrawals, isLoading: true })

    try {
      const queryParams = {
        status: "PENDING_ADMIN",
        limit: 20,
        page: searchParams.get("page") || "1",
      }

      const response = await getGoldWithdrawalsAdminApi(queryParams)
      if (response.status === 200) {
        setWithdrawalsData(s => ({ ...s, data: response.data, error: null }))
      } else {
        throw new Error(response?.data?.message || response?.data?.error || "Couldn't load withdrawal requests!")
      }
    } catch (e: any) {
      setWithdrawalsData(s => ({ ...s, error: e?.message || "Something went wrong!", data: null }))
    } finally {
      setWithdrawalsData(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    fetchGoldWithdrawals()
  }, [searchParams])

  const columns = getGoldWithdrawalsTableColumns(fetchGoldWithdrawals);

  const { table } = useDataTable({
    data: withdrawalsData?.data?.results || [],
    columns: columns,
    pageCount: withdrawalsData?.data?.totalPages || 1,
    state: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  })

  return (
    <DataTable
      table={table}
      totalResults={withdrawalsData?.data?.totalResults}
      message={"No pending gold withdrawal requests"}
      className={"w-full flex flex-col border-b-4 rounded"}
    />
  )
}

export default GoldWithdrawalsTableView
