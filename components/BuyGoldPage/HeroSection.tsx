"use client"
import { Button } from "../ui/buttons/Button"

export function BuyGoldHeroSection() {
  const handleBuyClick = () => {
    const buyGoldForm = document.getElementById("buy-gold-form")
    buyGoldForm?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="bg-[#FDFBE8] py-10 md:py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl text-gray-800 mb-4 text-balance font-medium">
          Buy Pure Gold, Anytime
          <br />
          <span className="text-[#B8860B] font-besley">Save it for the Big Day</span>
        </h1>
        <p className="text-base md:text-lg text-[#898989] mb-8 max-w-3xl mx-auto font-nunito font-light">
          Buy 24K pure gold today at today's rate and keep it safely in your Jonah Jewels wallet.
          Collect it anytime from our store — perfect for weddings, festivals, and every occasion
          worth celebrating.
        </p>
        <Button
          variant="brand-solid"
          onClick={handleBuyClick}
          className="px-12 py-3 text-lg shadow-lg hover:shadow-xl !bg-[#B8860B] hover:!bg-[#a07609]"
        >
          Buy Gold Now
        </Button>
      </div>
    </section>
  )
}
