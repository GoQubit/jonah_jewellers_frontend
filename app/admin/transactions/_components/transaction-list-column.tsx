import { DataTableColumnHeader } from "@/components/data-table";
import { transactionTypeOptions } from "../const";
import { TransactionTypeOptions } from "../types";
import { formatDate } from "@/utils/formatDate";

export const transactionTableColumns = [
    {
        id: "transactionId",
        accessorKey: "razorpayOrderId",
        header: () => {
            return (
                <DataTableColumnHeader title={"Transaction ID"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            const transactionId = row.original.razorpayOrderId || row.original.id;
            if (!transactionId) {
                return <span>-</span>;
            }
            return (
                <span className={"uppercase"}>
                    {transactionId}
                </span>
            )
        }
    },
    {
        id: "user",
        accessorKey: "userId",
        header: () => {
            return (
                <DataTableColumnHeader title={"User"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            // The transaction record only carries the raw userId (not a
            // populated name), so show the id alongside their role.
            if (row.original.userId === undefined || row.original.userId === null) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    #{row.original.userId}
                    {row.original.userType ? ` (${row.original.userType === "BUYER" ? "Buyer" : "Seller"})` : ""}
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
            if (!row.original.createdAt) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {formatDate(row.original.createdAt)}
                </span>
            )
        }
    },
    {
        id: "userType",
        accessorKey: "userType",
        header: () => {
            return (
                <DataTableColumnHeader title={"Category"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.userType) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.userType === "BUYER" ? 'Kitty' : 'Gold Investment'}
                </span>
            )
        }
    },
    {
        id: "modeOfPayment",
        accessorKey: "modeOfPayment",
        header: () => {
            return (
                <DataTableColumnHeader title={"Mode of payment"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.razorpayOrderId) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    Razorpay
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

            const color = row.original.status === 'SUCCESS' ? '#14863D' : row.original.status === 'PENDING' ? '#E8A83E' : '#FF0000'
            return (
                <span
                    className={`flex items-center justify-center gap-1.5`}
                    style={{ color: color }}
                >
                    {row.original.status || ""}
                </span>
            )
        }
    },
    {
        id: "amount",
        accessorKey: "amount",
        header: () => {
            return (
                <DataTableColumnHeader title={"Amount"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.amount) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.amount.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 2,
                    })}
                </span>
            )
        }
    },
]