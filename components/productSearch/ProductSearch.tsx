"use client"
import React, { useEffect, useState } from "react"
import SearchInput from "../ui/SearchInput"
import { getAllProductsApi } from "@/lib/api/products/productsApis"
import Link from "next/link"
import Image from "next/image"

const ProductSearch = () => {
  const [query, setQuery] = useState<string>("")
  const [results, setResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  // fetch searched products
  const fetchSearchedProducts = async (searchQuery: string) => {
    try {
      const res = await getAllProductsApi({ q: searchQuery })
      if (res.status === 200) {
        setResults(res.data.results)
        setShowDropdown(true)
      }
    } catch (err) {
      console.error("Search error:", err)
    }
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.length === 0) {
        setResults([])
        setShowDropdown(false)
      } else if (query.length > 2) {
        fetchSearchedProducts(query)
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  return (
    <div className="relative w-full max-w-[550px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px] flex-1">
      {/* Search Box */}
      <SearchInput
        placeholder="Search for Gold Jewellery, Diamond Jewellery & more..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:h-12 text-sm sm:text-base"
        inputClassName="!border !py-2.5 "
      />

      {/* Dropdown Results */}
      {showDropdown && results?.length > 0 && (
        <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg border max-h-80 overflow-y-auto z-50 sm:max-w-full">
          {results?.map((product) => (
            <Link
              key={product?._id}
              href={`/shop/product/${product?._id}`}
              className="flex items-center gap-3 p-2 sm:p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => setShowDropdown(false)}
            >
              <Image
                src={product?.images?.[0] || "/placeholder.png"}
                alt={product?.name}
                width={40}
                height={30}
                className="rounded-md object-cover flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium truncate">{product?.name}</span>
                <span className="text-[10px] sm:text-xs text-brandLight capitalize truncate">
                  {product?.category?.toLowerCase()} Jewellery
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {showDropdown && results.length === 0 && (
        <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg border p-2 sm:p-3 text-xs sm:text-sm text-gray-500 text-center ">
          No products found
        </div>
      )}
    </div>
  )
}

export default ProductSearch
