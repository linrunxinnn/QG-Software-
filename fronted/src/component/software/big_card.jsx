import React from "react";
import styles from "./big_card.module.css";

const BigCard = ({ sort, titles, prices, images, id, onClick }) => {
  console.log("BigCard组件接收到的参数:", id);
  const handle = (e) => {
    console.log("点击的ID:", e.currentTarget.id);
    onClick(e.currentTarget.id); // 调用传入的 onClick 函数
  };
  return (
    <div className={styles.categorycard}>
      <div className={styles.categorytitles}>{sort}</div>
      <div className={styles.divider}></div>
      {/* 第一个项目：新增价格区域 */}
      <div className={styles.item} id={id[0]} onClick={handle}>
        <div className={styles.itemimg}>
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            src={images[0]}
            alt="picture"
          />
        </div>
        <div className={styles.iteminfo}>
          <div className={styles.itemname}>{titles[0]}</div>
          <div className={styles.itemprice}>{prices[0]}</div>
        </div>
        <button className={styles.downloadbtn}>下载</button>
      </div>
      <div className={styles.divider}></div>
      {/* 第二个项目：新增价格区域 */}
      <div className={styles.item} id={id[1]} onClick={handle}>
        <div className={styles.itemimg}>
          <img
            style={{
              width: "100%",
              height: "100%",
            }}
            src={images[1]}
            alt="picture"
          />
        </div>
        <div className={styles.iteminfo}>
          <div className={styles.itemname}>{titles[1]}</div>
          <div className={styles.itemprice}>{prices[1]}</div>
        </div>
        <button className={styles.downloadbtn}>下载</button>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default BigCard;
