import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  createdAt: string;
}

interface TransactionsState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransactionStatus: (state, action: PayloadAction<{ id: string; status: Transaction['status'] }>) => {
      const transaction = state.transactions.find(t => t.id === action.payload.id);
      if (transaction) {
        transaction.status = action.payload.status;
      }
    },
  },
});

export const { 
  setLoading, 
  setError, 
  setTransactions, 
  addTransaction, 
  updateTransactionStatus 
} = transactionsSlice.actions;

export default transactionsSlice.reducer;