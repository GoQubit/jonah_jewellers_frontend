"use client";
import React from "react";
import { GiDiamondRing } from "react-icons/gi";
import { Button } from "../ui/buttons/Button";
import { useRouter } from "next/navigation";

const KittyInvestmentsCards = () => {
  const router = useRouter();

  return (
    <div className="wrapper overflow-x-visible ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-full">
        {/* Kitty Plan Card */}
        <div>
          <div className="investment-card bg-[#F2E2E2]">
            <div className="flex flex-col gap-4">
              <div className="icon-circle bg-[#840000]">
                <GiDiamondRing size={60} />
              </div>
              <div className="text-center">
                <h2 className="font-besley font-semibold text-lg md:text-2xl text-[#840000] uppercase">
                  Jewellery Kitty Plan <br />
                  ( हर महीने बचत, गहनों का सपना पूरा )
                </h2>
                <p className="text-gray-700">Monthly Installment Plan</p>
              </div>

              <div className="flex items-center justify-center divide-x divide-black text-center">
                <div className="text-3xl md:text-5xl font-medium font-besley text-gray-800 mb-2 pr-2">
                  11+1
                </div>
                <div className="text-gray-500 pl-2 text-sm md:text-lg">
                  Pay 11 Installments and enjoy
                  <br />
                  100% savings on the 12th month
                </div>
              </div>
            </div>

          </div>
          <Button
            variant="brand-solid"
            className="!w-full !py-4 text-lg font-medium text-white mt-4 !bg-[#840000]"
            onClick={() => router.push("/kitty-plan")}
          >
            See Kitty Plans
          </Button>
        </div>

        {/* Gold Investment Card */}
        <div>
          <div className="investment-card bg-[#FEF2DA]">
            <div className="flex flex-col gap-4">
              <div className="icon-circle bg-brand">
                <GiDiamondRing size={60} />
              </div>
              <div className="text-center">
                <h2 className="font-besley font-semibold text-xl md:text-2xl text-brand uppercase">
                  Become Jonah Seller <br />
                  ( मैं भी सुनार )
                </h2>

                <p className="text-gray-700">For 100% Value!</p>
              </div>

              <div className="text-center w-[85%] mx-auto text-gray-500 text-sm md:text-lg">
                Secure your future with our Gold Investment Plan — simple,
                transparent, and backed by real gold at wholesale rates.
              </div>
            </div>

          </div>
          <Button
            variant="brand-solid"
            className="!w-full text-lg font-medium text-white mt-4 !py-4"
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
