import { Order } from "./OrderCard"


interface OrderDetailsProps {
  order: Order
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
      <div>
        <span className="font-medium">Ordered:</span> {order.orderedDate}
      </div>
      <div>
        <span className="font-medium">Expected:</span> {order.expectedDate}
      </div>
      <div>
        <span className="font-medium">Paid Via:</span> {order.paymentMethod}
      </div>
    </div>
  )
}
