import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../layout/Layout";

const TeacherHome = () => {
  const getTeacherData = async () => {
    try {
      const res = await axios.post(
        "/getTeacherData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeacherData();
  });
  return <Layout />;
};
export default TeacherHome;