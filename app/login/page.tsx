"use client"
import LoginPage from "@/components/auth/LoginPage";
import CreateAccountForm from "@/components/userProfile/UserEditProfile";
import VerifyOTP from "@/components/auth/VeriftyOtp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useIsAuth from "@/hooks/useIsAuth";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [step, setStep] = useState<"phone" | "otp" | "user-details">("phone");
  const isAuth = useIsAuth()

  useEffect(() => {
    if (isAuth) {
      // 🔥 Already logged in → NEVER show login page
      router.replace(redirect);
    }
  }, [redirect, router]);

  return (
    <main className="wrapper py-10 md:py-16">
      {step === "phone" && (
        <LoginPage nextStep={() => setStep("otp")} />
      )}

      {step === "otp" && (
        <VerifyOTP
          nextStep={() => setStep("user-details")}
          backStep={() => setStep("phone")}
        />
      )}

      {step === "user-details" && <CreateAccountForm />}
    </main>
  );
}