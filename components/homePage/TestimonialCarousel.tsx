"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"

interface JewelryReview {
  id: number
  name: string
  location: string
  rating: number
  review: string
  media: {
    type: "image" | "video"
    url: string
    thumbnail?: string
  }
}

const reviews: JewelryReview[] = [
  {
    id: 1,
    name: "Meera Reddy",
    location: "Bangalore",
    rating: 5,
    review:
      "Beautiful gold jewelry collection! The traditional designs with modern touch are perfect. Great customer service and authentic pieces.",
    media: { type: "image", url: "/images/jewelleryPosters/collection_img_1.png" },
  },
  {
    id: 2,
    name: "Kavya Singh",
    location: "Chennai",
    rating: 5,
    review: "Love my new mangalsutra from Jonah Jewels. Perfect for my wedding!",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/jewelleryPosters/collection_img_2.png",
    },
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review:
      "Exceptional craftsmanship and quality. The earrings are absolutely stunning and arrived beautifully packaged.",
    media: { type: "image", url: "/images/jewelleryPosters/collection_img_1.png" },
  },
  {
    id: 4,
    name: "Anjali Patel",
    location: "Delhi",
    rating: 5,
    review:
      "Best investment in jewelry! The designs are timeless and the quality is unmatched. Highly recommend!",
    media: {
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/images/jewelleryPosters/collection_img_2.png",
    },
  },
  {
    id: 5,
    name: "Neha Gupta",
    location: "Pune",
    rating: 5,
    review:
      "The necklace is absolutely gorgeous! Perfect for both casual and formal occasions. Worth every penny!",
    media: { type: "image", url: "/images/jewelleryPosters/collection_img_3.png" },
  },
]

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-300 text-gray-300"}`}
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ))}
  </div>
)

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((prev) => (prev + 1) % reviews.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  return (
    <section className="wrapper">

      <SectionHeading
        title='Customer Reviews'
        Subtitle='See what our customers love about our jewelry collection'
        size='sm'
      />
      {/* <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Customer Reviews</h2>
        <p className="text-lg text-muted-foreground">See what our customers love about our jewelry collection</p>
      </div> */}

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{
            transform: `translateX(-${current * (100 / (window.innerWidth < 768 ? 1 : 3))}%)`,
          }}
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex-shrink-0 w-full md:w-1/3 px-2"
            >
              <div className="h-full bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative w-full h-56 md:h-64 bg-muted overflow-hidden">
                  {review.media.type === "image" ? (
                    <img
                      src={review.media.url || "/placeholder.svg"}
                      alt={`${review.name} review`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <img
                        src={review.media.thumbnail || "/placeholder.svg"}
                        alt={`${review.name} video review`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg">
                          <Play className="w-7 h-7 text-primary fill-primary" />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <StarRating rating={review.rating} />
                  <p className="text-sm md:text-base text-foreground leading-relaxed mb-4 flex-grow line-clamp-3 mt-2">
                    {review.review}
                  </p>
                  <div className="pt-2 border-t border-border">
                    <h3 className="font-semibold text-sm md:text-base text-foreground">{review.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-primary/90 transition"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${index === current ? "bg-brand w-8 h-3" : "bg-accentLight w-3 h-3 hover:bg-brand/50"}`}
          />
        ))}
      </div>
    </section>
  )
}

export default TestimonialCarousel
