import { FaCalendarAlt, FaGift, FaShieldAlt } from "react-icons/fa"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <FaCalendarAlt className="text-3xl text-white " />,
      title: "Start Planning",
      description: "Plan ahead for your future luxury purchases with flexible monthly investments",
    },
    {
      icon: <FaGift className="text-3xl text-white " />,
      title: "Special Rewards",
      description: "Get exclusive discounts and rewards for special occasions and celebrations",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-white " />,
      title: "Premium Benefits",
      description: "Pay 11 installments and enjoy 100% savings on your 12th month purchase",
    },
  ]

  return (
    <section className="px-6 py-16 bg-white">
      <div className="wrapper">
        <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-medium text-gray-800 mb-4">Why Choose Our Kitty Plan?</h2>
        <p className="text-gray-600 font-besley">Get more for the perfect blend of smart planning and investment rewards</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center max-w-[340px] shadow-md rounded-md bg-[#d8d8d822] p-6 ">
              <div className="bg-brand w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-white ">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
