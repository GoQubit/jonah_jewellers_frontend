import { admin_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// kitty Enrollment api =====>>
export interface kittyEnrollmentData {
  // title: string,
  monthlyInstallment: number,
  planDuration: number
}

export const kittyEnrollmentApi = async (payload: kittyEnrollmentData) => {
  try {
    const response = await axiosInstance.post(`kitty-enrolled/`, payload)
    return response
  } catch (error) {
    return
  }
}

export const getUserkittiesApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`kitty-enrolled/`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// fetch user's kitty dashboard wallet info api =======>>
export const getUserKittyDashboardInfoApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`kitty-enrolled/kitty-dashboard-info`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// kitty Transection Api ======>>
interface kittyTransectionData {
  kittyEnrolledId: string,
  amount: number,
  transactionId: string,
  proofImage: string
}


export const kittyTransectionApi = async (payload: kittyTransectionData) => {
  try {
    const response = await axiosInstance.post(`kitty-transaction`, payload)
    return response
  } catch (error) {
    return
  }
}

// get kitty users QR transaction api 
export const getUserQRTransactionApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`qr-transaction`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// fetch user's kitty dashboard wallet info api =======>>
export const kittyInvestmentDashboardAnalyticsApi = async () => {
  try {
    const response = await axiosInstance.get(`${admin_url}/kitty-investment-overview`)
    return response
  } catch (error) {
    return
  }
}