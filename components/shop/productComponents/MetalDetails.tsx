import React from 'react'

const MetalDetails = ({productCategory,metalDetails}:{productCategory:string, metalDetails:any}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {/* Gold */}
      {productCategory === "GOLD" && (
        <>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.color}</span>
            <span className="font-nunito text-[#A1A1A1]">Color</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.goldPurity}K</span>
            <span className="font-nunito text-[#A1A1A1]">Purity</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.grossWeight} g</span>
            <span className="font-nunito text-[#A1A1A1]">Gross Weight</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.netWeight} g</span>
            <span className="font-nunito text-[#A1A1A1]">Net Weight</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">
              {metalDetails.hallmarked ? "Yes" : "No"}
            </span>
            <span className="font-nunito text-[#A1A1A1]">Hallmarked</span>
          </div>
        </>
      )}

      {/* Diamond */}
      {productCategory === "DIAMOND" && (
        <>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.stoneWeightInCarat} ct</span>
            <span className="font-nunito text-[#A1A1A1]">Stone Weight (Carat)</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.stoneWeightInGrams} g</span>
            <span className="font-nunito text-[#A1A1A1]">Stone Weight (Grams)</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.color}</span>
            <span className="font-nunito text-[#A1A1A1]">Color</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.clarityGrade}</span>
            <span className="font-nunito text-[#A1A1A1]">Clarity Grade</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.noOfDiamonds}</span>
            <span className="font-nunito text-[#A1A1A1]">No. of Diamonds</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.metalUsed}</span>
            <span className="font-nunito text-[#A1A1A1]">Metal Used</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.metalPurity}K</span>
            <span className="font-nunito text-[#A1A1A1]">Metal Purity</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.metalWeight} g</span>
            <span className="font-nunito text-[#A1A1A1]">Metal Weight</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.grossWeight} g</span>
            <span className="font-nunito text-[#A1A1A1]">Gross Weight</span>
          </div>
        </>
      )}

      {/* Silver */}
      {productCategory === "SILVER" && (
        <>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.silverPurityGrade}</span>
            <span className="font-nunito text-[#A1A1A1]">Purity Grade</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.color}</span>
            <span className="font-nunito text-[#A1A1A1]">Color</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.grossWeight} g</span>
            <span className="font-nunito text-[#A1A1A1]">Gross Weight</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">{metalDetails.netWeight} g</span>
            <span className="font-nunito text-[#A1A1A1]">Net Weight</span>
          </div>
          <div className="flex flex-col justify-between py-2">
            <span className="font-medium text-xl font-besley">
              {metalDetails.hallmarked ? "Yes" : "No"}
            </span>
            <span className="font-nunito text-[#A1A1A1]">Hallmarked</span>
          </div>
        </>
      )}
    </div>
  )
}

export default MetalDetails