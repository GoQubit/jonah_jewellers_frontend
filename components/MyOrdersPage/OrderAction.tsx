import { IoEye } from "react-icons/io5"
import { Button } from "../ui/buttons/Button"
import { Order } from "./OrderCard"
import { LuDownload } from "react-icons/lu"
import { IoIosStarOutline } from "react-icons/io"


interface OrderActionsProps {
  order: Order
}

export function OrderActions({ order }: OrderActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
        <IoEye className="h-4 w-4" />
        Track Order
      </Button>

      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
        <LuDownload className="h-4 w-4" />
        Invoice
      </Button>

      {order.status === "delivered" && (
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <IoIosStarOutline className="h-4 w-4" />
          Rate and Review
        </Button>
      )}
    </div>
  )
}
