import React, { useEffect, useState } from 'react'
import ProductForm from '../../_components/product-form'
import { X } from 'lucide-react'
import { getSingleProductApi } from '@/lib/api/products/productsApis'
import { useSearchParams } from 'next/navigation'

type Props = {
  productId: string
  onClose?: () => void
  getProducts?: Function
}

type InitialProduct = { isLoading: boolean, data: null | any, error: null | string }
const initialProducts: InitialProduct = { isLoading: false, data: null, error: null }

const EditProductView = ({ productId, onClose, getProducts }: Props) => {

  const searchParams = useSearchParams()
  const [product, setProduct] = useState(initialProducts)


  const getProduct = async () => {
    setProduct({ ...initialProducts, isLoading: true })
    try {
      const response = await getSingleProductApi(productId)
      if (response.status === 200) {
        setProduct(s => ({ ...s, data: response.data, error: null }))
      } else {
        throw new Error(response?.data?.message || response?.data?.error || "Product doesn't exists!")
      }
    } catch (e: any) {
      setProduct(s => ({ ...s, error: e?.message || "Something went wrong!", data: null }))
    } finally {
      setProduct(s => ({ ...s, isLoading: false }))
    }
  }

  useEffect(() => {
    getProduct()
  }, [searchParams])


  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-[700px] max-w-full space-y-5">
      <h2 className="font-besley text-left text-lg">Edit Product:</h2>

      {product?.isLoading && (
        <div>Loading...</div>
      )}

      {product?.error && (
        <div>{product?.error}</div>
      )}

      {product?.data && (
        <div className='h-[70vh] overflow-y-auto px-1'>
          <ProductForm
            productData={product.data}
            addProduct={false}
            onClose={onClose}
            getProducts={getProducts}
          />
        </div>
      )}

      {/* close button */}
      <div onClick={onClose} className="absolute z-[51] top-0 left-[50%] -translate-y-16 translate-x-[-50%] w-10 h-10 bg-white rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-gray-100">
        <X />
      </div>
    </div>
  )
}

export default EditProductView