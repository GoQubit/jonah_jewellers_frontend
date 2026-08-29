import { admin_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// Admin: list gold withdrawal requests (defaults to pending-admin queue) =====>>
export const getGoldWithdrawalsAdminApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/buyer-gold-withdrawals`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// Admin: approve a pending gold withdrawal request (moves it to PENDING_USER, awaiting buyer confirmation)
export const approveGoldWithdrawalAdminApi = async (id: string) => {
  try {
    const response = await axiosInstance.post(`${admin_url}/buyer-gold-withdrawals/${id}/approve`)
    return response
  } catch (error) {
    return
  }
}
