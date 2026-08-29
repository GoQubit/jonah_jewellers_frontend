// import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/utils/formatDate"

interface OrderItem {
  product: string
  name: string
  productPrice: number
  makingCharges: number
  additionalCharges: number
  totalPrice: number
  taxPercent: number
  taxAmount: number
  totalAmount: number
  quantity: number
  primaryImage: string | null
}

interface ShippingAddress {
  name: string
  phone: string
  email: string
  addressLine1: string
  city: string
  state: string
  pinCode: string
  country: string
}

interface Order {
  id: string
  createdBy: number
  items: OrderItem[]
  amount: number
  taxAmount: number
  totalAmount: number
  shippingAddress: ShippingAddress
  paymentMode: string
  paymentStatus: string
  orderStatus: string
  couponCode: string | null
  createdAt: string
  updatedAt: string
  trackingLink: string
}

interface InvoiceComponentProps {
  order: Order
}

export default function InvoiceComponent({ order }: InvoiceComponentProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  return (
    <div className="p-8 bg-card border rounded-lg shadow-md ">
      {/* Invoice Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground">INVOICE</h2>
          <p className="text-sm text-muted-foreground mt-1">Order ID: {order?.id}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">Invoice Date</p>
          <p className="text-sm text-muted-foreground">{formatDate(order?.createdAt || '')}</p>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Customer & Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Billing Address */}
        <div>
          <p className="text-sm font-semibold text-foreground mb-3">Bill To</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">{order?.shippingAddress.name}</p>
            <p>{order?.shippingAddress.addressLine1}</p>
            <p>
              {order?.shippingAddress.city}, {order?.shippingAddress.state} {order?.shippingAddress.pinCode}
            </p>
            <p>{order?.shippingAddress.country}</p>
            <p className="pt-2">
              <span className="font-medium">Phone:</span> {order?.shippingAddress.phone}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order?.shippingAddress.email}
            </p>
          </div>
        </div>

        {/* Order Details */}
        <div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Order Status:</span>
              <span className="font-medium text-foreground">{order?.orderStatus}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Mode:</span>
              <span className="font-medium text-foreground">{order?.paymentMode}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Status:</span>
              <span
                className={`font-medium ${order?.paymentStatus === "PENDING" ? "text-orange-600" : "text-green-600"}`}
              >
                {order?.paymentStatus}
              </span>
            </div>
            {order?.trackingLink && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tracking:</span>
                <span className="font-medium text-foreground">{order?.trackingLink}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Items Table */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full min-w-[500px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-foreground">Product</th>
              <th className="text-center py-3 px-2 font-semibold text-foreground">Qty</th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">Unit Price</th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">Making Charges</th>
              <th className="text-right py-3 px-2 font-semibold text-foreground">Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.items.map((item, index) => (
              <tr key={index} className="border-b border-border hover:bg-muted/50">
                <td className="py-4 px-2">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.product}</p>
                </td>
                <td className="text-center py-4 px-2 text-foreground">{item.quantity}</td>
                <td className="text-right py-4 px-2 text-foreground">{formatCurrency(item.productPrice)}</td>
                <td className="text-right py-4 px-2 text-foreground">{formatCurrency(item.makingCharges)}</td>
                <td className="text-right py-4 px-2 font-medium text-foreground">{formatCurrency(item.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Separator className="mb-8" />

      {/* Summary */}
      <div className="flex justify-end mb-8">
        <div className="w-full md:w-80 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="text-foreground">{formatCurrency(order?.amount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (3%):</span>
            <span className="text-foreground">{formatCurrency(order?.taxAmount)}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="font-semibold text-foreground">Total Amount:</span>
            <span className="font-bold text-lg text-foreground">{formatCurrency(order?.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Separator className="mb-6" />
      <div className="text-center text-xs text-muted-foreground">
        <p>Thank you for your business!</p>
        <p className="mt-2">For any queries, please contact us at support@jonahjewels.com</p>
      </div>
    </div>
  )
}
