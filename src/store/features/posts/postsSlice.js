import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: []
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addToList: (state, action) => {
      state.value.push(action.payload);
    }
  }
});

export const { addToList } = postsSlice.actions;

export default postsSlice.reducer;