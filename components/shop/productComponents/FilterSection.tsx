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
  { value: "", label: "All Occasion"  },
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
  const { category, subCategory, occasion, targetGender, sortBy } = useAppSelector(
    (state) => state.filters)

  const [subCategoryData, setSubCategoryData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getSubCategoriesApi()
      console.log("Sub Categories", res);
      if (res.status === 200) {
        setSubCategoryData(res.data.results);
      }
    })()
  }, [])

  return (
    <div className="wrapper bg-white border-b border-gray-200 py-4">
      <div className="pt-10 md:pt-20">
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
              options={subCategoryData}
              value={subCategory}
              labelField="name"
              valueField="id"
              onChange={(val) => dispatch(setSubCategory(val))}
              placeholder='Select Sub Category'
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
              value={targetGender}
              onChange={(val) => dispatch(setShopFor(val))}
              placeholder='Shop For'
              className="min-w-[120px]"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-4">
            {/* <span className="text-sm text-gray-600">30 (30) Designs</span> */}
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
