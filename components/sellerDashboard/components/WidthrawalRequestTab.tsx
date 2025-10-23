"use client"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { getWithdrawalsListApi } from "@/lib/api/sellerApis/withdrawalsApis"
import { formatDate } from "@/lib/formatDate"
import { useEffect, useState } from "react"
import { BiBarChart } from "react-icons/bi"
import { FaCircleCheck } from "react-icons/fa6"
import { FiAlertCircle } from "react-icons/fi"

interface WithdrawalRequestTabProps {
  onWithdrawalRequest: () => void
  availableToWithdraw: any
}

export function WithdrawalRequestTab({ onWithdrawalRequest, availableToWithdraw }: WithdrawalRequestTabProps) {

  const [withdrawalsList, setWithdrawalsList] = useState<any[]>([])

  useEffect(() => {

    (async () => {
      const res = await getWithdrawalsListApi()
      console.log("withdrawalsList", res.data);
      if (res.status === 200) {
        setWithdrawalsList(res?.data?.results)
      }
    })()

  }, [])


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Request Withdrawal Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {/* <Send className="w-5 h-5" /> */}
            Request Withdrawal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Total Profits Display */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-600 mb-1">₹{availableToWithdraw.toFixed(0)}</p>
            <p className="text-green-700 font-medium">Total Jewellery Profits</p>
          </div>

          {/* Withdrawal Process Info */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🛡️</span>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-2">Withdrawal Process</h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  All withdrawals are processed manually by our admin team. Submit your request below and you'll receive
                  payment via your preferred method within 24-48 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button onClick={onWithdrawalRequest} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3">
            Submit New Withdrawal Request
          </Button>
        </CardContent>
      </Card>

      {/* Pending Verifications Section */}
      <Card className=" !gap-3 ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BiBarChart className="w-5 h-5" />
            Withdrawals Request Verifications
          </CardTitle>
        </CardHeader>
        <CardContent className=" divide-y" >
          {
            withdrawalsList?.map((withdrawal, index) => (
              <div key={index} className="flex items-center justify-between py-2 bg-gray-50">
                <div className="flex items-center gap-3">
                  {
                    withdrawal.status === 'PENDING' ?
                      <FiAlertCircle className="w-8 h-8 text-brand" />
                      :
                      <FaCircleCheck className="w-8 h-8 text-green-500" />
                  }
                  <div>
                    <p className="font-semibold text-gray-900">₹{withdrawal.amount}</p>
                    <p className="text-sm text-gray-500">{formatDate(withdrawal.createdAt)}</p>
                  </div>
                </div>
                <Badge variant={withdrawal.status === "SUCCESS"
                  ? "success" : "pending"}>
                  {withdrawal.status === 'PENDING' ?
                    "Pending" : "Approved"
                  }
                </Badge>
              </div>
            ))
          }
        </CardContent>
      </Card>

    </div>
  )
}
