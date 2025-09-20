import CategorySection from '@/components/homePage/CategorySection';
import FooterBannerSection from '@/components/homePage/FooterBannerSection';
import JewellersWorldSection from '@/components/homePage/JewellersWorldSection';
import JewelleryAssuranceSection from '@/components/homePage/JewelleryAssuranceSection';
import JewelleryCollectionSection from '@/components/homePage/JewelleryCollectionSection';
import TestimonialCarousel from '@/components/homePage/TestimonialCarousel';
import WeddingChapterSection from '@/components/homePage/WeddingChapterSection';
import HomeBannerSlider from '@/components/Slider/HomeBannerSlider';
import Link from 'next/link';

export default function Home() {
  // Sample products data - replace with your actual data fetching


  return (
    <div className='flex flex-col gap-[80px]'>
      <HomeBannerSlider />

      <JewelleryCollectionSection />

      <CategorySection />

      <JewellersWorldSection />

      <WeddingChapterSection />

      <TestimonialCarousel />

      <FooterBannerSection />

      <JewelleryAssuranceSection />

    </div>
  );
}