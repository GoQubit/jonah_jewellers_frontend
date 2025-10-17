"use client"
import React, { useEffect, useState } from 'react'
import { OrderSummary } from './cartComponents/OrderSummary'
import ChooseAddress from './ChooseAddress'
import BackButton from '../ui/BackButton'
import CartItems from './cartComponents/CartItems'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import EmptyCart from '../ui/emptyCart'

const CartPage = () => {
  const { items } = useSelector((state: RootState) => state.cart)
  const [cartStep, setCartStep] = useState('cartItems');
  const [useWalletCash, setUseWalletCash] = useState(false)
  const [promoCode, setPromoCode] = useState("")

  const walletCash = 25000 // Example wallet cash, replace with actual user wallet cash


  // ✅ If no items in cart, show empty cart UI
  if (!items || items.length === 0) {
    return (
      <div className="wrapper py-8">
        <EmptyCart />
      </div>
    );
  }

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
        <ChooseAddress
          walletCashUsed={useWalletCash}
          coupon={promoCode}
          walletCash={walletCash}
        />
      }
      {
        cartStep === 'cartItems' &&
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="w-full md:w-[60%] ">
            <CartItems />
          </div>
          <div className="w-full md:w-[40%]">
            <OrderSummary
              nextStep={() => { setCartStep('chooseAddress') }}
              setUseWalletCash={setUseWalletCash}
              useWalletCash={useWalletCash}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              walletCash={walletCash}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default CartPage