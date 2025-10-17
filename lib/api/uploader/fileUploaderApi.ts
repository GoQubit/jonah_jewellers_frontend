
import axiosInstance from "@/lib/axiosInstances/axiosInstance"

export const fileUploaderApi = async (payload: any) => {
  try {
    const response = await axiosInstance.post(`misc/upload`, payload)
    return response
  } catch (error) {
    return
  }
}