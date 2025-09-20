import { Card } from "../ui/Card"
import { OrderActions } from "./OrderAction"
import { OrderHeader } from "./OrderHeader"
import { OrderItemComponent } from "./OrderItem"
import { OrderProgress } from "./OrderProgess"


export type OrderStatus = "delivered" | "shipped" | "processing"

export interface OrderItem {
  name: string
  quantity: number
  image: string
}

export interface Order {
  id: string
  status: OrderStatus
  orderedDate: string
  expectedDate: string
  paymentMethod: string
  amount: number
  itemCount: number
  items: OrderItem[]
  progress?: number
}

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card className="p-6 space-y-4">
      <OrderHeader order={order} />

      <div className="space-y-4">
        {order.items.map((item, index) => (
          <OrderItemComponent key={index} item={item} />
        ))}
      </div>

      {order.status === "shipped" && order.progress && <OrderProgress progress={order.progress} />}

      <OrderActions order={order} />
    </Card>
  )
}
