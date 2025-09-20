"use client"

import { BiCopy } from "react-icons/bi"
import NotificationPopup from "../ui/NotifiicationPopup"
import { useState } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { RiQrScan2Line } from "react-icons/ri";


interface QRCodeSectionProps {
  onPaymentMade: () => void
}

export function QRCodeSection({ onPaymentMade }: QRCodeSectionProps) {
  const [copyCode, setCopyCode] = useState(false);

  const paymentId = "jonahjewellers@paytm"

  const copyPaymentId = () => {
    navigator.clipboard.writeText(paymentId)
    setCopyCode(true);
    setTimeout(() => setCopyCode(false), 2000);
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-1">
        <MdOutlineQrCodeScanner size={20} />
        <h2 className="text-lg font-medium text-gray-900 font-nunito">Scan QR Code</h2>
      </div>

      <p className="text-[#7D7D7D] mb-6 font-nunito">Scan. Pay. Done. UPI — India’s fastest way to pay!</p>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-48 h-48 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2 p-4">
              <div className="w-8 h-8 bg-white rounded"></div>
              <div className="w-8 h-8 bg-white rounded"></div>
              <div className="w-8 h-8 bg-white rounded opacity-60"></div>
              <div className="w-8 h-8 bg-white rounded"></div>
              <div className="w-8 h-8 bg-white rounded opacity-40"></div>
              <div className="w-8 h-8 bg-white rounded"></div>
              <div className="w-8 h-8 bg-white rounded opacity-80"></div>
              <div className="w-8 h-8 bg-white rounded"></div>
              <div className="w-8 h-8 bg-white rounded"></div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Tap to scan</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-gray-600">Pay to: {paymentId}</span>
        <button onClick={copyPaymentId} className="p-1 hover:bg-gray-100 rounded">
          <BiCopy className="w-4 h-4 text-gray-500" />
        </button>
        <NotificationPopup
          message="Copied UPI id"
          visible={copyCode}
          className="bg-green-500 text-white"
        />

      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <RiQrScan2Line />

          <h3 className="font-medium text-gray-900 font-nunito">How to pay</h3>
        </div>
        <ol className="text-sm text-[#7D7D7D] space-y-1 font-nunito ">
          <li>1. Open your UPI app (Google Pay, PhonePe, etc.)</li>
          <li>2. Tap "Scan & Pay" or QR scanner</li>
          <li>3. Scan the QR code above</li>
          <li>4. Verify amount and complete payment</li>
        </ol>
      </div>

      <button
        onClick={onPaymentMade}
        className="w-full bg-brand hover:bg-brandDark text-white font-medium py-3 px-4 rounded-lg transition-colors font-besley"
      >
        I've made the payment
      </button>
    </div>
  )
}
