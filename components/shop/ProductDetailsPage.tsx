"use client"

import { useState } from "react"
// import RelatedProducts from "./productComponents/related-products"
import JewelleryAssuranceSection from "../homePage/JewelleryAssuranceSection"
import ProductImageGallery from "./productComponents/ProductImageGallary"
import ProductInfo from "./productComponents/ProductDetailsInfo"
import ProductTabs from "./productComponents/ProductTabs"

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

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="min-h-screen bg-background py-[40px] md:py-[80px] ">
      <main className="wrapper">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery
            images={productData.images}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />
          <ProductInfo product={productData} />
        </div>

        {/* Product Details Tabs */}
        <ProductTabs
          details={productData.details}
          description={productData.description}
          priceBreakup={productData.priceBreakup}
        />

        {/* Related Products */}
        {/* <RelatedProducts /> */}

        {/* Company Assurance */}
        <JewelleryAssuranceSection />
      </main>

    </div>
  )
}
