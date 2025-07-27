import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import Header from "./component/Header/Header.jsx";
import Home from "./pages/home/home.jsx";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
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
