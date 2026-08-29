"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { PageHeader } from "../ui/PageHeader"
import { RazorpayPaySection } from "./RazorpayPaySection"
import { PaymentSummary } from "./PaymentSummary"
import Modal from "../ui/Modal"
import RecievedPaymentPopup from "./RecievedPaymentPopup"
import { todayDate } from "@/utils/todayDate"
import { kittyTransectionApi } from "@/lib/api/kittyApis/kittyApis"
import { createSellerInvestmentApi } from "@/lib/api/sellerApis/sellerInvestmentsApis"
import { createGoldInvestmentApi } from "@/lib/api/goldWalletApis/goldInvestmentApis"
import { verifyRazorpayPaymentApi } from "@/lib/api/payment/paymentApis"
import { loadRazorpayScript } from "@/lib/razorpay/loadRazorpayScript"
import Toast from "../Toast/Toast"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export default function PaymentGatewayPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const gold = useSelector((state: RootState) => state.materials.gold)
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const searchParams = useSearchParams()
  const goldRate = gold?.price // Rate in INR

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
    totalValue: Number.parseInt(searchParams.get("monthlyAmount") || "0") * Number.parseInt(searchParams.get("duration") || '0'),
    savings: Number.parseInt(searchParams.get("savings") || "0"),
    amountToPay: Number.parseInt(searchParams.get("amountToPay") || "0"),
  }

  // Normalize category since some callers historically passed planCategory='kitty' (with quotes).
  const planCategory = paymentData.planCategory.replace(/'/g, "")

  // Kitty enrollment already creates the first installment + its Razorpay
  // order in one call (ProceedButton). If those made it into the URL, reuse
  // them instead of asking the backend to create a second, conflicting one.
  const prebuiltRazorpayOrderId = searchParams.get("razorpayOrderId") || ""
  const prebuiltKeyId = searchParams.get("keyId") || ""

  const amount =
    planCategory === "kitty" ? paymentData.monthlyAmount : paymentData.investmentAmount

  const openCheckoutAndVerify = (razorpayOrder: any, keyId: string) => {
    const options: any = {
      key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount ?? amount * 100,
      currency: razorpayOrder.currency || "INR",
      name: "Jonah Jewels",
      description:
        planCategory === "kitty"
          ? "Kitty Installment Payment"
          : planCategory === "gold"
          ? "Buy Pure Gold"
          : "Gold Investment",
      order_id: razorpayOrder.id,
      handler: async (response: any) => {
        try {
          const verifyRes = await verifyRazorpayPaymentApi({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          })

          if (verifyRes && verifyRes.status === 200 && verifyRes.data?.success) {
            setShowSuccessModal(true)
          } else {
            Toast.error(
              verifyRes?.data?.message || "Payment verification failed. Please contact support."
            )
          }
        } catch (err) {
          Toast.error("Something went wrong while verifying payment.")
        } finally {
          setIsProcessing(false)
        }
      },
      modal: {
        ondismiss: () => setIsProcessing(false),
      },
      prefill: {
        name: [user?.firstName, user?.lastName].filter(Boolean).join(" "),
        email: user?.email,
        contact: user?.mobileNumber,
      },
      notes: razorpayOrder.notes || {},
      theme: { color: "#F37254" },
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.on("payment.failed", () => {
      Toast.error("Payment failed! Please try again.")
      setIsProcessing(false)
    })
    rzp.open()
  }

  const handlePayNow = async () => {
    if (!amount || amount <= 0) {
      Toast.error("Invalid amount. Please go back and try again.")
      return
    }

    setIsProcessing(true)
    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        Toast.error("Failed to load Razorpay. Check your connection.")
        setIsProcessing(false)
        return
      }

      // Kitty's mandatory first installment: the order was already created
      // during enrollment (ProceedButton) — reuse it instead of creating a
      // second one, which the backend would reject as "already pending".
      if (planCategory === "kitty" && prebuiltRazorpayOrderId) {
        openCheckoutAndVerify(
          { id: prebuiltRazorpayOrderId, amount: amount * 100, currency: "INR" },
          prebuiltKeyId
        )
        return
      }

      // Every other case: create the pending record + its Razorpay order now.
      let createRes
      if (planCategory === "kitty") {
        createRes = await kittyTransectionApi({
          kittyEnrolledId: paymentData.kittyId,
          amount: paymentData.monthlyAmount,
        })
      } else if (planCategory === "gold") {
        createRes = await createGoldInvestmentApi({
          amount: paymentData.investmentAmount,
        })
      } else {
        createRes = await createSellerInvestmentApi({
          amount: paymentData.investmentAmount,
        })
      }

      if (
        !createRes ||
        (createRes.status !== 200 && createRes.status !== 201) ||
        !createRes.data?.razorpayOrder
      ) {
        Toast.error(
          createRes?.data?.message || "Failed to initiate payment. Please try again."
        )
        setIsProcessing(false)
        return
      }

      openCheckoutAndVerify(createRes.data.razorpayOrder, createRes.data.keyId)
    } catch (err) {
      Toast.error("Something went wrong!")
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <PageHeader
          title="Secure Payment"
          subtitle="Secure • Fast • Reliable"
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <RazorpayPaySection
            amount={amount}
            isProcessing={isProcessing}
            onPay={handlePayNow}
          />
          <PaymentSummary paymentData={{ ...paymentData, planCategory }} />
        </div>

        {showSuccessModal && (
          <Modal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            isShowCloseBtn={false}
          >
            <RecievedPaymentPopup
              planCategory={planCategory}
            />
          </Modal>
        )}
      </div>
    </div>
  )
}
