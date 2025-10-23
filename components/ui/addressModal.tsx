"use client"

import React, { useState, useMemo } from "react"
import { IoLocationSharp, IoChevronDownOutline } from "react-icons/io5"
import { Button } from "../ui/buttons/Button"
import Toast from "../Toast/Toast"
import { INDIAN_STATES } from "@/data/indianStateData"
import { createNewAddressApi } from "@/lib/api/profile/addressApi"

type AddressFormData = {
  line1: string
  city: string
  state: string
  pinCode: string
  phone: string
}

type Errors = Partial<Record<keyof AddressFormData, string>>

type Props = {
  initialData?: AddressFormData
  onClose: () => void
  onSave: () => void
}

export default function AddressModal({ initialData, onClose, onSave }: Props) {
  const [form, setForm] = useState<any>({
    line1: initialData?.line1 || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pinCode: initialData?.pinCode || "",
    phone: initialData?.phone || "",
  })

  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)

  // --- VALIDATORS ---
  const required = (v: string) => (v?.trim() ? "" : "This field is required")
  const onlyLetters = (v: string) =>
    /^[a-zA-Z\s'-]+$/.test(v) ? "" : "Only letters are allowed"
  const isPinIN = (v: string) =>
    /^\d{6}$/.test(v) ? "" : "Enter 6-digit PIN code"
  const isPhoneIN = (v: string) =>
    /^\d{10}$/.test(v) ? "" : "Enter a valid 10-digit mobile number"

  const validateField = (name: keyof AddressFormData, value: string): string => {
    switch (name) {
      case "line1":
        return required(value)
      case "city":
        return required(value) || onlyLetters(value)
      case "state":
        return required(value)
      case "pinCode":
        return required(value) || isPinIN(value)
      case "phone":
        return required(value) || isPhoneIN(value)
      default:
        return ""
    }
  }

  const validateAll: () => Errors = () => {
    const out: Errors = {}
      ; (Object.keys(form) as (keyof AddressFormData)[]).forEach((k) => {
        const e = validateField(k, form[k])
        if (e) out[k] = e
      })
    return out
  }

  const isValid = useMemo(() => Object.keys(validateAll()).length === 0, [form])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as { name: keyof AddressFormData; value: string }
    let next = value

    if (name === "pinCode" || name === "phone") {
      next = value.replace(/[^\d]/g, "") // remove non-digits
      if (name === "phone" && next.length > 10) next = next.slice(0, 10) // limit to 10 digits
    }

    setForm((f: any) => ({ ...f, [name]: next }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }))
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target as { name: keyof AddressFormData }
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name]) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next = validateAll()
    setErrors(next)
    setTouched(
      Object.keys(form).reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        {} as Record<string, boolean>
      )
    )

    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      const res = await createNewAddressApi(form)
      console.log("res", res)
      if (res.status === 200) {
        onSave()
        Toast.success("Address saved successfully!")
        onClose()
      } else {
        Toast.error("Something went wrong. Please try again.")
      }
    } catch {
      Toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const labelCls = "mb-1 block font-nunito font-normal text-base"
  const inputBase =
    "block w-full rounded-md border focus:border-brand bg-white px-3 py-4 text-sm placeholder:text-gray-400 outline-none"
  const helpCls = "mt-1 text-xs text-red-600"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-medium flex gap-2 items-center font-nunito mb-4">
          <IoLocationSharp /> Add / Edit Address
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Address */}
          <div>
            <label className={labelCls} htmlFor="line1">
              House Number / Building / Area / Colony*
            </label>
            <input
              id="line1"
              name="line1"
              className={inputBase}
              placeholder="Enter Address"
              value={form.line1}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.line1}
            />
            {touched.line1 && errors.line1 && <p className={helpCls}>{errors.line1}</p>}
          </div>

          {/* City */}
          <div>
            <label className={labelCls} htmlFor="city">
              City*
            </label>
            <input
              id="city"
              name="city"
              className={inputBase}
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.city}
            />
            {touched.city && errors.city && <p className={helpCls}>{errors.city}</p>}
          </div>

          {/* State */}
          <div>
            <label className={labelCls} htmlFor="state">
              State*
            </label>
            <div className="relative">
              <select
                id="state"
                name="state"
                className={`${inputBase} appearance-none`}
                value={form.state}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.state}
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <IoChevronDownOutline />
              </div>
              {touched.state && errors.state && <p className={helpCls}>{errors.state}</p>}
            </div>
          </div>

          {/* Pin Code */}
          <div>
            <label className={labelCls} htmlFor="pinCode">
              Pin Code*
            </label>
            <input
              id="pinCode"
              name="pinCode"
              inputMode="numeric"
              pattern="\d*"
              maxLength={6}
              className={inputBase}
              placeholder="PIN Code"
              value={form.pinCode}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.pinCode}
            />
            {touched.pinCode && errors.pinCode && (
              <p className={helpCls}>{errors.pinCode}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className={labelCls} htmlFor="phone">
              Phone Number*
            </label>
            <input
              id="phone"
              name="phone"
              inputMode="numeric"
              pattern="\d*"
              maxLength={10}
              className={inputBase}
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
            />
            {touched.phone && errors.phone && (
              <p className={helpCls}>{errors.phone}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="brand-solid"
              disabled={!isValid || submitting}
              className="flex-1"
            >
              {submitting ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
