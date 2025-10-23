import React from 'react'
import ProductForm from '../../_components/product-form'
import { X } from 'lucide-react'
import { defaultProductFormData } from '../../_components/product-form/const'

type Props = {
  onClose?: () => void
}

const EditProductView = ({ onClose }: Props) => {
  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-[700px] max-w-full space-y-8">
      <h2 className="font-besley text-left text-lg">Edit Product:</h2>

      <div className='h-[70vh] overflow-y-auto px-1'>
        <ProductForm
          productData={defaultProductFormData.silverData}
          addProduct={false}
        />
      </div>

      {/* close button */}
      <div className="absolute z-[51] top-0 left-[50%] -translate-y-28 translate-x-[-50%] w-10 h-10 bg-white rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-gray-100">
        <X onClick={onClose} />
      </div>
    </div>
  )
}

export default EditProductView