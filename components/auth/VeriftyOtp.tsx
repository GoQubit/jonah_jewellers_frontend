"use client"
import React from 'react'
import Toast from '../Toast/Toast'
import { Button } from '../ui/buttons/Button'
import OtpInput from './OtpInput'
import { sendOtpApi, verifyOtpApi } from '@/lib/api/auth/authApis'
import { useRouter } from 'next/navigation'

const VerifyOTP = ({ nextStep, backStep }: { nextStep: Function, backStep: Function }) => {
  const [verifying, setVerifying] = React.useState(false)
  const [otp, setOtp] = React.useState("")
  const [countdown, setCountdown] = React.useState(0)
  const storedPhonenumber = localStorage.getItem("phonenumber");
  const router = useRouter()

  const onResend = async () => {
    if (countdown > 0) return
    const res = await sendOtpApi({ mobileNumber: storedPhonenumber })
    if (res.status === 200) {
      Toast.success(`OTP resent`)
      startTimer()
    }
  }

  const onVerifyOTP = async () => {
    try {
      if (otp.length !== 6) {
        Toast.error(`Invalid code`)
        return
      }
      setVerifying(true)
      const payload = {
        mobileNumber: storedPhonenumber,
        otp: otp
      }
      const res = await verifyOtpApi(payload)
      console.log("res", res);
      if (res.status === 200) {
        Toast.success(res.data.message)
        const token = res.data.tokens.access.token // authToken
        localStorage.setItem("authToken", token);
        if (res.data.isNewUser) {
          router.push('/profile')
        } else {
          router.push('/')
        }
        // nextStep()
      }
    } catch (error) {
      console.error(error)
      Toast.error(`Incorrect OTP`)
    } finally {
      setVerifying(false)
    }
  }


  const startTimer = () => {
    setCountdown(30)
  }

  const editNumber = () => {
    backStep()
    setOtp("")
  }

  return (
    <div className="wrapper space-y-6 py-10">
      <div className='max-w-[450px] mx-auto flex flex-col gap-8 justify-center items-center '>
        <div className=" flex flex-col text-center gap-2 ">
          <h2 className="text-3xl font-medium ">Verify Your Phone Number</h2>
          <p className="text-base font-nunito text-brand text-muted-foreground">
            We've sent a 6-digit verification code to +917526******.{" "}
            <button type="button" onClick={editNumber} className="text-blue-600 underline underline-offset-2">
              Edit number
            </button>
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          <OtpInput value={otp} onChange={setOtp} />
          <button
            type="button"
            onClick={onResend}
            disabled={countdown > 0}
            className=" text-right text-sm text-brand underline underline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer  "
            aria-disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
          </button>
        </div>

        <div className="w-full flex items-center justify-between">
          <Button
            variant='brand-solid'
            onClick={onVerifyOTP}
            disabled={otp.length !== 6 || verifying}
            className="!w-[350px] mx-auto"
          >
            {verifying ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP