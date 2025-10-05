import Link from "next/link";
import { SquarePen } from "lucide-react";

import BaseModal from "@/components/base-modal";
import { DataTableColumnHeader } from "@/components/data-table";

import { useModal } from "@/hooks/useModal";

import OrderDetailView from "./order-detail-view";
import { orderStatusOptions } from "../const";


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