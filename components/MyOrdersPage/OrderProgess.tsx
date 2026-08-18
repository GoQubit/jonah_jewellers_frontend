import { Progress } from "../ui/ProgessBar"


interface OrderProgressProps {
  progress: number
}

export function OrderProgress({ progress }: OrderProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Order Progress</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
