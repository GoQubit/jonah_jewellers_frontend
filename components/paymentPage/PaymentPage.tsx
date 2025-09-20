"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PageHeader } from "../ui/PageHeader"
import { QRCodeSection } from "./QRCodeSection"
import { PaymentSummary } from "./PaymentSummary"
import { PaymentConfirmationModal } from "./PaymentConfirmationModal"
import Modal from "../ui/Modal"
import RecievedPaymentPopup from "./RecievedPaymentPopup"

export default function PaymentGatewayPage() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const goldRate = 6500 // Example rate in INR

  const paymentData = {
    planCategory: searchParams.get("planCategory") || "kitty",
    plan: searchParams.get("plan") || "12 Months",
    planTitle: "Kitty Investment Plan",
    monthlyAmount: Number.parseInt(searchParams.get("monthlyAmount") || "5000"),
    investmentAmount: Number.parseInt(searchParams.get("investmentAmount") || "0"),
    gold: searchParams.get("gold") || "0",
    goldRate: goldRate,
    duration: searchParams.get("duration") || "12 Months",
    startDate: new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    totalValue: Number.parseInt(searchParams.get("totalValue") || "60000"),
    savings: Number.parseInt(searchParams.get("savings") || "5000"),
    amountToPay: Number.parseInt(searchParams.get("amountToPay") || "55000"),
  }

  const handlePaymentMade = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmPayment = (transactionId: string) => {
    console.log("[v0] Payment confirmed with transaction ID:", transactionId)
    setShowConfirmationModal(false)
    setShowSuccessModal(true)
    // router.push("/")
  }

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <PageHeader
          title="UPI Payment Gateway"
          subtitle="Secure • Fast • Reliable"
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <QRCodeSection onPaymentMade={handlePaymentMade} />
          <PaymentSummary paymentData={paymentData} />
        </div>

        {showConfirmationModal && (
          <Modal isOpen={showConfirmationModal} onClose={handleCancelConfirmation}>
            <PaymentConfirmationModal
              amount={paymentData.amountToPay}
              onConfirm={handleConfirmPayment}
              onCancel={handleCancelConfirmation}
            />
          </Modal>
        )}

        {showSuccessModal && (
          <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
            <RecievedPaymentPopup />
          </Modal>
        )}
      </div>
    </div>
  )
}
