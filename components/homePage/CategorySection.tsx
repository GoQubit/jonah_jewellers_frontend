import React from 'react'
import SectionHeading from '../ui/SectionHeading'
import Link from 'next/link'
import { GoArrowRight } from "react-icons/go";


const CategorySection = () => {
  return (
    <div className='wrapper'>
      <SectionHeading
        title='Find Your Perfect Match'
        Subtitle='Shop by Categories'
        size='md'
      />

      <div className='flex gap-[30px] justify-between overflow-x-auto '>
        {
          [1, 2, 3, 4,5].map((index: number) => (
            <div key={index} className='flex flex-col gap-4 justify-center cursor-pointer '>
              <img src="/images/categoryImgs/earrings.png"
                alt="earrings img"
                className='min-w-[190px] min-h-[190px] rounded-full overflow-hidden object-cover '
              />
              <span className='text-center font-medium text-lg md:text-[22px] font-besley '>Earrings</span>
            </div>
          ))
        }
      </div>

      <div className='w-full text-center font-besley mt-12 text-[#757575] '>
        <Link href={'/products'}
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