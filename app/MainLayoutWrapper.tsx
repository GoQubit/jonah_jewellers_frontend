"use client"
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';
import React from 'react'
import { ToastContainer } from 'react-toastify'

const excludeHeaderPathRegex = [/^\/cart?$/, /^\/admin.*?$/]
const excludeFooterPathRegex = [/^\/admin.*?$/]

const MainLayoutWrapper = ({ children }: { children: any }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col">

      {
        !excludeHeaderPathRegex.find(pattern => pathname.match(pattern)) &&
        <Header />
      }

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