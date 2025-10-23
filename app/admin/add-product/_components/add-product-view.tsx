import React from 'react'
import ProductForm from '../../_components/product-form'
import { categoryEnum } from '../../_components/product-form/const'

type Props = {}

const AddProductView = (props: Props) => {
    return (
        <ProductForm
            addProduct={true}
        />
    )
}

export default AddProductView