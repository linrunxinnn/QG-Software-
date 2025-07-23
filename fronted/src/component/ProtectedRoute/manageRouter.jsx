import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 或其他全局状态方式

const ManagerRouter = ({ children }) => {
  const user = useSelector((state) => state.user); // 假设 user 存在于 redux 里

  const role = user?.role; // 获取用户角色

  if (role !== 3) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ManagerRouter;
