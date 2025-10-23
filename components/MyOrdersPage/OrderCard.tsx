"use client"

import { useState } from "react"
import { Card } from "../ui/Card"
import { OrderActions } from "./OrderAction"
import { OrderHeader } from "./OrderHeader"
import { OrderItemComponent } from "./OrderItem"
import { OrderProgress } from "./OrderProgess"
import { Button } from "../ui/buttons/Button"
import { Order } from "@/types/orderType"

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const [showAddress, setShowAddress] = useState(false)

  return (
    <Card className="p-6 space-y-4 !gap-2">
      {/* Header */}
      <OrderHeader order={order} />

      {/* Items */}
      <div className="space-y-4">
        {order.items.map((item: any, index: number) => (
          <OrderItemComponent key={index} item={item} />
        ))}
      </div>

      {/* Actions */}
      <OrderActions order={order} />
    </Card>
  )
}
