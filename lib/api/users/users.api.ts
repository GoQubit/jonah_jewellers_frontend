import { user_url, auth_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// fetch all users
export const getAllUsersApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${user_url}/`, {
      params: params
    })
    return response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message)
  }
}

// fetch user
export const getUserApi = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${user_url}/${id}`)
    return response
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error?.message)
  }
}
