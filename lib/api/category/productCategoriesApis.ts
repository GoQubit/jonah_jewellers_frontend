import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// get All Sub Categories api =====>>
export const getSubCategoriesApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`sub-category`)
    return response
  } catch (error) {
    return
  }
}
