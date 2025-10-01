import React from 'react'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import InvestorsAndBuyersStatsView from './_components/investors-and-buyers-stats-view'
import InvestorsAndBuyersTabsView from './_components/investors-and-buyers-tabs-view'

type Props = {
    children: React.ReactNode
}

const InvestorsAndBuyersLayout = ({ children }: Props) => {
    return (
        <ListPageLayout
            title='Gold Investors & Kitty Members'
            description='Manage gold investors and kitty plan participants'
        >
            <InvestorsAndBuyersStatsView />
            <InvestorsAndBuyersTabsView />
            {children}
        </ListPageLayout>
    )
}

export default InvestorsAndBuyersLayout