import React from "react";
import UpList from "./component/upList";
import PostList from "./component/postList";
import { useSelector, useDispatch } from "react-redux";
import style from "./moments.module.css";
import { useState } from "react";

export default function Moments() {
  //先获取当前页面的信息（用户关注的软件提供商）（发送第一个软件提供商的动态）+关注的软件提供商的发的动态信息
  const info = [];
  return (
    <div className={style.container}>
      <div className={style.main}>
        {/* 需要给UpList传递一个参数将获取的用户关注的软件提供商户的信息传递给UpList组件 */}
        <UpList
          info={info}
          onChange={(userId) =>
            console.log("Selected user ID在父组件:", userId)
          }
        />
        <PostList />
      </div>
      {/* Additional content can be added here */}
    </div>
  );
}
