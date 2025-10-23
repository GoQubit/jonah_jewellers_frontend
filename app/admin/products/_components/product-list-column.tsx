import { DataTableColumnHeader } from "@/components/data-table";
import { productStatusOptions } from "../const";
import { useModal } from "@/hooks/useModal";
import { SquarePen } from "lucide-react";
import BaseModal from "@/components/base-modal";
import EditProductView from "./edit-product-view";

export const productTableColumns = [
    {
        id: "id",
        accessorKey: "id",
        header: () => {
            return (
                <DataTableColumnHeader title={"Product ID"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.id) {
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
        id: "subCategory",
        accessorKey: "subCategory",
        header: () => {
            return (
                <DataTableColumnHeader title={"Sub Category"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original.subCategory) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.subCategory}
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
            if (!row.original?.amount == undefined) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.amount}
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
            if (!row.original?.amount == undefined) {
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
    {
        id: "material",
        accessorKey: "material",
        header: () => {
            return (
                <DataTableColumnHeader title={"Material"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.material) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.material}
                </span>
            )
        }
    },
    {
        id: "stock",
        accessorKey: "stock",
        header: () => {
            return (
                <DataTableColumnHeader title={"Stock"} />
            )
        },
        cell: ({ row }: { row: any }) => {
            if (!row.original?.stock == undefined) {
                return <span>-</span>;
            }
            return (
                <span className={""}>
                    {row.original.stock}
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
            if (!row.original?.status) {
                return <span>-</span>;
            }

            const statusOption = productStatusOptions.find((option) => option.value === row.original.status);
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
        id: "action",
        accessorKey: "action",
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
                            <EditProductView onClose={() => setClose()} />
                        </BaseModal>
                    )}
                />
            )
        }
    },
]