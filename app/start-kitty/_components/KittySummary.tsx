import { TbCalculator } from "react-icons/tb"

interface KittySummaryProps {
  monthlyAmount: number
  planDuration: string
  payMonths: number
  totalPayable: number
  totalValue: number
  directSavings: number
  totalSavings: number
}

export function KittySummary({
  monthlyAmount,
  planDuration,
  payMonths,
  totalPayable,
  totalValue,
  directSavings,
  totalSavings,
}: KittySummaryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-auto ">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
          <TbCalculator size={18} />
        </div>
        <h2 className="text-lg font-medium text-gray-900 font-nunito">Kitty Summary</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Monthly Amount</div>
          <div className="text-lg font-semibold text-blue-600">₹{monthlyAmount.toLocaleString()}</div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Plan Duration</div>
          <div className="text-lg font-semibold text-purple-600">{planDuration}</div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">You Pay For:</span>
          <span className="text-blue-600 font-medium">{payMonths} Months</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Total Value:</span>
          <span className="font-medium ">₹{totalValue.toLocaleString()}</span>
        </div>

        {
          payMonths === 11 &&
          <div className="flex justify-between">
            <span className="text-gray-600">Direct Savings:</span>
            <span className="text-green-600 font-medium">₹{directSavings.toLocaleString()}</span>
          </div>
        }

        <div className="flex justify-between">
          <span className="text-gray-600">Total Payable:</span>
          <span className="font-medium">₹{totalPayable.toLocaleString()}</span>
        </div>

      </div>

      {
        payMonths === 11 &&
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-green-800 font-medium">Total Savings</span>
            <span className="text-green-600 font-bold text-lg">₹{totalSavings.toLocaleString()}</span>
          </div>
        </div>
      }
    </div>
  )
}
