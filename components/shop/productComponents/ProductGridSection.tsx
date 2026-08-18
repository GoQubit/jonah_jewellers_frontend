"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard"
import { getAllProductsApi } from "@/lib/api/products/productsApis"
import { useAppSelector } from "@/redux/hooks"
import { Loader } from "@/components/ui/Loader/Loader"
import { BiPackage } from "react-icons/bi"
import { LuPackageSearch } from "react-icons/lu"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function ProductGrid() {
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set())
  const [products, setProducts] = useState<any>([])
  const filters = useAppSelector((state) => state.filters)
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // fetch products 
  const fetchProducts = async (params?: any) => {
    try {
      setIsLoadingProducts(true)
      const res = await getAllProductsApi(params)
      console.log('res', res)
      if (res.status === 200) {
        setProducts(res.data.results || [])
      }
    } catch (error) {
      console.error("Error: ", error)
      setProducts([])
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

  // ✅ Empty state UI
  if (!isLoadingProducts && products.length === 0) {
    return (
      <div className="h-96 w-full flex flex-col justify-center items-center text-center">
        <LuPackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700">No Products Found</h2>
        <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="wrapper">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            products.map((product: any) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                images={product.images}
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
