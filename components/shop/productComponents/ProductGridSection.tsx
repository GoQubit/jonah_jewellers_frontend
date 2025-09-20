"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { getAllProductsApi } from "@/lib/api/shop/productsApis"
import { useAppSelector } from "@/redux/hooks"
import { Loader } from "@/components/ui/Loader/Loader"

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "Dazzling Grace Drop Earrings",
    price: 59048,
    originalPrice: 65000,
    images: ["/images/productsImgs/1.png", "/images/productsImgs/2.png"],
    badge: "Best Seller" as const,
  },
  {
    id: "2",
    name: "Alluring Gold Beaded Finger Ring",
    price: 43048,
    originalPrice: 48000,
    images: ["/images/productsImgs/2.png", "/images/productsImgs/3.png"],
    badge: "New Arrival" as const,
  },
  {
    id: "3",
    name: "Layered Bead Gold Necklace",
    price: 56099,
    originalPrice: 62000,
    images: ["/images/productsImgs/3.png", "/images/productsImgs/4.png"],
    badge: "New Arrival" as const,
  },
  {
    id: "4",
    name: "Dazzling Grace Drop Necklace",
    price: 59048,
    originalPrice: 65000,
    images: ["/images/productsImgs/4.png", "/images/productsImgs/5.png"],
  },
  {
    id: "5",
    name: "Graceful Beaded Mangalsutra",
    price: 59048,
    originalPrice: 65000,
    images: ["/images/productsImgs/5.png", "/images/productsImgs/6.png"],
    badge: "Best Seller" as const,
  },
  {
    id: "6",
    name: "Layered Bead Gold Ring",
    price: 59048,
    originalPrice: 65000,
    images: ["/images/productsImgs/6.png", "/images/productsImgs/1.png"],
  },
  {
    id: "7",
    name: "Celestial Swirls Gold Maang Tikka",
    price: 59048,
    originalPrice: 65000,
    images: ["/images/productsImgs/2.png", "/images/productsImgs/4.png"],
    badge: "Best Seller" as const,
  },
  {
    id: "8",
    name: "Alluring Gold Beaded Finger Ring",
    price: 49048,
    originalPrice: 54000,
    images: ["/images/productsImgs/4.png", "/images/productsImgs/6.png"],
  },
  {
    id: "9",
    name: "Charming Paisley Pendant",
    price: 56048,
    originalPrice: 62000,
    images: ["/images/productsImgs/3.png", "/images/productsImgs/4.png"],
  },
]

export default function ProductGrid() {
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set())
  const [products, setProducts] = useState<any>([])
  const filters = useAppSelector((state) => state.filters)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)

  // fetch products 
  const fetchProducts = async (params?: any) => {
    try {
      setIsLoadingProducts(true)
      const res = await getAllProductsApi(params)
      console.log('res', res)
      if (res.status === 200) {
        setProducts(res.data.results)
      }
    } catch (error) {
      console.error("Error: ", error)
    } finally {
      setIsLoadingProducts(false)
    }
  }

  useEffect(() => {
    fetchProducts(filters)
  }, [filters])

  const handleAddToCart = (productId: string) => {
    console.log("Added to cart:", productId)
    // Add your cart logic here
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlistedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  if (isLoadingProducts) {
    return (
      <div className="h-96 w-full flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            products &&
            products.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                // price={product.price}
                // originalPrice={product.originalPrice}
                // images={product.images}
                price={20000}
                originalPrice={30000}
                images={["/images/productsImgs/2.png", "/images/productsImgs/4.png"]}
                badge={product?.badge}
                isWishlisted={wishlistedItems.has(product.id)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}
