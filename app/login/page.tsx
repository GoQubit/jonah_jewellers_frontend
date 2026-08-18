"use client"
import LoginPage from "@/components/auth/LoginPage";
import CreateAccountForm from "@/components/userProfile/UserEditProfile";
import VerifyOTP from "@/components/auth/VeriftyOtp";
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState<"phone" | "otp" | "user-details" | "done">("phone")

  return (
    <main className="wrapper py-10 md:py-16">
      {
        step === 'phone' &&
        <LoginPage
          nextStep={() => setStep('otp')}
        />
      }
      {
        step === 'otp' &&
        <VerifyOTP
          nextStep={() => setStep('user-details')}
          backStep={() => setStep('phone')}
        />
      }
      {
        step === "user-details" && (
          <CreateAccountForm
          />
        )
      }

    </main>
  )
}
