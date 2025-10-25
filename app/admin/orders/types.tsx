import React from "react"

export type OrderStatus = '' | 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
export type PaymentStatus = '' | "PENDING" | "PAID" | "FAILED" | "REFUNDED"

export type OrderListFilters = {
    search: string,
    status: OrderStatus,
    fromDate: undefined | Date,
    toDate: undefined | Date,
}

export type OrderStatusOptions = {
    value: OrderStatus,
    label: string,
    light_color?: string,
    dark_color?: string,
    icon?: React.ReactNode,
}

export type PaymentStatusOptions = {
    value: PaymentStatus,
    label: string,
    light_color?: string,
    dark_color?: string,
    icon?: React.ReactNode,
}


export type OrderItem = {
    name: string,
    product: string,
    productPrice: number,
    makingCharges: number,
    additionalCharges: number,
    totalPrice: number,
    taxPercent: number,
    taxAmount: number,
    totalAmount: number,
    quantity: number,
    primaryImage: string | null
}

export type ShippingAddress = {
    name: string,
    phone: string,
    email: string,
    addressLine1: string,
    city: string,
    state: string,
    pinCode: number,
    country: string,
}

export type Order = {
    id: string,
    amount: number,
    taxAmount: number,
    totalAmount: number,
    paymentMode: string,
    paymentStatus: PaymentStatus,
    orderStatus: OrderStatus,
    couponCode: string,
    trackingLink: string,
    createdBy: number,
    createdAt: string,
    updatedAt: string,
    items: OrderItem[],
    shippingAddress: ShippingAddress,
}