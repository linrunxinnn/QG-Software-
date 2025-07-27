//守卫路由
//确保用户在进入软件提供商特有页面的时候，该用户身份为软件提供商
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 或其他全局状态方式
import { message } from "antd";

const ProtectRouterByToken = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    message.error("请先登录");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectRouterByToken;
