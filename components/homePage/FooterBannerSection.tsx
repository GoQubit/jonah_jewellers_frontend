import React from 'react'

const FooterBannerSection = () => {
  return (
    <div>
      {/* Desktop banner */}
      <img
        src="/images/bannerImgs/home_bottom_banner.webp"
        alt="festival featured image"
        className="hidden md:block w-full"
      />

      {/* Mobile banner */}
      <img
        src="/images/bannerImgs/home_bottom_banner_mobile.webp"
        alt="festival featured image"
        className="block md:hidden w-full"
      />
    </div>
  )
}

export default FooterBannerSection
