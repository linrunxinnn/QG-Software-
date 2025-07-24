import React from "react";
import UpList from "./component/upList";
import PostList from "./component/postList";
import { useSelector, useDispatch } from "react-redux";
import style from "./moments.module.css";
import { useState, useEffect } from "react";
import {
  getAllSubscriptions,
  getAppByAuthorId,
} from "../../api/service/subscribe.js";

export default function Moments() {
  const selector = useSelector((state) => state.user);
  const [userId, setUserId] = useState(null);
  const [info, setInfo] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [cuurrentPostList, setCurrentPostList] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Selected user ID变化:", selectedUserId);
      try {
        const response = await getAppByAuthorId(selectedUserId);
        setCurrentPostList(response.data || []);
        console.log("当前帖子列表:", response.data);
      } catch (error) {
        console.error("获取帖子失败:", error);
        setCurrentPostList([]);
      }
    };

    if (selectedUserId !== -1) {
      fetchPosts();
    }
  }, [selectedUserId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSubscriptions(selector.user.id);
        setInfo(response.data || []);
        setSelectedUserId(response.data[0].id);
      } catch (error) {
        console.error("获取关注信息失败:", error);
        setInfo([]);
      }
    };

    if (selector.user?.id) {
      fetchData();
    }
  }, [selector.user.id]);

  return (
    <div className={style.container}>
      <div className={style.main}>
        {/* 需要给UpList传递一个参数将获取的用户关注的软件提供商户的信息传递给UpList组件 */}
        <UpList
          info={info}
          onChange={(userId) => {
            setSelectedUserId(userId);
            console.log("变更的用户ID:", userId);
          }}
          index={selectedUserId}
        />
        <PostList index={selectedUserId} cuurrentPostList={cuurrentPostList} />
      </div>
      {/* Additional content can be added here */}
    </div>
  );
}
