"use client"

import { BiPlus } from "react-icons/bi"
import { Button } from "../ui/buttons/Button"
import { AddressList } from "./cartComponents/AddressList"
import { IoLocationSharp } from "react-icons/io5"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import RazorpayButton from "../Razorpay/RazorpayButton"
import { createOrderApi } from "@/lib/api/order/orderApis"
import Toast from "../Toast/Toast"
import AddressModal from "../ui/addressModal"
import { deleteAddressApi, getAllAddressesApi } from "@/lib/api/profile/addressApi"

// import { HeaderBar } from "@/components/checkout/header-bar"
// import { FooterAction } from "@/components/checkout/footer-action"

// In a real app, fetch addresses on the server and pass down as props.
// const addresses = [
//   {
//     id: "addr_1",
//     name: "Md. Anas Ansari Pasha",
//     email: "mohdanas@gmail.com",
//     phone: "9876543210",
//     addressLine1: "Cane Society Rd, near Majar, Bazpur,",
//     city: "bazpur",
//     state: "Uttarakhand",
//     pinCode: "262401",
//     selected: true,
//   },
//   {
//     id: "addr_2",
//     name: "sid",
//     email: "mohdanas@gmail.com",
//     phone: "9876543210",
//     addressLine1: "Cane Society Rd, near Majar, Bazpur,",
//     city: "kotdwar",
//     state: "Uttarakhand",
//     pinCode: "262401",
//     selected: false,
//   },
// ]

type ChooseAddressPageProps = {
  walletCashUsed?: boolean
  coupon?: string | null
  walletCash?: number
}

export default function ChooseAddressPage({ walletCashUsed, coupon, walletCash }: ChooseAddressPageProps) {
  const { items } = useSelector((state: RootState) => state.cart)
  const [allAddresses, setAllAddresses] = useState<any>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [razorpayOrder, setRazorpayOrder] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)


  const onAddNew = () => {
    console.log("Add new address")
    fetchAddresses()
  }

  const fetchAddresses = async () => {
    const res = await getAllAddressesApi()
    console.log("res", res)
    if (res.status === 200) {
      setAllAddresses(res.data)
      setSelectedAddress(res.data[0])
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const createOrderHandler = async () => {
    const { id, selected, ...restAddress } = selectedAddress;
    const payload = {
      items: items.map((item) => ({
        product: item.id, // or item.productId from backend
        quantity: item.quantity,
        ringSize: item.ringSize,
      })),
      walletCashUsed: walletCashUsed || false,
      coupon: coupon || null,
      shippingAddress: restAddress,
    }
    try {
      const res = await createOrderApi(payload); // must await!
      console.log("Order Api Response", res);

      if (res.status === 201 && res?.data?.razorpayOrder) {
        setRazorpayOrder(res.data.razorpayOrder);
        setOrder(res.data?.order);
      }

    } catch (err) {
      console.error("Create Order Error", err);
    }

  }

  const addressChangeHandler = (id: string) => {
    const add: any = allAddresses.filter((address: any) => address.id === id)
    setSelectedAddress(add[0])
  }

  const handleDeleteAddress = async (id: string) => {
    const res = await deleteAddressApi(id)
    console.log("res", res);
    if (res.status === 204) {
      fetchAddresses()
      Toast.success("Address Delete Successfully!")
    }

  }

  return (
    <main className="wrapper space-y-6 mt-12">
      <header className="flex items-center justify-between">
        <h2 className="text-pretty text-lg font-nunito font-medium flex items-center gap-2">
          <IoLocationSharp />
          Choose Delivery Address
        </h2>
        <Button variant="brand-outline" className="gap-2 font-nunito !p-3"
          onClick={() => setIsAddressModalOpen(true)} >
          <BiPlus className="h-4 w-4" />
          Add New Address
        </Button>
      </header>
      <AddressList
        addresses={allAddresses}
        onSelect={(id) => addressChangeHandler(id)}
        onEdit={(id) => console.log("[v0] edit", id)}
        onDelete={(id) => handleDeleteAddress(id)}
      />

      <div className="flex justify-end flex-col gap-4 w-[300px]">
        <Button
          variant="brand-solid"
          className="w-full"
          onClick={createOrderHandler}>
          Continue to payment
        </Button>

        {
          razorpayOrder && (
            <RazorpayButton
              amount={razorpayOrder.amount / 100} // convert paise → ₹
              orderId={order?.id}
              orderMeta={{
                orderId: razorpayOrder.id,
                receipt: razorpayOrder.receipt,
                name: "Jonah Jewellers",
                description: `Order #${order?.id}`,
                prefill: {
                  name: selectedAddress.name,
                  email: selectedAddress.email,
                  contact: selectedAddress.phone,
                },
                notes: razorpayOrder.notes,
              }}
              onSuccess={(data) => {
                console.log("✅ Payment Success:", data);
                // TODO: call your backend to mark order as paid
                Toast.success("Order Placed Successful!");
                // router.push(`/order/success/${order?.id}`)

                // navigate to success page
              }}
              onError={(err) => {
                Toast.error("Payment Failed!");
                console.error("❌ Payment Failed:", err);
              }}
            />
          )
        }
      </div>

      {
        isAddressModalOpen &&
        <AddressModal
          onSave={onAddNew}
          onClose={() => setIsAddressModalOpen(false)} />
      }


    </main>
  )
}
