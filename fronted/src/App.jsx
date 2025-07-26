import React from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import Header from "./component/Header/Header.jsx";
import Home from "./pages/home/home.jsx";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  // const [files, setFiles] = useState({
  //   picture: null,
  //   pdf: null,
  // });

  // const handleFileChange = (fileType) => (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFiles((prev) => ({
  //     ...prev,
  //     [fileType]: selectedFile,
  //   }));
  //   console.log(`${fileType} selected:`, selectedFile);
  // };

  // const uploadFiles = async () => {
  //   if (!files.picture || !files.pdf) {
  //     console.error("Please select both files");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("picture", files.picture);
  //   formData.append("file", files.pdf);
  //   formData.append("software", JSON.stringify({ name: "linrunxin" }));

  //   try {
  //     const res = await api.post("/softwares/addSoftware", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     console.log("Files uploaded successfully:", res.data);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //   }
  // };

  // const handdle = async () => {
  //   console.log("禁用用户");
  //   try {
  //     const res = await api.post("/bans", { userId: 1 });
  //     console.log("User disabled successfully:", res.data);
  //   } catch (error) {
  //     console.error("Disable user failed:", error);
  //   }
  // };

  return (
    <>
      {/* <div>
        <label>选择图片:</label>
        <input
          type="file"
          accept=".png"
          onChange={handleFileChange("picture")}
        />
        {files.picture && <span>✓ {files.picture.name}</span>}
      </div>

      <div>
        <label>选择PDF:</label>
        <input type="file" accept=".pdf" onChange={handleFileChange("pdf")} />
        {files.pdf && <span>✓ {files.pdf.name}</span>}
      </div>

      <button onClick={uploadFiles} disabled={!files.picture || !files.pdf}>
        上传所有文件
      </button>

      <button
        onClick={() => {
          handdle();
        }}
      >
        禁用用户
      </button> */}
      <ConfigProvider locale={zhCN}>
        <div className="App">
          <Header />
          <Outlet />
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
