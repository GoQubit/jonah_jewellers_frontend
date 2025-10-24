"use client"
import { Sidebar } from "@/components/layout/Sidebar"
import useIsAuth from "@/hooks/useIsAuth"
import Link from "next/link"
import { useState } from "react"
import { IoMdLock } from "react-icons/io"
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"

export function CartHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isAuth = useIsAuth()
  console.log("isAuth", isAuth);


  return (
    <header className="bg-white border-b border-gray-200 px-4 py-6 shadow ">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <MdOutlineKeyboardBackspace size={20} />
          <span>Continue Shopping</span>
        </Link>

        {
          isAuth ?
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md hover:bg-gray-100 transition"
            >
              <RxHamburgerMenu className="text-xl text-gray-900" />
            </button>
            :
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <Link href="/login" className="hover:text-gray-800 transition-colors">
                Login
              </Link>
              <span>|</span>
              <div className="flex items-center gap-1">
                <IoMdLock className="w-4 h-4" />
                <span>100% Secure</span>
              </div>
            </div>
        }
      </div>
      {
        isAuth &&
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      }
    </header>
  )
}
