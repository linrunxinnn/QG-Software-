import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import { Button } from 'antd';

export default function Publish() {
  const navigate = useNavigate()
  function createsoft() {
    navigate("create")
  }


  return (
    <div>
      <div style={
        {
          padding: "20px",
          backgroundColor: "white",

        }
      }>
        <h1
          style={
            {
              padding: "10px",
              boxShadow: " 0 2px 8px rgba(0, 0, 0, 0.1)",
              fontSize: "20px"
            }
          }>已发布的软件
          <Button
            type="primary"
            onClick={() => createsoft()}
            style={{
              float: "right"
            }}
          >
            {"发布新软件"}
          </Button>
        </h1>
      </div>
      <Outlet />
    </div >
  );
}
