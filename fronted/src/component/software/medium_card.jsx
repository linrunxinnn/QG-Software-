import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import "./medium_card.css";

const { Meta } = Card;
const MediumCard = ({ image, title, price, id, onClick }) => (
  <Card
    style={{ width: "90%" }}
    //cover是用于展示图片封面的
    cover={<img alt="example" src={image} style={{ height: "300px" }} />}
    className="Card"
    // onClick={onClick}
    onClick={() => onClick(id)} // 点击卡片时调用onClick函数并传入id
  >
    {/* 这是标签页 */}
    <Meta
      title={title}
      //可以往description里面插入内容
      description={
        <>
          <span>¥{price}</span>
          <button
            style={{
              float: "right",
              padding: "4px 8px",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            下载
          </button>
        </>
      }
    ></Meta>
  </Card>
);
export default MediumCard;
