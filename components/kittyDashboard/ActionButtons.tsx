"use client"
import { BiSolidDiscount } from "react-icons/bi"
import { CiShop } from "react-icons/ci"
import { FiPlus } from "react-icons/fi"
import { Card } from "../ui/Card"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CouponModal } from "./CouponModal"


export function ActionButtons() {
  const router = useRouter()
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)

  const actionItems = [
    {
      title: "New Kitty Investment Plan",
      subtitle: "Start Your Saving Journey",
      icon: FiPlus,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
      onClick: () => router.push('/start-kitty')
    },
    {
      title: "Shop Jewellery",
      subtitle: "Use your investments",
      icon: CiShop,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      onClick: () => router.push('/shop/jewellery')
    },
    {
      title: "My Coupons",
      subtitle: "3 Available",
      icon: BiSolidDiscount,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      borderColor: "border-pink-200",
      onClick: () => setIsCouponModalOpen(true),
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {actionItems.map((item, index) => {
        const Icon = item.icon
        return (
          <Card
            key={index}
            className={`${item.bgColor} ${item.borderColor} p-4 py-3 cursor-pointer hover:shadow-md transition-shadow`}
            onClick={item.onClick}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <Icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.subtitle}</p>
              </div>
            </div>
          </Card>
        )
      })}

      <CouponModal isOpen={isCouponModalOpen} onClose={() => setIsCouponModalOpen(false)} />
    </div>
  )
}
