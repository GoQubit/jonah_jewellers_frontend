import axiosInstance from "@/lib/axiosInstances/axiosInstance"

// kitty Enrollment api =====>>
export interface transectionPropType {
  amount: number
  transactionId: string
}

export const QRTransectionApi = async (payload: transectionPropType) => {
  try {
    const response = await axiosInstance.post(`qr-transaction`, payload)
    return response
  } catch (error) {
    return
  }
}