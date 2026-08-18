import { address_url, auth_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// create new address 
export const createNewAddressApi = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${address_url}/`, payload)
    return response
  } catch (error) {
    return
  }
}

// fetch all users addresses
export const getAllAddressesApi = async () => {
  try {
    const response = await axiosInstance.get(`${address_url}/`)
    return response
  } catch (error) {
    return
  }
}


// fetch user single address
export const getSingleAddressApi = async (addressId: string) => {
  try {
    const response = await axiosInstance.get(`${address_url}/${addressId}`)
    return response
  } catch (error) {
    return
  }
}

// delete user single address
export const deleteAddressApi = async (addressId: string) => {
  try {
    const response = await axiosInstance.delete(`${address_url}/${addressId}`)
    return response
  } catch (error) {
    return
  }
}

// update user single address
export const updateAddressApi = async (addressId: string) => {
  try {
    const response = await axiosInstance.put(`${address_url}/${addressId}`)
    return response
  } catch (error) {
    return
  }
}
