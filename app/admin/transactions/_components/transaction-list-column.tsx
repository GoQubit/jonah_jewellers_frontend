import { DataTableColumnHeader } from "@/components/data-table";
import { transactionTypeOptions } from "../const";
import { TransactionTypeOptions } from "../types";
import { formatDate } from "@/utils/formatDate";

export const transactionTableColumns = [
    {
        id: "transactionId",
        accessorKey: "transactionId",
        header: () => {
            return (
                <DataTableColumnHeader title={"Transaction ID"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.transactionId) {
                return <span>-</span>;
            }
            return (
                <span className={" uppercase "}>
                    {row.original.transactionId}
                </span>
            )
        }
    },
    {
        id: "firstName",
        accessorKey: "firstName",
        header: () => {
            return (
                <DataTableColumnHeader title={"Customer name"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.userId?.firstName) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.userId.firstName} {row.original.userId.lastName}
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
        id: "transactionType",
        accessorKey: "transactionType",
        header: () => {
            return (
                <DataTableColumnHeader title={"Category"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            const type = row.original.transactionType as "KITTY" | "GOLD_BUYER" | "GOLD_INVESTOR" | undefined;

            if (type) {
                const label = type === "KITTY"
                    ? "Kitty"
                    : type === "GOLD_BUYER"
                        ? "Gold Buyer"
                        : "Gold Investment";
                return <span>{label}</span>;
            }

            // Fallback for older records created before transactionType existed
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
            if (!row.original.transactionId) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {/* {row.original.modeOfPayment} */}
                    UPI Scanner
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