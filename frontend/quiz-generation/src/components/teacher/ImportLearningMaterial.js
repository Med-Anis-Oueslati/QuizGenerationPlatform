import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import PdfComp from "./PdfComp";
import Layout from "../layout/Layout";
import "./ImportLearningMaterial.css";

const ImportLearningMaterial = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await submitImageToBack(e);
    await submitImageToFlask(e);
  };

  const submitImageToBack = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:5000/upload-files-back-flask",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log(result);

    if (result.data.status === "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const submitImageToFlask = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://127.0.0.1:5000/upload-pdf",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);

    if (result.data.status === "ok") {
      alert("Uploaded Successfully to flask!!!");
    }
  };
  const showPdf = (pdf) => {
    window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
  };
  return (
    <div className="import-learning-material">
      <div className="pat-cover">
        <Layout>
          <div className="App">
            <form className="formStyle" onSubmit={handleSubmit}>
              <h4>Upload Pdf</h4>
              <br />
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <input
                type="file"
                class="form-control"
                accept="application/pdf"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
              <br />
              <button class="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
            <div className="uploaded">
              <h4>Uploaded PDF:</h4>
              <div className="output-div">
                {allImage == null
                  ? ""
                  : allImage.map((data) => {
                      return (
                        <div className="inner-div">
                          <h6>Title: {data.title}</h6>
                          <button
                            className="btn btn-primary"
                            onClick={() => showPdf(data.pdf)}
                          >
                            Show Pdf
                          </button>
                        </div>
                      );
                    })}
              </div>
            </div>
            <PdfComp pdfFile={pdfFile} />
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default ImportLearningMaterial;
