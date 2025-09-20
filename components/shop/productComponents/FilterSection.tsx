"use client"

import { useState } from "react"
import GenericDropdown from "@/components/ui/GenericDropdown"
import {
  setCategory,
  setSubCategory,
  setOccasion,
  setShopFor,
  setSortBy,
} from "@/redux/Features/filterSlice/filterSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"


const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "GOLD", label: "Gold" },
  { value: "SILVER", label: "Silver" },
  { value: "DIAMOND", label: "Diamond" },
]

const subCategoryOptions = [
  { value: "all", label: "Sub Category" },
  { value: "rings", label: "Finger Ring" },
  { value: "necklaces", label: "Necklaces" },
  { value: "earrings", label: "Earring" },
  { value: "mangalsutra", label: "Mangalsutra" },
  { value: "bangles", label: "Bangles" },
  { value: "pendant", label: "Pendant" },
]

const occasionOptions = [
  { value: "all", label: "Occasion" },
  { value: "wedding", label: "Wedding" },
  { value: "party", label: "Party" },
  { value: "casual", label: "Casual" },
  { value: "festival", label: "Festival" },
]

const shopForOptions = [
  { value: "all", label: "Shop For" },
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "kids", label: "Kids" },
]

const sortOptions = [
  { value: "all", label: "All" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
]
// const [category, setCategory] = useState("all")
// const [subCategory, setSubCategory] = useState("all")
// const [occasion, setOccasion] = useState("all")
// const [shopFor, setShopFor] = useState("all")
// const [sortBy, setSortBy] = useState("all")

export default function FilterSection() {
  const dispatch = useAppDispatch()
  const { category, subCategory, occasion, shopFor, sortBy } = useAppSelector(
    (state) => state.filters
  )

  return (
    <div className="wrapper bg-white border-b border-gray-200 py-4">
      <div className="pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-4">
            <GenericDropdown
              options={categoryOptions}
              value={category}
              onChange={(val) => dispatch(setCategory(val))}
              placeholder='Select Category'
              className="min-w-[140px]"
            />
            <GenericDropdown
              options={subCategoryOptions}
              value={subCategory}
              onChange={(val) => dispatch(setSubCategory(val))}
              placeholder='Select SubCategory'
              className="min-w-[140px]"
            />
            <GenericDropdown
              options={occasionOptions}
              value={occasion}
              onChange={(val) => dispatch(setOccasion(val))}
              placeholder='Select Occasion'
              className="min-w-[120px]"
            />
            <GenericDropdown
              options={shopForOptions}
              value={shopFor}
              onChange={(val) => dispatch(setShopFor(val))}
              placeholder='Shop For'
              className="min-w-[120px]"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">30 (30) Designs</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort By:</span>
              <GenericDropdown
                options={sortOptions}
                value={sortBy}
                onChange={(val) => dispatch(setSortBy(val))}
                className="min-w-[100px]"
                placeholder='Sort by'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
