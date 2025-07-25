import React from "react";
import "./small_card.css"; // 样式文件同步更新

const SmallCard = ({ image, title, price }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src={image}
          alt="picture"
        />
      </div>
      <div className="card-info">
        <div className="card-title">{title}</div>
        <div className="card-price">¥{price}</div>
      </div>
      <button className="download-btn">下载</button>
    </div>
  );
};
//wozaifenzhi shang xiugai
export default SmallCard;
