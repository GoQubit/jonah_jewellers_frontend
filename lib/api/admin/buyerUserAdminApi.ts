import { admin_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// Admin: paginated list of buyer (kitty member) users
export const getBuyerUserListApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/buyer-user-list`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// Admin: full detail view for one buyer - profile + kitty plans + gold investments
export const getBuyerUserDetailApi = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/buyer-user/${id}`)
    return response
  } catch (error) {
    return
  }
}

// Admin: paginated list of seller (gold investor) users
export const getSellerUserListApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/seller-user-list`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// Admin: full detail view for one seller - profile + investments
export const getSellerUserDetailApi = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${admin_url}/seller-user/${id}`)
    return response
  } catch (error) {
    return
  }
}
