"use client"

import React from "react"

const PrivacyPolicyPage = () => {
  return (
    <div className="wrapper bg-white text-gray-800 px-6 py-12 leading-relaxed">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Privacy Policy
      </h1>

      <p className="mb-6">
        We at <strong>Jonah Jewellers</strong> ("we," "us," or "our") are dedicated
        to safeguarding the privacy of users of our website and services. This
        privacy statement describes the data we gather, how we use and safeguard
        it, and your rights in relation to that data.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="mb-3 font-semibold">Information you provide:</p>
        <p className="mb-3">
          Your name, email address, phone number, shipping and billing address,
          account information, order history, payment method (as tokenized by
          payment processors), and any messages or questions you send us are
          among the personal details we gather from the information you voluntarily
          give us.
        </p>
        <p className="mb-3 font-semibold">Automatically collected information:</p>
        <p className="mb-3">
          When you visit our website, we automatically gather information about
          your device and browser, IP address, coarse geolocation, pages viewed,
          search queries, and interaction data (for analytics and site optimization).
        </p>
        <p className="mb-3 font-semibold">Third-party data:</p>
        <p>
          When you engage with payment processors, shipping partners, or marketing
          platforms via our website, we might get extra information from them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Order processing, billing, and delivery.</li>
          <li>To answer your questions and offer customer assistance.</li>
          <li>To enhance and customize your marketing messages and shopping experience.</li>
          <li>To send promotional and transactional emails (you may opt out anytime).</li>
          <li>To comply with legal requirements and prevent fraud.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Sharing & Disclosure</h2>
        <p>
          We share your information only with trusted third parties, such as payment
          gateways, shipping couriers, analytics providers, and law enforcement (if required).
          We never sell your personal information to outside parties.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Cookies & Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to enable essential site
          functionality, remember preferences, analyze traffic, and improve user
          experience. You can manage cookie preferences through your browser settings.
          Disabling certain cookies may affect site functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
        <p>
          We take appropriate organizational and technical precautions to protect your
          personal information. However, no method of transmission or storage is
          completely secure. Please contact us immediately at{" "}
          <a
            href="mailto:support@jonahjewellers.com"
            className="text-blue-600 underline"
          >
            support@jonahjewellers.com
          </a>{" "}
          if you suspect a data breach or unauthorized access.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, update, or
          delete your personal information, limit processing, or withdraw marketing
          consent. To exercise these rights, contact us at{" "}
          <a
            href="mailto:support@jonahjewellers.com"
            className="text-blue-600 underline"
          >
            support@jonahjewellers.com
          </a>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          9. Kitty & Gold Investment Information
        </h2>
        <p className="mb-3">
          Jonah Jewellers offers exclusive Kitty and Gold Investment plans for our
          valued customers.
        </p>

        <h3 className="font-semibold mt-4 mb-2">Kitty Plans:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Available in 3-month, 6-month, and 12-month durations.</li>
          <li>
            The kitty amount cannot be withdrawn before the completion date of the selected plan.
          </li>
          <li>
            Early withdrawal requests before maturity are not permitted unless in exceptional
            or emergency cases, which will be subject to review and approval by our team.
          </li>
        </ul>

        <h3 className="font-semibold mt-4 mb-2">Gold Investment Plans:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Investors must maintain a minimum lock-in period of 6 months.</li>
          <li>
            Withdrawals before 6 months will incur a 9% deduction from the total invested amount.
          </li>
          <li>
            All investment-related data, payment details, and transactions are securely
            handled in accordance with this Privacy Policy and our financial partners’
            compliance standards.
          </li>
        </ul>

        <p className="mt-3">
          By participating in these programs, you acknowledge and agree to these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">10. Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically. The “Effective Date” at the top
          of this page indicates the latest revision. Material updates will be communicated
          through our website or via email, where required by law.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy
          or your data, please contact us at:{" "}
          <br />
          📧{" "}
          <a
            href="mailto:support@jonahjewellers.com"
            className="text-blue-600 underline"
          >
            support@jonahjewellers.com
          </a>
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
