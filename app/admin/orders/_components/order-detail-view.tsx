"use client"

import { ChevronDownIcon, Link as LinkIcon, Mail, MapPin, Phone, ShoppingBasket, User, X } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import { Order, OrderItem, OrderStatus } from '../types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { orderStatusOptions, tempOrder } from '../const'
import { cn } from '@/utils/cn'
import { Input } from '@/components/ui/Input'
import Link from "next/link"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getSingleOrdersAdminApi, updateOrderAdminApi } from '@/lib/api/order/orderApis'
import { Loader } from '@/components/ui/Loader/Loader'
import Toast from '@/components/Toast/Toast'


type InitialOrder = { isLoading: boolean, data: null | Order, error: null | string }
const initialOrder: InitialOrder = { isLoading: false, data: tempOrder, error: null }

type Props = {
    orderId: string
    onClose?: () => void
    getOrders?: Function
}

const OrderDetailView = ({ orderId, onClose, getOrders }: Props) => {
    const [order, setOrder] = useState(initialOrder)
    const [orderStatus, setOrderStatus] = useState<OrderStatus>('')
    const [trackingLink, setTrackingLink] = useState<string>('')
    const [updateOrder, setUpdateOrder] = useState(initialOrder)

    const disableForm = useMemo(() => (
        updateOrder.isLoading ||
        order.isLoading ||
        order?.data?.orderStatus === orderStatus ||
        order?.data?.trackingLink === trackingLink
    ), [updateOrder.isLoading, order?.isLoading, order?.data?.orderStatus, order?.data?.trackingLink, orderStatus, trackingLink])

    const getOrder = async () => {
        setOrder({ ...initialOrder, isLoading: true })
        try {
            const response = await getSingleOrdersAdminApi(orderId)
            if (response.status === 200) {
                setOrder(s => ({ ...s, data: response.data, error: null }))
                setOrderStatus(response?.data?.orderStatus || "")
                setTrackingLink(response?.data?.trackingLink || "")
            } else {
                throw new Error("Order not found!")
            }
        } catch (e: any) {
            setOrder(s => ({ ...s, error: e.message, data: null }))
        } finally {
            setOrder(s => ({ ...s, isLoading: false }))
        }
    }

    const handleUpdateOrder = async () => {
        setUpdateOrder({ ...initialOrder, isLoading: true })
        try {
            const payload = { orderStatus, trackingLink }
            const response = await updateOrderAdminApi(orderId, payload)
            if (response.status === 200) {
                setUpdateOrder(s => ({ ...s, data: response.data, error: null }))
                Toast.success("Order updated successfully")
                getOrders && getOrders()
                onClose && onClose()
            } else {
                throw new Error("Order not found!")
            }
        } catch (e: any) {
            setUpdateOrder(s => ({ ...s, error: e.message, data: null }))
            Toast.error(e.message)
        } finally {
            setUpdateOrder(s => ({ ...s, isLoading: false }))
        }
    }

    useEffect(() => {
        getOrder()
    }, [])

    const handleReset = async () => {
        setOrderStatus(order?.data?.orderStatus || "")
        setTrackingLink(order?.data?.trackingLink || "")
    }

    return (
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[700px] max-w-full space-y-6">

            {order?.isLoading && (
                <Loader />
            )}

            {order?.error && (
                <div>{order?.error}</div>
            )}

            {order?.data && (
                <div className="h-[60vh] overflow-y-auto space-y-6">
                    <h2 className="font-besley text-left text-lg">Order Details: {order.data?.id}</h2>

                    <div className="flex flex-row items-start justify-between gap-8">
                        <div className="space-y-0.5 w-full">
                            <span className="text-sm">Order Status</span>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    className='px-3 w-full h-10 border border-[#BFBFBF] rounded-md focus:outline-none flex flex-row items-center justify-between gap-3'
                                    style={{
                                        color: orderStatusOptions.find((orderStatusOption) => orderStatus === orderStatusOption.value)?.dark_color || "",
                                        backgroundColor: orderStatusOptions.find((orderStatusOption) => orderStatus === orderStatusOption.value)?.light_color,
                                        borderColor: orderStatusOptions.find((orderStatusOption) => orderStatus === orderStatusOption.value)?.dark_color || "",
                                    }}
                                >
                                    {orderStatusOptions.find((orderStatusOption) => orderStatus === orderStatusOption.value)?.label || "All"}
                                    <ChevronDownIcon className="w-6 h-6" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-full p-0 bg-white"
                                >
                                    {orderStatusOptions.map((orderStatusOption) => (
                                        <DropdownMenuItem
                                            key={orderStatusOption.value}
                                            className={cn(
                                                "py-1.5 text-lg focus:bg-transparent focus:outline-none cursor-pointer",
                                                orderStatus === orderStatusOption.value && "border-l-4"
                                            )}
                                            style={{
                                                color: orderStatusOption.dark_color,
                                                borderColor: orderStatus === orderStatusOption.value ? orderStatusOption.dark_color : ""
                                            }}
                                            onClick={() => setOrderStatus(orderStatusOption.value)}
                                        >
                                            {orderStatusOption.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="space-y-0.5 w-full">
                            <span className="text-sm">Tracking Link</span>
                            <div className="w-full h-10 rounded-md border border-[#BFBFBF] flex items-center focus-within:border-brand px-3 py-1">
                                <Input
                                    type="text"
                                    className="grow h-full focus:outline-none border-none px-0 py-0"
                                    value={trackingLink}
                                    onChange={(e) => setTrackingLink(e.target.value)}
                                />
                                <Link
                                    href={trackingLink?.startsWith("http") ? trackingLink : "#"}
                                    className={cn(
                                        'text-[#BFBFBF]',
                                        trackingLink?.startsWith("http") && "!text-blue-600 cursor-pointer"
                                    )}
                                >
                                    <LinkIcon className="w-4 h-4 " />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* customer detail */}
                    <div className="border border-[#CACACA] rounded-md p-3 space-y-3">
                        <p className="inline-flex items-center justify-center gap-1 text-[#040404]">
                            <User className="w-4 h-4" />
                            <span className="font-medium">Customer Details</span>
                        </p>

                        <div className="flex flex-row items-start justify-between gap-5 text-sm text-[#787878]">
                            <div className="space-y-1 flex-1">
                                <p className="text-base text-[#040404]">{order.data?.shippingAddress.name}</p>
                                <p className="flex items-center justify-start gap-1">
                                    <Mail className="w-4 h-4" />
                                    <span>{order.data?.shippingAddress.email}</span>
                                </p>
                                <p className="flex items-center justify-start gap-1">
                                    <Phone className="w-4 h-4" />
                                    <span>{order.data?.shippingAddress.phone}</span>
                                </p>
                            </div>
                            <div className="space-y-1 flex-1">
                                <p className="text-base text-[#040404] flex items-center justify-start gap-1">
                                    <MapPin className="w-5 h-5" />
                                    <span>Sipping Address</span>
                                </p>
                                <p className="text-sm text-[#787878]">
                                    {order.data?.shippingAddress.addressLine1}
                                    <br />
                                    {order.data?.shippingAddress?.city} | {order.data?.shippingAddress?.state} | {order.data?.shippingAddress?.country} | {order.data?.shippingAddress?.pinCode}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Item */}
                    <div className="border border-[#CACACA] rounded-md p-3 space-y-2">
                        <p className="inline-flex items-center justify-center gap-1 text-[#040404]">
                            <ShoppingBasket className="w-4 h-4" />
                            <span className="font-medium">Order Items</span>
                        </p>

                        {order.data?.items.map(((orderItem: OrderItem, index: number) => (
                            <div key={index} className="flex flex-row items-start justify-between gap-5 border border-dashed rounded-md p-2">
                                <div className="space-y-1 flex-[3] flex flex-row item-start justify-start gap-2">
                                    <Image
                                        src={orderItem?.primaryImage || ""}
                                        alt={orderItem.name}
                                        width={60}
                                        height={60}
                                        className="object-cover"
                                    />
                                    <div >
                                        <p className="text-sm text-[#040404]">
                                            <span>{orderItem.name}</span>
                                        </p>
                                        {/* <p className="text-xs text-[#787878]">
                                            <span>SKU: {orderItem.sku} | Category: {orderItem.category}</span>
                                            <br />
                                            <span>Gold Weight: {orderItem.goldWeight}</span>
                                        </p> */}
                                        <p className="text-xs text-[#787878]">
                                            <span>Quantity: {orderItem.quantity}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-1 flex-1">
                                    <p className="font-medium text-[#040404] flex items-center justify-start">
                                        <span>
                                            {orderItem?.totalPrice.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                                maximumFractionDigits: 2,
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        )))}
                    </div>
                </div>
            )}

            {order?.data && (
                <div className="space-y-2">
                    {updateOrder.error && (
                        <span className="text-red-500 text-xs text-left">{updateOrder.error}</span>
                    )}
                    <div className="flex items-center justify-start gap-3">
                        <Button
                            // className="w-28 h-14"
                            onClick={handleUpdateOrder}
                            disabled={disableForm}
                        >
                            Save
                        </Button>

                        <Button
                            variant={"outline"}
                            className=" hover:bg-transparent"
                            onClick={handleReset}
                            disabled={disableForm}
                        >
                            Reset
                        </Button>

                    </div>
                </div>
            )}

            {/* close button */}
            <div onClick={onClose} className="absolute z-[51] top-0 left-[50%] -translate-y-16 translate-x-[-50%] w-8 h-8 bg-white rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-gray-100">
                <X />
            </div>
        </div>
    )
}

export default OrderDetailView