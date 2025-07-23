import React from "react";
import "./small_card.css"; // 样式文件同步更新

const SmallCard = () => {
  return (
    <div className="card">
      <div className="card-img"></div>
      <div className="card-info">
        <div className="card-title">名称</div>
        <div className="card-price">¥19.90</div>
      </div>
      <button className="download-btn">下载</button>
    </div>
  );
};
//wozaifenzhi shang xiugai
export default SmallCard;
