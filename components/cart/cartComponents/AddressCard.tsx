"use client"
import { Button } from "@/components/ui/buttons/Button"
import { Badge } from "@/components/ui/Badge"
import { BiBuilding, BiHome, BiPencil, BiPhone, BiTrash } from "react-icons/bi"
import { BsMailbox } from "react-icons/bs"
import { useState } from "react"
import { AiFillEdit } from "react-icons/ai"

export type Address = {
  id: string
  name: string
  label: string
  addressLines: string[]
  email: string
  phone: string
  selected?: boolean
  type: "home" | "office"
}

export function AddressCard({
  address,
  onSelect,
  onEdit,
  onDelete,
}: {
  address: Address
  onSelect?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}) {
  const Icon = address.type === "home" ? BiHome : BiBuilding

  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);

  return (
    <article
      role="radio"
      aria-checked={address.selected ? "true" : "false"}
      tabIndex={0}
      onClick={() => onSelect?.(address.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect?.(address.id)
      }}
      className={`rounded-lg border p-4 md:p-6 transition-colors cursor-pointer
        ${address.selected ? "border-amber-400 bg-amber-50/60" : "border-border bg-background"} `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-1 h-9 w-9 rounded-full bg-muted flex items-center justify-center">
            <Icon className="h-5 w-5 text-foreground/80" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-medium">{address.name}</h3>
              <Badge variant="outline" className="rounded-md text-xs">
                {address.label}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground leading-6">
              {address.addressLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>

            <div className="mt-2 grid gap-2 text-sm">
              <div className="flex items-center gap-2">
                <BsMailbox className="h-4 w-4 text-muted-foreground" />
                <span>{address.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <BiPhone className="h-4 w-4 text-muted-foreground" />
                <span>{address.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          <Button
            variant="ghost"
            aria-label="Edit address"
            onClick={(e) => { setIsEditAddressModalOpen(true) }}
          >
            <AiFillEdit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            aria-label="Delete address"
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(address.id)
            }}
          >
            <BiTrash className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    </article>
  )
}
