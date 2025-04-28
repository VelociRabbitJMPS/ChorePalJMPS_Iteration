import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chores: [],
};

const choreSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {
    setChores: (state, action) => {
      state.chores = action.payload;
    },
  },
});

export const { setChores } = choreSlice.actions;
export default choreSlice.reducer;
