
import { product_url } from "@/lib/apiUrls/urlConstants"
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// get all products api =====>>
export const getAllProductsApi = async (params?: any) => {
  try {

    const parameters: any = {};
    // Iterate over all keys in the params object
    for (const key in params) {
      if (params[key]) {
        parameters[key] = params[key];
      }
    }

    const response = await axiosInstance.get(`${product_url}`, {
      params: parameters
    })
    return response
  } catch (error) {
    return
  }
}


// get single product api
export const getSingleProductApi = async (product_id: string, params?: any) => {
  try {
    const response = await axiosInstance.get(`${product_url}/${product_id}`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}


// create a product api
export const createProductApi = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`${product_url}`, payload)
    return response
  } catch (error) {
    return
  }
}

// update single product api
export const updateProductApi = async (product_id: string, payload: any) => {
  try {
    const response = await axiosInstance.put(`${product_url}/${product_id}`, payload)
    return response
  } catch (error) {
    return
  }
}

// delete product api
export const deleteProductApi = async (product_id: string) => {
  try {
    const response = await axiosInstance.delete(`${product_url}/${product_id}`)
    return response
  } catch (error) {
    return
  }
}