"use client"
// import { Button } from "@/components/ui/button"
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi"

interface ProductImageGalleryProps {
  images: string[]
  selectedImage: number
  onImageSelect: (index: number) => void
}

export default function ProductImageGallery({ images, selectedImage, onImageSelect }: ProductImageGalleryProps) {
  const nextImage = () => {
    onImageSelect((selectedImage + 1) % images.length)
  }

  const prevImage = () => {
    onImageSelect(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={images[selectedImage] || "/placeholder.svg"}
          alt="Product main view"
          className="w-full max-h-[500px] object-cover"
        />
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-1 bg-white/80 hover:bg-white shadow-md"
          onClick={prevImage}
        >
          <BiChevronLeft className="h-6 w-6 text-[#986238]" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 bg-white/80 hover:bg-white shadow-md"
          onClick={nextImage}
        >
          <BiChevronRight className="h-6 w-6 text-[#986238]" />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageSelect(index)}
            className={`max-w-[131px] max-h-[131px] rounded-lg overflow-hidden border-2 ${selectedImage === index ? "border-amber-500" : "border-gray-200"
              }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
