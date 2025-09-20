"use client"
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function HomeBannerSlider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // navigation={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={'/images/bannerImgs/home_banner_1.png'}
            alt='Home Banner 1'
            className="carousel-image"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={'/images/bannerImgs/home_banner_1.png'}
            alt='Home Banner 1'
            className="carousel-image"
          />
        </SwiperSlide>

      </Swiper>
    </>
  );
}
