"use client";
import Image from "next/image";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { AiFillGold } from "react-icons/ai";
import { IoDiamondOutline } from "react-icons/io5";
import { GiEmeraldNecklace } from "react-icons/gi";
import { FaRing } from "react-icons/fa";
import SearchInput from "../ui/SearchInput";
import { useState } from "react";
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { Sidebar } from "./Sidebar";



const Header = () => {
  const [query, setQuery] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top section with logo, search, and user icons */}
      <div className=" w-full bg-white h-[110px] px-4 py-auto border-b">
        <div className=" wrapper flex items-center h-full justify-between gap-4">

          {/* Logo */}
          <Link href={"/"} className='hidden md:block' >
            <Image src={"/images/logo1.png"} width={85} height={24} alt='vlcc-logo' />
          </Link>

          {/* Search bar */}
          <SearchInput
            placeholder="Search for Gold Jewellery, Diamond Jewellery & more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-[550px]"
          />


          {/* User and cart icons */}
          <div className="flex items-center gap-4 flex-shrink-0">

            {/* <div className="flex items-center gap-2 flex-shrink-0"> */}
            <div className=" text-sm font-nunito flex items-center gap-2 p-1 px-2 rounded-md bg-[#FFD8D8] text-red-600 ">
              <span className="w-2 h-2 rounded-full text-red-600 bg-red-600 "></span>
              <span>Today’s Price</span>:
              <span>₹ 10,263.5/gm</span>
            </div>
            {/* </div> */}

            {/* <Link href={'/login'} className=" cursor-pointer " >
              <HiOutlineUser className={`w-5 h-5 text-grayDark hover:text-brand smooth `} />
            </Link> */}

            <div
              onClick={() => setIsSidebarOpen(true)}
            >
              <HiOutlineUser className={`w-5 h-5 text-grayDark hover:text-brand smooth cursor-pointer `} />
            </div>

            <Link href={'/cart'} >
              <div className="relative">
                <PiShoppingCartSimple className={`w-5 h-5 text-grayDark hover:text-brand smooth `} />
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 relative overflow-hidden">
        <div className="w-full mx-auto px-4 py-3">
          <nav className=" flex items-center justify-center">
            <div className="flex items-center space-x-8 font-nunito text-base">
              <div className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer ">
                <GiEmeraldNecklace />
                <span >All Jewellery</span>
                <BiChevronDown className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer">
                <AiFillGold />
                <span >Gold</span>
              </div>

              <div className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer">
                <IoDiamondOutline />
                <span >Diamond</span>
              </div>

              <div className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer">
                <FaRing />
                <span >Silver</span>
              </div>

              <div className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer">
                <span >Wedding</span>
              </div>

              <div className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer">
                <span >Men's Special</span>
              </div>

              <div className="flex items-center gap-1 text-white hover:text-yellow-200 cursor-pointer">
                <span >1+1 Monthly Plans</span>
              </div>
            </div>
          </nav>
        </div>

      </div>

      {/* sidebar Modal */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

    </header >
  );
}

export default Header;