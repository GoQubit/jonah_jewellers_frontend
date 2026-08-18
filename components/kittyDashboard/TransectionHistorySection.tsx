"use client"

import { AiFillGolden } from "react-icons/ai"
import { Card } from "../ui/Card"
import { useEffect, useState } from "react"
import { getUserQRTransactionApi } from "@/lib/api/kittyApis/kittyApis"
import { formatDate } from "@/utils/formatDate"


interface Transaction {
  id: string
  title: string
  date: string
  amount: number
  type: "investment" | "withdrawal" | "purchase"
}

export function TransectionHistorySection() {

  const [QRTransaction, setQRTransaction] = useState([])

  const fetchTransaction = async () => {
    try {
      const res = await getUserQRTransactionApi()
      if (res.status === 200) {
        setQRTransaction(res?.data?.results)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    fetchTransaction()
  }, [])


  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {QRTransaction.length > 0 && QRTransaction.map((transaction: any, index: number) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-amber-100 rounded-full">
                <AiFillGolden className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-medium text-start text-gray-900">Transaction Id</h3>
                <p className="font-semibold text-brand">{transaction.transactionId}</p>
              </div>
            </div>
            <div className="text-right ">
              <p className="text-sm text-left text-gray-500">
                {formatDate(transaction.createdAt || '')}
              </p>
            </div>
            <div className="text-right ">
              <p className="font-semibold text-brand">{transaction.status}</p>
            </div>
            <div className="text-right ">
              <p className="font-semibold text-brand">{formatCurrency(transaction.amount)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}