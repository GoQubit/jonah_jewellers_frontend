import Image from "next/image"
import { FaGem, FaRing } from "react-icons/fa"

export default function HeroSection() {
  return (
    <section className="relative px-6 py-16 bg-gradient-to-r from-pink-50 to-pink-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Jewelry Images */}
          <div className=" relative ">
            <Image src={'/images/bannerImgs/kitty-banner-img.png'}
              alt='kitty-plan-img'
              width={300}
              height={300}
              className="object-cover w-[300px] h-[300px]"
            />
          </div>

          {/* Content */}
          <div className=" text-center lg:text-left">
            <h1 className="text-2xl lg:text-4xl text-[#020202] mb-2 font-normal">JONAH Kitty</h1>
            <h2 className="text-2xl lg:text-4xl text-[#020202] mb-8 font-besley font-normal">Investment Plan</h2>

            <div className="inline-block text-start">
              <div className="flex divide-x divide-black  border-b pb-1 mb-2 border-black">
                <div className="text-6xl font-medium font-besley text-gray-800 mb-2 pr-2 ">11+1</div>
                <div className="text-lg text-gray-600 mb-4 pl-2">
                  Monthly
                  <br />
                  Installment
                  <br />
                  Plan
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Pay 11 Installments and enjoy
                <br />
                100% savings on the 12th month
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
