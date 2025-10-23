"use client"

import { useEffect, useState } from "react"
import GenericDropdown from "@/components/ui/GenericDropdown"
import {
  setCategory,
  setSubCategory,
  setOccasion,
  setShopFor,
  setSortBy,
} from "@/redux/Features/filterSlice/filterSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getSubCategoriesApi } from "@/lib/api/category/productCategoriesApis"

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "GOLD", label: "Gold" },
  { value: "SILVER", label: "Silver" },
  { value: "DIAMOND", label: "Diamond" },
]

const occasionOptions = [
  { value: "", label: "All Occasion" },
  { value: "wedding", label: "Wedding" },
  { value: "party", label: "Party" },
  { value: "casual", label: "Casual" },
  { value: "festival", label: "Festival" },
]

const shopForOptions = [
  { value: "", label: "For All" },
  { value: "FEMALE", label: "Women" },
  { value: "MALE", label: "Men" },
]

const sortOptions = [
  { value: "", label: "All" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
]

export default function FilterSection() {
  const dispatch = useAppDispatch()
  const { category, subCategory, occasion, targetGender, sortBy } =
    useAppSelector((state) => state.filters)

  const [subCategoryData, setSubCategoryData] = useState([])

  useEffect(() => {
    ; (async () => {
      const res = await getSubCategoriesApi()
      if (res.status === 200) {
        setSubCategoryData(res.data.results)
      }
    })()
  }, [])

  return (
    <div className="wrapper bg-white border-b border-gray-200 py-3 md:py-4 px-3 md:px-6 relative z-10 mt-6 ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* --- FILTER SCROLL SECTION --- */}
        <div className="relative">
          {/* ✅ Use inner div for scroll, but keep outer div visible */}
          <div
            className="flex md:flex-wrap md:justify-start gap-3 md:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1"
            style={{
              WebkitOverflowScrolling: "touch",
              overflowY: "visible", // ✅ prevents dropdown cut-off
            }}
          >
            <div className="flex flex-nowrap md:flex-wrap gap-3 md:gap-4 relative z-20">
              <GenericDropdown
                options={categoryOptions}
                value={category}
                onChange={(val) => dispatch(setCategory(val))}
                placeholder="Select Category"
                className="min-w-[140px] flex-shrink-0"
              />
              <GenericDropdown
                options={subCategoryData}
                value={subCategory}
                labelField="name"
                valueField="id"
                onChange={(val) => dispatch(setSubCategory(val))}
                placeholder="Select Sub Category"
                className="min-w-[160px] flex-shrink-0"
              />
              <GenericDropdown
                options={occasionOptions}
                value={occasion}
                onChange={(val) => dispatch(setOccasion(val))}
                placeholder="Select Occasion"
                className="min-w-[140px] flex-shrink-0"
              />
              <GenericDropdown
                options={shopForOptions}
                value={targetGender}
                onChange={(val) => dispatch(setShopFor(val))}
                placeholder="Shop For"
                className="min-w-[120px] flex-shrink-0"
              />
            </div>
          </div>
        </div>

        {/* --- SORT DROPDOWN (RIGHT SIDE) --- */}
        <div className="flex items-center justify-start md:justify-end gap-2 mt-2 md:mt-0 relative z-30">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            Sort By:
          </span>
          <GenericDropdown
            options={sortOptions}
            value={sortBy}
            onChange={(val) => dispatch(setSortBy(val))}
            className="min-w-[140px]"
            placeholder="Sort by"
          />
        </div>
      </div>
    </div>
  )
}

/* ✅ GLOBAL STYLES */
<style jsx global>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
