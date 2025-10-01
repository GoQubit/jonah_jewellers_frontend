"use client"

import { usePathname, useRouter } from "next/navigation"
import { FiLogOut } from "react-icons/fi"

import { Button } from "@/components/ui/buttons/Button"
import { cn } from "@/utils/cn"

import { menuItems } from "./const"

const Sidebar = () => {

  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="sticky top-[64px] z-40 w-64 flex flex-col justify-between bg-white border-r border-gray-200 h-[calc(100vh-64px)]">
      <nav className="grow p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant={pathname.match(item.regex) ? "default" : "ghost"}
            size="sm"
            className={cn(
              "w-full flex !justify-start items-center gap-3 font-normal text-lg",
              pathname.match(item.regex)
                ? "!bg-brand hover:bg-brand text-white"
                : "!text-gray-700 hover:bg-gray-100"
            )}
            onClick={() => router.push(item.link)}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4">
        <Button variant="ghost" className="w-full !justify-start items-center gap-3 text-lg text-gray-700 font-normal bg-grayLight">
          <FiLogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar