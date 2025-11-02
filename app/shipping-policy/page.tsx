"use client"
import React from "react"

const ShippingPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen px-4 py-8 md:px-16 md:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Shipping Policy</h1>

        <p className="text-gray-600 mb-4">
          We take utmost care to ensure that your jewellery reaches you safely and on time. Our shipping process is
          transparent, reliable, and designed to offer peace of mind.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Shipping Time</h2>
        <p className="text-gray-600 mb-4">
          All <strong>ready-to-ship</strong> products are dispatched within <strong>2–4 business days</strong> after
          order confirmation. Customized or made-to-order jewellery may take <strong>10–15 business days</strong> for
          dispatch. You will receive tracking details via email or SMS once your order is shipped.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Delivery Partners</h2>
        <p className="text-gray-600 mb-4">
          We partner with trusted and insured courier companies like <strong>BlueDart, Delhivery,</strong> and{" "}
          <strong>DTDC</strong> to ensure safe delivery.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Shipping Charges</h2>
        <p className="text-gray-600 mb-4">
          We offer <strong>free shipping</strong> on all orders across India. For international orders, charges are
          calculated based on destination and weight at checkout.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Delivery Time</h2>
        <ul className="text-gray-600 list-disc pl-6 mb-4">
          <li>Metro cities: 3–5 business days</li>
          <li>Non-metro areas: 5–10 business days</li>
          <li>International: 10–15 business days (depending on customs)</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Order Tracking</h2>
        <p className="text-gray-600 mb-4">
          Once dispatched, you can track your order using the tracking number sent to your registered email or SMS.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Damage During Transit</h2>
        <p className="text-gray-600 mb-4">
          If your jewellery is damaged during transit, please notify us within <strong>48 hours of delivery</strong>{" "}
          with images of the damaged packaging/product. We will arrange a replacement or refund as applicable.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7. Contact Information</h2>
        <p className="text-gray-600">
          For shipping-related queries, please contact us at:
          <br />
          📧 <strong>support@jonahjewels.com</strong>
          <br />
          {/* 📞 <strong>+91-XXXXXXXXXX</strong> */}
        </p>
      </div>
    </div>
  )
}

export default ShippingPolicyPage
