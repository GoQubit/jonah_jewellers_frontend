import ProductDetailsPage from '@/components/shop/ProductDetailsPage'
import React from 'react'

const page = ({ params }: { params: { productId: string } }) => {
  return (
    <div>
      <ProductDetailsPage productId={params.productId} />
    </div>
  )
}

export default page