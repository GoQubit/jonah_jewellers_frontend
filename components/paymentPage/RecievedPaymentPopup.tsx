'use client'
import React from 'react'
import { Button } from '../ui/buttons/Button'
import { FaCircleCheck } from 'react-icons/fa6'
import { useRouter } from 'next/navigation'

const RecievedPaymentPopup = ({ planCategory }: { planCategory: string }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center text-center">
      <FaCircleCheck className="w-12 h-12 text-green-500 mb-3" />

      <h2 className="text-3xl font-nunito font-semibold text-brand mb-2">
        Payment Received 🎉
      </h2>

      <p className="text-gray-600 mb-6 font-nunito font-normal">
        Thanks for your payment! It’s been verified automatically and your
        plan is now active.
      </p>

      <div className="w-full flex gap-3">
        <Button
          variant='brand-outline'
          className=" w-[50%] !py-3 font-nunito "
          onClick={() => router.push(planCategory === 'kitty' ?
            '/kitty-dashboard' :
            '/seller-dashboard')}
        >
          {
            planCategory === 'kitty' ?
              'View Kitty Dashboard' :
              'View Seller Dashboard'
          }
        </Button>
        <Button
          variant='brand-solid'
          className="w-[50%] px-4 !py-3 font-nunito ">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default RecievedPaymentPopup