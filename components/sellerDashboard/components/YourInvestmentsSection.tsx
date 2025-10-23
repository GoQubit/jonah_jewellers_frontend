"use client"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"
import { Loader } from "@/components/ui/Loader/Loader"
import { getSellerInvestmentsApi } from "@/lib/api/sellerApis/sellerInvestmentsApis"
import { useEffect, useState } from "react"
import { AiFillGolden } from "react-icons/ai"

export interface InvestmentType {
  amount: number
  goldAssigned: number
  goldRate: number
  qrTransactionId: number
  transactionStatus: string
  userId: number
  userType: string
  id: string
}

export function YourInvestmentsTab() {
  const [investments, setInvestments] = useState<InvestmentType[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSellerIvestments = async () => {
    try {
      setLoading(true)
      const res = await getSellerInvestmentsApi()
      if (res.status === 200) {
        setInvestments(res.data?.results)
      }
    } catch (error) {
      console.error("error", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSellerIvestments()
  }, [])

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="w-full h-[300px]">
        <Loader size="md" />
      </div>
    )
  }

  // ❌ No items found
  if (!loading && investments.length === 0) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center text-xl font-medium">
        No Item Found
      </div>
    )
  }


  return (
    <Card className="py-0">
      <CardContent className="px-4">
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px] ">
            {/* ✅ Table Header */}
            <div className="grid grid-cols-5 text-gray-700 border-b border-gray-200 py-4  ">
              <p className="font-semibold">Title</p>
              <p className="text-center font-semibold">Transaction ID</p>
              <p className="text-center font-semibold">Assigned Gold</p>
              <p className="text-center font-semibold">Status</p>
              <p className="text-center font-semibold">Amount</p>
            </div>

            {/* ✅ Table Rows */}
            {investments.map((investment: InvestmentType, index: number) => (
              <div
                key={investment.id}
                className="grid grid-cols-5 items-center py-4 border-b border-gray-100 last:border-b-0"
              >
                {/* Investment Title */}
                <div className="flex items-center gap-3">
                  {/* <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <AiFillGolden size={20} className="text-amber-600" />
                    </div> */}
                  <p className="">
                    Investment-{index + 1}
                  </p>
                </div>

                {/* Transaction ID */}
                <p className="text-center text-gray-800 font-medium">
                  {investment.qrTransactionId}
                </p>

                {/* Transaction ID */}
                <p className="text-center text-gray-800 font-medium">
                  {investment.goldAssigned.toFixed(3)}gm
                </p>

                {/* Status */}
                <div className="text-center">
                  <Badge
                    variant={
                      investment.transactionStatus === "SUCCESS"
                        ? "success"
                        : investment.transactionStatus === "PENDING"
                          ? "pending"
                          : "failed"
                    }
                  >
                    {investment.transactionStatus}
                  </Badge>
                </div>

                {/* Amount */}
                <p className="text-center text-amber-600 font-semibold">
                  ₹{investment.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
