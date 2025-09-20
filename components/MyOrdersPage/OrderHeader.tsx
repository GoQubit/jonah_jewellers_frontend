import { Badge } from "../ui/Badge"
import { Order } from "./OrderCard"

interface OrderHeaderProps {
  order: Order
}

const statusConfig = {
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  shipped: {
    label: "Shipped",
    className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  },
  processing: {
    label: "Processing",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const status = statusConfig[order.status]

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold">{order.id}</h3>
        <Badge className={status.className}>{status.label}</Badge>
      </div>

      <div className="flex flex-col md:items-end gap-1">
        <div className="text-2xl font-bold">₹{order.amount.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">{order.itemCount} Item</div>
      </div>
    </div>
  )
}
