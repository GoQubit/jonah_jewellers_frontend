"use client"

import { ChevronDownIcon, Link as LinkIcon, Mail, MapPin, Phone, ShoppingBasket, User, X } from 'lucide-react'
import React, { useState } from 'react'
import { OrderStatus } from '../types'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { orderStatusOptions } from '../const'
import { cn } from '@/utils/cn'
import { Input } from '@/components/ui/Input'
import Link from "next/link"
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type TempOrderItem = {
    id: string,
    name: string,
    sku: string,
    category: string,
    goldWeight: string,
    purity: string,
    quantity: number,
    price: number,
    image: string,
}

type TempOrder = {
    id: string,
    status: OrderStatus,
    tracking_link: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    date: string,
    totalAmount: string,
    items: TempOrderItem[],
    shippingAddress: string,
    paymentMethod: string,
}

const tempOrder: TempOrder = {
    id: 'ORD-2024-001',
    status: "pending",
    tracking_link: "",
    customerName: 'Anas',
    customerEmail: 'mohdanas@gmail.com',
    customerPhone: '+91 98765 43210',
    date: '2024-10-01',
    totalAmount: '₹85,000',
    items: [
        {
            id: '1',
            name: 'Diamond Solitaire Ring',
            sku: 'GC-10G-001',
            category: 'Gold',
            goldWeight: '10g',
            purity: '18k',
            quantity: 1,
            price: 85000,
            image: '/images/categoryImgs/birthday.png'
        },
        {
            id: '2',
            name: 'Diamond Solitaire Ring',
            sku: 'GC-10G-001',
            category: 'Gold',
            goldWeight: '10g',
            purity: '18k',
            quantity: 1,
            price: 85000,
            image: '/images/categoryImgs/birthday.png'
        }
    ],
    shippingAddress: 'Cane Society Rd, near Majar, Bazpur, Uttarakhand 262401',
    paymentMethod: 'Credit Card'
}


type Props = {
    onClose?: () => void
}

const OrderDetailView = ({ onClose }: Props) => {
    const [order, setOrder] = useState<TempOrder>(tempOrder)

    return (
        <div className="relative bg-white p-8 rounded-lg shadow-lg w-[700px] max-w-full space-y-8">

            <h2 className="font-besley text-left text-lg">Order Details: {order.id}</h2>

            <div className="flex flex-row items-start justify-between gap-8">
                <div className="space-y-0.5 w-full">
                    <span className="text-sm">Order Status</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className='px-3 w-full h-10 border border-[#BFBFBF] rounded-md focus:outline-none flex flex-row items-center justify-between gap-3'
                            style={{
                                color: orderStatusOptions.find((orderStatus) => order.status === orderStatus.value)?.dark_color || "",
                                backgroundColor: orderStatusOptions.find((orderStatus) => order.status === orderStatus.value)?.light_color,
                                borderColor: orderStatusOptions.find((orderStatus) => order.status === orderStatus.value)?.dark_color || "",
                            }}
                        >
                            {orderStatusOptions.find((orderStatus) => order.status === orderStatus.value)?.label || "All"}
                            <ChevronDownIcon className="w-6 h-6" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-full p-0 bg-white"
                        >
                            {orderStatusOptions.map((orderStatus) => (
                                <DropdownMenuItem
                                    key={orderStatus.value}
                                    className={cn(
                                        "py-1.5 text-lg focus:bg-transparent focus:outline-none cursor-pointer",
                                        order.status === orderStatus.value && "border-l-4"
                                    )}
                                    style={{
                                        color: orderStatus.dark_color,
                                        borderColor: order.status === orderStatus.value ? orderStatus.dark_color : ""
                                    }}
                                    onClick={() => setOrder(s => ({ ...s, status: orderStatus.value }))}
                                >
                                    {orderStatus.label}
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
                            value={order?.tracking_link}
                            onChange={(e) => setOrder(s => ({ ...s, tracking_link: e.target.value }))}
                        />
                        <Link
                            href={order.tracking_link.startsWith("http") ? order.tracking_link : "#"}
                            className={cn(
                                'text-[#BFBFBF]',
                                order.tracking_link.startsWith("http") && "!text-blue-600 cursor-pointer"
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
                        <p className="text-base text-[#040404]">{order.customerName}</p>
                        <p className="flex items-center justify-start gap-1">
                            <Mail className="w-4 h-4" />
                            <span>{order.customerEmail}</span>
                        </p>
                        <p className="flex items-center justify-start gap-1">
                            <Phone className="w-4 h-4" />
                            <span>{order.customerPhone}</span>
                        </p>
                    </div>
                    <div className="space-y-1 flex-1">
                        <p className="text-base text-[#040404] flex items-center justify-start gap-1">
                            <MapPin className="w-5 h-5" />
                            <span>Sipping Address</span>
                        </p>
                        <p className="text-sm text-[#787878]">
                            {order.shippingAddress}
                        </p>
                    </div>
                </div>
            </div>

            {/* Order Item */}
            <div className="border border-[#CACACA] rounded-md p-3 space-y-3">
                <p className="inline-flex items-center justify-center gap-1 text-[#040404]">
                    <ShoppingBasket className="w-4 h-4" />
                    <span className="font-medium">Order Items</span>
                </p>

                {order?.items.map((orderItem => (
                    <div key={orderItem.id} className="flex flex-row items-start justify-between gap-5">
                        <div className="space-y-1 flex-[3] flex flex-row item-start justify-start gap-2">
                            <Image
                                src={orderItem?.image}
                                alt={orderItem.name}
                                width={60}
                                height={60}
                                className="object-cover"
                            />
                            <div >
                                <p className="text-sm text-[#040404]">
                                    <span>{orderItem.name}</span>
                                </p>
                                <p className="text-xs text-[#787878]">
                                    <span>SKU: {orderItem.sku} | Category: {orderItem.category}</span>
                                    <br />
                                    <span>Gold Weight: {orderItem.goldWeight}</span>
                                </p>
                            </div>
                        </div>
                        <div className="space-y-1 flex-1">
                            <p className="font-medium text-[#040404] flex items-center justify-start">
                                <span>
                                    {orderItem.price.toLocaleString("en-IN", {
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

            <Button
                variant={"outline"}
                size="lg"
                className="w-28 h-14 text-lg border border-[#040404] hover:bg-transparent"
                onClick={onClose}
            >
                Save
            </Button>

            {/* close button */}
            <div className="absolute z-[51] top-0 left-[50%] -translate-y-28 translate-x-[-50%] w-10 h-10 bg-white rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-gray-100">
                <X onClick={onClose} />
            </div>
        </div>
    )
}

export default OrderDetailView