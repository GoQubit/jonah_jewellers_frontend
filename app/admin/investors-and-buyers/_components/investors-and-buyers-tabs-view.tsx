"use client"

import * as React from "react"
import { Wallet, Sparkles, Banknote } from "lucide-react"
import Link from "next/link"
import { cn } from "@/utils/cn"
import { usePathname } from "next/navigation"

const tabLinks = [
    {
        name: "Pending Verifications",
        value: "pending-verifications",
        icon: Wallet,
        link: "/admin/investors-and-buyers",
    },
    {
        name: "Gold Investors",
        value: "gold-investors",
        icon: Sparkles,
        link: "/admin/investors-and-buyers/gold-investors",
    },
    {
        name: "Kitty Members",
        value: "kitty-members",
        icon: Banknote,
        link: "/admin/investors-and-buyers/kitty-members",
    }
]

export default function InvestorsAndBuyersTabsView() {

    const pathname = usePathname()

    return (
        <div className="w-full">
            <div className="w-full flex justify-start items-center border-b-4">
                {tabLinks.map(({ name, value, icon: Icon, link }) => (
                    <Link
                        key={value}
                        href={link}
                        className={cn(
                            "relative px-5 py-2 flex items-center justify-center gap-2 text-gray-600 whitespace-nowrap transition-colors",
                            pathname === link
                                ? "text-brand"
                                : ""
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        {name}
                        <span
                            className={cn(
                                "absolute left-0 right-0 -bottom-[4px] h-[4px] rounded bg-brand transition-opacity",
                                pathname === link ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </Link>

                ))}
            </div>
        </div>
    )
}