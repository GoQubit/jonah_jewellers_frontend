import { admin_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// kitty Enrollment api =====>>
// Enrolling also creates the mandatory first installment + a Razorpay order
// for it in the same call. Response: { kitty, firstPayment, keyId, razorpayOrder }
export interface kittyEnrollmentData {
  description?: string,
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

// kitty Transaction Api (subsequent installments, 2nd onwards) ======>>
// Creates the installment + a Razorpay order for it.
// Response: { ...KittyTransaction, keyId, razorpayOrder }
export interface kittyTransectionData {
  kittyEnrolledId: string | number,
  amount: number,
}

export const kittyTransectionApi = async (payload: kittyTransectionData) => {
  try {
    const response = await axiosInstance.post(`kitty-transaction`, payload)
    return response
  } catch (error) {
    return
  }
}

// get all kitty transactions (payment history) for the logged-in buyer
export const getKittyTransactionsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`kitty-transaction`, {
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
