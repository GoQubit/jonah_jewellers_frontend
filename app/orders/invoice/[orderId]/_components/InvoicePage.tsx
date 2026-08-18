"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { generatePDF } from "@/lib/pdf-generator"
import InvoiceComponent from "./InvoiceComponent"
import { getOrderDetailsApi } from "@/lib/api/order/orderApis"

export default function InvoicePage({ orderId }: { orderId: string }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    (async () => {
      const res = await getOrderDetailsApi(orderId)
      if (res.status === 200) {
        setOrderDetails(res?.data)
      }
    })()
  }, [])

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      if (orderDetails)
        await generatePDF(orderDetails)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Invoice</h1>
            <p className="text-muted-foreground mt-1">Order #{orderDetails?.id?.slice(0, 8)}</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button onClick={handlePrint} variant="outline" className="flex-1 md:flex-none gap-2 bg-transparent">
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button onClick={handleDownloadPDF} disabled={isDownloading} className="flex-1 md:flex-none gap-2">
              <Download className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
          </div>
        </div>

        {/* Invoice Component */}
        <InvoiceComponent order={orderDetails} />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print-hide {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
