import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// Admin: paginated list of all Razorpay-verified transactions (kitty,
// gold-buyer and seller/gold-investor payments) - replaces the retired
// manual QR-proof `admin-dashboard/qr-transaction` endpoint.
export const getTransactionsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`transaction`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}
