"use client"
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';
import React from 'react'
import { ToastContainer } from 'react-toastify'

const MainLayoutWrapper = ({ children }: { children: any }) => {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex flex-col">
      
      {
        pathname !== '/cart' &&
        <Header />
      }

      <main className="flex-grow">
        <ToastContainer
          style={{ zIndex: "9999999" }}
        />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayoutWrapper