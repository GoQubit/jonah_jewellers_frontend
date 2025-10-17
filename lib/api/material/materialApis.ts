import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// get Material Price api =====>>
export const getMaterialPriceApi = async () => {
  try {
    const response = await axiosInstance.get(`/material-prices`)
    return response
  } catch (error) {
    return
  }
}

type MaterialPricePayload = {
  name: string
  price: number
}
// create Material Price api =====>>
export const createMaterialPriceApi = async (payload: MaterialPricePayload) => {
  try {
    const response = await axiosInstance.post(`/material-prices`, payload)
    return response
  } catch (error) {
    return
  }
}

// update Material Price api =====>>
export const updateMaterialPriceApi = async (payload: MaterialPricePayload) => {
  try {
    const response = await axiosInstance.patch(`/material-prices`, payload)
    return response
  } catch (error) {
    return
  }
}



