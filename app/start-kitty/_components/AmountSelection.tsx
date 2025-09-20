"use client"


interface AmountSelectorProps {
  monthlyAmount: number
  setMonthlyAmount: (amount: number) => void
}

export function AmountSelector({ monthlyAmount, setMonthlyAmount }: AmountSelectorProps) {
  const popularAmounts = [2000, 3000, 5000]

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">Monthly Kitty Account*</label>

      <div className="relative mb-4 font-nunito">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
        <input
          type="number"
          value={monthlyAmount}
          onChange={(e) => setMonthlyAmount(Number(e.target.value))}
          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-brand"
          placeholder="5,000"
        />
        {/* <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <LuChevronsUpDown />
        </button> */}
      </div>

      <p className="text-sm text-gray-500 mb-4 font-nunito">*Minimum investment: ₹2000 per month</p>

      <div>
        <p className="text-sm text-[#818181] mb-2 font-nunito">Quick select popular amounts:</p>
        <div className="flex gap-2 md:gap-4">
          {popularAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setMonthlyAmount(amount)}
              className={`px-6 py-2 rounded-lg text-sm transition-colors font-nunito ${monthlyAmount === amount ? "bg-black text-white" : " text-[#CACACA] hover:bg-gray-100 border"
                }`}
            >
              ₹{amount.toLocaleString()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
