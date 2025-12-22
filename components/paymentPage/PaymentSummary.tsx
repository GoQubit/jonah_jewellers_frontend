import { FaArrowTrendUp } from "react-icons/fa6"

interface PaymentData {
  plan: string
  planCategory: string
  planTitle: string
  monthlyAmount: number
  investmentAmount: number
  gold: any
  goldRate: any
  duration: string
  startDate: string
  totalValue: number
  savings: number
  amountToPay: number
}

interface PaymentSummaryProps {
  paymentData: PaymentData
}

export function PaymentSummary({ paymentData }: PaymentSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-6">
        <FaArrowTrendUp size={20} />

        <h2 className="text-lg font-medium text-gray-900 font-nunito">Payment Summary</h2>
      </div>

      {
        paymentData.planCategory === 'kitty' ?
          <div className="bg-[#FFFBEA] border border-brand rounded-lg p-4 mb-6">
            <div className="space-y-2 gap-2 mb-4">
              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Plan Duration:</span>
                <span className="font-medium text-brand">{paymentData.plan}</span>
              </div>
              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Plan Title:</span>
                <span className="font-medium">{paymentData.planTitle}</span>
              </div>
              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Start Date:</span>
                <span className="font-medium">{paymentData.startDate}</span>
              </div>
              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Monthly Amount:</span>
                <span className="font-medium">₹{paymentData.monthlyAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between" >
                <span className="text-sm font-bold">Total Payable:</span>
                <span className="font-bold">₹{paymentData.totalValue - paymentData.savings}</span>
              </div>

              {
                paymentData.savings > 0 &&
                <div className="flex justify-between text-[#45B629]" >
                  <span className="text-sm ">Your Savings on this plan:</span>
                  <span className="font-medium">₹{paymentData.savings}</span>
                </div>
              }

              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Total Value:</span>
                <span className="font-medium">₹{paymentData.totalValue.toLocaleString()}</span>
              </div>
            </div>


            <hr className="border-orange-200 mb-4" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-brand">Amount to Pay:</span>
              <span className="text-xl font-bold text-brand">₹{paymentData.monthlyAmount.toLocaleString()}</span>
            </div>
          </div>
          :
          <div className="bg-[#FFFBEA] border border-brand rounded-lg p-4 mb-6">
            <div className="space-y-2 gap-2 mb-4">

              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Plan Title:</span>
                <span className="font-medium">Gold Investment Plan</span>
              </div>
              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Current Gold Rate:</span>
                <span className="font-medium">{paymentData.goldRate}</span>
              </div>
              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]"> Gold Gram:</span>
                <span className="font-medium">{paymentData.gold}gm</span>
              </div>
              <div className="flex justify-between" >
                <span className="text-sm text-[#818181]">Start Date:</span>
                <span className="font-medium">{paymentData.startDate}</span>
              </div>
            </div>
            <hr className="border-orange-200 mb-4" />
            <div className="flex justify-between items-center">
              <span className="font-semibold text-brand">Amount to Pay:</span>
              <span className="text-xl font-bold text-brand">₹{paymentData.investmentAmount.toLocaleString()}</span>
            </div>
          </div>

      }

      <div className="bg-[#EFF6FF] border border-[#2568C0] rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2568C0] rounded-full flex items-center justify-center">
            <span className="text-white text-sm">?</span>
          </div>
          <div>
            <div className="font-semibold text-[#2568C0] mb-1">Need Help?</div>
            <div className="text-sm text-[#2568C0]">support@jonahjewels.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
