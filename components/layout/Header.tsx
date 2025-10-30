"use client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillGold } from "react-icons/ai";
import { IoClose, IoDiamondOutline } from "react-icons/io5";
import { GiEmeraldNecklace } from "react-icons/gi";
import { FaRing } from "react-icons/fa";
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import SearchInput from "../ui/SearchInput";
import ProductSearch from "../productSearch/ProductSearch";
import { Sidebar } from "./Sidebar";

import { resetFilters, setCategory, setOccasion, setShopFor } from "@/redux/Features/filterSlice/filterSlice";
import { RootState } from "@/redux/store";
import { getMaterialPriceApi } from "@/lib/api/material/materialApis";
import { setMaterials } from "@/redux/Features/materialSlice/materialSlice";
import { BiRightArrow } from "react-icons/bi";
import { LuChevronRight } from "react-icons/lu";

const Header = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);
  const gold = useSelector((state: RootState) => state.materials.gold);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [cookie] = useCookies(["authToken"]);
  const isAuth = cookie.authToken;

  const navRef = useRef<HTMLDivElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showScrollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(true);


  useEffect(() => {
    (async () => {
      const res = await getMaterialPriceApi();
      if (res.status === 200) {
        dispatch(setMaterials(res.data.results));
      }
    })();
  }, [dispatch]);

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category));
    router.push(`${pathname}?category=${category}`);
  };

  const handleOccasionClick = (occasion: string) => {
    dispatch(setOccasion(occasion));
    router.push(`/shop/jewellery?occasion=${occasion}`);
  };

  const handleGenderClick = (gender: string) => {
    dispatch(setShopFor(gender));
    router.push(`/shop/jewellery?shop_for=${gender}`);
  };

  let total_item = 0;
  for (const item of items) {
    total_item += item.quantity;
  }

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
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
      {/* Top section */}
      <div className="w-full bg-white h-[110px] px-4 border-b">
        <div className="wrapper flex items-center h-full justify-between gap-4">
          {/* Logo - always visible */}
          <Link href={"/"}>
            <Image src={"/images/logo1.png"} width={75} height={24} alt="logo" />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-4 items-center justify-center">
            <ProductSearch />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Today’s Price */}
            <div className="flex text-xs  font-medium font-nunito items-center gap-2 p-1 px-2 rounded-md bg-[#ffefca] text-brand">
              {/* <span className="w-2 h-2 rounded-full bg-red-600"></span> */}
              <AiFillGold className="text-brand w-4 h-4 " />
              <span className="hidden sm:block">Today’s Price:</span>
              <span>₹ {gold?.price}/10gm</span>
            </div>

            {/* Search icon for mobile */}
            <button
              className="md:hidden p-2 rounded-full "
              onClick={() => setShowSearchBar((prev) => !prev)}
            >
              <AiOutlineSearch className="w-5 h-5 text-grayDark hover:text-brand " />
            </button>

            {/* User */}
            <div
              onClick={() => {
                if (isAuth) {
                  setIsSidebarOpen(true);
                } else {
                  router.push("/login");
                }
              }}
            >
              {
                isAuth ? (
                  <Image
                    src={
                      user?.gender?.toLowerCase() === "female"
                        ? "/images/female-avatar.webp"
                        : "/images/dummy-avatar.jpeg"
                    }
                    alt="profile-avatar"
                    width={25}
                    height={25}
                    className="bg-cover rounded-full cursor-pointer"
                  />
                ) : (
                  <HiOutlineUser className="w-5 h-5 text-grayDark hover:text-brand cursor-pointer" />
                )
              }
            </div>

            {/* Cart */}
            <Link href={"/cart"}>
              <div className="relative">
                <PiShoppingCartSimple className="w-5 h-5 text-grayDark hover:text-brand" />
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {total_item}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Searchbar for Mobile */}
      {showSearchBar && (
        <div className="absolute top-[110px] left-0 w-full bg-white shadow-md z-50 p-3 pr-0 md:hidden flex items-center">
          <ProductSearch />
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 text-grayDark hover:text-brand  "
            onClick={() => setShowSearchBar(false)}
          >
            <IoClose className="w-5 h-5 " />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
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


      {/* Sidebar */}
      {isAuth && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
    </header>
  );
};

export default Header;
