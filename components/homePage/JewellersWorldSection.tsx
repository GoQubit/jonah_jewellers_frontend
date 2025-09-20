import React from 'react'
import SectionHeading from '../ui/SectionHeading'
import Link from 'next/link'
import { GoArrowRight } from "react-icons/go";


const JewellersWorldSection = () => {
  return (
    <div className='wrapper'>
      <SectionHeading
        title='JONAH Jewellers World'
        Subtitle='A companion for every occasion'
        size='sm'
      />

      <div className='grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-6'>
        <div className='relative overflow-hidden rounded-t-lg rounded-b-sm group md:row-span-6 md:col-span-5 ' >
          <img src="/images/categoryImgs/wedding.png"
            alt="Gold Jewellery Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-white text-2xl md:text-3xl font-serif font-light tracking-wide">Wedding</h3>
          </div>
        </div>

        <div className='relative overflow-hidden rounded-t-lg rounded-b-sm group md:row-span-3 md:col-span-3 ' >
          <img src="/images/categoryImgs/birthday.png"
            alt="Diamond Jewellery Collection"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-6 left-6 text-white">
            <h3 className=" text-xl md:text-2xl font-serif font-light tracking-wide">Birthday</h3>
          </div>
        </div>

        <div className='relative overflow-hidden rounded-t-lg rounded-b-sm group md:row-span-4 md:col-span-4 ' >
          <img src="/images/categoryImgs/engagement.png"
            alt="Diamond Jewellery Collection"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-6 left-6 text-white">
            <h3 className=" text-xl md:text-2xl font-serif font-light tracking-wide">Engagement</h3>
          </div>
        </div>
        <div className='relative overflow-hidden rounded-t-lg rounded-b-sm group md:row-span-3 md:col-span-3' >
          <img src="/images/categoryImgs/treatyourself.png"
            alt="Diamond Jewellery Collection"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-6 left-6 text-white">
            <h3 className=" text-xl md:text-2xl font-serif font-light tracking-wide">Treat Yourself</h3>
          </div>
        </div>
        <div className='relative overflow-hidden rounded-t-lg rounded-b-sm group md:row-span-2 md:col-span-4 ' >
          <img src="/images/categoryImgs/anniversary.png"
            alt="Silver Jewellery Collection"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className="absolute bottom-6 right-6 text-right text-white ">
            <h3 className=" text-xl md:text-2xl font-serif font-light tracking-wide">Anniversary</h3>
          </div>
        </div>
      </div>

    </div>
  )
}

export default JewellersWorldSection