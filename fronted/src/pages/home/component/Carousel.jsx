import React from 'react';
import { Carousel } from 'antd';
import styles from './Carousel.module.css';

const CarouselComponent = () => {
  // 模拟静态图片数据，后续可替换为API接口数据
  const images = [
    {
      id: 1,
      url: 'https://picsum.photos/800/400?random=1',
      title: '轮播图1'
    },
    {
      id: 2,
      url: 'https://picsum.photos/800/400?random=2',
      title: '轮播图2'
    },
    {
      id: 3,
      url: 'https://picsum.photos/800/400?random=3',
      title: '轮播图3'
    },
    {
      id: 4,
      url: 'https://picsum.photos/800/400?random=4',
      title: '轮播图4'
    },
    {
      id: 5,
      url: 'https://picsum.photos/800/400?random=5',
      title: '轮播图5'
    }
  ];

  const carouselRef = React.useRef();

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={2000}
        dots={true}
        dotPosition="bottom"
        className={styles.carousel}
      >
        {images.map((item) => (
          <div key={item.id} className={styles.slideItem}>
            <img
              src={item.url}
              alt={item.title}
              className={styles.slideImage}
            />
          </div>
        ))}
      </Carousel>

      {/* 自定义控制按钮 */}
      <div className={styles.customControls}>
        <button
          className={`${styles.controlBtn} ${styles.prevBtn}`}
          onClick={handlePrev}
        >
          ‹
        </button>
        <button
          className={`${styles.controlBtn} ${styles.nextBtn}`}
          onClick={handleNext}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default CarouselComponent;