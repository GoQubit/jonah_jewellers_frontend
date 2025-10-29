"use client"
import { FiShoppingCart } from "react-icons/fi"
import { Badge } from "../ui/Badge"
import { Button } from "../ui/buttons/Button"
import { Card } from "../ui/Card"
import { Progress } from "../ui/ProgessBar"
import { RiWallet3Line } from "react-icons/ri"
import { InvestmentPlan } from "./InvestmentPlansSection"
import { useRouter } from "next/navigation"

interface KittyInvestmentPlanCardProps {
  plan: InvestmentPlan
}

export function KittyInvestmentPlanCard({ plan }: KittyInvestmentPlanCardProps) {
  const progressPercentage = (plan.noOfInstallmentsDone / plan.planDuration) * 100
  const formatCurrency = (amount: number) => `₹ ${amount.toLocaleString()}`
  const router = useRouter()


  const payNowHandler = () => {
    router.push(`/payment?planCategory=kitty&kittyId=${plan.id}&plan=${plan.planDuration}&monthlyAmount=${plan.monthlyInstallment}&duration=${plan.planDuration}&investmentGoal=${plan.title}&planCategory='kitty'`)
  }

  return (
    <Card className=" flex flex-col p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-lg text-gray-900 font-nunito">{plan.title}</h3>
        </div>
        <Badge
          variant={plan.status === "COMPLETED" ? "default" : "secondary"}
          className={plan.status === "COMPLETED" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}
        >
          {plan.status === "COMPLETED" ? "Completed" : "Active"}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">
            {plan.noOfInstallmentsDone}/{plan.planDuration} Months
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="flex flex-col gap-2 text-sm text-[#6A6A6A] ">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Monthly Amount</p>
          <p className="font-semibold">{formatCurrency(plan.monthlyInstallment)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Current Balance</p>
          <p className="font-semibold">{formatCurrency(plan.amountPaid)}</p>
        </div>
        {
          plan.bonus &&
          <div className="flex justify-between items-center text-green-500">
            <p className="">Bonus</p>
            <p className="font-semibold">{plan.bonus}</p>
          </div>
        }
        <div className="flex justify-between items-center">
          <p className="text-gray-600">Next Payment</p>
          <p className="font-semibold"> 1-10-2025 </p>
        </div>
        {plan.totalAmountToBePaid && (
          <div className="flex justify-between items-center border-t pt-2 mt-2 font-semibold text-base">
            <p className="text-gray-600">Total Value</p>
            <p className="font-semibold">{formatCurrency(plan.totalAmountToBePaid)}</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-2 w-full self-center ">
        {plan.status === "COMPLETED" ? (
          <Button size="sm"
            variant="brand-solid"
            className="flex-1 "
            onClick={() => router.push('/show/jewellery')}
          >
            <FiShoppingCart className="h-4 w-4 mr-2" />
            Shop Now
          </Button>
        ) : (
          <Button size="sm" className="flex-1 bg-[#1967FE] hover:bg-[#115cf3] "
            onClick={payNowHandler}
          >
            <RiWallet3Line className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
        )}
      </div>
    </Card>
  )
}
