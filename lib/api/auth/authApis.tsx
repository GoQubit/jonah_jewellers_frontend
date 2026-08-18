import { auth_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"


export const sendOtpApi = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${auth_url}/send-otp`, payload)
    return response
  } catch (error) {
    return
  }
}

export const verifyOtpApi = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${auth_url}/verify-otp`, payload)
    return response
  } catch (error) {
    return
  }
}

// create/register user api
export const registerUserApi = async (payload: any) => {
  try {
    const response = await axiosInstance.put(`${auth_url}/register`, payload)
    return response
  } catch (error) {
    return
  }
}
