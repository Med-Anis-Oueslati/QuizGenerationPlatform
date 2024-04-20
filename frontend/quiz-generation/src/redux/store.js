import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alertSlice";
import { userSlice } from "./userSlice";
import { teacherSlice } from "./TeacherSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    doctor: teacherSlice.reducer,
  },
});
