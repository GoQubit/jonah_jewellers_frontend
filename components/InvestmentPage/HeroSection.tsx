"use client"
import { Button } from "../ui/buttons/Button"

export function HeroSection() {
  const handleInvestClick = () => {
    // Scroll to investment form
    const investmentForm = document.getElementById("investment-form")
    investmentForm?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className=" bg-[#FDFBE8] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-4xl text-gray-800 mb-4 text-balance font-medium leading-6 ">
          Invest in Gold & Become a
          <br />
          <span className="text-brand font-besley">JONAH SELLER</span>
        </h1>
        <p className="text-base md:text-lg text-[#898989] mb-8 max-w-3xl mx-auto font-nunito font-light  ">
          Start your gold investment journey with just ₹10,000. Enjoy fixed profits, secure investments, and the
          flexibility to withdraw cash or purchase gold at wholesale rates.
        </p>
        <Button
          variant="brand-solid"
          onClick={handleInvestClick}
          className="px-12 py-3 text-lg shadow-lg hover:shadow-xl "
        >
          Invest Now
        </Button>
      </div>
    </section>
  )
}
