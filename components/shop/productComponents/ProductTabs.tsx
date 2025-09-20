"use client"

import { Button } from "@/components/ui/buttons/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { AiFillGold } from "react-icons/ai"
import { IoChevronDown } from "react-icons/io5"

interface ProductTabsProps {
  details: {
    metal: string
    karat: string
    grossWeight: string
    materialColor: string
    size: string
  }
  description: string
  priceBreakup: Array<{
    item: string
    weight: string
    rate: string
    value: string
  }>
}

export default function ProductTabs({ details, description, priceBreakup }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [activeDetailsTab, setActiveDetailsTab] = useState("metal")


  return (
    <div className="mb-12">
      <h2 className="text-xl font-medium text-center mb-6">Jewellery Details</h2>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <Button
          variant={activeTab === "details" ? "brand-solid" : "brand-outline"}
          onClick={() => setActiveTab("details")}
          className={`${activeTab === "details" ? "bg-brand hover:bg-brandDark" : ""} text-xl rounded-r-none px-8 `}
        >
          Product Details
        </Button>
        <Button
          variant={activeTab === "price" ? "brand-solid" : "brand-outline"}
          onClick={() => setActiveTab("price")}
          className={`${activeTab === "price" ? "bg-brand hover:bg-brandDark" : ""}  text-xl rounded-l-none  px-8`}
        >
          Price Breakup
        </Button>
      </div>


      {/* Tab Content */}
      <div className="flex gap-8">
        <div className=" w-[60%]">
          {activeTab === "details" && (
            <>
              <div className="border border-b-0 rounded-lg p-6 ">
                <div className=" flex justify-between items-center cursor-pointer"
                  onClick={() => setActiveDetailsTab("metal")}
                >
                  <span className="text-lg font-nunito flex items-center gap-3 "><AiFillGold color="#e8a83e" />
                    Metal Details</span>
                  <IoChevronDown color="gray" className={` ${activeDetailsTab === 'metal' ? 'rotate-180' : ''} `} />
                </div>
                {
                  activeDetailsTab === "metal" &&
                  <div className="grid grid-cols-1 md:grid-cols-3  ">

                    <div className="flex flex-col justify-between py-2">
                      <span className="font-medium text-xl font-besley ">{details.karat}</span>
                      <span className="font-nunito text-[#A1A1A1] ">Karat</span>
                    </div>
                    <div className="flex flex-col justify-between py-2">
                      <span className="font-medium text-xl font-besley ">{details.grossWeight}</span>
                      <span className="font-nunito text-[#A1A1A1] ">Gross Weight</span>
                    </div>
                    <div className="flex flex-col justify-between py-2">
                      <span className="font-medium text-xl font-besley ">{details.materialColor}</span>
                      <span className="font-nunito text-[#A1A1A1] ">Material Color</span>
                    </div>
                    <div className="flex flex-col justify-between py-2">
                      <span className="font-medium text-xl font-besley ">{details.metal}</span>
                      <span className="font-nunito text-[#A1A1A1] ">Metal</span>
                    </div>
                    <div className="flex flex-col justify-between py-2">
                      <span className="font-medium text-xl font-besley ">{details.size}</span>
                      <span className="font-nunito text-[#A1A1A1] ">Size</span>
                    </div>
                  </div>
                }
              </div>
              <div className="border rounded-lg p-6 ">
                <div className=" flex justify-between items-center cursor-pointer"
                  onClick={() => setActiveDetailsTab("description")}
                >
                  <span className="text-lg font-nunito flex items-center gap-3 "><AiFillGold color="#e8a83e" />
                    Description</span>
                  <IoChevronDown color="gray" className={` ${activeDetailsTab === 'description' ? 'rotate-180' : ''} `} />
                </div>
                {
                  activeDetailsTab === "description" &&
                  <div className=" text-[#A1A1A1] mt-2 ">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, consequatur maxime aliquam a tempora labore illo asperiores accusantium incidunt laborum, at doloribus hic fugit, similique voluptate ex numquam maiores blanditiis?</p>
                  </div>
                }
              </div>
            </>
          )}

          {activeTab === "price" && (
            <div className="border rounded-lg overflow-hidden font-nunito">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 ">
                    <TableHead className=" ">Product Details</TableHead>
                    <TableHead className=" ">Rate</TableHead>
                    <TableHead className=" ">Weight</TableHead>
                    <TableHead className=" ">Discount</TableHead>
                    <TableHead className=" text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceBreakup.map((item, index) => (
                    <TableRow
                      key={index}
                      className={item.item === "Grand Total" ? "bg-gray-50 font-medium border-t-2" : ""}
                    >
                      <TableCell className={item.item === "Grand Total" ? "font-bold" : "font-medium"}>
                        {item.item}
                      </TableCell>
                      <TableCell className="text-gray-600">{item.rate}</TableCell>
                      <TableCell className="text-gray-600">{item.weight}</TableCell>
                      <TableCell className="text-gray-600"> - </TableCell>
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

        </div>

        <div className="w-[40%] justify-center">
          <img src="/images/productsImgs/1.png" alt="Product detail" className="w-[300px] h-[300px] object-cover rounded-lg" />
        </div>
      </div>
    </div>
  )
}
