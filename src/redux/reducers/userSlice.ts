import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from 'models/Roles';
import { RootState } from '../store';

interface UserData {
  id: number;
  username: string;
  email: string;
  role: Role;
}
export interface UserState {
  value: UserData | null;
}

const initialState: UserState = { value: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserData>) => {
      state.value = action.payload;
    },
    resetUser: (state: UserState) => {
      state.value = null;
    },
  },
});

export const selectUser = (state: RootState) => state.user.value;
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
