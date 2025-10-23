"use client"
import { useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"
import { CiPlay1 } from "react-icons/ci"
import { FaStar } from "react-icons/fa"
import SectionHeading from "../ui/SectionHeading"

interface Review {
  id: number
  type: "text" | "video"
  name: string
  rating: number
  content: string
  videoThumbnail?: string
  videoUrl?: string
  location?: string
}

const reviews: Review[] = [
  {
    id: 1,
    type: "text",
    name: "Priya Sharma",
    rating: 5,
    content:
      "Absolutely stunning jewelry! The craftsmanship is exceptional and the designs are timeless. I purchased a diamond necklace set and received so many compliments. Highly recommended!",
    location: "Mumbai",
  },
  {
    id: 2,
    type: "video",
    name: "Ankita Patel",
    rating: 4,
    content:
      "Amazing experience shopping at Jonah Jewellers. The staff was very helpful and the quality is outstanding.",
    videoThumbnail: "/indian-woman-purple-saree.png",
    videoUrl: "#",
    location: "Delhi",
  },
  {
    id: 3,
    type: "text",
    name: "Meera Reddy",
    rating: 5,
    content:
      "Beautiful gold jewelry collection! The traditional designs with modern touch are perfect. Great customer service and authentic pieces.",
    location: "Bangalore",
  },
  {
    id: 4,
    type: "video",
    name: "Kavya Singh",
    rating: 5,
    content: "Love my new mangalsutra from Jonah Jewellers. Perfect for my wedding!",
    videoThumbnail: "/indian-bride-gold.png",
    videoUrl: "#",
    location: "Chennai",
  },
  {
    id: 5,
    type: "text",
    name: "Ritu Agarwal",
    rating: 4,
    content:
      "Excellent variety of silver jewelry. The designs are unique and the pricing is reasonable. Will definitely shop again.",
    location: "Pune",
  },
  {
    id: 6,
    type: "text",
    name: "Sneha Gupta",
    rating: 5,
    content:
      "Outstanding service and beautiful jewelry pieces. The earrings I bought are exactly what I was looking for. Thank you Jonah Jewellers!",
    location: "Hyderabad",
  },
]

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const reviewsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + reviewsPerPage >= reviews.length ? 0 : prev + reviewsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, reviews.length - reviewsPerPage) : Math.max(0, prev - reviewsPerPage),
    )
  }

  const currentReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="wrapper">
      {/* Header */}
      <SectionHeading
        title="Sunehra Safar, Sachchi Kahaniyan"
        Subtitle="From dreams to reality, our gold has been part of every milestone"
        size="md"
      />

      <div className="relative">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            <BiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-300 disabled:opacity-50"
            disabled={currentIndex + reviewsPerPage >= reviews.length}
          >
            <BiChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Responsive Reviews */}
        <div
          className="
            grid gap-6 px-4 
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
            overflow-x-auto md:overflow-visible 
            flex-nowrap md:grid 
            scroll-smooth snap-x snap-mandatory
          "
        >
          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden
                w-[85%] sm:w-[70%] md:w-auto flex-shrink-0 snap-center
              "
            >
              {review.type === "video" ? (
                <div className="relative">
                  <img
                    src={review.videoThumbnail || "/placeholder.svg"}
                    alt={`${review.name} video review`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-300">
                      <CiPlay1 className="w-8 h-8 text-gray-800 ml-1" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-center justify-center p-6">
                  <div className="text-6xl text-yellow-600 opacity-20 font-serif">"</div>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center mb-3">{renderStars(review.rating)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">{review.content}</p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  {review.location && <p className="text-sm text-gray-500">{review.location}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialCarousel
