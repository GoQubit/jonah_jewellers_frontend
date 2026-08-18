import { FeatureCard } from "../InvestmentPage/FeatureCard"
import { AiFillGold } from "react-icons/ai"
import { GiLockedChest, GiDiamondRing } from "react-icons/gi"
import { BsFillShieldLockFill } from "react-icons/bs"
import { MdStorefront } from "react-icons/md"
import { FaArrowTrendUp } from "react-icons/fa6"
import { PiCalendarHeartFill } from "react-icons/pi"
import { PageHeader } from "../ui/PageHeader"

const features = [
  {
    icon: AiFillGold,
    title: "100% Pure Gold",
    subtitle: "24K Certified",
    description: "Every gram you buy is real, certified 24K gold — not a discount coupon or points.",
    bgColor: "bg-[#B8860B]",
    iconColor: "text-white",
  },
  {
    icon: GiLockedChest,
    title: "Safely Stored",
    subtitle: "In Your Wallet",
    description: "Your gold is stored safely in your Jonah Jewels wallet until you're ready to collect it.",
    bgColor: "bg-[#B8860B]",
    iconColor: "text-white",
  },
  {
    icon: PiCalendarHeartFill,
    title: "Ready for Occasions",
    subtitle: "Weddings & Festivals",
    description: "Buy a little each month and have it ready for weddings, festivals, or any big day.",
    bgColor: "bg-[#B8860B]",
    iconColor: "text-white",
  },
  {
    icon: MdStorefront,
    title: "Collect at Our Store",
    subtitle: "Anytime",
    description: "Walk into any Jonah Jewels store and redeem your gold for jewellery whenever you like.",
    bgColor: "bg-[#B8860B]",
    iconColor: "text-white",
  },
  {
    icon: BsFillShieldLockFill,
    title: "100% Safe",
    subtitle: "Secure & Transparent",
    description: "Every purchase is verified and tracked in your wallet, with a full transaction history.",
    bgColor: "bg-[#B8860B]",
    iconColor: "text-white",
  },
  {
    icon: FaArrowTrendUp,
    title: "Today's Rate",
    subtitle: "Locked In",
    description: "Buy at today's live gold rate and lock in your grams before prices rise.",
    bgColor: "bg-[#B8860B]",
    iconColor: "text-white",
  },
]

export function WhyBuyGoldSection() {
  return (
    <section className="pb-20 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Why Buy Gold with Jonah Jewels?"
          subtitle="Simple, transparent, and always ready when you need it"
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
