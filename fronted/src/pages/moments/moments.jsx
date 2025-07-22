import React from "react";
import UpList from "./component/upList";
import PostList from "./component/postList";
import { useSelector, useDispatch } from "react-redux";
import style from "./moments.module.css";

export default function Moments() {
  //先获取当前页面的信息（用户关注的软件提供商）（发送第一个软件提供商的动态）+关注的软件提供商的发的动态信息

  return (
    <div className={style.container}>
      <div className={style.main}>
        <UpList
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
