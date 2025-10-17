import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  specifications?: string;
  ringSize?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      console.log("action.payload", action.payload);

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; ringSize?: number }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id)
      );
      state.total = calculateTotal(state.items);
    },
    // && item.ringSize === action.payload.ringSize
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number; ringSize?: number }>) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i !== item);
        }
        state.total = calculateTotal(state.items);
      }
    },
    // && item.ringSize === action.payload.ringSize
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
