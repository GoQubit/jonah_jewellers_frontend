import { redirect } from 'next/navigation'

// This route group's folder name ("(pending-verifications)") is stripped
// from the URL by Next.js, so this page.tsx is what actually renders at the
// bare /admin/investors-and-buyers path - the pending-verification list it
// used to show here still calls the removed manual QR-proof admin endpoint
// and none of the tabs above it end up highlighted. Until that flow is
// rebuilt against the new Razorpay-based data, send visitors straight to the
// Sellers (Gold Investors) tab, which is the default landing tab.
const InvestorsAndBuyersIndexPage = () => {
  redirect('/admin/investors-and-buyers/gold-investors')
}

export default InvestorsAndBuyersIndexPage
