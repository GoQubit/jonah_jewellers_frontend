import { useDispatch, useSelector } from "react-redux"
import { CartItem } from "./CartItem"
import { RootState } from "@/redux/store"
import { removeFromCart, updateQuantity } from "@/redux/Features/cartSlice/cartSlice"
import { memo } from "react"


const CartItems = () => {
  const { items } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-3 md:p-6 border-b border-gray-200">
        <h2 className="text-lg font-besley text-[#585858]">
          My Shopping Cart ({items.length} Item{items.length !== 1 ? "s" : ""})
        </h2>
      </div>

      <div className="divide-y divide-gray-200">
        {items.length === 0 ? (
          <p className="p-6 text-gray-500">Your cart is empty</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => dispatch(removeFromCart({ id: item.id, ringSize: item.ringSize }))}
              onQuantityChange={(q: any) => dispatch(updateQuantity({ id: item.id, quantity: q, ringSize: item.ringSize }))}
            />
          ))
        )}
      </div>
    </div>
  )
}


export default memo(CartItems)