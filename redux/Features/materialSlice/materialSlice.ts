import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Material {
  id: string;
  name: string;
  price: number;
  createdBy: number;
  lastUpdatedBy: number;
}

interface MaterialState {
  [key: string]: Material; // key will be material name like "GOLD", "DIAMOND"
}

const initialState: MaterialState = {};

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    setMaterials: (state, action: PayloadAction<Material[]>) => {
      action.payload.forEach((material) => {
        state[material.name.toLowerCase()] = material;
        // 👆 ensures keys are like gold, diamond
      });
    },
  },
});

export const { setMaterials } = materialSlice.actions;
export default materialSlice.reducer;
