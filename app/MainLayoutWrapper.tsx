"use client"
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';
import React from 'react'
import { ToastContainer } from 'react-toastify'

const excludeHeaderPathRegex = [
  /^\/cart?$/,
  /^\/admin.*?$/,
  /^\/orders?$/,
  /^\/profile?$/,
  /^\/payment?$/,
  /^\/seller-dashboard.*?$/,
]
const excludeFooterPathRegex = [/^\/admin.*?$/]

const MainLayoutWrapper = ({ children }: { children: any }) => {
  const pathname = usePathname();

  // Add all routes where you DON'T want the default header
  // const hideHeaderRoutes = ['/cart', "/orders", "/profile", "/seller-dashboard", '/admin'];

  // const shouldHideHeader = hideHeaderRoutes.some((path) =>
  //   pathname.startsWith(path)
  // );

  return (
    <div className="min-h-screen flex flex-col">

      {
        !excludeHeaderPathRegex.find(pattern => pathname.match(pattern)) &&
        <Header />
      }

      {/* {!shouldHideHeader && <Header />} */}

      <main className="flex-grow">
        <ToastContainer
          style={{ zIndex: "9999999" }}
        />
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