import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// Buyer: create a gold investment (creates a Razorpay order too) =====>>
// Response: { ...BuyerGoldInvestment, keyId, razorpayOrder }
export interface GoldInvestmentData {
  amount: number,
}

export const createGoldInvestmentApi = async (payload: GoldInvestmentData) => {
  try {
    const response = await axiosInstance.post(`buyer-gold/invest`, payload)
    return response
  } catch (error) {
    return
  }
}

// Buyer: list own gold investment transactions
export const getGoldInvestmentsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`buyer-gold/invest`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// Buyer: fetch gold wallet summary (total gold owned, available, locked, current value)
export const getGoldWalletApi = async () => {
  try {
    const response = await axiosInstance.get(`buyer-gold/wallet`)
    return response
  } catch (error) {
    return
  }
}
