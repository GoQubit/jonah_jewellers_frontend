"use client"
import React, { useEffect, useState } from 'react'
import DashboarStatsView from './_components/dashboard-stats'
import ListPageLayout from '../_components/page-layout/list-page-layout'
import MaterialPriceStats from './_components/material-price-stats'
import { Button } from '@/components/ui/buttons/Button'
import { Edit, Edit2Icon } from 'lucide-react'
import PriceUpdateModal from './_components/price-update-modal'
import BaseModal from '@/components/base-modal'
import { getMaterialPriceApi } from '@/lib/api/material/materialApis'
import { getDashboardAnalyticsApi } from '@/lib/api/admin/dashboardAnalyticsApi'

type Props = {}

const DashboardPage = (props: Props) => {
  const [prices, setPrices] = useState({
    gold: 0,
    diamond: 0,
    silver: 0,
  })
  const [analyticsData, setAnalyticsData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchMaterialPrice = async () => {
    const res = await getMaterialPriceApi()
    console.log("res", res);
    if (res.status === 200) {
      const data = res.data.results;
      // Convert array to object format
      const formattedPrices = {
        gold: data.find((item: any) => item.name === "GOLD")?.price || 0,
        diamond: data.find((item: any) => item.name === "DIAMOND")?.price || 0,
        silver: data.find((item: any) => item.name === "SILVER")?.price || 0,
      };
      setPrices(formattedPrices);
    }
  }

  const fetchAnalytics = async () => {
    try {
      const res = await getDashboardAnalyticsApi()
      if (res.status === 200) {
        setAnalyticsData(res.data)
      }
    } catch (error) {
      console.error("error:", error)
    }
  }

  useEffect(() => {
    fetchMaterialPrice()
    fetchAnalytics()
  }, [])


  return (
    <ListPageLayout
      title="Dashboard Overview"
      description="Welcome back! Here&apos;s what&apos;s happening with your jewellery business today."
    >
      <div className="flex items-center justify-end">
        <Button variant="brand-solid" className="!py-2 !my-0"
          onClick={() => setIsModalOpen(true)}>
          <Edit size={18} /> Update Prices
        </Button>
      </div>
      <MaterialPriceStats materialPrices={prices} />
      <DashboarStatsView analyticsData={analyticsData} />

      {
        isModalOpen &&
        <PriceUpdateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          materialPrices={prices}
          onUpdatePrice={fetchMaterialPrice}
        />
      }

    </ListPageLayout>
  )
}

export default DashboardPage