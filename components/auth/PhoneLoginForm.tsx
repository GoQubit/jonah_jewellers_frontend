"use client"
import * as React from "react"
import { Input } from "../ui/Input"
import Checkbox from "../ui/Checkbox"
import { Button } from "../ui/buttons/Button"
import Toast from "../Toast/Toast"
import Link from "next/link"
import { sendOtpApi } from "@/lib/api/auth/authApis"


interface FormType {
  phone: string;
  accept: boolean;
}

export default function PhoneLoginForm({ nextStep }: { nextStep: Function }) {
  const [sending, setSending] = React.useState(false)

  const [form, setForm] = React.useState<FormType>({
    phone: '',
    accept: false,
  })

  const field = {
    value: form.phone,
    onChange: (val: string | boolean) => {
      setForm((prev) => ({
        ...prev,
        phone: typeof val === 'string' ? val : prev.phone,
        accept: typeof val === 'boolean' ? val : prev.accept,
      }))
    },
  }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSending(true)
      const res = await sendOtpApi({ mobileNumber: form.phone })
      if (res.status === 200) {
        localStorage.setItem("phonenumber", form.phone);
        Toast.success(res.data.message)
        nextStep()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSending(false)
    }
  }


  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number*
          </label>
          <div className=" w-full flex items-stretch gap-3">
            <div
              aria-hidden="true"
              className="flex w-[60px] shrink-0 items-center justify-center rounded-md border bg-muted text-sm text-foreground text-[#CACACA]"
            >
              +91
            </div>

            <Input
              id="phone"
              placeholder="Enter your phone number"
              inputMode="numeric"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="!p-4 w-full placeholder:text-[#CACACA] "
            />

          </div>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="accept"
            checked={form.accept}
            onCheckedChange={(v) => field.onChange(Boolean(v))}

          />

          <p className="flex text-sm font-nunito whitespace-nowrap flex-wrap gap-1 text-[#727272]  ">I accept that I have read & understood{"  "}
            <a href="#" className="text-blue-600 underline underline-offset-2">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 underline underline-offset-2">
              Terms & Conditions.
            </a>
          </p>
        </div>

        <Button
          type="submit"
          variant="brand-solid"
          disabled={!form.phone || form.phone.length !== 10 || !form.accept || sending}
          className=" w-full disabled:opacity-60"
        >
          {sending ? "Sending..." : "Send OTP"}
        </Button>

        {/* <Link href='/signup' className="text-center text-sm text-muted-foreground">
          Don’t have an account?  Sign In
        </Link> */}
      </form>
    </div>
  )
}
