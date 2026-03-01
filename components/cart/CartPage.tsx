"use client"
import React, { useEffect, useState } from 'react'
import { OrderSummary } from './cartComponents/OrderSummary'
import ChooseAddress from './ChooseAddress'
import BackButton from '../ui/BackButton'
import CartItems from './cartComponents/CartItems'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import EmptyCart from '../ui/emptyCart'
import useIsAuth from '@/hooks/useIsAuth'
import { getUserKittyDashboardInfoApi } from '@/lib/api/kittyApis/kittyApis'
import { getSellerDashboardInfoApi } from '@/lib/api/sellerApis/sellerInvestmentsApis'
import { getSingleProductApi } from '@/lib/api/products/productsApis'
import { updateItemPrice } from '@/redux/Features/cartSlice/cartSlice'

const CartPage = () => {
  const user = useSelector((state: RootState) => state.user)
  const { items } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const [cartStep, setCartStep] = useState('cartItems');
  const [useWalletCash, setUseWalletCash] = useState(false)
  const [availableWalletCash, setAvailableWalletCash] = useState(0)
  const [buyerWallet, setBuyerWallet] = useState(null);
  const [sellerWallet, setSellerWallet] = useState(null);
  const [promoCode, setPromoCode] = useState("")
  const isAuth = useIsAuth()
  

  const fetchBuyerWallet = async () => {
    const res = await getUserKittyDashboardInfoApi();
    if (res.status === 200) {
      setBuyerWallet(res?.data)
      setAvailableWalletCash(res?.data?.availableForShopping)
    }
  }

  const fetchSellerWallet = async () => {
    const res = await getSellerDashboardInfoApi();
    if (res.status === 200) {
      setSellerWallet(res?.data)
      setAvailableWalletCash(res?.data?.availableToWithdraw)
    }
  }

  // Refresh cart item prices using latest product data (handles gold price changes)
  useEffect(() => {
    const refreshCartPrices = async () => {
      if (!items || items.length === 0) return

      await Promise.all(
        items.map(async (item) => {
          try {
            const res = await getSingleProductApi(item.id)
            if (res?.status === 200 && res.data) {
              const latestPrice = res.data.price
              const latestOriginalPrice = res.data.originalPrice ?? item.originalPrice

              // Only update if price actually changed and is a valid number
              if (typeof latestPrice === "number" && latestPrice !== item.price) {
                dispatch(
                  updateItemPrice({
                    id: item.id,
                    ringSize: item.ringSize,
                    price: latestPrice,
                    originalPrice: latestOriginalPrice,
                  })
                )
              }
            }
          } catch (error) {
            console.error("Failed to refresh price for product", item.id, error)
          }
        })
      )
    }

    // Run once when CartPage mounts or when cart gains items
    if (items && items.length > 0) {
      refreshCartPrices()
    }
  }, [items.length, dispatch])

  useEffect(() => {
    if (isAuth && user.role === 'BUYER') fetchBuyerWallet()
    if (isAuth && user.role === 'SELLER') fetchSellerWallet()
  }, [])

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
          walletCash={availableWalletCash}
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
              walletCash={availableWalletCash}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default CartPage