"use client"

import * as React from "react"

type OTPInputProps = {
  value: string
  onChange: (val: string) => void
  length?: number
  disabled?: boolean
  onComplete?: (val: string) => void
}

export default function OtpInput({ value, onChange, length = 6, disabled, onComplete }: OTPInputProps) {
  const inputsRef: any = React.useRef<Array<HTMLInputElement | null>>([])

  const values = Array.from({ length }, (_, i) => value[i] ?? "")

  function fillFrom(index: number, digits: string) {
    const next = value.split("")
    for (let offset = 0; offset < digits.length && index + offset < length; offset++) {
      next[index + offset] = digits[offset]
    }
    const filled = next.join("").slice(0, length)
    onChange(filled)
    const lastIndex = Math.min(index + digits.length, length) - 1
    inputsRef.current[lastIndex]?.focus()
    if (filled.length === length && !/\D/.test(filled)) {
      inputsRef.current[lastIndex]?.blur()
      onComplete?.(filled)
    }
  }

  function setChar(index: number, char: string) {
    const next = value.split("")
    next[index] = char
    const joined = next.join("").slice(0, length)
    onChange(joined)
    return joined
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const raw = e.target.value.replace(/\D/g, "")
    if (raw.length === 0) {
      setChar(i, "")
      return
    }
    // Browser/keyboard autofill (e.g. iOS "from Messages" suggestion) can drop
    // the whole code into whichever single box is focused instead of firing a
    // paste event - distribute it across the remaining boxes like a paste.
    if (raw.length > 1) {
      fillFrom(i, raw)
      return
    }
    const joined = setChar(i, raw[0])
    if (i < length - 1) {
      inputsRef.current[i + 1]?.focus()
      inputsRef.current[i + 1]?.select()
    } else if (joined.length === length && !/\D/.test(joined)) {
      inputsRef.current[i]?.blur()
      onComplete?.(joined)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, i: number) {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
      setChar(i - 1, "")
    }
    if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus()
    if (e.key === "ArrowRight" && i < length - 1) inputsRef.current[i + 1]?.focus()
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, i: number) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "")
    if (!pasted) return
    fillFrom(i, pasted)
  }

  // WebOTP API: for people visiting the actual website in the standalone
  // Chrome-for-Android browser (NOT inside the Capacitor app - Android's
  // embedded WebView doesn't implement OTPCredential at all), this lets Chrome
  // auto-fill the code the instant a verification SMS arrives. It only fires
  // for SMS whose last line matches "@<domain> #<code>", so it silently
  // no-ops if the backend's SMS template doesn't include that line.
  React.useEffect(() => {
    if (disabled || value.length === length) return
    if (typeof window === "undefined" || !("OTPCredential" in window)) return

    const controller = new AbortController()
    ;(navigator as any).credentials
      .get({ otp: { transport: ["sms"] }, signal: controller.signal })
      .then((otp: any) => {
        const digits = (otp?.code || "").replace(/\D/g, "").slice(0, length)
        if (digits) fillFrom(0, digits)
      })
      .catch(() => { })

    return () => controller.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  // Native Android SMS Retriever: this is what actually auto-fills the code
  // inside the Capacitor app's WebView, where WebOTP above is unsupported.
  // Silent, no SMS permission needed - but only fires if the backend's SMS
  // text starts with "<#>" and ends with this app's signature hash (get it
  // via CapacitorSmsRetriever.getHashCode() from a real device build; the
  // hash differs between debug and release signing keys).
  React.useEffect(() => {
    if (disabled || value.length === length) return

    let cancelled = false
    let retriever: typeof import("@shaher/capacitor-sms-retriever").CapacitorSmsRetriever | null = null

    ;(async () => {
      try {
        const { Capacitor } = await import("@capacitor/core")
        if (cancelled || Capacitor.getPlatform() !== "android") return

        const { CapacitorSmsRetriever } = await import("@shaher/capacitor-sms-retriever")
        retriever = CapacitorSmsRetriever
        const result = await CapacitorSmsRetriever.startListening()
        if (cancelled) return
        const digits = (result?.body || "").replace(/\D/g, "").slice(0, length)
        if (digits) fillFrom(0, digits)
      } catch {
        /* not on Android, plugin unavailable, or no matching SMS - typing/pasting still works */
      }
    })()

    return () => {
      cancelled = true
      retriever?.stopListening().catch(() => { })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  return (
    <div className="flex items-center gap-4">
      {values.map((char, i) => (
        <input
          key={i}
          ref={(el: any) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          // Not maxLength={1}: the OS keyboard's SMS-suggestion chip commits
          // the whole code into whichever box is focused, and a native
          // maxLength on that box would truncate it to one char *before* our
          // onChange ever sees it. We cap it in JS instead (see handleChange).
          maxLength={length}
          value={char}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={(e) => handlePaste(e, i)}
          disabled={disabled}
          className="h-12 w-12 rounded-md border focus:border-brand border-input bg-background text-center font-nunito text-lg font-normal text-foreground outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
