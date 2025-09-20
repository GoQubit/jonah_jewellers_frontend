"use client"
import { useState } from "react"
import { Address, AddressCard } from "./AddressCard"

export function AddressList({
  addresses,
  onSelect,
  onEdit,
  onDelete,
}: {
  addresses: Address[]
  onSelect?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}) {
  const [selectedId, setSelectedId] = useState(addresses.find((a) => a.selected)?.id ?? addresses[0]?.id)

  return (
    <div className="space-y-4">
      {addresses.map((a) => (
        <AddressCard
          key={a.id}
          address={{ ...a, selected: a.id === selectedId }}
          onSelect={(id) => {
            setSelectedId(id)
            onSelect?.(id)
          }}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
