import { admin_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// get Transaction Analytics Apis
export const getTransactionAnalyticsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/transaction-revenue`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}