"use client"
import Link from 'next/link';
import React, { useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";


const AddToCartToast = ({ show, onClose, customButtonId }: { show: boolean, onClose: Function, customButtonId?: string }) => {

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000); // Hide toast after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show]);


  return (
    <div className={`z-[9999999] fixed top-4 left-1/2 transform -translate-x-1/2 p-4 bg-white rounded-lg shadow-lg transition-all duration-300 opacity-0 ${show ? 'translate-y-[20px] opacity-100' : 'translate-y-[-75px]'} px-4 py-3 flex gap-4 w-[calc(100%-2rem)] max-w-[360px] items-center`}>
      <FaCircleCheck size={24} color='#40ce24' className={`${show ? 'scale-2' : 'scale-0'}`} />
      <p className='text-[#5F5F5F] font-medium text-base'>Item Added to Cart</p>
      <Link href={'/cart'}>
        <button id={customButtonId || 'product-view-cart-button'}
          className='bg-brandLight flex justify-center items-center w-[120px] h-[36px] rounded-lg font-medium text-white underline-logo'>View Cart</button>
      </Link>

    </div>
  );
};

export default AddToCartToast;
