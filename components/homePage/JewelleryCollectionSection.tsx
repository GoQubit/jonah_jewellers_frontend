import React from 'react'
import SectionHeading from '../ui/SectionHeading'

const JewelleryCollectionSection = () => {
  return (
    <div className='wrapper'>
      <SectionHeading
        title='JONAH Jewellers Collections'
        Subtitle='Explore our newly launched collection'
      />

      <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6'>
        <div className='relative overflow-hidden rounded-lg group cursor-pointer md:row-span-2 ' >
          <img src="/images/jewelleryPosters/collection_img_1.png"
            alt="Gold Jewellery Collection"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-[#FEDFA2] text-2xl md:text-3xl font-serif font-light tracking-wide">Gold</h3>
            <p className="text-[#FEDFA2] text-lg md:text-xl font-serif font-light tracking-wide">Jewellery</p>
          </div>
        </div>
        <div className='relative overflow-hidden rounded-lg group cursor-pointer' >
          <img src="/images/jewelleryPosters/collection_img_2.png"
            alt="Diamond Jewellery Collection"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute top-6 left-6 text-[#6C6C6C]">
            <h3 className=" text-xl md:text-2xl font-serif font-light tracking-wide">Diamond</h3>
            <p className=" text-base md:text-lg font-serif font-light tracking-wide">Jewellery</p>
          </div>
        </div>
        <div className='relative overflow-hidden rounded-lg group cursor-pointer' >
          <img src="/images/jewelleryPosters/collection_img_3.png"
            alt="Silver Jewellery Collection"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
          <div className="absolute bottom-6 right-6 text-right text-[#CCCCCC] ">
            <h3 className=" text-xl md:text-2xl font-serif font-light tracking-wide">Silver</h3>
            <p className=" text-base md:text-lg font-serif font-light tracking-wide">Jewellery</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default JewelleryCollectionSection