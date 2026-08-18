"use client"
import { Button } from "../ui/buttons/Button"

export function HeroSection() {
  const handleInvestClick = () => {
    // Scroll to investment form
    const investmentForm = document.getElementById("investment-form")
    investmentForm?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className=" bg-[#FDFBE8] py-10 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl text-gray-800 mb-4 text-balance font-medium">
          Invest in Gold & Become a
          <br />
          <span className="text-brand font-besley">JONAH SELLER</span>
        </h1>
        <p className="text-base md:text-lg text-[#898989] mb-8 max-w-3xl mx-auto font-nunito font-light  ">
          Invest in Jonah Jewels' business starting at just ₹10,000. We use your investment to craft and
          sell gold jewellery — and you earn your share of the profit every time it sells. Transparent,
          trackable, and always backed by real gold.
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
