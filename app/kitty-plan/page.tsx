import React from 'react'
import BenefitsSection from '@/components/KittyPlans/BenefitsSection'
import HeroSection from '@/components/KittyPlans/HeroSection'
import HowItWorksSection from '@/components/KittyPlans/HowItWorksSection'
import PlanSelection from '@/components/KittyPlans/PlanSelection'


const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <HeroSection />
      <PlanSelection />
      <BenefitsSection />
      <HowItWorksSection />
    </div>
  )
}

export default page