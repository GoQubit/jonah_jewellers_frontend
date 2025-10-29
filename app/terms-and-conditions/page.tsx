"use client";
import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="wrapper px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Terms & Conditions
      </h1>

      <p className="mb-6">
        Please read these Terms & Conditions ("Terms") carefully before using
        <strong> Jonah Jewellers’ </strong> website or purchasing any products
        and services. By using our website, accessing any content, or placing an
        order, you agree to be bound by these terms.
      </p>

      {/* Orders & Pricing */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">1. Orders & Pricing</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All orders are subject to acceptance and availability.</li>
          <li>
            We reserve the right to cancel or refuse any order for reasons
            including (but not limited to): product unavailability, pricing or
            product detail errors, or suspected fraudulent activity.
          </li>
          <li>
            Prices displayed on the website are in your selected currency and
            may include applicable taxes.
          </li>
          <li>
            Jonah Jewellers reserves the right to modify prices without prior
            notice, but changes will not affect confirmed orders.
          </li>
        </ul>
      </section>

      {/* Payment */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">2. Payment</h2>
        <p className="mb-3">
          We accept payments via secure, third-party payment processors. We do
          not store or have access to your full card details. All payment data
          is handled according to the payment provider’s security and compliance
          standards.
        </p>
        <p>
          By placing an order, you authorize us to charge your selected payment
          method for the total payable amount, including product price, taxes,
          and shipping fees (if applicable).
        </p>
      </section>

      {/* Shipping & Delivery */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">3. Shipping & Delivery</h2>
        <p className="mb-3">
          Shipping timelines provided are estimates and may vary depending on
          location, carrier delays, or external factors. Ownership and risk of
          loss transfer to you once the order is handed over to the shipping
          carrier.
        </p>
        <p>
          If your order arrives damaged, delayed, or is lost in transit, please
          contact our support team promptly at{" "}
          <a
            href="mailto:support@jonahjewellers.com"
            className="text-blue-600 underline"
          >
            support@jonahjewellers.com
          </a>{" "}
          with your order details.
        </p>
      </section>

      {/* Product Descriptions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          4. Product Descriptions: Jewelry
        </h2>
        <p className="mb-3">
          We make every effort to ensure that product descriptions, colors,
          weights, and images are accurate. However, due to variations in
          display settings and manufacturing processes, we do not guarantee that
          descriptions or colors will always match exactly.
        </p>
        <p>
          Jonah Jewellers reserves the right to correct any errors,
          inaccuracies, or omissions at any time without prior notice.
        </p>
      </section>

      {/* Kitty Plans */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">5. Kitty Plans</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Available Plans: 3-month, 6-month, and 12-month kitty options.
          </li>
          <li>
            Lock-in Period: The kitty amount cannot be withdrawn or used before
            the completion date of the selected plan.
          </li>
          <li>
            Early Withdrawal: Not permitted under normal circumstances. However,
            in exceptional or emergency cases, an early withdrawal may be
            considered at Jonah Jewellers’ discretion, subject to applicable
            deductions and approval.
          </li>
          <li>
            Plan Completion: On completion, customers may use the total kitty
            balance for jewelry purchases or other eligible products as per the
            plan rules.
          </li>
        </ul>
      </section>

      {/* Gold Investment Plans */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">6. Gold Investment Plans</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Minimum Lock-in Period: 6 months.</li>
          <li>
            Early Withdrawal: If withdrawn before 6 months, a 9% deduction from
            the invested amount will apply.
          </li>
          <li>
            Usage: Investment amounts can be utilized for gold purchases,
            conversions, or withdrawals post the lock-in period.
          </li>
          <li>
            Security: All gold investment records, transactions, and payments
            are securely maintained in compliance with applicable financial and
            privacy standards.
          </li>
        </ul>
      </section>

      {/* Intellectual Property */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
        <p>
          All content, including logos, product designs, images, text, graphics,
          videos, and code, is the property of Jonah Jewellers or its content
          partners. You may not copy, reproduce, distribute, or modify any part
          of the website’s content without prior written consent from Jonah
          Jewellers.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Jonah Jewellers shall not be
          liable for any indirect, incidental, consequential, or punitive
          damages arising from your use of the website, purchase or use of our
          products, or inability to access the website. Our total liability for
          any claim shall not exceed the total amount paid for the product(s)
          giving rise to the claim.
        </p>
      </section>

      {/* Governing Law */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
        <p>
          These Terms shall be governed by and interpreted in accordance with
          the laws of the country where Jonah Jewellers is registered, without
          regard to conflict of law principles. All disputes shall be subject to
          the exclusive jurisdiction of the competent courts in that
          jurisdiction, unless otherwise required by law.
        </p>
      </section>

      {/* Changes */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
        <p>
          We may revise or update these terms periodically. Material changes
          will be posted on this page and/or notified where required by law.
          Your continued use of the website after such updates constitutes your
          acceptance of the revised terms.
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
        <p>
          If you have any questions regarding these terms or our privacy policy,
          please contact us:
        </p>
        <p className="mt-2">
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
  );
};

export default TermsAndConditionsPage;
