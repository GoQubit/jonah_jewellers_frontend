"use client"

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type TableState,
} from "@tanstack/react-table";
import { z } from "zod";


export interface UseDataTableProps<TData, TValue> {
  data: TData[],
  columns: ColumnDef<TData, TValue>[]
  pageCount?: number
  state?: Omit<Partial<TableState>, "pagination"> & {
    pagination?: Partial<PaginationState>
  }
}

const searchParamsSchema = z.object({
  page: z.coerce.number().default(1),
})


export default function useDataTable<TData, TValue>({
  data = [],
  columns = [],
  pageCount,
  state,
}: UseDataTableProps<TData, TValue>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Search params
  const searchParamsEntries = searchParams ? Array.from(searchParams.entries()) : [];
  const parsedSearchParams = Object.fromEntries(
    searchParamsEntries.map(([key, value]) => [key, value ?? undefined])
  );
  const { page } = searchParamsSchema.parse(parsedSearchParams)

  const hasMounted = React.useRef(false);

  const createQueryString = React.useCallback((params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams?.toString())

    for (const [key, value] of Object.entries(params)) {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, String(value))
      }
    }

    return newSearchParams.toString()
  }, [searchParams])

  const initialPageSize = state?.pagination?.pageSize ?? 10;
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>(
    {
      pageIndex: page - 1,
      pageSize: initialPageSize,
    }
  )

  React.useEffect(() => {
    setPagination({
      pageIndex: page - 1,
      pageSize: initialPageSize,
    })
  }, [initialPageSize, page])

  const pagination = React.useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize])

  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (!searchParams?.toString()) return;
    }

    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1
      })}${window.location.hash ? window.location.hash : ""}`,
      {
        scroll: false,
      }
    )
  }, [pageIndex])

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      ...state,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  })

  return { table };
}
