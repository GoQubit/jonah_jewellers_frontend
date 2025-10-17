import ProductCard from "@/components/shop/productComponents/ProductCard"
import ProductCardSkeletons from "@/components/skeletons/ProductCardSkeletons"
import { getAllProductsApi } from "@/lib/api/products/productsApis"
import { RootState } from "@/redux/store"
import { memo, useEffect, useState } from "react"
import { useSelector } from "react-redux"

const MyJewelleryTab = () => {
  const user = useSelector((state: RootState) => state.user)

  const [productsData, setProductsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const params = {
          seller: user.id,
          limit: 100,
        }
        const res = await getAllProductsApi(params)
        if (res.status === 200) {
          setProductsData(res?.data?.results || [])
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [user.id])

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeletons key={index} />
        ))}
      </div>
    )
  }

  // ❌ No items found
  if (!loading && productsData.length === 0) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center text-xl font-medium">
        No Item Found
      </div>
    )
  }

  // ✅ Render actual data
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-medium font-nunito text-gray-900 mb-2">
          Jewelry Made From Your Gold
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsData.map((item: any) => (
          <ProductCard
            key={item._id}
            id={item._id}
            name={item.name}
            price={item.price}
            images={item.images}
            badge={item?.badge}
            isShowAddToCartBtn={false}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(MyJewelleryTab)
