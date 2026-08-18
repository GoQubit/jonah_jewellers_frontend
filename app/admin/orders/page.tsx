import React from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import OrderStatsView from './_components/order-stats-view'
import OrderListFilterView from './_components/order-list-filter-view'
import OrderTableView from './_components/order-table-view'

const OrdersPage = () => {

    return (
        <ListPageLayout
            title='Order Management'
            description='Handling and tracking all customer orders efficiently, from placement to fulfillment'
        >
            <OrderStatsView />
            <div className="space-y-5">
                <OrderListFilterView />
                <OrderTableView />
            </div>
        </ListPageLayout>
    )
}

export default OrdersPage