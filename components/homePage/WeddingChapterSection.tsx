import React from 'react'
import SectionHeading from '../ui/SectionHeading'

const WeddingChapterSection = () => {

  const data = [
    {
      image: '/images/categoryImgs/bridal.png',
      title: 'Bridal',
    },
    {
      image: '/images/categoryImgs/reception.png',
      title: 'Reception',
    },
    {
      image: '/images/categoryImgs/mehndi.png',
      title: ' Mehandi ',
    },
    {
      image: '/images/categoryImgs/haldi.png',
      title: 'Haldi',
    },
    {
      image: '/images/categoryImgs/cocktail.png',
      title: 'Cocktail',
    },
  ]

  return (
    <div className='wrapper'>
      <SectionHeading
        title='Jewels for Every Wedding Chapter'
        Subtitle='Celebrate Every Shade of You'
        size='md'
      />


      <div className=' font-besley w-full flex gap-6 justify-between overflow-x-scroll'>
        {
          data.map((item: any, index: number) => (
            <div key={index} className='flex flex-col gap-4 justify-center '>
              <img src={item.image}
                alt="earrings img"
                className='!min-w-[120px] !min-h-[150px] md:w-[220px] md:h-[330px] rounded-md overflow-hidden object-cover '
              />
              <span className='text-center font-medium text-lg md:text-[22px] font-besley '>{item.title}</span>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default WeddingChapterSection