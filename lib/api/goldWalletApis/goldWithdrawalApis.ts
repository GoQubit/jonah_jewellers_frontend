import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// Buyer: request a gold withdrawal (redeem physical gold at store) =====>>
export interface GoldWithdrawalData {
  goldWeight: number,
  reason: string
}

export const createGoldWithdrawalApi = async (payload: GoldWithdrawalData) => {
  try {
    const response = await axiosInstance.post(`buyer-gold/withdrawals`, payload)
    return response
  } catch (error) {
    return
  }
}

// Buyer: list own gold withdrawal requests
export const getGoldWithdrawalsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`buyer-gold/withdrawals`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// Buyer: confirm physical gold was received at the store (final step after admin approval)
export const confirmGoldWithdrawalApi = async (id: string) => {
  try {
    const response = await axiosInstance.post(`buyer-gold/withdrawals/${id}/confirm`)
    return response
  } catch (error) {
    return
  }
}
