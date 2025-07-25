import React from "react";
import style from "./upList.module.css";
import { useState, useRef, useEffect } from "react";
import { Avatar, Button } from "antd";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import qg from "../../../assets/qg.png";

export default function UpList({ info, onChange, index }) {
  const mockUsers = info;
  const [selectedUserId, setSelectedUserId] = useState(index);
  console.log("Selected user ID在父组件:", selectedUserId);
  const [currentIndex, setCurrentIndex] = useState(1);
  const containerRef = useRef(null);
  const slideDistance = 140; // 每次滑动的距离
  const [maxIndex, setMaxIndex] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const visibleCount = Math.floor(
        containerRef.current.clientWidth / slideDistance
      );
      setMaxIndex(Math.max(0, mockUsers.length - visibleCount));
    }
  }, [mockUsers.length]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: newIndex * slideDistance,
          behavior: "smooth",
        });
      }
    }
  };

  //点击一个用户后将该用户的id传递给父组件，并取消其他的active类名，添加点击的用户的active类名
  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    onChange(userId); // 调用父组件传递的函数
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      containerRef.current.scrollTo({
        left: newIndex * slideDistance,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.main}>
        <Button
          icon={<LeftOutlined />}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={style.navButton}
        />
        <div className={style.mainContainer} ref={containerRef}>
          <div className={`${style.item} ${style.mainItem}`}>
            <div className={style.itemImg}>
              <img src={qg} alt="qg" />
            </div>
            <div className={style.text}>关注商户</div>
          </div>
          {/* 如果用户id为1则添加active类名 */}

          {mockUsers.map((item) => (
            <div
              key={item.id}
              className={`${style.item} ${
                item.id === selectedUserId ? style.active : ""
              }`}
              onClick={() => handleUserClick(item.id)}
            >
              <div className={style.itemImg}>
                <Avatar size="large" src={item.avatar} />
              </div>
              <div className={style.text}>{item.name}</div>
            </div>
          ))}
        </div>
        <Button
          icon={<RightOutlined />}
          onClick={handleNext}
          disabled={currentIndex >= Math.max(0, mockUsers.length - 3)}
          className={style.navButton}
        />
      </div>
    </div>
  );
}
