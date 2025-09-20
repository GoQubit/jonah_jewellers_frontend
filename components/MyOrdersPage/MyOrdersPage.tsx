
import { Input } from "../ui/Input"
import SearchInput from "../ui/SearchInput"
import { OrderCard } from "./OrderCard"
import { OrderFilters } from "./OrderFilter"

// Mock data matching the image
const orders = [
  {
    id: "#Jonah-2025-001234",
    status: "delivered" as const,
    orderedDate: "2025-01-20",
    expectedDate: "2025-06-20",
    paymentMethod: "Scanner",
    amount: 85000,
    itemCount: 1,
    items: [
      {
        name: "Diamond Solitaire Ring",
        quantity: 1,
        image: "/diamond-solitaire-ring.png",
      },
    ],
    progress: 100,
  },
  {
    id: "#Jonah-2025-001234",
    status: "shipped" as const,
    orderedDate: "2025-01-20",
    expectedDate: "2025-06-20",
    paymentMethod: "UPI ID",
    amount: 85000,
    itemCount: 1,
    items: [
      {
        name: "Diamond Solitaire Ring",
        quantity: 1,
        image: "/diamond-solitaire-ring.png",
      },
    ],
    progress: 80,
  },
]

export default function MyOrdersPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-2xl">
            <SearchInput className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search by order number or item name..." className="pl-10 h-12 text-base" />
          </div>
          <OrderFilters />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order, index) => (
            <OrderCard key={`${order.id}-${index}`} order={order} />
          ))}
        </div>
      </div>
    </div>
  )
}
