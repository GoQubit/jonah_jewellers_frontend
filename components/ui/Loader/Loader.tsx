import { cn } from "@/utils/cn"

interface LoaderProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "secondary" | "accent" | "muted"
  speed?: "slow" | "normal" | "fast"
  text?: string
  showText?: boolean
}

export function Loader({
  className,
  size = "md",
  color = "primary",
  speed = "normal",
  text = "Loading...",
  showText = true,
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  }

  const colorClasses = {
    primary: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    accent: "border-accent border-t-transparent",
    muted: "border-muted-foreground border-t-transparent",
  }

  const speedClasses = {
    slow: "animate-spin [animation-duration:2s]",
    normal: "animate-spin",
    fast: "animate-spin [animation-duration:0.5s]",
  }

  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <div className="flex flex-col items-center gap-3">
        <div className={cn("rounded-full border-2", sizeClasses[size], colorClasses[color], speedClasses[speed])} />
        {showText && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
    </div>
  )
}
