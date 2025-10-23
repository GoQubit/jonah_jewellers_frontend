import React from 'react'
import { BiSearchAlt } from 'react-icons/bi';
import { BsFillPatchCheckFill } from "react-icons/bs";
import { GiBigDiamondRing } from 'react-icons/gi';
import { MdDiamond } from "react-icons/md";


const JewelleryAssuranceSection = () => {

  const assuranceData = [
    {
      title: "BIS Hallmarked Gold Jewellery",
      icon: <BsFillPatchCheckFill />
    },
    {
      title: "IGI Certified Diamond Jewellery",
      icon: <MdDiamond />
    },
    {
      title: "100% Transparency",
      icon: <BiSearchAlt />
    },
    {
      title: "A world of designs",
      icon: <GiBigDiamondRing />
    }
  ]

  return (
    <div className='wrapper w-full '>
      <div className='relative flex w-full min-h-[450px] mb-16 '>
        {/* Background image div */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/propsImgs/box_design.png')" }}
        ></div>

        {/* Content overlay */}
        <div className='relative w-full p-4 py-16  md:p-12 md:px-16 z-10 flex flex-col justify-center'>
          <div className='flex flex-col justify-center items-center'>
            <h2 className="text-2xl 500:text-3xl md:text-[44px] !font-besley text-black mb-3 tracking-wide text-center font-medium">
              JONAH Jewellery Assurance
            </h2>
            {/* Subtitle */}
            <p className="text-brand text-base md:text-xl mb-3 font-light font-nunito">
              Crafted by experts, cherished by you
            </p>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 place-items-baseline gap-6 mt-8 md:px-12 '>
            {assuranceData.map((item, index) => (
              <AssuranceCard
                key={index}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default JewelleryAssuranceSection

const AssuranceCard = ({ title, description, icon }: { title: string, description?: string, icon: any }) => {

  return (
    <div className='  w-[130px] flex flex-col gap-1 items-center justify-center text-center '>
      <div className='w-[111px] h-[111px] flex justify-center items-center text-white text-[50px] rounded-full bg-brand '>
        {icon}
      </div>
      <span className='text-brand'>{title}</span>
    </div>
  )
}