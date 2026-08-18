"use client"

import React, { useEffect, useState } from 'react'
import DataTable, { useDataTable } from '@/components/data-table'
import { getProductTableColumns } from './product-list-column'
import { getAllProductsApi } from '@/lib/api/products/productsApis'
import { Loader } from '@/components/ui/Loader/Loader'
import { useSearchParams } from 'next/navigation'
import { ProductStatus } from '../types'


type Props = {}

type InitialProducts = { isLoading: boolean, data: null | any, error: null | string }
const initialProducts: InitialProducts = { isLoading: false, data: null, error: null }


const ProductTableView = (props: Props) => {

    const searchParams = useSearchParams()
    const [products, setProducts] = useState(initialProducts)

    const getProducts = async () => {
        setProducts({ ...initialProducts, isLoading: true})
        try {
            const queryParams = {
                limit: 20,
                page: searchParams.get("page") || "1",
                q: searchParams.get("search") || "",
                status: (searchParams.get("status") as ProductStatus) || "",
                startDate: searchParams.get("startDate") ? new Date(searchParams.get("startDate")!) : undefined,
                endDate: searchParams.get("endDate") ? new Date(searchParams.get("endDate")!) : undefined,
                archive: searchParams.get("archive") ? searchParams.get("archive") === "true" : false
            }
            const response = await getAllProductsApi(queryParams)
            if (response.status === 200) {
                setProducts(s => ({ ...s, data: response.data, error: null}))
            } else {
                throw new Error(response?.data?.message || response?.data?.error || "Products doesn't exists!")
            }
        } catch (e: any) {
            setProducts(s => ({...s, error: e?.message || "Something went wrong!", data: null}))
        } finally {
            setProducts(s => ({...s, isLoading: false}))
        }
    }

    useEffect(() => {
        getProducts()
    }, [searchParams])

    const productTableColumns = getProductTableColumns(getProducts)

    const { table } = useDataTable({
        data: products?.data?.results || [],
        columns: productTableColumns,
        pageCount: products?.data?.totalPages,
        state: {
            pagination: { pageIndex: 0, pageSize: products?.data?.limit},
        },
    })

    if (products.isLoading) { 
        return (
            <Loader />
        )
    }

    if (products.error) { 
        return (
            <div>{products.error}</div>
        )
    }

    return (
        <DataTable
            table={table}
            totalResults={products?.data?.totalResults}
            message={"No product found"}
            className={"w-full flex flex-col border-b-4 rounded"}
        />
    )
}

export default ProductTableView