import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FilterState {
  page: number
  limit: number
  category?: string
  subCategory?: string
  occasion?: string
  targetGender?: string
  sortBy?: string
}

const initialState: FilterState = {
  limit: 10,
  page: 1,
  category: "",
  subCategory: "",
  occasion: "",
  targetGender: "",
  sortBy: "",
}

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
    setSubCategory: (state, action: PayloadAction<string>) => {
      state.subCategory = action.payload
    },
    setOccasion: (state, action: PayloadAction<string>) => {
      state.occasion = action.payload
    },
    setShopFor: (state, action: PayloadAction<string>) => {
      state.targetGender = action.payload
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload
    },
    resetFilters: () => initialState,
  },
})

export const {
  setCategory,
  setSubCategory,
  setOccasion,
  setShopFor,
  setSortBy,
  resetFilters,
} = filterSlice.actions

export default filterSlice.reducer
