"use client"
import React, { useState } from 'react'
import { CartItems } from './cartComponents/CartItems'
import { OrderSummary } from './cartComponents/OrderSummary'
import ChooseAddress from './ChooseAddress'
import BackButton from '../ui/BackButton'

const CartPage = () => {
  const [cartStep, setCartStep] = useState('cartItems');

  return (
    <div className="wrapper py-8">
      {
        cartStep !== 'cartItems' &&
        <BackButton label='Back'
          stepBack={() => {
            if (cartStep === 'chooseAddress') setCartStep('cartItems')
          }}
        />
      }
      {
        cartStep === 'chooseAddress' &&
        <ChooseAddress />
      }
      {
        cartStep === 'cartItems' &&
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="w-full md:w-[60%] ">
            <CartItems />
          </div>
          <div className="w-full md:w-[40%]">
            <OrderSummary nextStep={() => { setCartStep('chooseAddress') }} />
          </div>
        </div>
      }
    </div>
  )
}

export default CartPage