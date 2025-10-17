"use client"
import LoginPage from "@/components/auth/LoginPage";
import CreateAccountForm from "@/components/userProfile/UserEditProfile";
import VerifyOTP from "@/components/auth/VeriftyOtp";
import { Button } from "@/components/ui/buttons/Button";
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

      {/* {step === "done" && (
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-semibold">You’re in!</h3>
          <p className="text-muted-foreground">Login successful. You now have access to Jonah privileges.</p>
          <Button className="mt-2 rounded-lg bg-amber-300 text-black hover:bg-amber-400">Continue</Button>
        </div>
      )} */}
    </main>
  )
}
