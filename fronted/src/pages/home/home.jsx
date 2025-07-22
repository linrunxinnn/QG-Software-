import React from "react";
import styles from "./home.module.css";
import CarouselComponent from "./component/Carousel";
import ShowCard from "./component/ShowSoft";

const Home = () => {
  return (
    <div className={styles.homePage}>
      {/* 轮播图组件 */}
      <div className={styles.carouselSection}>
        <CarouselComponent />
      </div>
      <ShowCard />
      {/* 其他页面内容可以在这里添加 */}
    </div>
  );
};

export default Home;
