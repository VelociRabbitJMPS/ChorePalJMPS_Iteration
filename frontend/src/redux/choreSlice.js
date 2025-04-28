import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChores = createAsyncThunk('chores/fetchChores', async () => {
  const response = await fetch('/chores');
  if (!response.ok) {
    throw new Error('Failed to fetch chores');
  }
  const data = await response.json();

  return data;
});

const choreSlice = createSlice({
  name: 'chores',
  initialState: {
    chores: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChores.fulfilled, (state, action) => {
        state.loading = false;
        state.chores = action.payload;
      })
      .addCase(fetchChores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default choreSlice.reducer;
