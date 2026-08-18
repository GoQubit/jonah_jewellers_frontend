"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  size?: "sm" | "md" | "lg"
}

const boxSize: Record<NonNullable<CheckboxProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
}

const iconSize: Record<NonNullable<CheckboxProps["size"]>, string> = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
}

export const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size = "md", disabled, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        disabled={disabled}
        className={`
          peer shrink-0 rounded border border-input bg-background text-primary"
          ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
          data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground
          disabled:cursor-not-allowed disabled:opacity-50 ${boxSize[size]}
          className`}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="pointer-events-none flex items-center justify-center ">
          {/* Using a single check icon for both checked and indeterminate states keeps it simple and reliable */}
          <svg viewBox="0 0 24 24" aria-hidden="true" className={`${iconSize[size]} text-white `}>
            <path
              d="M20.285 6.709a1 1 0 0 0-1.414-1.418l-8.485 8.49-4.243-4.244a1 1 0 1 0-1.414 1.414l4.95 4.95a1 1 0 0 0 1.414 0l9.192-9.192Z"
              fill="currentColor"
            />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  },
)
Checkbox.displayName = "Checkbox"

export default Checkbox
