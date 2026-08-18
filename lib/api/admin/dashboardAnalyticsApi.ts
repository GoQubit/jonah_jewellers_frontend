
import { admin_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// get Dashboard Analytics Apis
export const getDashboardAnalyticsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/overview`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}