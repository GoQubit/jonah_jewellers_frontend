"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "../ui/buttons/Button"
import { Badge } from "../ui/Badge"
import { RiLogoutBoxLine, RiWallet3Line } from "react-icons/ri";
import { AiFillGolden } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi2";
import { MdContactSupport } from "react-icons/md";
import { IoClose } from "react-icons/io5"
import { Avatar, AvatarFallback } from "../ui/Avatar"
import useLogout from "@/hooks/useLogout"
import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"


interface UserAccountSidebarProps {
  isOpen: boolean
  onClose: () => void
  user?: {
    name: string
    email: string
    initials: string
  }
}

interface MenuItem {
  id: string
  icon: React.ReactNode
  iconStyle?: string
  title: string
  description: string
  badge?: number
  onClick: () => void
}

export function Sidebar({ isOpen, onClose }: UserAccountSidebarProps) {
  const user = useSelector((state: RootState) => state.user)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const logout = useLogout() // Custom hook to handle logout logic
  const router = useRouter()


  const nameInitials = user.firstName && user.lastName ? `${user.firstName.charAt(0).toLocaleUpperCase()}${user.lastName.charAt(0).toLocaleUpperCase()}` : "NA"

  const menuItems: MenuItem[] = [
    // Show only for BUYER
    ...(user.role === "BUYER"
      ? [
        {
          id: "kitty-plan",
          icon: <RiWallet3Line className="w-5 h-5" />,
          iconStyle: " bg-[#DBEAFE] text-[#2C70CC]",
          title: "My Kitty Plan",
          description: "Manage your kitty portfolio",
          onClick: () => {
            router.push("/kitty-dashboard")
            onClose()
          },
        },
      ]
      : []),

    // Show only for SELLER
    ...(user.role === "SELLER"
      ? [
        {
          id: "dashboard",
          icon: <AiFillGolden className="w-5 h-5" />,
          iconStyle: " bg-[#FFFBEA] text-[#E8A83E]",
          title: "Jonah Seller Dashboard",
          description: "Manage your Gold Investments",
          onClick: () => {
            router.push("/seller-dashboard")
            onClose()
          },
        },
      ]
      : []),

    // Common for both roles
    {
      id: "orders",
      icon: <FiPackage className="w-5 h-5" />,
      iconStyle: " bg-[#DCFCE7] text-[#45D777]",
      title: "My Orders",
      description: "View order status & history",
      onClick: () => {
        router.push("/orders")
        onClose()
      },
    },
    {
      id: "profile",
      icon: <HiOutlineUser className="w-5 h-5" />,
      iconStyle: " bg-[#FFE5E5] text-[#CE1414]",
      title: "Edit My Profile",
      description: "Edit profile & address",
      onClick: () => {
        router.push("/profile?profile=edit")
        onClose()
      },
    },
    {
      id: "support",
      icon: <MdContactSupport className="w-5 h-5" />,
      iconStyle: " bg-[#FFEEC6] text-[#E8A83E]",
      title: "Help & Support",
      description: "Get assistance & FAQs",
      onClick: () => {
        router.push("/help-and-support")
        onClose()
      },
    },
  ]


  // Handle logout action
  const handleLogout = async () => {
    setIsLoggingOut(true)
    // Handle logout logic here
    logout() // Call the logout function from the custom hook
    setIsLoggingOut(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed max-h-screen inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[90%] md:w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">My Account</h2>
            <div onClick={onClose} className=" rounded-lg p-2 cursor-pointer hover:bg-gray-100 text-black ">
              <IoClose size={20} className=" !text-black" />
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar className="!h-16 !w-16 bg-brand">
                <AvatarFallback className="bg-brand text-3xl font-nunito text-white font-semibold">
                  {nameInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xl font-medium text-gray-900 truncate">{`${user.firstName} ${user.lastName} `}  </p>
                <p className="text-lg text-[#7B7B7B] truncate">{user.mobileNumber}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className=" h-[65vh] overflow-y-auto">
            <div className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#f7c9802a] transition-colors group border "
                >
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 text-gray-600 transition-colors rounded-full flex items-center justify-center ${item.iconStyle} `}>{item.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-base font-medium text-black transition-colors">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#7B7B7B]">{item.description}</p>
                    </div>
                  </div>

                  <div className="text-gray-400 transition-colors flex items-center space-x-2">
                    {item.badge && (
                      <Badge className="!bg-brand font-besley border-0 text-white text-xs px-2 py-1">
                        {item.badge}
                      </Badge>
                    )}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100 ">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center space-x-3 p-4 rounded-lg bg-[#EFEFEF] hover:bg-red-50 transition-colors group disabled:opacity-50 "
            >
              <RiLogoutBoxLine className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              <span className="text-base font-medium text-gray-900 group-hover:text-red-600 transition-colors">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
