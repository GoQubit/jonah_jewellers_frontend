"use client"

import type React from "react"

import { useMemo, useState } from "react"
import Toast from "../Toast/Toast"
import { Button } from "../ui/buttons/Button"
import { TbUserFilled } from "react-icons/tb";
import { IoChevronDownOutline, IoLocationSharp } from "react-icons/io5"
import DownArrow from "../ui/DownArrow"
import { BiDownArrow } from "react-icons/bi"
import { BsArrowDown } from "react-icons/bs"
import { registerUserApi } from "@/lib/api/auth/authApis"
import { INDIAN_STATES } from "@/data/indianStateData"
import { setUserProfile } from "@/redux/Features/userSlice/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useSearchParams } from "next/navigation"
import { RootState } from "@/redux/store"
import RadioButton from "../ui/RadioButton"


type FormData = {
  firstName: string
  lastName: string
  phone: string
  email: string
  gender: string
  addressLine: string
  city: string
  state: string
  pin: string
  role: "BUYER" | "SELLER" | any
}

type Errors = Partial<Record<keyof FormData, string>>

const buildPayload = (form: FormData) => {
  return {
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    address: {
      line1: form.addressLine,
      city: form.city,
      state: form.state,
      pinCode: Number(form.pin),
    },
    role: form.role,
    gender: form.gender,
    email: form.email,
  }
}

// Basic validators
const required = (v: string, msg = "This field is required") => (v?.trim() ? "" : msg)
const onlyLetters = (v: string) => (/^[a-zA-Z\s'-]+$/.test(v) ? "" : "Only letters are allowed")
const isEmail = (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email")
const isPhoneIN = (v: string) => (/^\d{10}$/.test(v) ? "" : "Enter 10-digit mobile number")
const isPinIN = (v: string) => (/^\d{6}$/.test(v) ? "" : "Enter 6-digit PIN code")

export default function CreateAccountForm() {
  const user = useSelector((state: RootState) => state.user)
  const phonenumber = localStorage.getItem('phonenumber') || ''
  const [form, setForm] = useState<FormData>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: phonenumber || user.mobileNumber || "",
    email: user?.email || "",
    gender: user?.gender || "",
    addressLine: user?.address?.line1 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pin: user?.address?.pinCode ? String(user.address.pinCode) : "",
    role: user?.role || "BUYER",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submitting, setSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('profile') === 'edit' ? true : false
  const dispatch = useDispatch()
  const router = useRouter()

  // Get redirect target from URL
  const redirect = searchParams.get("redirect") || "/"

  // validate form field
  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case "firstName":
        return required(value) || onlyLetters(value)
      case "lastName":
        return "" // optional
        // return required(value) || onlyLetters(value)
      case "phone":
        return required(value) || isPhoneIN(value)
      case "email":
        return "" // optional
      //   return required(value) || isEmail(value)
      case "gender":
        return "" // optional
      case "addressLine":
        return "" // optional
        // return required(value)
      case "city":
        return required(value) || onlyLetters(value)
      case "state":
        return required(value)
      case "pin":
        return required(value) || isPinIN(value)
      case "role":
        return required(value)
      default:
        return ""
    }
  }

  const validateAll = (): Errors => {
    const out: Errors = {}
      ; (Object.keys(form) as (keyof FormData)[]).forEach((k) => {
        const e = validateField(k, form[k])
        if (e) out[k] = e
      })
    return out
  }

  const isValid = useMemo(() => Object.keys(validateAll()).length === 0, [form])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string }
    const next = name === "phone" || name === "pin" ? value.replace(/[^\d]/g, "") : value
    setForm((f) => ({ ...f, [name]: next }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, next) }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target as { name: keyof FormData }
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, form[name]) }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next = validateAll()
    setErrors(next)
    setTouched(Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {} as Record<string, boolean>))

    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      const payload = buildPayload(form)
      const res = await registerUserApi(payload)

      if (res.status === 200) {
        Toast.success('Account created successfully!')
        dispatch(setUserProfile(res.data.user)) // store user in redux
        router.push(redirect) // ✅ redirect user to original page
      }
    } catch {
      Toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const labelCls = "mb-1 block font-nunito font-normal text-base"
  const inputBase =
    "block w-full rounded-md border focus:border-brand bg-white px-3 py-4 text-sm placeholder:text-gray-400 outline-none  "
  const helpCls = "mt-1 text-xs text-red-600"

  return (
    <form noValidate onSubmit={onSubmit} className="  max-w-[600px] mx-auto flex flex-col gap-6 py-16 px-4 ">

      <div className="flex flex-col gap-1 text-center mb-10">
        <h1 className="text-2xl ">{isEdit ? "Edit Your Personal Details" : "Create Your Account"}</h1>
        <p className="font-nunito text-brand font-normal text-lg ">{
          isEdit ? "" : 'Create your account to get exclusive Jonah privileges'}</p>
      </div>

      {/* Personal Information */}
      <section aria-labelledby="pi" className="flex flex-col gap-4">
        <h2 id="pi" className="text-lg font-medium flex gap-2 items-center font-nunito">
          <TbUserFilled />
          Personal Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="firstName">
              First Name*
            </label>
            <input
              id="firstName"
              name="firstName"
              className={inputBase}
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.firstName}
            />
            {touched.firstName && errors.firstName && <p className={helpCls}>{errors.firstName}</p>}
          </div>

          <div>
            <label className={labelCls} htmlFor="lastName">
              Last Name (optional)
            </label>
            <input
              id="lastName"
              name="lastName"
              className={inputBase}
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.lastName}
            />
            {touched.lastName && errors.lastName && <p className={helpCls}>{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label className={labelCls} htmlFor="phone">
            Phone Number*
          </label>
          <div className="flex">
            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-700">
              +91
            </span>
            <input
              id="phone"
              name="phone"
              inputMode="numeric"
              pattern="\d*"
              maxLength={10}
              className={`${inputBase} rounded-l-none`}
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
              disabled={true}
            />
          </div>
          {touched.phone && errors.phone && <p className={helpCls}>{errors.phone}</p>}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="email">
              Email Address (optional)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputBase}
              placeholder="Enter your Email Address"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
            />
            {touched.email && errors.email && <p className={helpCls}>{errors.email}</p>}
          </div>


          <div>
            <label className={labelCls} htmlFor="gender">
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                name="gender"
                className={`${inputBase} appearance-none`}
                value={form.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
                <option value="PREFER_NOT_TO_SAY" >Prefer not to say</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <IoChevronDownOutline />
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className={labelCls}>User Role*</label>
          <div className="flex gap-6">
            <RadioButton
              name="role"
              value="BUYER"
              checked={form.role === "BUYER"}
              label="Buyer"
              onChange={(val) => handleChange({ target: { name: "role", value: val } } as any)}
              onBlur={() => handleBlur({ target: { name: "role" } } as any)}
              disabled={isEdit}
            />
            <RadioButton
              name="role"
              value="SELLER"
              checked={form.role === "SELLER"}
              label="Seller"
              onChange={(val) => handleChange({ target: { name: "role", value: val } } as any)}
              onBlur={() => handleBlur({ target: { name: "role" } } as any)}
              disabled={isEdit}
            />
          </div>
          {touched.role && errors.role && <p className={helpCls}>{errors.role}</p>}
        </div>

      </section>

      {/* Address */}
      <section aria-labelledby="addr" className="flex flex-col gap-4">
        <h2 id="addr" className="text-lg font-medium flex gap-2 items-center font-nunito ">
          <IoLocationSharp />
          Address
        </h2>

        {/* Address line is now optional and hidden from the UI.
            We keep it in the form state/payload for backward compatibility,
            but do not show or validate it as a required field. */}
        {/*
        <div>
          <label className={labelCls} htmlFor="addressLine">
            House Number / Building Name/ Area / Colony*
          </label>
          <input
            id="addressLine"
            name="addressLine"
            className={inputBase}
            placeholder="Enter Address"
            value={form.addressLine}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.addressLine}
          />
          {touched.addressLine && errors.addressLine && <p className={helpCls}>{errors.addressLine}</p>}
        </div>
        */}

        <div className="grid gap-4 md:grid-cols-2">
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
        </div>

        <div>
          <label className={labelCls} htmlFor="pin">
            Pin Code*
          </label>
          <input
            id="pin"
            name="pin"
            inputMode="numeric"
            pattern="\d*"
            maxLength={6}
            className={inputBase}
            placeholder="PIN Code"
            value={form.pin}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.pin}
          />
          {touched.pin && errors.pin && <p className={helpCls}>{errors.pin}</p>}
        </div>
      </section>

      <div>
        <Button
          type="submit"
          variant="brand-solid"
          disabled={!isValid || submitting}
          aria-busy={submitting}
          className=" w-full disabled:opacity-60"
        >
          {submitting ? "submitting..." : "Submit Details"}
        </Button>
      </div>
    </form>
  )
}
