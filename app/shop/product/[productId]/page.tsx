import ProductDetailsPage from '@/components/shop/ProductDetailsPage'
import React from 'react'

interface PageProps {
  params: {
    productId: string
  }
}

const Page = async ({ params }: PageProps) => {
  return (
    <div>
      <ProductDetailsPage productId={params.productId} />
    </div>
  )
}

export default Page
