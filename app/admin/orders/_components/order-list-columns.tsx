import Link from "next/link";
import { SquarePen } from "lucide-react";

import BaseModal from "@/components/base-modal";
import { DataTableColumnHeader } from "@/components/data-table";

import { useModal } from "@/hooks/useModal";

import OrderDetailView from "./order-detail-view";
import { orderStatusOptions } from "../const";


export const orderTableColumns = [
    {
        id: "id",
        accessorKey: "id",
        header: () => {
            return (
                <DataTableColumnHeader title={"Order ID"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.id) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.id}
                </span>
            )
        }
    },
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: () => {
            return (
                <DataTableColumnHeader title={"Date"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.createdAt) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {new Date(row.original.createdAt)
                        .toLocaleString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })
                        .replace(",", "")
                        .replace(/\b[a-z]/, (m) => m.toUpperCase())}
                </span>
            )
        }
    },
    {
        id: "items",
        accessorKey: "items",
        header: () => {
            return (
                <DataTableColumnHeader title={"Item"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            return (
                <span className={""}>
                    {row.original?.items?.length || 0}
                </span>
            )
        }
    },
    {
        id: "customer_name",
        accessorKey: "shippingAddress.name",
        header: () => {
            return (
                <DataTableColumnHeader title={"Customer Name"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.shippingAddress?.name) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original?.shippingAddress?.name}
                </span>
            )
        }
    },
    {
        id: "orderStatus",
        accessorKey: "orderStatus",
        header: () => {
            return (
                <DataTableColumnHeader title={"Status"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.orderStatus) {
                return <span>-</span>;
            }

            const statusOption = orderStatusOptions.find((option) => option.value === row.original?.orderStatus);
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
        id: "trackingLink",
        accessorKey: "trackingLink",
        header: () => {
            return (
                <DataTableColumnHeader title={"Tracking Link"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.trackingLink) {
                return <span>-</span>;
            }
            return (
                <Link href={row.original?.trackingLink} className={"hover:underline hover:text-blue-600"} target="_blank" rel="noopener noreferrer">
                    {row.original.trackingLink}
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
                            <OrderDetailView
                                orderId={row.original.id}
                                onClose={() => setClose()}
                            />
                        </BaseModal>
                    )}
                />
            )
        }
    },
]