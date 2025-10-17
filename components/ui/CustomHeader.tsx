"use client";

import { useRouter } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoArrowBackOutline } from "react-icons/io5";
import { useState } from "react";
import { Sidebar } from "../layout/Sidebar";
import Link from "next/link";
import useIsAuth from "@/hooks/useIsAuth";
import { FaHamburger } from "react-icons/fa";

interface PageHeaderProps {
  title: string;
  onMenuClick?: () => void;
}

export const CustomPageHeader = ({ title, onMenuClick }: PageHeaderProps) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isAuth = useIsAuth()


  return (
    <header className=" w-full border-b bg-white flex items-center justify-between px-4 py-3">
      <div className=" wrapper w-full flex items-center justify-between ">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-900 font-medium hover:text-black transition"
        >
          <IoArrowBackOutline className="text-xl" />
          <span>{title}</span>
        </button>

        {/* Menu / Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <FaHamburger className="text-xl text-gray-900" />
          {/* <RxHamburgerMenu  /> */}
        </button>
      </div>

      {
        isAuth ?
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          :
          <Link href={'/login'} >
            Login
          </Link>
      }
    </header>
  );
};

export default CustomPageHeader