export interface Order {
  shippingAddress: ShippingAddressType
  createdBy: number
  items: OrderItemType[]
  amount: number
  taxAmount: number
  totalAmount: number
  paymentMode: string
  paymentStatus: string
  orderStatus: string
  couponCode: any
  trackingLink?: string
  id: string
}

export interface ShippingAddressType {
  name: string
  phone: string
  email: string
  addressLine1: string
  city: string
  state: string
  pinCode: string
  country: string
}

export interface OrderItemType {
  product: any
  name: string
  productPrice: number
  makingCharges: number
  additionalCharges: number
  totalPrice: number
  taxPercent: number
  taxAmount: number
  totalAmount: number
  quantity: number
  primaryImage: any
}