import { Order } from "@/types/orderType"
import { Badge } from "../ui/Badge"
import { useState } from "react"
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb"
import { truncateId } from "@/utils/truncateId"

interface OrderHeaderProps {
  order: Order
}

const statusConfig: any = {
  DELIVERED: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  },
  PLACED: {
    label: "Placed",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const status = statusConfig[order?.orderStatus]
  const [copied, setCopied] = useState(false)

  async function copyId(orderId: string) {
    try {
      await navigator.clipboard.writeText(orderId)
      setCopied(true)
      const t = setTimeout(() => setCopied(false), 1500)
      return () => clearTimeout(t)
    } catch { }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3 self-start ">
        <h3 className="text-sm md:text-lg font-medium">Order: {truncateId(order.id)}</h3>

        <Badge className={status?.className}>{status?.label}</Badge>

        <button
          type="button"
          onClick={() => copyId(order.id)}
          aria-label="Copy order ID"
          className=" inline-flex items-center justify-center rounded-md border border-transparent text-foreground/60"
          title="Copy order ID"
        >
          {copied ? <TbCopyCheckFilled className="h-5 w-5" /> : <TbCopy className="h-5 w-5" />}
        </button>

      </div>

      <div className="flex flex-col md:items-end gap-1">
        <div className="text-lg md:text-2xl font-medium">₹{order.totalAmount.toLocaleString()}</div>
        <div className="text-sm text-muted-foreground">{order.items.length} Item</div>
      </div>
    </div>
  )
}
