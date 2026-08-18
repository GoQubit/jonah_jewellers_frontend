import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// get All Sub Categories api =====>>
export const getSubCategoriesApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`sub-category`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}
