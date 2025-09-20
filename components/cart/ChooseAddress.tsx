"use client"

import { BiPlus } from "react-icons/bi"
import { Button } from "../ui/buttons/Button"
import { AddressList } from "./cartComponents/AddressList"
import { IoLocationSharp } from "react-icons/io5"

// import { HeaderBar } from "@/components/checkout/header-bar"
// import { FooterAction } from "@/components/checkout/footer-action"

export default function ChooseAddressPage() {
  // In a real app, fetch addresses on the server and pass down as props.
  const addresses = [
    {
      id: "addr_1",
      name: "Md. Anas Ansari Pasha",
      label: "Home",
      addressLines: ["Cane Society Rd, near Majar, Bazpur,", "Uttarakhand 262401"],
      email: "mohdanas@gmail.com",
      phone: "+91 98765 43210",
      selected: true,
      type: "home" as const,
    },
    {
      id: "addr_2",
      name: "Md. Anas Ansari Pasha",
      label: "Office",
      addressLines: ["Cane Society Rd, near Majar, Bazpur,", "Uttarakhand 262401"],
      email: "mohdanas@gmail.com",
      phone: "+91 98765 43210",
      selected: false,
      type: "office" as const,
    },
  ]

  const onAddNew = () => {
    console.log("Add new address")
  }

  const paymentHandler = () => {
    console.log("proceed to payment")
  }

  return (
    <main className="wrapper space-y-6 mt-12">
      <header className="flex items-center justify-between">
        <h2 className="text-pretty text-lg font-nunito font-medium flex items-center gap-2">
          <IoLocationSharp />
          Choose Delivery Address
        </h2>
        <Button variant="brand-outline" className="gap-2 font-nunito !p-3"
          onClick={onAddNew} >
          <BiPlus className="h-4 w-4" />
          Add New Address
        </Button>
      </header>
      <AddressList
        addresses={addresses}
        onSelect={(id) => console.log("[v0] select", id)}
        onEdit={(id) => console.log("[v0] edit", id)}
        onDelete={(id) => console.log("[v0] delete", id)}
      />
      <div className="flex justify-end">
        <Button
          variant="brand-solid"
          className="w-[300px]"
          onClick={paymentHandler}>
          Continue to payment
        </Button>
      </div>

    </main>
  )
}
