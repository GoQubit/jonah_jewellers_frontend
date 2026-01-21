"use client"
import { useEffect, useState } from "react"
// import RelatedProducts from "./productComponents/related-products"
import JewelleryAssuranceSection from "../homePage/JewelleryAssuranceSection"
import ProductImageGallery from "./productComponents/ProductImageGallary"
import ProductInfo from "./productComponents/ProductDetailsInfo"
import ProductTabs from "./productComponents/ProductTabs"
import { getSingleProductApi } from "@/lib/api/products/productsApis"
import { addToCart } from "@/redux/Features/cartSlice/cartSlice"
import { useDispatch } from "react-redux"
import AddToCartToast from "../Toast/AddToCartToast"

const productData = {
  id: 1,
  name: "Dazzling Grace Drop Earrings",
  price: 59048,
  originalPrice: 80000,
  images: [
    "/images/productsImgs/4.png",
    "/images/productsImgs/1.png",
    "/images/productsImgs/2.png",
    "/images/productsImgs/3.png",
  ],
  details: {
    metal: "Gold",
    karat: "22k",
    grossWeight: "20.33",
    materialColor: "Yellow",
    size: "60.00 mm",
  },
  description:
    "Exquisite handcrafted gold earrings designed in 22k Necklace, crafted in 22 karat yellow gold with a circular Pendant and symmetric stone detailing. The two-tone design is both contemporary and timeless, which makes it perfect for both casual and formal occasions.",
  priceBreakup: [
    { item: "Yellow Gold", rate: "₹6510", weight: "2.5g", value: "₹16,275" },
    { item: "Making Charges", rate: "₹2510", weight: "-", value: "₹6,275" },
    { item: "Sub Total", rate: "-", weight: "2.5g", value: "₹22,550" },
    { item: "GST", rate: "3%", weight: "-", value: "₹675" },
    { item: "Grand Total", weight: "-", rate: "-", value: "₹23,225" },
  ],
}

export default function ProductDetailsPage({ productId }: { productId: string }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [productDetails, setProductDetails] = useState<any>(null)

  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch()


  const fetchProductDetails = async (product_id: string) => {
    const res = await getSingleProductApi(product_id)
    if (res.status === 200) {
      setProductDetails(res.data)
    }
  }
  useEffect(() => {
    fetchProductDetails(productId)
  }, [])


  const addToCartHandler = (ringSize?: string) => {
    dispatch(
      addToCart({
        id: productDetails._id,
        name: productDetails.name,
        price: productDetails.price,
        image: productDetails.images[0],
        ringSize: ringSize ? Number(ringSize) : undefined, // 👈 added
      })
    )
    setShowToast(true)
  }


  const producCategory = productDetails?.category === "GOLD" ? "gold" : productDetails?.category === "SILVER" ? "silver" : "diamond"

  return (
    <div className="min-h-screen bg-background py-[16px] md:py-[40px] ">
      <AddToCartToast show={showToast} onClose={() => setShowToast(false)} customButtonId="blog_view_product_cart" />
      <main className="wrapper">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery
            images={productDetails?.images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
          <ProductInfo
            name={productDetails?.name}
            price={productDetails?.price}
            metalDetails={productDetails?.[producCategory]}
            productCategory={productDetails?.category}
            addToCartHandler={addToCartHandler}
            hasRingSize={productDetails?.hasRingSize}
          />
        </div>

        {/* Product Details Tabs */}
        <ProductTabs
          productCategory={productDetails?.category}
          metalDetails={productDetails?.[producCategory]}
          description={productDetails?.description}
          priceBreakup={productData.priceBreakup}
          coverimage={productDetails?.images[0]}
        />

        {/* Company Assurance */}
        <JewelleryAssuranceSection />
      </main>

    </div>
  )
}
