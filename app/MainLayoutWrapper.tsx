"use client"
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';
import React from 'react'
import { ToastContainer } from 'react-toastify'

const excludeHeaderPathRegex = [
  /^\/cart?$/,
  /^\/admin.*?$/,
  /^\/orders.*?$/,
  /^\/profile?$/,
  /^\/payment?$/,
  /^\/login?$/,
  /^\/help-and-support?$/,
  /^\/kitty-dashboard.*?$/,
  /^\/seller-dashboard.*?$/,
  /^\/gold-wallet.*?$/,
]
const excludeFooterPathRegex = [/^\/admin.*?$/]

const MainLayoutWrapper = ({ children }: { children: any }) => {
  const pathname = usePathname();

  // Add all routes where you DON'T want the default header
  // const hideHeaderRoutes = ['/cart', "/orders", "/profile", "/seller-dashboard", '/admin'];

  // const shouldHideHeader = hideHeaderRoutes.some((path) =>
  //   pathname.startsWith(path)
  // );

  const isHeaderExcluded = excludeHeaderPathRegex.find(pattern => pathname.match(pattern))

  return (
    <div className="min-h-screen flex flex-col">

      {
        !isHeaderExcluded &&
        <Header />
      }

      {/* {!shouldHideHeader && <Header />} */}

      {/* The header (when shown) is position:fixed and pads itself with
          env(safe-area-inset-top) internally, so it grows taller on phones
          with a status bar/notch. Add that same inset to the content's
          top offset so nothing gets tucked underneath it - on excluded-header
          pages this still reserves just the safe-area so THEIR own header
          (CustomPageHeader / CartHeader etc.) isn't hidden under the status
          bar either. */}
      <main className="flex-grow "
        style={{
          paddingTop: isHeaderExcluded
            ? 'env(safe-area-inset-top)'
            : 'calc(80px + env(safe-area-inset-top))'
        }}
      >
        <ToastContainer style={{ zIndex: "9999999" }} />
        {children}
      </main>

      {
        !excludeFooterPathRegex.find(pattern => pathname.match(pattern)) &&
        <Footer />
      }
    </div>
  )
}

export default MainLayoutWrapper