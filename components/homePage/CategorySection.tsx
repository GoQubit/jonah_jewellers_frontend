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

      <div className='flex gap-[30px] justify-between overflow-x-auto '>
        {
          subCategories.length > 0 && subCategories.map((subCategory: any, index: number) => (
            <div
              onClick={() => navigateSubCategory(subCategory.name, subCategory.id)}
              key={index} className='flex flex-col gap-4 justify-center cursor-pointer '>
              <img src={subCategory.photo}
                alt="earrings img"
                className='min-w-[120px] min-h-[120px] md:min-w-[190px] md:min-h-[190px] rounded-full overflow-hidden object-cover '
              />
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