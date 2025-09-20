"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/buttons/Button"

interface ProductTabsProps {
  details: {
    metal: string
    karat: string
    grossWeight: string
    materialColor: string
    gold: string
  }
  description: string
  priceBreakup: Array<{
    item: string
    weight: string
    rate: string
    discount: string
    value: string
  }>
}

export default function ProductTabs({ details, description, priceBreakup }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details")

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Jewellery Details</h2>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant={activeTab === "details" ? "default" : "outline"}
          onClick={() => setActiveTab("details")}
          className={activeTab === "details" ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          Product Details
        </Button>
        <Button
          variant={activeTab === "price" ? "default" : "outline"}
          onClick={() => setActiveTab("price")}
          className={activeTab === "price" ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          Price Breakup
        </Button>
        <Button
          variant={activeTab === "description" ? "default" : "outline"}
          onClick={() => setActiveTab("description")}
          className={activeTab === "description" ? "bg-amber-500 hover:bg-amber-600" : ""}
        >
          Description
        </Button>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {activeTab === "details" && (
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Metal Details</span>
                <span>{details.metal}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Karat</span>
                <span>{details.karat}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Gross Weight</span>
                <span>{details.grossWeight}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Material Color</span>
                <span>{details.materialColor}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Gold</span>
                <span>{details.gold}</span>
              </div>
            </div>
          )}

          {activeTab === "price" && (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-700">Product Details</TableHead>
                    <TableHead className="font-semibold text-gray-700">Rate</TableHead>
                    <TableHead className="font-semibold text-gray-700">Weight</TableHead>
                    <TableHead className="font-semibold text-gray-700">Discount</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceBreakup.map((item, index) => (
                    <TableRow
                      key={index}
                      className={item.item === "Grand Total" ? "bg-gray-50 font-semibold border-t-2" : ""}
                    >
                      <TableCell className={item.item === "Grand Total" ? "font-bold" : "font-medium"}>
                        {item.item}
                      </TableCell>
                      <TableCell className="text-gray-600">{item.rate}</TableCell>
                      <TableCell className="text-gray-600">{item.weight}</TableCell>
                      <TableCell className="text-gray-600">{item.discount}</TableCell>
                      <TableCell
                        className={`text-right ${item.item === "Grand Total" ? "font-bold text-lg" : "font-medium"}`}
                      >
                        {item.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {activeTab === "description" && (
            <div>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <img
            src="/gold-earrings-product-detail.png"
            alt="Product detail"
            className="w-64 h-64 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}
