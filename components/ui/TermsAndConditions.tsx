"use client"

import Checkbox from "./Checkbox"

interface TermsAndConditionsProps {
  termsAccepted: boolean
  setTermsAccepted: (accepted: boolean) => void
}

export function TermsAndConditions({ termsAccepted, setTermsAccepted }: TermsAndConditionsProps) {
  return (
    <div className="mt-8 flex items-start gap-3">
      <div className="flex items-center h-5">
        <Checkbox
          id="wallet-cash"
          checked={termsAccepted}
          onCheckedChange={(checked) => {
            setTermsAccepted(checked === true)
          }}
        />
      </div>

      <div className="text-sm">
        {/* <label htmlFor="terms" className="font-medium text-gray-900">
          Terms and Conditions
        </label> */}
        <p className="text-gray-600">
          I agree to the{" "}
          <a href="/terms-and-conditions" target="_blank" className="text-blue-600 hover:underline">
            Terms & Conditions
          </a> and {" "} 
           <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" >Privacy Policy</a>
          . I understand the payment schedule, benefits, and cancellation policy.
        </p>
      </div>
    </div>
  )
}
