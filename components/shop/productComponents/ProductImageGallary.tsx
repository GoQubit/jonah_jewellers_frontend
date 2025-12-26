"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination,Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

interface ProductImageGalleryProps {
  images: string[]
  selectedImage: number
  onImageSelect: (index: number) => void
}

export default function ProductImageGallery({
  images,
  selectedImage,
  onImageSelect,
}: ProductImageGalleryProps) {
  return (
    <div className="space-y-4">
      {/* Main Image Swiper */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          onSlideChange={(swiper) => onImageSelect(swiper.activeIndex)}
          initialSlide={selectedImage}
          className="w-full max-h-[400px]"
        >
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                className="w-full h-[500px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 bg-white/80 hover:bg-white shadow-md z-10">
          <BiChevronLeft className="h-6 w-6 text-[#986238]" />
        </button>
        <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 bg-white/80 hover:bg-white shadow-md z-10">
          <BiChevronRight className="h-6 w-6 text-[#986238]" />
        </button>
      </div>

      {/* Thumbnail Gallery */}
      {/* <div className="flex gap-2 justify-center flex-wrap">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`max-w-[120px] max-h-[120px] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              selectedImage === index
                ? "border-amber-500 scale-105"
                : "border-gray-200"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div> */}
    </div>
  )
}
