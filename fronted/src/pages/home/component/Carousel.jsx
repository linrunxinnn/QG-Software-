import React from 'react';
import { useNavigate } from 'react-router-dom'; // 新增
import { Carousel, Tag } from 'antd';
import styles from './Carousel.module.css';

const CarouselComponent = () => {
  const navigate = useNavigate(); // 新增
  // 模拟静态软件数据，后续可替换为API接口数据
  const softwareList = [
    {
      id: 1,
      image: 'https://picsum.photos/600/400?random=1',
      name: 'Adobe Photoshop 2024',
      description: '专业的图像编辑和设计软件，提供强大的图像处理功能和创意工具，是设计师和摄影师的首选工具。',
      tags: ['图像处理', '设计', '专业版'],
      price: '¥998.00',
      version: 'v25.0.1',
      detailUrl: '/software/1'
    },
    {
      id: 2,
      image: 'https://picsum.photos/600/400?random=2',
      name: 'Microsoft Office 365',
      description: '完整的办公套件，包含Word、Excel、PowerPoint等应用，支持云端协作和多设备同步。',
      tags: ['办公', '协作', '云端'],
      price: '¥365.00/年',
      version: 'v16.77',
      detailUrl: '/software/2'
    },
    {
      id: 3,
      image: 'https://picsum.photos/600/400?random=3',
      name: 'Visual Studio Code',
      description: '免费的代码编辑器，支持多种编程语言，拥有丰富的插件生态系统，是开发者的理想选择。',
      tags: ['开发工具', '免费', '开源'],
      price: '免费',
      version: 'v1.84.2',
      detailUrl: '/software/3'
    },
    {
      id: 4,
      image: 'https://picsum.photos/600/400?random=4',
      name: 'AutoCAD 2024',
      description: '业界领先的CAD设计软件，适用于2D和3D设计，广泛应用于建筑、工程和制造业。',
      tags: ['CAD', '设计', '工程'],
      price: '¥1,680.00',
      version: 'v24.1',
      detailUrl: '/software/4'
    },
    {
      id: 5,
      image: 'https://picsum.photos/600/400?random=5',
      name: 'Figma Pro',
      description: '现代化的UI/UX设计工具，支持实时协作，是团队设计项目的最佳选择。',
      tags: ['UI设计', '协作', '云端'],
      price: '¥120.00/月',
      version: 'v116.7.2',
      detailUrl: '/software/5'
    }
  ];

  const carouselRef = React.useRef();

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handleImageClick = (software) => {
    // 使用路由跳转到新的软件详情页
    console.log('点击软件:', software.name); // 添加调试信息
    navigate(`/software/${software.id}?from=carousel`);
  };

  

  const getTagColor = (tag) => {
    const colorMap = {
      '图像处理': 'blue',
      '设计': 'purple',
      '专业版': 'gold',
      '办公': 'green',
      '协作': 'cyan',
      '云端': 'blue',
      '开发工具': 'orange',
      '免费': 'green',
      '开源': 'lime',
      'CAD': 'red',
      '工程': 'volcano',
      'UI设计': 'magenta'
    };
    return colorMap[tag] || 'default';
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={4000}
        dots={true}
        dotPosition="bottom"
        className={styles.carousel}
      >
        {softwareList.map((software) => (
          <div key={software.id} className={styles.slideItem}>
            <div className={styles.slideContent}>
              {/* 左侧图片区域 */}
              <div className={styles.imageSection}>
                <img
                  src={software.image}
                  alt={software.name}
                  className={styles.slideImage}
                  
                />
                <div className={styles.imageOverlay}
                  onClick={() => handleImageClick(software)}
                >
                  <span>点击查看详情</span>
                </div>
              </div>

              {/* 右侧信息区域 */}
              <div className={styles.infoSection}>
                <h2 className={styles.softwareName}>{software.name}</h2>

                <div className={styles.versionPrice}>
                  <span className={styles.version}>版本: {software.version}</span>
                  <span className={styles.price}>{software.price}</span>
                </div>

                <p className={styles.description}>{software.description}</p>

                <div className={styles.tags}>
                  {software.tags.map((tag, index) => (
                    <Tag key={index} color={getTagColor(tag)} className={styles.tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>

                <button
                  className={styles.detailButton}
                  onClick={() => handleImageClick(software)}
                >
                  查看详情
                </button>
              </div>
            </div>
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