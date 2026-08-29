"use client"
import React, { useEffect, useState } from 'react'
import SectionHeading from '../ui/SectionHeading'
import Link from 'next/link'
import { GoArrowRight } from "react-icons/go";
import { getSubCategoriesApi } from '@/lib/api/category/productCategoriesApis';
import { useDispatch } from 'react-redux';
import { setSubCategory } from '@/redux/Features/filterSlice/filterSlice';
import { useRouter } from 'next/navigation';


const CategorySection = () => {
  const [subCategories, setSubCategories] = useState<any>([])
  const dispatch = useDispatch()
  const router = useRouter()


  const fetchSubCategories = async () => {
    try {
      const params = { limit: 100 }
      const res = await getSubCategoriesApi(params)
      console.log("res", res);
      if (res.status === 200) {
        setSubCategories(res?.data?.results)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchSubCategories()
  }, [])


  const navigateSubCategory = (subCategory: string, id: string) => {
    dispatch(setSubCategory(id))
    router.push(`/shop/jewellery?subCategory=${subCategory.toLowerCase()}`)
  }

  return (
    <div className='wrapper'>
      <SectionHeading
        title='Find Your Perfect Match'
        Subtitle='Shop by Categories'
        size='md'
      />

      <div className='flex gap-[30px] justify-start md:justify-between overflow-x-auto '>
        {
          subCategories.length > 0 && subCategories.map((subCategory: any) => (
            <div
              onClick={() => navigateSubCategory(subCategory.name, subCategory.id)}
              key={subCategory.id} className='flex flex-col gap-4 justify-center items-center cursor-pointer shrink-0 '>
              {/* Fixed w/h (not min-w/min-h) + overflow-hidden on the wrapper so a
                  broken/missing image (or its alt text) is always clipped to the
                  circle instead of spilling out over the rest of the row. If the
                  photo fails to load we just hide the broken-image icon and leave
                  the grey circle as a graceful placeholder. */}
              <div className='w-[120px] h-[120px] md:w-[190px] md:h-[190px] rounded-full overflow-hidden bg-gray-100 shrink-0 '>
                <img
                  src={subCategory.photo}
                  alt={`${subCategory.name} category`}
                  className='w-full h-full rounded-full object-cover '
                  onError={(e) => {
                    e.currentTarget.style.visibility = 'hidden'
                  }}
                />
              </div>
              <span className='text-center font-medium text-lg md:text-[22px] font-besley '>{subCategory.name}</span>
            </div>
          ))
        }
      </div>

      <div className='w-full text-center font-besley mt-6 md:mt-12 text-[#757575] '>
        <Link href={'/shop/jewellery'}
          className=' flex gap-1 items-center justify-center font-medium text-lg md:text-[22px] hover:underline hover:text-brand cursor-pointer smooth  '
        >
          View All
          <GoArrowRight />
        </Link>
      </div>

    </div>
  )
}

export default CategorySection