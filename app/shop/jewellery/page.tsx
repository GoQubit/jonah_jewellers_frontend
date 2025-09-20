import HeroBanner from '@/components/shop/productComponents/HeroBanner'
import FilterSection from '@/components/shop/productComponents/FilterSection'
import ProductGrid from '@/components/shop/productComponents/ProductGridSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroBanner />
      <FilterSection />
      <ProductGrid />
    </div>
  )
}

export default page