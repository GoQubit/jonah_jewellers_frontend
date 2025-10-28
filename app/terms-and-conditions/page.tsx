import React from 'react'


const COMPANY_NAME = "Jonah Jewellers";
const COMPANY_URL = "https://www.jonahjewellers.com";
const CONTACT_EMAIL = "support@jonahjewellers.com";
const EFFECTIVE_DATE = "October 28, 2025";

const page = () => {
  return (
    <main className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Terms and conditions
          </h1>
        </header>
        <section id="terms" className="prose prose-sm max-w-none text-gray-800">
          {/* <h2 className="text-lg font-semibold">Terms &amp; Conditions</h2> */}
          <p>
            Please read these Terms &amp; Conditions ("Terms") carefully before using {COMPANY_NAME}'s
            website and purchasing products. By using our site and placing orders you agree to these
            Terms.
          </p>

          <h3 className="mt-4 font-medium">1. Orders &amp; Pricing</h3>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to cancel
            or refuse any order for any reason, including product unavailability, errors in price
            or product information, or suspected fraud. Prices displayed on the site are in your
            chosen currency and may include taxes where applicable.
          </p>

          <h3 className="mt-4 font-medium">2. Payment</h3>
          <p>
            We accept payments through our third-party payment processors. We never store your full
            card details on our servers; payment information is handled according to the provider's
            security practices. By placing an order you authorize us to charge your selected
            payment method for the total amount.
          </p>

          <h3 className="mt-4 font-medium">3. Shipping &amp; Delivery</h3>
          <p>
            Shipping times are estimates and may vary. Title and risk of loss pass to you when the
            carrier picks up the item. For any questions about shipping or to report a lost/damaged
            shipment, contact our support team.
          </p>

          <h3 className="mt-4 font-medium">4. Returns &amp; Refunds</h3>
          <p>
            Our returns and refund policy is available on the Returns page. Items returned must
            follow the required condition and timeframes described there. Custom or engraved items
            may not be eligible for return unless defective.
          </p>

          <h3 className="mt-4 font-medium">5. Product Descriptions</h3>
          <p>
            We try to describe products accurately, but we do not warrant that descriptions,
            colors, or other content on the site are accurate, complete, reliable, or error-free.
          </p>

          <h3 className="mt-4 font-medium">6. Intellectual Property</h3>
          <p>
            All content on the site — text, images, logos, graphics, and product designs — are the
            property of {COMPANY_NAME} or its licensors. You may not copy, reproduce or distribute
            our content without prior written permission.
          </p>

          <h3 className="mt-4 font-medium">7. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, {COMPANY_NAME} shall not be liable for any
            indirect, incidental, special or consequential damages arising from the use of the
            site or the purchase of products. Our total liability for any claim related to the
            site or your purchase will not exceed the purchase price of the products involved.
          </p>

          <h3 className="mt-4 font-medium">8. Governing Law</h3>
          <p>
            These Terms are governed by the laws of the country where {COMPANY_NAME} is registered,
            without regard to conflict of law provisions. Any dispute will be resolved in the
            competent courts of that jurisdiction unless otherwise required by local law.
          </p>

          <h3 className="mt-4 font-medium">9. Changes to Terms</h3>
          <p>
            We may update these Terms from time to time. Material changes will be posted and/or
            notified where required. Continued use of the site after changes constitutes acceptance
            of the updated Terms.
          </p>

          <h3 className="mt-4 font-medium">10. Contact</h3>
          <p id="contact">
            If you have questions about these Terms or the Privacy Policy, please contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}

export default page