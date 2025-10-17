"use client"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { BiBarChart } from "react-icons/bi"
import { FiAlertCircle } from "react-icons/fi"

interface WithdrawalRequestTabProps {
  onWithdrawalRequest: () => void
  availableToWithdraw: any
}

export function WithdrawalRequestTab({ onWithdrawalRequest, availableToWithdraw }: WithdrawalRequestTabProps) {
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
            <p className="text-3xl font-bold text-green-600 mb-1">₹{availableToWithdraw}</p>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BiBarChart className="w-5 h-5" />
            Pending Verifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="w-8 h-8 text-amber-500" />
              <div>
                <p className="font-semibold text-gray-900">₹25,000</p>
                <p className="text-sm text-gray-500">Aug 20, 2025</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Need to Verify
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
