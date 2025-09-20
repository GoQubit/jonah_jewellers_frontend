import { HeroSection } from "@/components/InvestmentPage/HeroSection";
import { InvestmentForm } from "@/components/InvestmentPage/InvestmentForm";
import { WhyInvestSection } from "@/components/InvestmentPage/WhyInvestSection";


export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <HeroSection />
      <InvestmentForm />
      <WhyInvestSection />
    </main>
  )
}
