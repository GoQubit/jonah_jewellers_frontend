"use client"

import Toast from "@/components/Toast/Toast"
import { Button } from "@/components/ui/buttons/Button"
import { Input } from "@/components/ui/Input"
import { TextArea } from "@/components/ui/TextArea"
import {
  createGoldWithdrawalApi,
  GoldWithdrawalData,
} from "@/lib/api/goldWalletApis/goldWithdrawalApis"
import type React from "react"

import { useState } from "react"
import { AiFillGold } from "react-icons/ai"

interface GoldWithdrawalModalProps {
  isOpen: boolean
  onClose: () => void
  availableGoldWeight: number
  onSuccess: () => void
}

export function GoldWithdrawalModal({
  isOpen,
  onClose,
  availableGoldWeight,
  onSuccess,
}: GoldWithdrawalModalProps) {
  const [goldWeight, setGoldWeight] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (+goldWeight > availableGoldWeight) {
      Toast.error(`You can only withdraw up to ${availableGoldWeight.toFixed(3)}g`)
      return
    }

    try {
      setIsSubmitting(true)

      const payload: GoldWithdrawalData = {
        goldWeight: +goldWeight,
        reason: reason,
      }
      const res = await createGoldWithdrawalApi(payload)
      if (res?.status === 201 || res?.status === 200) {
        Toast.success("Withdrawal request submitted! We'll notify you once admin approves it.")
        setGoldWeight("")
        setReason("")
        onSuccess()
        onClose()
      } else {
        Toast.error("Something went wrong, please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      Toast.error("Something went wrong, please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AiFillGold size={20} />
          <h2 className="text-xl font-semibold text-gray-900">Gold Withdrawal Request</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="goldWeight">Gold Weight (grams)*</label>
          <Input
            id="goldWeight"
            type="number"
            step="0.001"
            placeholder="Enter grams of gold to withdraw"
            value={goldWeight}
            onChange={(e) => setGoldWeight(e.target.value)}
            required
            className="w-full !p-4"
          />
          <p className="text-xs text-gray-500">
            *Maximum: {availableGoldWeight.toFixed(3)}g available for withdrawal
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="reason">Reason for withdrawal*</label>
          <TextArea
            label=""
            value={reason}
            onChange={(value) => setReason(value)}
            placeholder="e.g. Want physical gold"
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
          <Button
            type="submit"
            className="flex-1 !bg-[#B8860B] hover:!bg-[#a07609]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </Button>
        </div>
      </form>
    </div>
  )
}
