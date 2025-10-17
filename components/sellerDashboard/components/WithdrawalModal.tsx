"use client"

import { Button } from "@/components/ui/buttons/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/Input"
import { TextArea } from "@/components/ui/TextArea"
import type React from "react"

import { useState } from "react"
import { BiWallet } from "react-icons/bi"
import { MdOutlinePayments } from "react-icons/md"


interface WithdrawalModalProps {
  isOpen: boolean
  onClose: () => void
  availableToWithdraw: number
}

export function WithdrawalModal({ isOpen, onClose, availableToWithdraw }: WithdrawalModalProps) {
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setAmount("")
    setReason("")
    onClose()
  }

  return (
    <div className="max-w-3xl">

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MdOutlinePayments size={20} />
          <h2 className="text-xl font-semibold text-gray-900">Cash Withdrawal Request</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="amount">Withdrawal Amount*</label>
          <Input
            id="amount"
            type="number"
            placeholder="₹ Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full !p-4"
          />
          <p className="text-xs text-gray-500">*Maximum: ₹{availableToWithdraw} for Withdrawal</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="reason">Reason for withdrawal*</label>
          <TextArea
            label=""
            value={reason}
            onChange={(value) => setReason(value)}
            placeholder="Add Reason for withdrawal"
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-transparent"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </div>
  )
}
