import { OrderItemType } from "@/types/orderType"
import Image from "next/image"

interface OrderItemProps {
  item: OrderItemType
}

export function OrderItemComponent({ item }: OrderItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted">
        <Image src={item.primaryImage || item.product.images[0] || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-base">{item.name}</h4>
        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
      </div>
    </div>
  )
}
