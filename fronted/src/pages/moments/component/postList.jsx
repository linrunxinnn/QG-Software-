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

export default function PostList() {
  const items = [
    {
      id: 1,
      title: "Card title",
      description: "This is the description",
      avatar: qg,
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      id: 1,
      title: "Card title",
      description: "This is the description",
      avatar: qg,
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
    {
      id: 1,
      title: "Card title",
      description: "This is the description",
      avatar: qg,
      src: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    },
  ];

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
          cover={<img src={item.src} />}
          onClick={() => handleCardClick(item.id)}
        >
          <Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.title}
            description={item.description}
          />
        </Card>
      ))}
    </div>
  );
}
