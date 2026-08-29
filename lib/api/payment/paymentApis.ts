import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// Generic Razorpay payment verification, shared by every payment surface
// (cart order, kitty installments, gold-buyer investment, seller investment).
// orderId is only relevant for cart checkout — omit it for kitty/gold/investor.
export interface VerifyRazorpayPaymentPayload {
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
  orderId?: string
}

export const verifyRazorpayPaymentApi = async (payload: VerifyRazorpayPaymentPayload) => {
  try {
    const response = await axiosInstance.post(`payment/verify`, payload)
    return response
  } catch (error) {
    return
  }
}
