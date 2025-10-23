import axiosInstance from "@/lib/axiosInstances/axiosInstance"


// create seller investment withdrawal api
export interface WithdrawalsData {
  amount: number,
  reason: string
}

export const createWithdrawalsApi = async (payload: WithdrawalsData) => {
  try {
    const response = await axiosInstance.post(`investment-withdrawal`, payload)
    return response
  } catch (error) {
    return
  }
}

// get all withdrawals request 
export const getWithdrawalsListApi = async (params?:any) => {
  try {
    const response = await axiosInstance.get(`investment-withdrawal`)
    return response
  } catch (error) {
    return
  }
}