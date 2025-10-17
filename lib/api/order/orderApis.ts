
import { order_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"


// Create Order Api
export const createOrderApi = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${order_url}`, payload)
    return response
  } catch (error) {
    return
  }
}

// verify Razorpay Order Api
export const verifyRazorPayOrderApi = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${order_url}/verify-razorpay-order`, payload)
    return response
  } catch (error) {
    return
  }
}


// Get All Orders of a User
export const getAllOrdersApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${order_url}`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}
