import { DataTableColumnHeader } from "@/components/data-table";
import { OrderListFilters, OrderStatusOptions } from "./types";
import Link from "next/link";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import BaseModal from "@/components/base-modal";
import OrderDetailView from "./_components/order-detail-view";

export const orderListFilters: OrderListFilters = {
    search: '',
    status: '',
    fromDate: undefined,
    toDate: undefined,
}

export const orderStatusOptions: OrderStatusOptions[] = [
    {
        value: "pending",
        label: "Pending",
        light_color: "#f9fafb",
        dark_color: "#64748b",
    },
    {
        value: "processing",
        label: "Processing",
        light_color: "#eff6ff",
        dark_color: "#3b82f6",
    },
    {
        value: "shipped",
        label: "Shipped",
        light_color: "#fefce8",
        dark_color: "#eab308",
    },
    {
        value: "delivered",
        label: "Delivered",
        light_color: "#f0fdf4",
        dark_color: "#22c55e",
    },
    {
        value: "cancelled",
        label: "Cancelled",
        light_color: "#fef2f2",
        dark_color: "#ef4444",
    },
]

export const orderListData = [
    {
        order_id: "59217",
        date: "17 AUG,2025",
        item: "01",
        customer_name: "Mr Anas Malhotra",
        status: "processing",
        tracking_link: "-",
    },
    {
        order_id: "59213",
        date: "17 AUG,2025",
        item: "02",
        customer_name: "Mrs Ankita Ansari",
        status: "shipped",
        tracking_link: "940010010936113003113",
    },
    {
        order_id: "59219",
        date: "17 AUG,2025",
        item: "12",
        customer_name: "Mr Anas Pandey",
        status: "delivered",
        tracking_link: "940010010936113003113",
    },
    {
        order_id: "59220",
        date: "17 AUG,2025",
        item: "22",
        customer_name: "Mr Anas Malhotra",
        status: "delivered",
        tracking_link: "940010010936113003113",
    },
    {
        order_id: "59223",
        date: "17 AUG,2025",
        item: "01",
        customer_name: "Mr Anas Malhotra",
        status: "delivered",
        tracking_link: "940010010936113003113",
    },
    {
        order_id: "59224",
        date: "18 AUG,2025",
        item: "03",
        customer_name: "Mrs Ankita Ansari",
        status: "pending",
        tracking_link: "-",
    },
    {
        order_id: "59225",
        date: "18 AUG,2025",
        item: "04",
        customer_name: "Mr Anas Pandey",
        status: "cancelled",
        tracking_link: "-",
    },
    {
        order_id: "59226",
        date: "18 AUG,2025",
        item: "05",
        customer_name: "Mr Anas Malhotra",
        status: "processing",
        tracking_link: "-",
    },
    {
        order_id: "59227",
        date: "18 AUG,2025",
        item: "06",
        customer_name: "Mrs Ankita Ansari",
        status: "shipped",
        tracking_link: "940010010936113003114",
    },
    {
        order_id: "59228",
        date: "18 AUG,2025",
        item: "07",
        customer_name: "Mr Anas Pandey",
        status: "delivered",
        tracking_link: "940010010936113003115",
    },
    {
        order_id: "59229",
        date: "19 AUG,2025",
        item: "08",
        customer_name: "Mr Anas Malhotra",
        status: "delivered",
        tracking_link: "940010010936113003116",
    },
    {
        order_id: "59230",
        date: "19 AUG,2025",
        item: "09",
        customer_name: "Mrs Ankita Ansari",
        status: "pending",
        tracking_link: "-",
    },
    {
        order_id: "59231",
        date: "19 AUG,2025",
        item: "10",
        customer_name: "Mr Anas Pandey",
        status: "cancelled",
        tracking_link: "-",
    },
    {
        order_id: "59232",
        date: "19 AUG,2025",
        item: "11",
        customer_name: "Mr Anas Malhotra",
        status: "processing",
        tracking_link: "-",
    },
    {
        order_id: "59233",
        date: "19 AUG,2025",
        item: "12",
        customer_name: "Mrs Ankita Ansari",
        status: "shipped",
        tracking_link: "940010010936113003117",
    },
    {
        order_id: "59234",
        date: "20 AUG,2025",
        item: "13",
        customer_name: "Mr Anas Pandey",
        status: "delivered",
        tracking_link: "940010010936113003118",
    },
    {
        order_id: "59235",
        date: "20 AUG,2025",
        item: "14",
        customer_name: "Mr Anas Malhotra",
        status: "delivered",
        tracking_link: "940010010936113003119",
    },
    {
        order_id: "59236",
        date: "20 AUG,2025",
        item: "15",
        customer_name: "Mrs Ankita Ansari",
        status: "pending",
        tracking_link: "-",
    },
    {
        order_id: "59237",
        date: "20 AUG,2025",
        item: "16",
        customer_name: "Mr Anas Pandey",
        status: "cancelled",
        tracking_link: "-",
    },
    {
        order_id: "59238",
        date: "20 AUG,2025",
        item: "17",
        customer_name: "Mr Anas Malhotra",
        status: "processing",
        tracking_link: "-",
    },
    {
        order_id: "59239",
        date: "21 AUG,2025",
        item: "18",
        customer_name: "Mrs Ankita Ansari",
        status: "shipped",
        tracking_link: "940010010936113003120",
    },
    {
        order_id: "59240",
        date: "21 AUG,2025",
        item: "19",
        customer_name: "Mr Anas Pandey",
        status: "delivered",
        tracking_link: "940010010936113003121",
    },
    {
        order_id: "59241",
        date: "21 AUG,2025",
        item: "20",
        customer_name: "Mr Anas Malhotra",
        status: "delivered",
        tracking_link: "940010010936113003122",
    },
    {
        order_id: "59242",
        date: "21 AUG,2025",
        item: "21",
        customer_name: "Mrs Ankita Ansari",
        status: "pending",
        tracking_link: "-",
    },
    {
        order_id: "59243",
        date: "21 AUG,2025",
        item: "22",
        customer_name: "Mr Anas Pandey",
        status: "cancelled",
        tracking_link: "-",
    },
    {
        order_id: "59244",
        date: "21 AUG,2025",
        item: "23",
        customer_name: "Mr Anas Malhotra",
        status: "processing",
        tracking_link: "-",
    },
    {
        order_id: "59245",
        date: "22 AUG,2025",
        item: "24",
        customer_name: "Mrs Ankita Ansari",
        status: "shipped",
        tracking_link: "940010010936113003123",
    },
    {
        order_id: "59246",
        date: "22 AUG,2025",
        item: "25",
        customer_name: "Mr Anas Pandey",
        status: "delivered",
        tracking_link: "940010010936113003124",
    },
    {
        order_id: "59247",
        date: "22 AUG,2025",
        item: "26",
        customer_name: "Mr Anas Malhotra",
        status: "delivered",
        tracking_link: "940010010936113003125",
    },
    {
        order_id: "59248",
        date: "22 AUG,2025",
        item: "27",
        customer_name: "Pablo Gavi",
        status: "delivered",
        tracking_link: "940010010936113003126",
    }
]


export const orderTableColumns = [
    {
        id: "order_id",
        accessorKey: "order_id",
        header: () => {
            return (
                <DataTableColumnHeader title={"Order ID"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.order_id) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.order_id}
                </span>
            )
        }
    },
    {
        id: "date",
        accessorKey: "date",
        header: () => {
            return (
                <DataTableColumnHeader title={"Date"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.date) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.date}
                </span>
            )
        }
    },
    {
        id: "item",
        accessorKey: "item",
        header: () => {
            return (
                <DataTableColumnHeader title={"Item"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.item) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.item}
                </span>
            )
        }
    },
    {
        id: "customer_name",
        accessorKey: "customer_name",
        header: () => {
            return (
                <DataTableColumnHeader title={"Customer Name"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.customer_name) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.customer_name}
                </span>
            )
        }
    },
    {
        id: "status",
        accessorKey: "status",
        header: () => {
            return (
                <DataTableColumnHeader title={"Status"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.status) {
                return <span>-</span>;
            }

            const statusOption = orderStatusOptions.find((option) => option.value === row.original.status);
            return (
                <div className={"w-32 py-0.5 rounded border text-sm font-medium text-center capitalize"} style={{
                    backgroundColor: statusOption?.light_color || "#f3f4f6",
                    color: statusOption?.dark_color || "#374151",
                    borderColor: statusOption?.dark_color || "#374151",
                }}>
                    {statusOption?.label || row.original.status}
                </div>
            )
        }
    },
    {
        id: "tracking_link",
        accessorKey: "tracking_link",
        header: () => {
            return (
                <DataTableColumnHeader title={"Tracking Link"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.tracking_link) {
                return <span>-</span>;
            }
            return (
                <Link href={row.original.tracking_link} className={"hover:underline hover:text-blue-600"} target="_blank" rel="noopener noreferrer">
                    {row.original.tracking_link}
                </Link>
            )
        }
    },
    {
        id: "action",
        header: () => {
            return (
                <DataTableColumnHeader title={"Action"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            const { setOpen, setClose } = useModal()

            return (
                <SquarePen
                    className="w-4 h-4 text-gray-500 hover:text-gray-600 cursor-pointer"
                    onClick={() => setOpen(
                        <BaseModal>
                            <OrderDetailView onClose={() => setClose()} />
                        </BaseModal>
                    )}
                />
            )
        }
    },
]