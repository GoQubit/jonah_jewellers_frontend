"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PageHeader } from "../ui/PageHeader"
import { QRCodeSection } from "./QRCodeSection"
import { PaymentSummary } from "./PaymentSummary"
import { PaymentConfirmationModal } from "./PaymentConfirmationModal"
import Modal from "../ui/Modal"
import RecievedPaymentPopup from "./RecievedPaymentPopup"
import { QRTransectionApi } from "@/lib/api/transection/qrTransectionApi"
import { todayDate } from "@/utils/todayDate"
import { kittyTransectionApi } from "@/lib/api/kittyApis/kittyApis"
import { createSellerInvestmentApi } from "@/lib/api/sellerApis/sellerInvestmentsApis"
import Toast from "../Toast/Toast"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function PaymentGatewayPage() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const gold = useSelector((state: RootState) => state.materials.gold)
  const router = useRouter()
  const searchParams = useSearchParams()
  const goldRate = gold?.price // Rate in INR
  console.log("");
  

  const paymentData = {
    planCategory: searchParams.get("planCategory") || "kitty",
    kittyId: searchParams.get("kittyId") || "",
    plan: searchParams.get("plan") || "12 Months",
    planTitle: "Kitty Investment Plan",
    monthlyAmount: Number.parseInt(searchParams.get("monthlyAmount") || "0"),
    investmentAmount: Number.parseInt(searchParams.get("investmentAmount") || "0"),
    gold: searchParams.get("gold") || "0",
    goldRate: goldRate,
    duration: searchParams.get("duration") || "",
    startDate: todayDate(),
    totalValue: Number.parseInt(searchParams.get("totalValue") || "0"),
    savings: Number.parseInt(searchParams.get("savings") || "0"),
    amountToPay: Number.parseInt(searchParams.get("amountToPay") || "0"),
  }

  const handlePaymentMade = async () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmPayment = async (transactionId: string, fileUrl: string) => {
    if (paymentData.planCategory === 'kitty') {
      const payload = {
        amount: paymentData.monthlyAmount,
        transactionId: transactionId,
        kittyEnrolledId: paymentData.kittyId,
        proofImage: fileUrl
      }
      // const res = await QRTransectionApi(payload)
      const res = await kittyTransectionApi(payload)
      if (res.status === 201) {
        setShowConfirmationModal(false)
        setShowSuccessModal(true)
      } else {
        Toast.error("Something went wrong please try again")
      }
    } else {
      const payload = {
        amount: paymentData.investmentAmount,
        transactionId: transactionId,
        proofImage: fileUrl
      }
      // const res = await QRTransectionApi(payload)
      const res = await createSellerInvestmentApi(payload)
      if (res.status === 200) {
        setShowConfirmationModal(false)
        setShowSuccessModal(true)
      } else {
        Toast.error("Something went wrong please try again")
      }
    }

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
          <Modal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            isShowCloseBtn={false}
          >
            <RecievedPaymentPopup
              planCategory={paymentData.planCategory}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}
