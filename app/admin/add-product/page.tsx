import React from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import AddProductView from './_components/add-product-view'

type Props = {}

const AddProductPage = (props: Props) => {
    return (
        <ListPageLayout
            title='Add New Product'
            description='Create a new jewelry listing for your inventory.'
        >
            <AddProductView />
        </ListPageLayout>
    )
}

export default AddProductPage