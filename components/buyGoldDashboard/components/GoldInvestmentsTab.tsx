"use client"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { Loader } from "@/components/ui/Loader/Loader"
import { Pagination } from "@/components/ui/Pagination"
import { getGoldInvestmentsApi } from "@/lib/api/goldWalletApis/goldInvestmentApis"
import { GoldInvestment } from "@/types/goldWalletType"
import { formatDate } from "@/utils/formatDate"
import { useEffect, useState } from "react"

const INVESTMENTS_PAGE_SIZE = 10

export function GoldInvestmentsTab({ refreshKey }: { refreshKey: number }) {
  const [investments, setInvestments] = useState<GoldInvestment[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchGoldInvestments = async (pageNumber: number) => {
    try {
      setLoading(true)
      const params = { limit: INVESTMENTS_PAGE_SIZE, page: pageNumber, sortBy: "-createdAt" }
      const res = await getGoldInvestmentsApi(params)
      if (res?.status === 200) {
        setInvestments(res.data?.results || [])
        setTotalPages(res.data?.totalPages || 1)
      }
    } catch (error) {
      console.error("error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGoldInvestments(page)
  }, [refreshKey, page])

  if (loading) {
    return (
      <div className="w-full h-[300px]">
        <Loader size="md" />
      </div>
    )
  }

  if (!loading && investments.length === 0) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center text-xl font-medium">
        No Gold Purchases Yet
      </div>
    )
  }

  return (
    <Card className="py-0">
      <CardContent className="px-4">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-5 text-gray-700 border-b border-gray-200 py-4">
              <p className="font-semibold">Title</p>
              <p className="text-center font-semibold">Date</p>
              <p className="text-center font-semibold">Gold Assigned</p>
              <p className="text-center font-semibold">Status</p>
              <p className="text-center font-semibold">Amount</p>
            </div>

            {investments.map((investment, index) => (
              <div
                key={investment.id}
                className="grid grid-cols-5 items-center py-4 border-b border-gray-100 last:border-b-0"
              >
                <p>Gold Purchase-{index + 1}</p>

                <p className="text-center text-gray-800 font-medium">
                  {formatDate(investment.createdAt)}
                </p>

                <p className="text-center text-gray-800 font-medium">
                  {investment.goldAssigned?.toFixed(3)}gm
                </p>

                <div className="text-center">
                  <Badge
                    variant={
                      investment.status === "SUCCESS"
                        ? "success"
                        : investment.status === "PENDING"
                          ? "pending"
                          : "failed"
                    }
                  >
                    {investment.status}
                  </Badge>
                </div>

                <p className="text-center text-amber-600 font-semibold">
                  ₹{investment.amount?.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </CardContent>
    </Card>
  )
}
