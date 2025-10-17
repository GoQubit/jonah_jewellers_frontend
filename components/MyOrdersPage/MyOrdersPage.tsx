"use client"
import { useEffect, useState } from "react"
import { Input } from "../ui/Input"
import SearchInput from "../ui/SearchInput"
import { OrderCard } from "./OrderCard"
import { OrderFilters } from "./OrderFilter"
import { getAllOrdersApi } from "@/lib/api/order/orderApis"
import { Order } from "@/types/orderType"
import { Pagination } from "../ui/Pagination"
import Link from "next/link"
import { Button } from "../ui/buttons/Button"
import Image from "next/image"

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
  const [ordersList, setOrdersList] = useState<Order[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchOrders = async (pageNumber: number) => {
    const params = { limit: 5, page: pageNumber }
    const res = await getAllOrdersApi(params)
    if (res.status === 200) {
      setOrdersList(res.data.results)
      setTotalPages(res.data.totalPages)
    }
  }

  useEffect(() => {
    fetchOrders(page)
  }, [page])


  // ✅ If no items in cart, show empty cart UI
  if (!ordersList || ordersList.length === 0) {
    return (
      <div className="wrapper py-8">
        <EmptyOrder />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className=" text-2xl ">My Orders</h1>
        {/* Header with Search and Filters */}

        {/* <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-2xl">
            <SearchInput className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search by order number or item name..." className="pl-10 h-12 text-base" />
          </div>
          <OrderFilters />
        </div> */}

        {/* Orders List */}
        <div className="space-y-4">
          {ordersList.map((order, index) => (
            <OrderCard
              key={`${order.id}-${index}`}
              order={order}
            />
          ))}
        </div>


        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </div>
  )
}


const EmptyOrder = () => {
  return (
    <section
      className={`mx-auto flex w-full max-w-2xl flex-col items-center text-center gap-6 py-16`}
      aria-labelledby="empty-cart-title"
    >
      <Image
        src="/images/empty_cart.png"
        alt="Illustration of an empty shopping bag"
        width={220}
        height={220}
        priority
      />

      <div className="space-y-2">
        <h2 id="empty-cart-title" className="text-balance text-3xl font-medium tracking-tight md:text-3xl">
          No orders found.
        </h2>
        <p className="text-pretty text-muted-foreground md:text-lg">
          Start your shopping story with your first order.
        </p>
      </div>

      {
        <Link href={'/shop/jewellery'} className="mt-2" >
          <Button
            variant='brand-solid'
            size="lg" className=" !py-4 px-6 !w-[200px] text-base">
            Shop Now
          </Button>
        </Link>
      }
    </section>
  )
}