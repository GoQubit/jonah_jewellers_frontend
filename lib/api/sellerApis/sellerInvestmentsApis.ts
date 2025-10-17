import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// kitty Enrollment api =====>>
export interface InvestmentData {
  amount: number,
  transactionId: string,
  proofImage:string
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
