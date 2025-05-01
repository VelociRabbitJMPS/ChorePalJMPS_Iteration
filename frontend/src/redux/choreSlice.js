import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChores = createAsyncThunk('chores/fetchChores', async () => {
  const response = await fetch('http://localhost:3000/chores');
  if (!response.ok) {
    throw new Error('Failed to fetch chores');
  }
  const data = await response.json();

  return data;
});

export const addChore = createAsyncThunk(
  'chores/addChore',
  async (newChore) => {
    const response = await fetch('http://localhost:3000/chores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newChore),
    });

    if (!response.ok) {
      throw new Error('Failed to add chore');
    }

    const data = await response.json();
    return data;
  }
);

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
      })
      .addCase(addChore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addChore.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addChore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default choreSlice.reducer;
