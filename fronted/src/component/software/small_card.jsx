import React from "react";
import "./small_card.css"; // 样式文件同步更新

<<<<<<< HEAD
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
=======
const SmallCard = ({ image, title, price }) => {
    return (
        <div className="card">
            <div className="card-img">
                <img
                    style={
                        {
                            width: "100%",
                            height: "100%"
                        }
                    }
                    src={image} alt='picture' />
            </div>
            <div className="card-info">
                <div className="card-title">{title}</div>
                <div className="card-price">¥{price}</div>
            </div>
            <button className="download-btn">下载</button>
        </div>
    );
>>>>>>> upstream/main
};
//wozaifenzhi shang xiugai
export default SmallCard;
