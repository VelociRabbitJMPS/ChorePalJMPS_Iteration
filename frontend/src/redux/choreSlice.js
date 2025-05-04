import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChores = createAsyncThunk('chores/fetchChores', async () => {
  const response = await fetch('http://localhost:3000/chores');
  if (!response.ok) {
    throw new Error('Failed to fetch chores');
  }
  const data = await response.json();
  console.log('fetching all chores', data);
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
    console.log('adding New chore', choreWithStatus);
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
//completedChore
export const completeChore = createAsyncThunk(
  'chores/completeChore',
  async (chore) => {
    const choreWithCompleteStatus = {
      ...chore,
      isCompleted: true,
      status: 'Completed',
    };
    const response = await fetch(`http://localhost:3000/chores/${chore._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(choreWithCompleteStatus),
    });
    console.log('choreWithCompleteStatus', choreWithCompleteStatus);
    if (!response.ok) {
      throw new Error('Failed to set complete chore');
    }
    return {
      ...choreWithCompleteStatus,
      status: 'Completed',
    };
  }
);
//deleteChore
export const deleteChore = createAsyncThunk(
  'chores/deleteChore',
  async (choreId) => {
    const response = await fetch(`http://localhost:3000/chores/${choreId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete chore');
    }
    return choreId;
  }
);
const choreSlice = createSlice({
  name: 'chores',
  initialState: {
    chores: [],
    loading: false,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChores.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChores.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.chores = action.payload;
      })
      .addCase(fetchChores.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addChore.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addChore.fulfilled, (state) => {
        state.loading = false;
        state.status = 'succeeded';
      })
      .addCase(addChore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(completeChore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const choreWithUpdatedStatus = action.payload;
        state.chores = state.chores.map((chore) =>
          chore._id === choreWithUpdatedStatus._id
            ? choreWithUpdatedStatus
            : chore
        );
      })
      .addCase(deleteChore.fulfilled, (state, action) => {
        const choreId = action.payload;
        state.chores = state.chores.filter((chore) => chore._id !== choreId);
      });
  },
});

export default choreSlice.reducer;
