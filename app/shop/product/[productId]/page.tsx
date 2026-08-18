import ProductDetailsPage from '@/components/shop/ProductDetailsPage'

interface PageProps {
  params: {
    productId: string
  }
}

async function Page({ params }: { params: any }) {
  return (
    <div>
      <ProductDetailsPage productId={params?.productId} />
    </div>
  )
}

export default Page;