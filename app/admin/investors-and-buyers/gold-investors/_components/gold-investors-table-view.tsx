"use client"
import DataTable, { useDataTable } from '@/components/data-table'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getSellerUserListApi } from '@/lib/api/admin/buyerUserAdminApi'
import { getGoldInvestorsTableColumns } from './gold-investors-list-column'

type initialInvestors = { isLoading: boolean, data: null | any, error: null | string }
const initialInvestors: initialInvestors = { isLoading: false, data: null, error: null }

const GoldInvestorsTableView = () => {

  const searchParams = useSearchParams()
  const [investorsData, setInvestorsData] = useState(initialInvestors)

  const fetchGoldInvestors = async () => {
    setInvestorsData({ ...initialInvestors, isLoading: true })

    try {
      const queryParams = {
        limit: 20,
        page: searchParams.get("page") || "1",
        sortBy: "-createdAt",
      }

      const response = await getSellerUserListApi(queryParams)
      if (response.status === 200) {
        setInvestorsData(s => ({ ...s, data: response.data, error: null }))
      } else {
        throw new Error(response?.data?.message || response?.data?.error || "Couldn't load gold investors!")
      }
    } catch (e: any) {
      setInvestorsData(s => ({ ...s, error: e?.message || "Something went wrong!", data: null }))
    } finally {
      setInvestorsData(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    fetchGoldInvestors()
  }, [searchParams])

  const columns = getGoldInvestorsTableColumns();

  const { table } = useDataTable({
    data: investorsData?.data?.results || [],
    columns: columns,
    pageCount: investorsData?.data?.totalPages || 1,
    state: {
      pagination: { pageIndex: 0, pageSize: 20 },
    },
  })

  return (
    <DataTable
      table={table}
      totalResults={investorsData?.data?.totalResults}
      message={"No gold investors found"}
      className={"w-full flex flex-col border-b-4 rounded"}
    />
  )
}

export default GoldInvestorsTableView
