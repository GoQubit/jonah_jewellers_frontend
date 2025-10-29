import html2canvas from "html2canvas"
import jsPDF from "jspdf"

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
  _id: string
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
  createdAt: Date
  updatedAt: Date
  trackingLink: string
}

export async function generatePDF(order: Order) {
  try {
    // Create a temporary container for the invoice
    const element = document.createElement("div")
    element.style.position = "absolute"
    element.style.left = "-9999px"
    element.style.width = "210mm"
    element.style.backgroundColor = "white"
    element.style.padding = "20px"

    // Build HTML content
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
    }

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date))
    }

    const itemsHTML = order.items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px 8px; text-align: left;">
          <div style="font-weight: 500;">${item.name}</div>
          <div style="font-size: 12px; color: #6b7280;">${item.product}</div>
        </td>
        <td style="padding: 12px 8px; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 8px; text-align: right;">${formatCurrency(item.productPrice)}</td>
        <td style="padding: 12px 8px; text-align: right;">${formatCurrency(item.makingCharges)}</td>
        <td style="padding: 12px 8px; text-align: right; font-weight: 500;">${formatCurrency(item.totalPrice)}</td>
      </tr>
    `,
      )
      .join("")

    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; color: #1f2937;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px;">
          <div>
            <h2 style="font-size: 28px; font-weight: bold; margin: 0;">INVOICE</h2>
            <p style="font-size: 12px; color: #6b7280; margin: 4px 0 0 0;">Order ID: ${order._id}</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 12px; font-weight: 600; margin: 0;">Invoice Date</p>
            <p style="font-size: 12px; color: #6b7280; margin: 0;">${formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div style="border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 24px 0; margin-bottom: 32px; display: flex; gap: 64px;">
          <div style="flex: 1;">
            <p style="font-size: 12px; font-weight: 600; margin: 0 0 12px 0;">Bill To</p>
            <div style="font-size: 12px; color: #6b7280; line-height: 1.6;">
              <p style="font-weight: 500; color: #1f2937; margin: 0;">${order.shippingAddress.name}</p>
              <p style="margin: 0;">${order.shippingAddress.addressLine1}</p>
              <p style="margin: 0;">${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pinCode}</p>
              <p style="margin: 0;">${order.shippingAddress.country}</p>
              <p style="margin: 8px 0 0 0;"><span style="font-weight: 500;">Phone:</span> ${order.shippingAddress.phone}</p>
              <p style="margin: 0;"><span style="font-weight: 500;">Email:</span> ${order.shippingAddress.email}</p>
            </div>
          </div>
          <div style="flex: 1;">
            <div style="font-size: 12px; line-height: 1.8;">
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Order Status:</span>
                <span style="font-weight: 500;">${order.orderStatus}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Payment Mode:</span>
                <span style="font-weight: 500;">${order.paymentMode}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6b7280;">Payment Status:</span>
                <span style="font-weight: 500; color: ${order.paymentStatus === "PENDING" ? "#ea580c" : "#16a34a"};">${order.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>

        <table style="width: 100%; font-size: 12px; margin-bottom: 32px;">
          <thead>
            <tr style="border-bottom: 2px solid #1f2937;">
              <th style="text-align: left; padding: 12px 8px; font-weight: 600;">Product</th>
              <th style="text-align: center; padding: 12px 8px; font-weight: 600;">Qty</th>
              <th style="text-align: right; padding: 12px 8px; font-weight: 600;">Unit Price</th>
              <th style="text-align: right; padding: 12px 8px; font-weight: 600;">Making Charges</th>
              <th style="text-align: right; padding: 12px 8px; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 32px;">
          <div style="width: 300px;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 12px;">
              <span style="color: #6b7280;">Subtotal:</span>
              <span>${formatCurrency(order.amount)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 12px;">
              <span style="color: #6b7280;">Tax (3%):</span>
              <span>${formatCurrency(order.taxAmount)}</span>
            </div>
            <div style="border-top: 1px solid #e5e7eb; padding-top: 12px; display: flex; justify-content: space-between;">
              <span style="font-weight: 600;">Total Amount:</span>
              <span style="font-weight: bold; font-size: 14px;">${formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; text-align: center; font-size: 11px; color: #6b7280;">
          <p style="margin: 0;">Thank you for your business!</p>
          <p style="margin: 8px 0 0 0;">For any queries, please contact us at support@example.com or call +91-XXXXXXXXXX</p>
        </div>
      </div>
    `

    document.body.appendChild(element)

    // Convert to canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    })

    // Create PDF
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgWidth = 210
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // Download
    pdf.save(`invoice-${order._id.slice(0, 8)}.pdf`)

    // Cleanup
    document.body.removeChild(element)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}
