"use client"
import { IoEye } from "react-icons/io5"
import { Button } from "../ui/buttons/Button"
import { LuDownload } from "react-icons/lu"
import { IoIosStarOutline } from "react-icons/io"
import { Order } from "@/types/orderType"
import { BiChevronRight } from "react-icons/bi"
import { cn } from "@/utils/cn"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"


interface OrderActionsProps {
  order: Order
}

export function OrderActions({ order }: OrderActionsProps) {
  const [showAddress, setShowAddress] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex flex-wrap gap-3">

      {/* Address + Actions */}
      <div className=" w-full flex flex-col gap-4 sm:mt-2 sm:flex-row md:items-center justify-between">
        <button
          type="button"
          onClick={() => setShowAddress((s) => !s)}
          className="group inline-flex items-center gap-2 text-left text-sm font-medium text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-expanded={showAddress}
          aria-controls="shipping-address"
        >
          <span>View Shipping Address</span>
          <BiChevronRight className={cn("h-4 w-4 transition-transform", showAddress && "rotate-90")} aria-hidden="true" />
        </button>

        <div className="flex gap-3">
          {
            order?.trackingLink &&
            <Button variant="outline" size="sm" className="gap-2 bg-transparent"
              onClick={() => router.push(order?.trackingLink || '')}
            >
              <IoEye className="h-4 w-4" />
              Track Order
            </Button>
          }

          <Button variant="outline" size="sm" className="gap-2 bg-transparent"
            onClick={() => router.push(`${pathname}/invoice/${order.id}`)}
          >
            <LuDownload className="h-4 w-4" />
            Invoice
          </Button>

          {order.orderStatus === "DELIVERED" && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <IoIosStarOutline className="h-4 w-4" />
              Rate and Review
            </Button>
          )}
        </div>
      </div>

      {showAddress && order.shippingAddress ? (
        <address
          id="shipping-address"
          className=" w-full rounded-lg border border-border bg-muted/40 p-4 not-italic text-sm leading-6 text-foreground"
        >
          <div className="font-medium">{order.shippingAddress.name}</div>
          <div>{order.shippingAddress?.addressLine1}</div>
          <div>
            {order.shippingAddress?.city}
            {order.shippingAddress?.state ? `, ${order.shippingAddress?.state}` : ""} {order.shippingAddress?.pinCode}
          </div>
          <div>{order.shippingAddress?.country}</div>
          {order.shippingAddress?.phone ? <div>Phone: {order.shippingAddress.phone}</div> : null}
        </address>
      ) : null}
    </div>
  )
}
