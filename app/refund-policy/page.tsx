"use client"
import React from "react"

const RefundPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8 md:px-16 md:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Refund & Cancellation Policy
        </h1>
        <p className="text-gray-600 mb-4">
          At <strong>Jonah Jewels</strong>, we value your trust and strive to provide the best quality jewellery
          with complete transparency. If you are not entirely satisfied with your purchase, our refund and
          cancellation policy ensures a smooth process.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Order Cancellation</h2>
        <p className="text-gray-600 mb-4">
          Orders can be cancelled within <strong>24 hours</strong> of placing the order, provided the item has not
          been shipped. Once shipped or customized, cancellation requests will not be accepted. For cancellation,
          please contact our support team at <strong>support@jonahjewels.com</strong> with your order number.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Refunds</h2>
        <p className="text-gray-600 mb-4">
          Refunds are applicable only for eligible cancellations or defective/damaged items received. To initiate a
          refund, contact us within <strong>3 days of delivery</strong> with product images and invoice details.
          Once approved, refunds will be processed within <strong>7–10 business days</strong> to your original
          payment method. Customized or personalized jewellery is not eligible for refund or exchange.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Returns</h2>
        <p className="text-gray-600 mb-4">
          Jewellery must be unused and in original condition with all tags, certificates, and packaging intact. Any
          missing certificate or tag may result in a deduction from the refund amount.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Non-Refundable Items</h2>
        <p className="text-gray-600 mb-4">
          Customized orders, engraved items, or made-to-order designs are non-refundable. Shipping and handling
          charges are non-refundable.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Contact Information</h2>
        <p className="text-gray-600">
          For any concerns regarding refunds or cancellations, please reach out to us at:
          <br />
          📧 <strong>support@jonahjewels.com</strong>
          <br />
          {/* 📞 <strong>+91-XXXXXXXXXX</strong> */}
        </p>
      </div>
    </div>
  )
}

export default RefundPolicyPage
