"use client"

import { useState } from "react"
import { Card } from "../ui/Card"
import { IoCopyOutline } from "react-icons/io5"
import { BiSolidDiscount } from "react-icons/bi"
import { TbCopyCheckFilled } from "react-icons/tb"
import Modal from "../ui/Modal"

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Coupon {
  code: string
  title: string
  description: string
  bgColor: string
  textColor: string
}

export function CouponModal({ isOpen, onClose }: CouponModalProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const coupons: Coupon[] = [
    {
      code: "KITTYFREE12",
      title: "Free Investment",
      description: "12 Month investment free",
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      code: "KITTYSAVE30",
      title: "Super Saver",
      description: "30% off on making charges",
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      code: "KITTYSAVE20",
      title: "Quick Save",
      description: "20% off on making charges",
      bgColor: "bg-purple-500",
      textColor: "text-white",
    },
  ]

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col border-b pb-2">
          <h2 className="text-xl font-medium text-gray-900 font-nunito">My Coupons</h2>
          <p className="text-sm text-gray-600">Apply coupon codes for discounts</p>
        </div>

        {/* Coupon Cards */}
        <div className=" py-4 space-y-4">
          {coupons.map((coupon, index) => (
            <Card key={index} className={`${coupon.bgColor} ${coupon.textColor} p-4 border-0`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className=" font-medium opacity-90"><BiSolidDiscount size={18} /></span>
                      <span className="font-medium font-nunito text-sm">{coupon.code}</span>
                    </div>
                    <h3 className="font-medium text-base font-nunito">{coupon.title}</h3>
                    <p className="text-sm opacity-90">{coupon.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopyCode(coupon.code)}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                >
                  {copiedCode === coupon.code ? <TbCopyCheckFilled className="h-4 w-4" /> : <IoCopyOutline className="h-4 w-4" />}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Modal>
  )
}
