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

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.ringSize === action.payload.ringSize // 👈 check ring size too
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string; ringSize?: number }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.ringSize === action.payload.ringSize) // 👈 include ringSize
      );
      state.total = calculateTotal(state.items);
    },

    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number; ringSize?: number }>) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id && item.ringSize === action.payload.ringSize // 👈 include ringSize
      );
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i !== item);
        }
        state.total = calculateTotal(state.items);
      }
    },
    // Update price of a specific cart item (used when refreshing prices from server)
    updateItemPrice: (
      state,
      action: PayloadAction<{ id: string; ringSize?: number; price: number; originalPrice?: number }>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id && item.ringSize === action.payload.ringSize
      );

      if (item) {
        item.price = action.payload.price;
        if (typeof action.payload.originalPrice === 'number') {
          item.originalPrice = action.payload.originalPrice;
        }
        state.total = calculateTotal(state.items);
      }
    },
    updateRingSize: (
      state,
      action: PayloadAction<{ id: string; oldRingSize?: number; newRingSize: number }>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload.id && item.ringSize === action.payload.oldRingSize
      );

      if (item) {
        item.ringSize = action.payload.newRingSize;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateRingSize,
  updateItemPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
