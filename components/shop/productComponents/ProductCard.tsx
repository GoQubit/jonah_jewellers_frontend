"use client"

import { useState } from "react"
import Image from "next/image"
import { BiChevronLeft, BiChevronRight, } from "react-icons/bi"
import { IoIosRocket } from "react-icons/io";
import { AiFillTag } from "react-icons/ai"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import AddToCartToast from "@/components/Toast/AddToCartToast";


interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  badge?: "Best Seller" | "New Arrival"
  isWishlisted?: boolean
  onAddToCart: (id: string) => void
  onToggleWishlist: (id: string) => void
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  images,
  badge,
  isWishlisted = false,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showToast, setShowToast] = useState(false);

  const closeToast = () => {
    setShowToast(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const formatPrice = (price: number) => {
    return `₹ ${price.toLocaleString()}`
  }

  return (
    <>
      <AddToCartToast show={showToast} onClose={closeToast} customButtonId="blog_view_product_cart" />
      <div className="bg-white rounded-lg overflow-hidden group">
        {/* Image Section */}
        <div className="relative aspect-square bg-gray-50">
          {/* Badge */}
          {badge && (
            <div
              className={`absolute top-0 left-0 z-10 px-2 py-1 text-xs font-medium text-white rounded-tl shadow-lg flex gap-1 items-center ${badge === "Best Seller" ? "bg-blue-500" : "bg-red-500"
                }`}
            >
              {badge === "Best Seller" ? <AiFillTag /> : <IoIosRocket />}
              {badge}
            </div>
          )}

          {/* Wishlist Button */}
          {/* <button
            onClick={() => onToggleWishlist(id)}
            className="absolute top-2 right-2 z-10 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {isWishlisted ? (
              <FaHeart className="h-4 w-4 text-red-500" />
            ) : (
              <FaRegHeart className="h-4 w-4 text-gray-400" />
            )}
          </button> */}

          {/* Product Image */}
          <Image src={images?.[currentImageIndex] || "/placeholder.svg"} alt={name} fill className="object-cover" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <BiChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <BiChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 font-besley">
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 font-besley">{name}</h3>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-medium text-gray-900 font-besley">{formatPrice(price)}</span>
            {originalPrice && <span className="text-sm text-gray-500 line-through">{formatPrice(originalPrice)}</span>}
          </div>

          <button
            onClick={() => onAddToCart(id)}
            className="w-full bg-transparent border text-black  hover:bg-brand hover:text-white text-sm font-medium py-3 px-4 rounded-md transition-colors duration-200 font-besley "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}
