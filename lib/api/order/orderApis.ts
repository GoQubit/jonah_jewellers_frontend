
import { admin_url, order_url } from "@/lib/apiUrls/urlConstants"
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
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message)
  }
}

// Get All Orders of a Admin
export const getAllOrdersAdminApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/orders/get-orders`, {
      params: params
    })
    return response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message)
  }
}

// Get Single Orders of a Admin
export const getSingleOrdersAdminApi = async (order_id: string, params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/orders/get-order-by-id/${order_id}`, {
      params: params
    })
    return response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message)
  }
}

// Update Orders of a Admin
export const updateOrderAdminApi = async (order_id: string, payload: any) => {
  try {
    const response = await axiosInstance.put(`${admin_url}/orders/update-order-by-id/${order_id}`, payload)
    return response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message)
  }
}

// Orders Analytics Apis
export const OrderAnalyticsApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/orders/info`, {
      params: params
    })
    return response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message)
  }
}
