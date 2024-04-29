import React, { useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import "./ImportLearningMaterial.css";
const ImportLearningMaterial = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/uploadLearningMaterial", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("File uploaded successfully:", res.data);
      // Handle successful upload (e.g., display success message)
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle upload error (e.g., display error message)
    }
  };

  return (
    <div className="import-learning-material">
      <div className="pat-cover">
        <Layout>
          <h1>Import Learning Material</h1>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
          </form>
        </Layout>
      </div>
    </div>
  );
};

export default ImportLearningMaterial;
