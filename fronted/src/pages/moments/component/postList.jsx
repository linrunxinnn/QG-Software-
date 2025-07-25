import React from "react";
import style from "./postList.module.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
import qg from "../../../assets/qg.png";

export default function PostList({ index, cuurrentPostList }) {
  const items = cuurrentPostList || [];
  console.log("当前帖子列表:", cuurrentPostList);
  console.log("传递的index:", index);
  // const items = [
  //   {
  //     id: 1,
  //     title: "Card title",
  //     description: "This is the description",
  //     avatar: qg,
  //     src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  //   },
  //   {
  //     id: 2,
  //     title: "Card title",
  //     description: "This is the description",
  //     avatar: qg,
  //     src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  //   },
  //   {
  //     id: 3,
  //     title: "Card title",
  //     description: "This is the description",
  //     avatar: qg,
  //     src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  //   },
  // ];

  //点击卡片后根据id跳转到对应的详情页
  const handleCardClick = (id) => {
    console.log("Card clicked with id:", id);
    // 这里可以添加跳转逻辑，例如使用 react-router 的 useNavigate
    // navigate(`/details/${id}`);
  };

  return (
    <div className={style.container}>
      {items.map((item) => (
        <Card
          key={item.id}
          className={style.card}
          cover={<img src={item.picture} />}
          onClick={() => handleCardClick(item.id)}
        >
          <Meta title={item.name} description={item.introduction} />
        </Card>
      ))}
    </div>
  );
}
