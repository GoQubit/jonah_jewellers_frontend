"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useRouter } from "next/navigation";

// 🧩 Separate arrays for desktop and mobile banners
const desktopBanners = [
  { id: 1, img: "/images/bannerImgs/home_banner_2.webp", link: "/invest-in-gold" },
  { id: 2, img: "/images/bannerImgs/home_banner_1.webp", link: "/kitty-plan" },
  { id: 3, img: "/images/bannerImgs/home_banner_3.webp", link: "/shop/jewellery?occasion=wedding" },
  { id: 4, img: "/images/bannerImgs/home_banner_4.webp", link: "/shop/jewellery" },
];

const mobileBanners = [
  { id: 1, img: "/images/bannerImgs/home_banner_mobile_2.webp", link: "/invest-in-gold" },
  { id: 2, img: "/images/bannerImgs/home_banner_mobile_1.webp", link: "/kitty-plan" },
  { id: 3, img: "/images/bannerImgs/home_banner_mobile_3.webp", link: "/shop/jewellery?occasion=wedding" },
  { id: 4, img: "/images/bannerImgs/home_banner_mobile_4.webp", link: "/shop/jewellery" },
];

export default function HomeBannerSlider() {
  const router = useRouter();

  return (
    <div className="relative">
      {/* ✅ Desktop Slider */}
      <div className="hidden md:block">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {desktopBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div
                className="carousel-image w-full cursor-pointer"
                onClick={() => router.push(banner.link)}
              >
                <img
                  src={banner.img}
                  alt={`Home Banner ${banner.id}`}
                  className="w-full h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Mobile Slider */}
      <div className="block md:hidden">
        <Swiper
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {mobileBanners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div
                className="carousel-image w-full cursor-pointer"
                onClick={() => router.push(banner.link)}
              >
                <img
                  src={banner.img}
                  alt={`Mobile Banner ${banner.id}`}
                  className="w-full h-auto"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
