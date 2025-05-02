import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChores = createAsyncThunk('chores/fetchChores', async () => {
  const response = await fetch('http://localhost:3000/chores');
  if (!response.ok) {
    throw new Error('Failed to fetch chores');
  }
  const data = await response.json();
  return data.map((chore) => ({
    ...chore,
    status: chore.isCompleted ? 'Completed' : 'Pending',
  }));
});

export const addChore = createAsyncThunk(
  'chores/addChore',
  async (newChore) => {
    const choreWithStatus = {
      ...newChore,
      isCompleted: false,
      status: 'Pending',
    };
    const response = await fetch('http://localhost:3000/chores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(choreWithStatus),
    });

    if (!response.ok) {
      throw new Error('Failed to add chore');
    }

    const data = await response.json();
    return {
      ...data,
      status: data.isCompleted ? 'Completed' : 'Pending',
    };
  }
);

const choreSlice = createSlice({
  name: 'chores',
  initialState: {
    chores: [],
    // loading: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChores.pending, (state) => {
        // state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChores.fulfilled, (state, action) => {
        // state.loading = false;
        state.status = 'succeeded';
        state.chores = action.payload;
      })
      .addCase(fetchChores.rejected, (state, action) => {
        // state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addChore.pending, (state) => {
        // state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addChore.fulfilled, (state) => {
        // state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(addChore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default choreSlice.reducer;
