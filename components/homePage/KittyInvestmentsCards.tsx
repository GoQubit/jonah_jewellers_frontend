"use client";
import React from "react";
import { GiDiamondRing } from "react-icons/gi";
import { AiFillGold } from "react-icons/ai";
import { Button } from "../ui/buttons/Button";
import { useRouter } from "next/navigation";

const KittyInvestmentsCards = () => {
  const router = useRouter();

  return (
    <div className="wrapper overflow-x-visible ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-full">
        {/* Kitty Plan Card */}
        <div className="flex flex-col">
          <div className="investment-card flex-1 bg-[#F2E2E2]">
            <div className="flex flex-col gap-3">
              <div className="icon-circle bg-[#840000]">
                <GiDiamondRing size={60} />
              </div>
              <div className="text-center">
                <h2 className="font-besley font-semibold text-lg md:text-xl lg:text-[22px] leading-snug text-[#840000] uppercase">
                  Jewellery Kitty Plan
                  <span className="block text-sm md:text-lg font-semibold leading-normal">
                    ( हर महीने बचत, गहनों का सपना पूरा )
                  </span>
                </h2>
                <p className="text-gray-700">Monthly Installment Plan</p>
              </div>

              <div className="flex items-center justify-center divide-x divide-black text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-medium font-besley text-gray-800 pr-3 whitespace-nowrap">
                  11+1
                </div>
                <div className="text-gray-500 pl-3 text-sm md:text-base">
                  Pay 11 Installments and enjoy
                  <br />
                  100% savings on the 12th month
                </div>
              </div>
            </div>

          </div>
          <Button
            variant="brand-solid"
            className="!w-full !py-4 text-lg font-medium rounded-t-none text-white  !bg-[#840000]"
            onClick={() => router.push("/kitty-plan")}
          >
            See Kitty Plans
          </Button>
        </div>

        {/* Buy Pure Gold Card */}
        <div className="flex flex-col">
          <div className="investment-card flex-1 bg-[#FDECEC]">
            <div className="flex flex-col gap-3">
              <div className="icon-circle bg-[#B8860B]">
                <AiFillGold size={60} />
              </div>
              <div className="text-center">
                <h2 className="font-besley font-semibold text-lg md:text-xl lg:text-2xl leading-snug text-[#B8860B] uppercase">
                  Buy Pure Gold
                  <span className="block text-sm md:text-lg font-semibold leading-normal">
                    ( ₹100 से सोने का सिक्का पाएं )
                  </span>
                </h2>
                <p className="text-gray-700">Store it. Redeem it anytime.</p>
              </div>

              <div className="text-center w-[100%] mx-auto text-gray-500 text-sm md:text-base">
                Buy pure gold anytime and keep it safe in your wallet — redeem
                it for jewellery at our store whenever you're ready.
              </div>
            </div>

          </div>
          <Button
            variant="brand-solid"
            className="!w-full text-lg font-medium rounded-t-none text-white  !py-4 !bg-[#B8860B] hover:!bg-[#a07609]"
            onClick={() => router.push("/buy-gold")}
          >
            Buy Gold Now
          </Button>
        </div>

        {/* Gold Investment Card */}
        <div className="flex flex-col">
          <div className="investment-card flex-1 bg-[#FBF1DF]">
            <div className="flex flex-col gap-3">
              <div className="icon-circle bg-[#1F3A6E]">
                <GiDiamondRing size={60} />
              </div>
              <div className="text-center">
                <h2 className="font-besley font-semibold text-lg md:text-xl lg:text-[22px] leading-snug text-[#1F3A6E] uppercase">
                  Become Jonah Seller
                  <span className="block text-sm md:text-lg font-semibold leading-normal">
                    ( मैं भी सुनार )
                  </span>
                </h2>

                <p className="text-gray-700">For 100% Value!</p>
              </div>

              <div className="text-center w-[100%] mx-auto text-gray-500 text-sm md:text-base">
                Secure your future with our Gold Investment Plan — simple,
                transparent, and backed by real gold at wholesale rates.
              </div>
            </div>

          </div>
          <Button
            variant="brand-solid"
            className="!w-full text-lg font-medium rounded-t-none text-white  !py-4 !bg-[#1F3A6E] hover:!bg-[#172C55]"
            onClick={() => router.push("/invest-in-gold")}
          >
            Jonah Seller
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KittyInvestmentsCards;
