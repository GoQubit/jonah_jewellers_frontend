"use client"

import { BiPlus } from "react-icons/bi"
import { Button } from "../ui/buttons/Button"
import { AddressList } from "./cartComponents/AddressList"
import { IoLocationSharp } from "react-icons/io5"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import Toast from "../Toast/Toast"
import AddressModal from "../ui/addressModal"
import { deleteAddressApi, getAllAddressesApi } from "@/lib/api/profile/addressApi"
import { createOrderApi, verifyRazorPayOrderApi } from "@/lib/api/order/orderApis"

// ✅ Razorpay script loader
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

type ChooseAddressPageProps = {
  walletCashUsed?: boolean
  coupon?: string | null
  walletCash?: number
}

export default function ChooseAddressPage({ walletCashUsed, coupon, walletCash }: ChooseAddressPageProps) {
  const { items } = useSelector((state: RootState) => state.cart)
  const [allAddresses, setAllAddresses] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchAddresses = async () => {
    const res = await getAllAddressesApi()
    if (res.status === 200) {
      setAllAddresses(res.data)
      setSelectedAddress(res.data[0])
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleDeleteAddress = async (id: string) => {
    const res = await deleteAddressApi(id)
    if (res.status === 204) {
      fetchAddresses()
      Toast.success("Address deleted successfully!")
    }
  }

  const addressChangeHandler = (id: string) => {
    const add = allAddresses.find((address: any) => address.id === id)
    setSelectedAddress(add)
  }

  const handleOrderAndPayment = async () => {
    if (!selectedAddress) return Toast.error("Please select an address.")
    if (!items?.length) return Toast.error("Your cart is empty.")

    setLoading(true)
    try {
      // 🧾 1. Create order
      const { id, selected, createdAt, updatedAt, archive, user, ...restAddress } = selectedAddress;
      const payload = {
        items: items.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          ringSize: item.ringSize,
        })),
        walletCashUsed: walletCashUsed || false,
        coupon: coupon || null,
        shippingAddress: restAddress,
      }

      const res = await createOrderApi(payload)
      if (res.status !== 201 || !res.data?.razorpayOrder) {
        Toast.error("Failed to create order. Try again.")
        setLoading(false)
        return
      }

      const razorpayOrder = res.data.razorpayOrder
      const order = res.data.order

      // 🧠 2. Load Razorpay
      const ok = await loadRazorpayScript()
      if (!ok) {
        Toast.error("Failed to load Razorpay. Check your connection.")
        setLoading(false)
        return
      }

      // 💳 3. Razorpay options
      const options: any = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount, // already in paise
        currency: "INR",
        name: "Jonah Jewellers",
        description: `Order #${order?.id}`,
        order_id: razorpayOrder.id,
        handler: async function (response: any) {
          try {
            const payload = {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              orderId: order.id,
            }

            const verifyRes = await verifyRazorPayOrderApi(payload)
            const verifyJson = await verifyRes.json()

            if (verifyJson.success) {
              Toast.success("Order placed successfully!")
              // navigate to success page if needed
              // router.push(`/order/success/${order.id}`)
            } else {
              Toast.error("Payment verification failed!")
            }
          } catch (err) {
            Toast.error("Something went wrong while verifying payment.")
          }
        },
        prefill: {
          name: selectedAddress.name,
          email: selectedAddress.email,
          contact: selectedAddress.phone,
        },
        notes: razorpayOrder.notes || {},
        theme: { color: "#F37254" },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", () => Toast.error("Payment failed!"))
      rzp.open()
    } catch (err) {
      console.error(err)
      Toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="wrapper space-y-6 mt-12">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-nunito font-medium flex items-center gap-2">
          <IoLocationSharp />
          Choose Delivery Address
        </h2>
        <Button
          variant="brand-outline"
          className="gap-2 font-nunito !p-3"
          onClick={() => setIsAddressModalOpen(true)}
        >
          <BiPlus className="h-4 w-4" />
          Add New Address
        </Button>
      </header>

      <AddressList
        addresses={allAddresses}
        onSelect={addressChangeHandler}
        onEdit={(id) => console.log("[edit]", id)}
        onDelete={handleDeleteAddress}
      />

      <div className="flex justify-end flex-col gap-4 w-[300px]">
        <Button
          variant="brand-solid"
          className="w-full"
          onClick={handleOrderAndPayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue & Pay"}
        </Button>
      </div>

      {isAddressModalOpen && (
        <AddressModal
          onSave={fetchAddresses}
          onClose={() => setIsAddressModalOpen(false)}
        />
      )}
    </main>
  )
}
