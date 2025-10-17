import { FeatureCard } from "./FeatureCard"
import { AiFillGold } from "react-icons/ai";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdLockClock } from "react-icons/md";
import { PageHeader } from "../ui/PageHeader"


const features = [
  {
    icon: AiFillGold,
    title: "Investment in Gold",
    subtitle: "Secure Asset",
    description: "Your money goes directly into physical gold",
    bgColor: "bg-brand",
    iconColor: "text-white",
  },
  {
    icon: FaMoneyBillTrendUp,
    title: "Profit on Sales",
    subtitle: "Earn Returns",
    description: "Every time the gold product is sold, you receive a profit share.",
    bgColor: "bg-brand",
    iconColor: "text-white",
  },
  {
    icon: VscWorkspaceTrusted,
    title: "Trusted Model",
    subtitle: "Transparent Process",
    description: "Clear, trackable, and reliable investment plans.",
    bgColor: "bg-brand",
    iconColor: "text-white",
  },
  {
    icon: BsFillShieldLockFill,
    title: "100% Safe",
    subtitle: "Secure Investment",
    description: "Backed by physical gold",
    bgColor: "bg-brand",
    iconColor: "text-white",
  },
  {
    icon: FaArrowTrendUp,
    title: "Guaranteed",
    subtitle: "Fixed Profit",
    description: "As per our investment plans",
    bgColor: "bg-brand",
    iconColor: "text-white",
  },
  {
    icon: MdLockClock,
    title: "6 Months",
    subtitle: "Lock-in Period",
    description: "Minimum investment duration",
    bgColor: "bg-brand",
    iconColor: "text-white",
  },
]

export function WhyInvestSection() {
  return (
    <section className="pb-20 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">

        <PageHeader
          title="Why Invest in JONAH Gold?"
          subtitle="Experience the perfect blend of smart planning and premium rewards"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              subtitle={feature.subtitle}
              description={feature.description}
              bgColor={feature.bgColor}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
