"use client"

import { AiFillGolden } from "react-icons/ai"
import { Card } from "../ui/Card"


interface Transaction {
  id: string
  title: string
  date: string
  amount: number
  type: "investment" | "withdrawal" | "purchase"
}

export function TransectionHistorySection() {
  const transactions: Transaction[] = [
    {
      id: "1",
      title: "kitty Investment 01",
      date: "Aug 1, 2025",
      amount: 10000,
      type: "investment",
    },
    {
      id: "2",
      title: "Gold Investment #2",
      date: "Aug 1, 2025",
      amount: 10000,
      type: "investment",
    },
    {
      id: "3",
      title: "Gold Investment #3",
      date: "Aug 1, 2025",
      amount: 10000,
      type: "investment",
    },
  ]

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-amber-100 rounded-full">
                <AiFillGolden className="h-5 w-5 text-brand" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{transaction.title}</h3>
                <p className="text-sm text-left text-gray-500">{transaction.date}</p>
              </div>
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