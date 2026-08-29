"use client";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillGold } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { useEffect, useState } from "react";
import useIsNativePlatform from "@/hooks/useIsNativePlatform";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import ProductSearch from "../productSearch/ProductSearch";
import { Sidebar } from "./Sidebar";
import { RootState } from "@/redux/store";
import { getMaterialPriceApi } from "@/lib/api/material/materialApis";
import { setMaterials } from "@/redux/Features/materialSlice/materialSlice";
import { Avatar, AvatarFallback } from "../ui/Avatar";
import { FaHamburger } from "react-icons/fa";

const Header = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.user);
  const gold = useSelector((state: RootState) => state.materials.gold);
  const dispatch = useDispatch();
  const router = useRouter();

  const [cookie] = useCookies(["authToken"]);
  const isAuth = cookie.authToken;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isNativeApp = useIsNativePlatform();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const nameInitials = user.firstName && user.lastName ? `${user.firstName.charAt(0).toLocaleUpperCase()}${user.lastName.charAt(0).toLocaleUpperCase()}` : "NA"

  useEffect(() => {
    (async () => {
      const res = await getMaterialPriceApi();
      if (res.status === 200) {
        dispatch(setMaterials(res.data.results));
      }
    })();
  }, [dispatch]);


  let total_item = 0;
  for (const item of items) {
    total_item += item.quantity;
  }

  return (
    <header
      className="w-full fixed top-0 left-0 z-50 bg-white shadow-md"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* Top section */}
      <div className="w-full bg-white h-[80px] px-0 md:px-4 border-b">
        <div className="wrapper flex items-center h-full justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Back button - only inside the native app (Android/iOS shell),
                matching the back-button expectation of a mobile app. Hidden
                when there's nothing to go back to. */}
            {isNativeApp && canGoBack && (
              <button
                onClick={() => router.back()}
                aria-label="Go back"
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-grayDark hover:text-brand shrink-0"
              >
                <IoArrowBackOutline className="w-6 h-6" />
              </button>
            )}

            {/* Logo - always visible */}
            <Link href={"/"}>
              <Image src={"/images/logo2.png"} alt="logo" width={100} height={80} />
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 mx-4 items-center justify-center">
            <ProductSearch />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 md:gap-4 flex-shrink-0">
            {/* Today’s Price */}
            <div className="flex text-xs  font-medium font-nunito items-center gap-2 p-1 px-2 rounded-md bg-[#ffefca] text-brand">
              {/* <span className="w-2 h-2 rounded-full bg-red-600"></span> */}
              <AiFillGold className="text-brand w-4 h-4 " />
              <span className="hidden sm:block">Today&apos;s Price:</span>
              <span>₹ {gold?.price}/10gm</span>
            </div>

            {/* Search icon for mobile */}
            <button
              className="md:hidden rounded-full "
              onClick={() => setShowSearchBar((prev) => !prev)}
            >
              <AiOutlineSearch className="w-6 h-6 text-grayDark hover:text-brand " />
            </button>

            {/* Cart */}
            <Link href={"/cart"}>
              <div className="relative">
                <PiShoppingCartSimple className="w-6 h-6 text-grayDark hover:text-brand" />
                <span className="absolute -top-2 -right-2 bg-brand text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {total_item}
                </span>
              </div>
            </Link>

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
                  <FaHamburger className="w-5 h-5 text-brand cursor-pointer" />
                ) : (
                  <HiOutlineUser className="w-6 h-6 text-grayDark hover:text-brand cursor-pointer" />
                )
              }
            </div>

          </div>
        </div>
      </div>


      {/* Floating Searchbar for Mobile */}
      {showSearchBar && (
        <div
          className="absolute left-0 w-full bg-[#ffffffb0] shadow-md drop-shadow-xl z-50 p-3 pr-0 md:hidden flex items-center"
          style={{ top: "calc(80px + env(safe-area-inset-top))" }}
        >
          <ProductSearch />
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 text-grayDark hover:text-brand  "
            onClick={() => setShowSearchBar(false)}
          >
            <IoClose className="w-5 h-5 " />
          </button>
        </div>
      )}

      {/* Sidebar */}
      {isAuth && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
    </header>
  );
};

export default Header;
