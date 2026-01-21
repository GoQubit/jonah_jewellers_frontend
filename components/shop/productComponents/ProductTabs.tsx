"use client"

import { Button } from "@/components/ui/buttons/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import { AiFillGold } from "react-icons/ai"
import { IoChevronDown } from "react-icons/io5"
import MetalDetails from "./MetalDetails"

interface ProductTabsProps {
  metalDetails: any
  description: string
  priceBreakup: any
  productCategory: string,
  coverimage: string
}

export default function ProductTabs({ metalDetails, description, priceBreakup, productCategory, coverimage }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [activeDetailsTab, setActiveDetailsTab] = useState("metal")


  return (
    <div className="mb-12">
      <h2 className="text-xl font-medium text-center mb-6">Jewellery Details</h2>

      {/* Tab Navigation */}
      {/* <div className="flex justify-center mb-8">
        <Button
          variant={activeTab === "details" ? "brand-solid" : "brand-outline"}
          onClick={() => setActiveTab("details")}
          className={`${activeTab === "details" ? "bg-brand hover:bg-brandDark" : ""} text-base md:text-xl rounded-r-none px-4 md:px-8 `}
        >
          Product Details
        </Button>
        <Button
          variant={activeTab === "price" ? "brand-solid" : "brand-outline"}
          onClick={() => setActiveTab("price")}
          className={`${activeTab === "price" ? "bg-brand hover:bg-brandDark" : ""}  
          text-base md:text-xl rounded-l-none  px-4 md:px-8`}
        >
          Price Breakup
        </Button>
      </div> */}


      {/* Tab Content */}
      <div className="flex gap-8">
        <div className="w-full md:w-[60%]">
          {activeTab === "details" && (
            <>
              <div className="border border-b-0 rounded-t-2xl p-6 ">
                <div className=" flex justify-between items-center cursor-pointer"
                  onClick={() => setActiveDetailsTab("metal")}
                >
                  <span className="text-lg font-nunito flex items-center gap-3 "><AiFillGold color="#e8a83e" />
                    Metal Details</span>
                  <IoChevronDown color="gray" className={` ${activeDetailsTab === 'metal' ? 'rotate-180' : ''} `} />
                </div>
                {
                  activeDetailsTab === "metal" &&
                  <MetalDetails
                    productCategory={productCategory}
                    metalDetails={metalDetails}
                  />
                }
              </div>
              <div className="border rounded-t-2xl p-6 ">
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
                    <p>{description}</p>
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
                {/* <TableBody>
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
                </TableBody> */}
              </Table>
            </div>
          )}

        </div>

        <div className="hidden md:block w-[40%] justify-center">
          <img src={coverimage || "/images/productsImgs/1.png"} alt="Product detail" className="w-[300px] h-[300px] object-cover rounded-lg" />
        </div>
      </div>
    </div>
  )
}
