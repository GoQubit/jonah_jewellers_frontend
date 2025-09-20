import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "brand-solid" | "brand-outline" | "outline" | "secondary" | "ghost" | "link"
  size?: "sm" | "default" | "lg"
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", children, ...props }, ref) => {
    // Base styles
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 font-besley  disabled:cursor-not-allowed"

    // Variant styles
    const variantStyles = {
      default: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500",
      'brand-solid': "bg-brand text-white hover:bg-[#e6981a]",
      'brand-outline': "border border-brand bg-white text-brand hover:bg-brandLight hover:text-white ",
      outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-500",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
      ghost: "text-slate-900 hover:bg-slate-100 focus:ring-slate-500",
      link: "text-blue-600 underline-offset-4 hover:underline focus:ring-blue-500",
    }

    // Size styles
    const sizeStyles = {
      sm: "py-3 px-6 text-xs",
      default: "py-4 px-6",
      lg: "py-6 px-6",
    }

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button }
