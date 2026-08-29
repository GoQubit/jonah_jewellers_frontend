"use client"
import DataTable, { useDataTable } from '@/components/data-table'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getBuyerUserListApi } from '@/lib/api/admin/buyerUserAdminApi'
import { getKittyMembersTableColumns } from './kitty-members-list-column'

type initialMembers = { isLoading: boolean, data: null | any, error: null | string }
const initialMembers: initialMembers = { isLoading: false, data: null, error: null }

const KittyMembersTableView = () => {

  const searchParams = useSearchParams()
  const [membersData, setMembersData] = useState(initialMembers)

  const fetchKittyMembers = async () => {
    setMembersData({ ...initialMembers, isLoading: true })

    try {
      const queryParams = {
        limit: 20,
        page: searchParams.get("page") || "1",
        sortBy: "-createdAt",
      }

      const response = await getBuyerUserListApi(queryParams)
      if (response.status === 200) {
        setMembersData(s => ({ ...s, data: response.data, error: null }))
      } else {
        throw new Error(response?.data?.message || response?.data?.error || "Couldn't load kitty members!")
      }
    } catch (e: any) {
      setMembersData(s => ({ ...s, error: e?.message || "Something went wrong!", data: null }))
    } finally {
      setMembersData(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    fetchKittyMembers()
  }, [searchParams])

  const columns = getKittyMembersTableColumns();

  const { table } = useDataTable({
    data: membersData?.data?.results || [],
    columns: columns,
    pageCount: membersData?.data?.totalPages || 1,
    state: {
      pagination: { pageIndex: 0, pageSize: 20 },
    },
  })

  return (
    <DataTable
      table={table}
      totalResults={membersData?.data?.totalResults}
      message={"No kitty members found"}
      className={"w-full flex flex-col border-b-4 rounded"}
    />
  )
}

export default KittyMembersTableView
