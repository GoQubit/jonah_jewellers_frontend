import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  line1: string;
  city: string;
  state: string;
  pinCode: number;
  phone: string
}

interface UserState {
  id: string | null;
  firstName?: string;
  lastName?: string;
  gender?: string;
  role?: string;
  email?: string;
  mobileNumber?: string;
  isApproved?: boolean;
  isEmailVerified?: boolean;
  isMobileVerified?: boolean;
  isNewUser?: boolean;
  address?: Address | null;
}

const initialState: UserState = {
  id: null,
  firstName: "",
  lastName: "",
  gender: "",
  role: "",
  email: "",
  mobileNumber: "",
  isApproved: false,
  isEmailVerified: false,
  isMobileVerified: false,
  isNewUser: false,
  address: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    updateUserField: (
      state,
      action: PayloadAction<{ field: keyof UserState; value: any }>
    ) => {
      (state as any)[action.payload.field] = action.payload.value;
    },
    clearUserProfile: () => initialState,
  },
});

export const { setUserProfile, updateUserField, clearUserProfile } =
  userSlice.actions;

export default userSlice.reducer;
