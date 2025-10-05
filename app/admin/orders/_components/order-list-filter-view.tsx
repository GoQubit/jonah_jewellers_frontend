"use client"

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/Input'
import { OrderListFilters, OrderStatus } from '../types'
import { orderListFilters, orderStatusOptions } from '../const'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IoIosSearch } from 'react-icons/io'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/utils/cn'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/Card'
import { ChevronDownIcon, X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { debounce } from '@/utils/helpers'
import { calendarOptions } from '../../const'


const OrderListFilterView = () => {
    const [filters, setFilters] = useState<OrderListFilters>(orderListFilters)

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        setFilters(prev => ({
            ...prev,
            search: searchParams.get("search") || "",
            status: (searchParams.get("status") as OrderStatus) || "",
            fromDate: searchParams.get("fromDate") ? new Date(searchParams.get("fromDate")!) : undefined,
            toDate: searchParams.get("toDate") ? new Date(searchParams.get("toDate")!) : undefined,
        }))
    }, [searchParams])

    const handleRoute = useCallback(
        debounce((urlQuery: string) => {
            router.push(`${pathname}?${urlQuery}`)
        }, 500),
        []
    )

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(searchParams.toString())

        if (filters.search) {
            urlSearchParams.set("search", filters.search)
        }

        if (filters.status) {
            urlSearchParams.set("status", filters.status)
        }

        if (filters.fromDate && filters.toDate) {
            urlSearchParams.set("fromDate", filters.fromDate.toISOString())
            urlSearchParams.set("toDate", filters.toDate.toISOString())
        }

        const queryString = urlSearchParams.toString()
        if (queryString) {
            handleRoute(queryString)
        }
    }, [filters])

    const clearFilterCheck = useMemo(() => (
        searchParams.get("search") ||
        searchParams.get("status") ||
        searchParams.get("fromDate") ||
        searchParams.get("toDate")
    ), [searchParams])

    const onClearFilter = useCallback(() => {
        router.push(pathname)
    }, [])

    return (
        <div className="flex items-center justify-start flex-nowrap gap-5">
            {/* search input */}
            <div className="w-80 h-10 rounded-md border border-[#BFBFBF] flex items-center focus-within:border-brand px-3 py-1">
                <Input
                    type="text"
                    value={filters?.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    placeholder='Search'
                    className="grow h-full focus:outline-none border-none px-0 py-0"
                />
                <IoIosSearch className='w-5 h-5 text-[#BFBFBF] peer-focus-within:text-brand' />
            </div>

            {/* status dropdown menu */}
            <DropdownMenu>
                <DropdownMenuTrigger
                    className='px-3 w-fit h-10 border border-[#BFBFBF] rounded-md focus:outline-none flex flex-row items-center justify-between gap-3'
                >
                    <span>
                        <span>Status: </span>
                        <span style={{ color: orderStatusOptions.find((orderStatus) => filters.status === orderStatus.value)?.dark_color || "" }}>
                            {orderStatusOptions.find((orderStatus) => filters.status === orderStatus.value)?.label || "All"}
                        </span>
                    </span>
                    <ChevronDownIcon className="w-6 h-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-40 p-0 bg-white"
                >
                    {orderStatusOptions.map((orderStatus) => (
                        <DropdownMenuItem
                            key={orderStatus.value}
                            className={cn(
                                "py-1.5 text-lg focus:bg-transparent focus:outline-none cursor-pointer",
                                filters.status === orderStatus.value && "border-l-4"
                            )}
                            style={{
                                color: orderStatus.dark_color,
                                borderColor: filters.status === orderStatus.value ? orderStatus.dark_color : ""
                            }}
                            onClick={() => setFilters(s => ({ ...s, status: orderStatus.value }))}
                        >
                            {orderStatus.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Select Date Range */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date-range"
                        className="w-60 h-10 font-normal hover:bg-transparent border border-[#BFBFBF] rounded-md focus:outline-none flex flex-row items-center justify-between gap-3"
                    >
                        {filters?.fromDate && filters?.toDate
                            ? `${filters.fromDate.toLocaleDateString()} - ${filters.toDate.toLocaleDateString()}`
                            : "Select Date Range"}
                        <ChevronDownIcon className="w-6 h-6" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent asChild className="overflow-hidden p-0" align="start">
                    <Card className="max-w-[300px] py-4 bg-white">
                        <CardContent className="px-4">
                            <Calendar
                                mode="range"
                                defaultMonth={filters?.fromDate || new Date(new Date().setHours(0, 0, 0, 0))}
                                selected={{
                                    from: filters?.fromDate,
                                    to: filters?.toDate
                                }}
                                onSelect={(selected) => setFilters(prev => ({
                                    ...prev,
                                    fromDate: selected?.from,
                                    toDate: selected?.to
                                }))}
                                numberOfMonths={1}
                                className="bg-transparent p-0 [--cell-size:2.375rem]"

                            />
                        </CardContent>
                        <CardFooter className="flex flex-wrap gap-2 border-t px-4 !pt-4">
                            {calendarOptions.map((preset) => (
                                <Button
                                    key={preset.label}
                                    variant="outline"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => {
                                        setFilters(prev => ({
                                            ...prev,
                                            fromDate: preset?.from,
                                            toDate: preset?.to
                                        }))
                                    }}
                                >
                                    {preset.label}
                                </Button>
                            ))}
                        </CardFooter>
                    </Card>
                </PopoverContent>
            </Popover>

            {clearFilterCheck && (
                <div>
                    <Button
                        variant={'ghost'}
                        size="sm"
                        onClick={onClearFilter}
                        disabled={!clearFilterCheck}
                    >
                        Clear Filter <X />
                    </Button>
                </div>
            )}

        </div>
    )
}

export default OrderListFilterView