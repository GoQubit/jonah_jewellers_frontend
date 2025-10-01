import { CiCreditCard1 } from "react-icons/ci"
import { FiShoppingCart, FiUsers, FiPackage, FiHelpCircle, FiLogOut } from "react-icons/fi"
import { IoMdAddCircleOutline } from "react-icons/io"


export const menuItems = [
    {
        icon: FiShoppingCart,
        label: "Order Management",
        link: "/admin/orders",
        regex: /^\/admin\/orders.*?$/,
    },
    {
        icon: FiUsers,
        label: "Investors & Buyers",
        link: "/admin/investors-and-buyers",
        regex: /^\/admin\/investors-and-buyers.*?$/,
    },
    {
        icon: CiCreditCard1,
        label: "Transactions",
        link: "/admin/transactions",
        regex: /^\/admin\/transactions.*?$/,
    },
    {
        icon: IoMdAddCircleOutline,
        label: "Add Products",
        link: "/admin/add-product",
        regex: /^\/admin\/add-product.*?$/,
    },
    {
        icon: FiPackage,
        label: "Product List",
        link: "/admin/products",
        regex: /^\/admin\/products.*?$/,
    },
    {
        icon: FiHelpCircle,
        label: "Ticket Raise",
        link: "/admin/tickets",
        regex: /^\/admin\/tickets.*?$/,
    },
]

export const calendarOptions = [
    {
        label: "Today",
        from: new Date(new Date().setHours(0, 0, 0, 0)),
        to: new Date(new Date().setHours(23, 59, 59, 999)),
    },
    {
        label: "Yesterday",
        from: new Date(new Date().setDate(new Date().getDate() - 1)),
        to: new Date(new Date().setHours(23, 59, 59, 999)),
    },
    {
        label: "This Week",
        from: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
        to: new Date(),
    },
    {
        label: "Last Week",
        from: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 7)),
        to: new Date(new Date().setDate(new Date().getDate() - new Date().getDay() - 1)),
    },
    {
        label: "This Month",
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
    },
    {
        label: "Last Month",
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    },
    {
        label: "This Year",
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
    },
    {
        label: "Last Year",
        from: new Date(new Date().getFullYear() - 1, 0, 1),
        to: new Date(new Date().getFullYear() - 1, 11, 31),
    },
]