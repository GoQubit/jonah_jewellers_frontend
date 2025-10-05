import { DataTableColumnHeader } from "@/components/data-table";
import { transactionTypeOptions } from "../const";
import { TransactionTypeOptions } from "../types";

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
                <span className={""}>
                    {row.original.transactionId}
                </span>
            )
        }
    },
    {
        id: "customerName",
        accessorKey: "customerName",
        header: () => {
            return (
                <DataTableColumnHeader title={"Customer name"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.customerName) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.customerName}
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
        id: "category",
        accessorKey: "category",
        header: () => {
            return (
                <DataTableColumnHeader title={"Category"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.category) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.category}
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
            if (!row.original.modeOfPayment) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.modeOfPayment}
                </span>
            )
        }
    },
    {
        id: "type",
        accessorKey: "type",
        header: () => {
            return (
                <DataTableColumnHeader title={"Type"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.type) {
                return <span>-</span>;
            }

            const typeOption = transactionTypeOptions.find((typeOption: TransactionTypeOptions) => typeOption?.value === row.original.type)
            const Icon = typeOption?.icon
            return (
                <span
                    className={"flex items-center justify-center gap-1.5"}
                    style={{ color: typeOption?.dark_color || "" }}
                >
                    {Icon && <Icon className="w-4 h-4" />}
                    {typeOption?.label || ""}
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