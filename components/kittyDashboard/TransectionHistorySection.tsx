"use client"

import { AiFillGolden } from "react-icons/ai"
import { Card } from "../ui/Card"
import { useEffect, useState } from "react"
import { getKittyTransactionsApi } from "@/lib/api/kittyApis/kittyApis"
import { formatDate } from "@/utils/formatDate"
import { Pagination } from "../ui/Pagination"
import { cn } from "@/utils/cn"

const TRANSACTIONS_PAGE_SIZE = 10

const statusStyles: Record<string, string> = {
  SUCCESS: "text-green-600",
  PENDING: "text-yellow-500",
  FAILED: "text-red-600",
}

export function TransectionHistorySection() {

  const [kittyTransactions, setKittyTransactions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchTransaction = async (pageNumber: number) => {
    try {
      const params = { limit: TRANSACTIONS_PAGE_SIZE, page: pageNumber, sortBy: "-createdAt" }
      const res = await getKittyTransactionsApi(params)
      if (res?.status === 200) {
        setKittyTransactions(res?.data?.results || [])
        setTotalPages(res?.data?.totalPages || 1)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    fetchTransaction(page)
  }, [page])


  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {kittyTransactions.length > 0 && kittyTransactions.map((transaction: any) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-amber-100 rounded-full">
                <AiFillGolden className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-medium text-start text-gray-900">Installment #{transaction.installmentNumber}</h3>
                <p className="font-semibold text-brand">{transaction.razorpayPaymentId || "Pending"}</p>
              </div>
            </div>
            <div className="text-right ">
              <p className="text-sm text-left text-gray-500">
                {formatDate(transaction.createdAt || '')}
              </p>
            </div>
            <div className="text-right ">
              <p className={cn("font-semibold", statusStyles[transaction.status] || "text-brand")}>
                {transaction.status}
              </p>
            </div>
            <div className="text-right ">
              <p className="font-semibold text-brand">{formatCurrency(transaction.amount)}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />
    </Card>
  )
}
