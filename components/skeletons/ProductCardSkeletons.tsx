import React from 'react'

const ProductCardSkeletons = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="bg-gray-200 h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}

export default ProductCardSkeletons