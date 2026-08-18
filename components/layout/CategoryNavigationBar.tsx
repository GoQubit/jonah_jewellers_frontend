"use client"
import React, { useEffect, useRef, useState } from 'react'
import { resetFilters, setCategory, setOccasion, setShopFor } from '@/redux/Features/filterSlice/filterSlice';
import { usePathname, useRouter } from 'next/navigation';
import { AiFillGold } from 'react-icons/ai';
import { FaRing } from 'react-icons/fa';
import { GiEmeraldNecklace } from 'react-icons/gi';
import { IoDiamondOutline } from 'react-icons/io5';
import { LuChevronRight } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import Link from "next/link";

const CategoryNavigationBar = () => {
  
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(true);

  const navRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch()
  const router = useRouter()

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
    router.push(`/shop/jewellery?category=${category}`);
  };

  const handleOccasionClick = (occasion: string) => {
    dispatch(setOccasion(occasion));
    router.push(`/shop/jewellery?occasion=${occasion}`);
  };

  const handleGenderClick = (gender: string) => {
    dispatch(setShopFor(gender));
    router.push(`/shop/jewellery?shop_for=${gender}`);
  };

  const handleScrollRight = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: 300, behavior: "smooth" });

      setTimeout(() => {
        const { scrollLeft, clientWidth, scrollWidth } = navRef.current!;
        setShowScrollLeft(scrollLeft > 0);
        setShowScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
      }, 400);
    }
  };

  const handleScrollLeft = () => {
    if (navRef.current) {
      navRef.current.scrollBy({ left: -300, behavior: "smooth" });

      setTimeout(() => {
        const { scrollLeft, clientWidth, scrollWidth } = navRef.current!;
        setShowScrollLeft(scrollLeft > 0);
        setShowScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
      }, 400);
    }
  };


  useEffect(() => {
    // Initial check when component mounts
    if (navRef.current) {
      const { scrollWidth, clientWidth } = navRef.current;
      setShowScrollRight(scrollWidth > clientWidth);
    }
  }, []);


  return (
    <div className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 relative">
      <div className="w-full mx-auto px-4 py-3">
        <nav className="relative">
          {showScrollLeft && (
            <button
              onClick={handleScrollLeft}
              className="absolute top-0 left-0 h-full w-10 z-10 flex items-center justify-start bg-gradient-to-r from-yellow-600 to-transparent md:hidden"
            >
              <LuChevronRight className="text-white text-xl rotate-180" />
            </button>
          )}
          <div
            ref={navRef}
            className="flex items-center justify-start md:justify-center space-x-8 font-nunito text-base overflow-x-auto whitespace-nowrap scrollbar-hide relative" id="nav-scroll">
            <Link
              href={"/shop/jewellery"}
              onClick={() => {
                dispatch(resetFilters());
              }}
              className="flex items-center gap-1 text-white hover:text-yellow-200"
            >
              <GiEmeraldNecklace />
              <span>All Jewellery</span>
            </Link>

            <div
              onClick={() => handleCategoryClick("GOLD")}
              className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer"
            >
              <AiFillGold />
              <span>Gold</span>
            </div>

            <div
              onClick={() => handleCategoryClick("DIAMOND")}
              className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer"
            >
              <IoDiamondOutline />
              <span>Diamond</span>
            </div>

            <div
              onClick={() => handleCategoryClick("SILVER")}
              className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer"
            >
              <FaRing />
              <span>Silver</span>
            </div>

            <div
              onClick={() => handleOccasionClick("wedding")}
              className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer"
            >
              <span>Wedding</span>
            </div>

            <div
              onClick={() => handleGenderClick("MALE")}
              className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer"
            >
              <span>Men's Special</span>
            </div>

            <div
              onClick={() => router.push("/kitty-plan")}
              className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer"
            >
              <span>11+1 Monthly Plans</span>
            </div>
          </div>

          {/* Right Scroll Button */}
          {showScrollRight && (
            <button
              onClick={handleScrollRight}
              className="absolute top-0 right-0 h-full w-10 z-10 flex items-center justify-end bg-gradient-to-l from-yellow-700 to-transparent md:hidden"
            >
              <LuChevronRight className="text-white text-xl" />
            </button>
          )}
        </nav>
      </div>
    </div>
  )
}

export default CategoryNavigationBar