import { CirclePlus, CreditCard, LayoutDashboard, MessageCircleQuestionMark, PackageSearch, ShoppingCart, Users } from "lucide-react"


export const menuItems = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        link: "/admin",
        // Exact match only - otherwise this would stay highlighted (and this
        // tab would incorrectly match) on every other /admin/* page too.
        regex: /^\/admin\/?$/,
    },
    {
        icon: ShoppingCart,
        label: "Order Management",
        link: "/admin/orders",
        regex: /^\/admin\/orders.*?$/,
    },
    {
        icon: Users,
        label: "Investors & Buyers",
        link: "/admin/investors-and-buyers",
        regex: /^\/admin\/investors-and-buyers.*?$/,
    },
    {
        icon: CreditCard,
        label: "Transactions",
        link: "/admin/transactions",
        regex: /^\/admin\/transactions.*?$/,
    },
    {
        icon: CirclePlus,
        label: "Add Products",
        link: "/admin/add-product",
        regex: /^\/admin\/add-product.*?$/,
    },
    {
        icon: PackageSearch,
        label: "Product List",
        link: "/admin/products",
        regex: /^\/admin\/products.*?$/,
    },
    {
        icon: MessageCircleQuestionMark,
        label: "Ticket Raise",
        link: "/admin/tickets",
        regex: /^\/admin\/tickets.*?$/,
    },
]