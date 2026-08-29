"use client"

import { MdOutlinePayments } from "react-icons/md"
import { RiShieldCheckLine } from "react-icons/ri"

interface RazorpayPaySectionProps {
  amount: number
  isProcessing: boolean
  onPay: () => void
}

export function RazorpayPaySection({ amount, isProcessing, onPay }: RazorpayPaySectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-1">
        <MdOutlinePayments size={20} />
        <h2 className="text-lg font-medium text-gray-900 font-nunito">Pay Securely with Razorpay</h2>
      </div>

      <p className="text-[#7D7D7D] mb-6 font-nunito">
        Cards, UPI, netbanking &amp; wallets — your payment is verified automatically, instantly.
      </p>

      <div className="flex justify-center mb-6">
        <div className="w-48 h-48 bg-[#FFFBEA] border border-brand rounded-lg flex flex-col items-center justify-center gap-2">
          <MdOutlinePayments size={56} className="text-brand" />
          <span className="text-brand font-semibold font-nunito">₹{amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <RiShieldCheckLine />
          <h3 className="font-medium text-gray-900 font-nunito">How it works</h3>
        </div>
        <ol className="text-sm text-[#7D7D7D] space-y-1 font-nunito">
          <li>1. Click "Pay Now" below</li>
          <li>2. Complete the payment on the Razorpay checkout window</li>
          <li>3. Your payment is verified automatically — no manual steps needed</li>
        </ol>
      </div>

      <button
        onClick={onPay}
        disabled={isProcessing}
        className={`w-full font-medium py-3 px-4 rounded-lg transition-colors font-besley text-white ${
          isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-brand hover:bg-brandDark"
        }`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </span>
        ) : (
          `Pay ₹${amount.toLocaleString()} Now`
        )}
      </button>
    </div>
  )
}
