import Link from "next/link"
import { BiSolidOffer } from "react-icons/bi"
import { FaCircle, FaClock, FaCrown, FaCheck } from "react-icons/fa"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

export default function PlanSelection() {
  const plans = [
    {
      id: "quick",
      name: "3 Month Quick Plan",
      subtitle: "Best value for short-term savings",
      duration: "3 months",
      icon: <FaCircle className="text-4xl text-orange-400" />,
      discount: "20% OFF",
      discountText: "You Get 20% OFF on Making Charges",
      features: ["Pay for 3 months and get 20% off on making charges", "Quick Completion"],
      buttonText: "Start Kitty",
      link: "/start-kitty?plan=3-month",
      popular: false,
    },
    {
      id: "balanced",
      name: "6 Month Balanced Plan",
      subtitle: "Best value for medium-term savings",
      duration: "6 months",
      icon: <FaClock className="text-4xl text-green-400" />,
      discount: "30% OFF",
      discountText: "You Get 30% OFF on Making Charges",
      features: ["Pay for 6 months and get 30% off on making charges", "Balanced investment"],
      buttonText: "Start Kitty",
      link: "/start-kitty?plan=6-month",
      popular: false,
    },
    {
      id: "premium",
      name: "12-Month Premium Plan",
      subtitle: "Best value with maximum benefits",
      duration: "11 months",
      icon: <FaCrown className="text-4xl text-yellow-500" />,
      discount: "12th month installment on us - 100% benefits",
      discountText: "12th month installment on us – Jonah Jewellers.",
      features: ["Pay for only 11 months and get 12th month installment completely FREE", "Maximum savings"],
      buttonText: "Start Kitty",
      link: "/start-kitty?plan=12-month",
      popular: true,
    },
  ]

  return (
    <section className="px-6 py-16 bg-white">
      <div className="wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-800 mb-4">Choose Your Plan</h2>
          <p className="text-gray-600 font-besley">Select the plan duration and monthly investment amount</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white border-2 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow ${plan.popular ? "border-yellow-400" : "border-gray-200"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6 font-nunito">
                <div className="mb-4 text-center flex justify-center items-center ">{plan.icon}</div>
                <h3 className="text-lg font-nunito text-gray-800">{plan.name}</h3>
                <p className="text-[#989898] text-base mb-4">{plan.subtitle}</p>
                <div className=" text-base flex items-center justify-between gap-2 bg-[#F9FAFB] px-3 py-1 rounded-md text-[#989898] ">
                  You Pay:
                  <span className={` font-semibold ${plan.popular ? "text-brand" : "text-green-600"}`}>
                    {plan.duration}
                  </span>
                </div>
              </div>

              <div className={`text-center p-3 rounded-lg mb-4 ${plan.popular ? "bg-yellow-50" : "bg-green-50"}`}>
                <p className={` flex gap-2 items-center text-start ${plan.popular ? "text-brand" : "text-green-600"}`}>
                  {plan.popular ? <FaCrown size={18} /> : <BiSolidOffer size={18} />}
                  {plan.discountText}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <IoMdCheckmarkCircleOutline className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.link} >
                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium font-besley transition-colors ${plan.popular
                    ? "bg-brand hover:bg-brand text-white"
                    : " border-brand border hover:bg-brand hover:text-white text-brand"
                    }`}
                >
                  {plan.buttonText}
                </button>
              </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
