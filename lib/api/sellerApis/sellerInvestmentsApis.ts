import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// Seller: create an investment (creates a Razorpay order too) =====>>
// Response: { ...Investment, keyId, razorpayOrder }
export interface InvestmentData {
  amount: number,
  title?: string,
}

export const createSellerInvestmentApi = async (payload: InvestmentData) => {
  try {
    const response = await axiosInstance.post(`investment/`, payload)
    return response
  } catch (error) {
    return
  }
}

export const getSellerInvestmentsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`investment/`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}


// fetch seller dashboard wallet info api =======>>
export const getSellerDashboardInfoApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`investment/total-investment`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}
