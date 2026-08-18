import Image from "next/image"

export default function HeroBanner() {
  return (
    <div className="">
      <img src="/images/bannerImgs/shop_page_banner_mobile.png" alt="hero mobile banner "
      className="block md:hidden"/>
      <img src="/images/bannerImgs/shop_page_banner.png" alt="hero banner "
      className="hidden md:block"/>
    </div>
  )
}
