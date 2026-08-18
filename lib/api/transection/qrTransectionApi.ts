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

// QR Transection Api - Admin
export const getQRTransectionApi = async (params?: any) => {
  try {
    const response = await axiosInstance.get(`admin-dashboard/qr-transaction`, {
      params: params
    })
    return response
  } catch (error) {
    return
  }
}

// Update payment transection status by Admin
export const verifyQRTransectionApi = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.put(`admin-dashboard/qr-transaction/${id}`, payload)
    return response
  } catch (error) {
    return
  }
}