import { DataTableColumnHeader } from "@/components/data-table";
import { productStatusOptions } from "../const";
import { useModal } from "@/hooks/useModal";
import { DeleteIcon, SquarePen, Trash2 } from "lucide-react";
import BaseModal from "@/components/base-modal";
import EditProductView from "./edit-product-view";
import { useState } from "react";
import { deleteProductApi } from "@/lib/api/products/productsApis";
import { FaSpinner } from "react-icons/fa";
import Toast from "@/components/Toast/Toast";
import { usePathname, useRouter } from "next/navigation";

export const getProductTableColumns = (getProducts: Function) => {
    return [
        {
            id: "_id",
            accessorKey: "_id",
            header: () => {
                return (
                    <DataTableColumnHeader title={"Product ID"} />
                )
            },
            cell: ({ row }: { row: any }) => {
                if (!row.original._id) {
                    return <span>-</span>;
                }
                return (
                    <span className={""}>
                        {row.original._id}
                    </span>
                )
            }
        },
        {
            id: "name",
            accessorKey: "name",
            header: () => {
                return (
                    <DataTableColumnHeader title={"Name"} />
                )
            },
            cell: ({ row }: { row: any }) => {
                if (!row.original?.name) {
                    return <span>-</span>;
                }
                return (
                    <span className={""}>
                        {row.original.name}
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
                if (!row.original?.subCategory?.name) {
                    return <span>-</span>;
                }
                return (
                    <span className={""}>
                        {row.original.subCategory.name}
                    </span>
                )
            }
        },
        {
            id: "price",
            accessorKey: "price",
            header: () => {
                return (
                    <DataTableColumnHeader title={"Price"} />
                )
            },
            cell: ({ row }: { row: any }) => {
                if (!row.original?.price == undefined) {
                    return <span>-</span>;
                }
                return (
                    <span className={""}>
                        {row.original?.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                        })}
                    </span>
                )
            }
        },
        // {
        //     id: "material",
        //     accessorKey: "material",
        //     header: () => {
        //         return (
        //             <DataTableColumnHeader title={"Material"} />
        //         )
        //     },
        //     cell: ({ row }: { row: any }) => {
        //         if (!row.original?.material) {
        //             return <span>-</span>;
        //         }
        //         return (
        //             <span className={""}>
        //                 {row.original.material}
        //             </span>
        //         )
        //     }
        // },
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
                let status = (row.original?.stock !== undefined && row.original?.stock > 0) ? "active" : "out_of_stock"
                const statusOption = productStatusOptions.find((option) => option.value === status);
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
                const [deleteLoading, setDeleteLoading] = useState(false)

                const router = useRouter()
                const pathname = usePathname()

                const handleDelete = async () => {
                    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
                    if (!confirmDelete) return;

                    try {
                        setDeleteLoading(true);
                        const response = await deleteProductApi(row.original._id);
                        if (response.status === 204) {
                            router.replace(pathname || "/admin/products");
                            Toast.success("Product deleted successfully");
                        } else {
                            throw new Error("Failed to delete product");
                        }
                    } catch (error: any) {
                        Toast.error(error?.message || "An error occurred while deleting the product");
                        console.error("Error deleting product:", error);
                    } finally {
                        setDeleteLoading(false);
                    }
                }

                return (
                    <div className="flex items-center gap-4">
                        <SquarePen
                            className="w-4 h-4 text-gray-500 hover:text-blue-600 cursor-pointer"
                            onClick={() => setOpen(
                                <BaseModal>
                                    <EditProductView
                                        productId={row.original._id}
                                        onClose={() => setClose()}
                                        getProducts={getProducts}
                                    />
                                </BaseModal>
                            )}
                        />
                        {deleteLoading ? (
                            <FaSpinner
                                className="w-4 h-4 text-gray-500 animate-spin"
                            />
                        ): (
                            <Trash2
                                className="w-4 h-4 text-gray-500 hover:text-red-600 cursor-pointer"
                                onClick={() => handleDelete()}
                            />
                        )}
                    </div>
                )
            }
        },
    ]
}