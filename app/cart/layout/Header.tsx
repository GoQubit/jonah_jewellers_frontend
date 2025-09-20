import Link from "next/link"
import { IoMdLock } from "react-icons/io"
import { MdOutlineKeyboardBackspace } from "react-icons/md"

export function CartHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-6 shadow ">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
          <MdOutlineKeyboardBackspace size={20} />
          <span>Continue Shopping</span>
        </Link>

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
      </div>
    </header>
  )
}
