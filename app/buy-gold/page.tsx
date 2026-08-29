import { BuyGoldHeroSection } from "@/components/BuyGoldPage/HeroSection";
import { BuyGoldForm } from "@/components/buyGoldDashboard/components/BuyGoldForm";
import { WhyBuyGoldSection } from "@/components/BuyGoldPage/WhyBuyGoldSection";

export default function BuyGoldPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <BuyGoldHeroSection />
      <section id="buy-gold-form" className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <BuyGoldForm />
        </div>
      </section>
      <WhyBuyGoldSection />
    </main>
  );
}
