"use client"

import * as React from "react"

type OTPInputProps = {
  value: string
  onChange: (val: string) => void
  length?: number
  disabled?: boolean
}

export default function OtpInput({ value, onChange, length = 6, disabled }: OTPInputProps) {
  const inputsRef: any = React.useRef<Array<HTMLInputElement | null>>([])

  const values = Array.from({ length }, (_, i) => value[i] ?? "")

  function setChar(index: number, char: string) {
    const next = value.split("")
    next[index] = char
    onChange(next.join("").slice(0, length))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const raw = e.target.value.replace(/\D/g, "")
    if (raw.length === 0) {
      setChar(i, "")
      return
    }
    setChar(i, raw[0])
    if (raw && i < length - 1) {
      inputsRef.current[i + 1]?.focus()
      inputsRef.current[i + 1]?.select()
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

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length)
    if (!pasted) return
    onChange(pasted.padEnd(length, ""))
    const lastIndex = Math.min(pasted.length, length) - 1
    inputsRef.current[lastIndex]?.focus()
  }

  return (
    <div className="flex items-center gap-4">
      {values.map((char, i) => (
        <input
          key={i}
          ref={(el: any) => (inputsRef.current[i] = el)}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={char}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          disabled={disabled}
          className="h-12 w-12 rounded-md border focus:border-brand border-input bg-background text-center font-nunito text-lg font-normal text-foreground outline-none transition disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
