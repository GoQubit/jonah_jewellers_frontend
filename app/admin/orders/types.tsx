import React from "react"

export type OrderStatus = '' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type OrderListFilters = {
    search: string,
    status: OrderStatus,
    fromDate: undefined | Date,
    toDate: undefined | Date,
}

export type OrderStatusOptions = {
    value: OrderStatus,
    label: string,
    light_color: string,
    dark_color: string,
    icon?: React.ReactNode,
}