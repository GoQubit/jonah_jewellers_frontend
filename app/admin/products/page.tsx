import React from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import ProductListFilterView from './_components/product-list-filter'
import ProductTableView from './_components/product-table-view'

const ProductsPage = () => {
    return (
        <ListPageLayout
            title='Product List'
            description='Maintain and update the catalog of products.'
        >
            <div className="space-y-5">
                <ProductListFilterView />
                <ProductTableView />
            </div>
        </ListPageLayout>
    )
}

export default ProductsPage