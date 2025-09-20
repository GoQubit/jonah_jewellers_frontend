import { CartItem } from "./CartItem"


const cartItems = [
  {
    id: 1,
    name: "Dazzling Grace Ring",
    specifications: "22k Gold | 6.285 Gram",
    price: 59048,
    originalPrice: 60000,
    image: "/images/productsImgs/2.png",
    ringSize: 7,
    quantity: 1,
    hasRingSize: true,
  },
  {
    id: 2,
    name: "Dazzling Grace Earring",
    specifications: "22k Gold | 0.285 Gram",
    price: 59048,
    originalPrice: 60000,
    image: "/images/productsImgs/1.png",
    quantity: 1,
    hasRingSize: false,
  },
]

export function CartItems() {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-besley font-normal text-[#585858]">
          My Shopping Cart ({cartItems.length} Item{cartItems.length !== 1 ? "s" : ""})
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
