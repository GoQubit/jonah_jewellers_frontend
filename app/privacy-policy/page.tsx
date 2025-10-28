"use client";

import React from "react";

const COMPANY_NAME = "Jonah Jewellers";
const COMPANY_URL = "https://www.jonahjewellers.com";
const CONTACT_EMAIL = "support@jonahjewellers.com";
const EFFECTIVE_DATE = "October 28, 2025";

const PrivacyAndTermsPage = () => {
  return (
    <main className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-6">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Privacy Policy
          </h1>
        </header>

        {/* Privacy Policy */}
        <section id="privacy" className="prose prose-sm max-w-none text-gray-800">
          {/* <h2 className="text-lg font-semibold">Privacy Policy</h2> */}
          <p>
            {COMPANY_NAME} ("we", "us", or "our") is committed to protecting the privacy of
            visitors and customers who use our website ({COMPANY_URL}) and services. This Privacy
            Policy explains what information we collect, how we use it, how we protect it, and your
            rights regarding that information.
          </p>

          <h3 className="mt-4 font-medium">1. Information We Collect</h3>
          <ul>
            <li>
              <strong>Information you provide:</strong> account details, name, email, phone number,
              shipping & billing address, order history, payment method (tokenized by payment
              processor), and messages you send to us.
            </li>
            <li>
              <strong>Automatically collected information:</strong> device and browser details,
              IP address, geolocation (coarse), pages visited, search queries, and interaction data
              (for analytics and site improvement).
            </li>
            <li>
              <strong>Third-party data:</strong> information from payment processors, shipping
              partners, or marketing platforms if you use or connect those services.
            </li>
          </ul>

          <h3 className="mt-4 font-medium">2. How We Use Your Information</h3>
          <ul>
            <li>To process orders, billing and shipping.</li>
            <li>To respond to your inquiries and provide customer support.</li>
            <li>To improve and personalize our site, product recommendations and marketing.</li>
            <li>To send transactional and promotional emails (you may opt out of marketing).</li>
            <li>To detect and prevent fraud, and to comply with legal obligations.</li>
          </ul>

          <h3 className="mt-4 font-medium">3. Sharing &amp; Disclosure</h3>
          <p>
            We may share your information with trusted third parties only as needed to operate the
            service — for example, payment processors, shipping couriers, analytics providers, and
            legal authorities when required. We do not sell your personal information to third
            parties.
          </p>

          <h3 className="mt-4 font-medium">4. Cookies &amp; Tracking</h3>
          <p>
            We use cookies and similar tracking technologies for essential site functionality, to
            remember your preferences, and to analyze site usage. You can control cookies through
            your browser settings; disabling some cookies may affect site functionality.
          </p>

          <h3 className="mt-4 font-medium">5. Data Security</h3>
          <p>
            We implement reasonable technical and organizational measures to protect your personal
            information. However, no internet transmission or storage is fully secure — if you
            suspect a security issue, contact us immediately.
          </p>

          <h3 className="mt-4 font-medium">6. Your Rights</h3>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or
            restrict processing of your personal data, and to object to certain uses. To exercise
            these rights, contact us at the address below.
          </p>

          <h3 className="mt-4 font-medium">7. International Transfers</h3>
          <p>
            If you are located outside the country where we operate, your personal information may
            be transferred to and processed in other countries. We take steps to ensure an adequate
            level of protection for such transfers.
          </p>

          <h3 className="mt-4 font-medium">8. Children</h3>
          <p>
            Our website is not directed to children under the age of 13 (or applicable age in your
            region). We do not knowingly collect personal data from children. If you believe we
            have collected data from a child, contact us and we will take steps to remove it.
          </p>

          <h3 className="mt-4 font-medium">9. Changes to this Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated date at
            the top of this page; material changes will be notified where required by law.
          </p>
        </section>


      </div>
    </main>
  );
}

export default PrivacyAndTermsPage;