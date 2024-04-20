import { createSlice } from "@reduxjs/toolkit";
export const teacherSlice = createSlice({
  name: "user",
  initialState: {
    teacher: null,
  },
  reducers: {
    setteacher: (state, action) => {
      state.teacher = action.payload;
    },
  },
});
export const { setDoctor } = teacherSlice.actions;
