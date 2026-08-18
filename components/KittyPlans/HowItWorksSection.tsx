import { FaHome, FaCalendarCheck, FaGem } from "react-icons/fa"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <FaHome className="text-2xl text-white" />,
      title: "You Pay for 11 Months:",
      description: "Contribute a fixed amount of your choice every month.",
      width: 'max-w-[450px]'
    },
    {
      icon: <FaCalendarCheck className="text-2xl text-white" />,
      title: "We Pay the 12th Month:",
      description: "As a token of appreciation, we contribute the 12th installment for you.",
      width: 'max-w-[550px]'
    },
    {
      icon: <FaGem className="text-2xl text-white" />,
      title: "Get the Full Value to Purchase Jewellery:",
      description:
        "After 12 months, redeem the total amount (your 11 months + our 1 month) towards purchasing your favorite gold, diamond, or silver jewellery.",
      width: 'max-w-[650px]'
    },
  ]

  return (
    <section
      className="px-6 py-16  bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bannerImgs/kitty-how-work-banner.png')" }}
    >
      <div className="wrapper">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 font-besley">Three simple steps to start your Kitty Investment Journey</p>
        </div>

        <div className="space-y-8 flex flex-col items-center">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-start gap-6 bg-white rounded-lg p-6 shadow-lg ${step.width} `}>
              <div className="bg-brand w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div className="flex-1 text-lg">
                <h3 className="font-medium font-nunito text-brand mb-2">{step.title}</h3>
                <p className="text-[#666666]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
