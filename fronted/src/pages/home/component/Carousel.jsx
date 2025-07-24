import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Tag, Spin, message } from 'antd';
import { fetchCarouselSoftware } from '../../../api/service/softwareService.js'; // 导入API接口
import styles from './Carousel.module.css';

const CarouselComponent = () => {
  const navigate = useNavigate();
  const [softwareList, setSoftwareList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 静态备用数据
  const staticSoftwareList = [
    {
      id: 1,
      picture: 'https://picsum.photos/600/400?random=1',
      name: 'Adobe Photoshop 2024',
      introduction: '专业的图像编辑和设计软件，提供强大的图像处理功能和创意工具，是设计师和摄影师的首选工具。',
      // tags: ['图像处理', '设计', '专业版'], // 注释掉tags
      price: 998.00,
      version: 'v25.0.1'
    },
    {
      id: 2,
      picture: 'https://picsum.photos/600/400?random=2',
      name: 'Microsoft Office 365',
      introduction: '完整的办公套件，包含Word、Excel、PowerPoint等应用，支持云端协作和多设备同步。',
      // tags: ['办公', '协作', '云端'], // 注释掉tags
      price: 365.00,
      version: 'v16.77'
    },
    {
      id: 3,
      picture: 'https://picsum.photos/600/400?random=3',
      name: 'Visual Studio Code',
      introduction: '免费的代码编辑器，支持多种编程语言，拥有丰富的插件生态系统，是开发者的理想选择。',
      // tags: ['开发工具', '免费', '开源'], // 注释掉tags
      price: 0,
      version: 'v1.84.2'
    },
    {
      id: 4,
      picture: 'https://picsum.photos/600/400?random=4',
      name: 'AutoCAD 2024',
      introduction: '业界领先的CAD设计软件，适用于2D和3D设计，广泛应用于建筑、工程和制造业。',
      // tags: ['CAD', '设计', '工程'], // 注释掉tags
      price: 1680.00,
      version: 'v24.1'
    },
    {
      id: 5,
      picture: 'https://picsum.photos/600/400?random=5',
      name: 'Figma Pro',
      introduction: '现代化的UI/UX设计工具，支持实时协作，是团队设计项目的最佳选择。',
      // tags: ['UI设计', '协作', '云端'], // 注释掉tags
      price: 120.00,
      version: 'v116.7.2'
    }
  ];

  // 数据映射函数：将后端数据格式转换为前端显示格式
  const mapBackendDataToDisplay = (backendData) => {
    return backendData.map(item => ({
      id: item.id,
      image: item.picture || `https://picsum.photos/600/400?random=${item.id}`, // picture字段映射到image
      name: item.name || '未知软件',
      description: item.introduction || '暂无描述', // introduction字段映射到description
      // tags: [], // 暂时注释掉tags
      price: formatPrice(item.price),
      version: item.version || '版本未知',
      detailUrl: `/software/${item.id}`
    }));
  };

  // 格式化价格显示
  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return '价格待定';
    }
    if (price === 0) {
      return '免费';
    }
    return `¥${price.toFixed(2)}`;
  };

  // 获取软件数据
  const fetchSoftwareData = async () => {
    try {
      setLoading(true);

      // 调用API接口获取数据
      const backendData = await fetchCarouselSoftware();

      if (backendData && Array.isArray(backendData) && backendData.length > 0) {
        // 转换后端数据格式为前端显示格式
        const mappedData = mapBackendDataToDisplay(backendData);
        setSoftwareList(mappedData);
        console.log('成功获取轮播图软件数据:', mappedData);
      } else {
        // 如果后端返回空数据，使用静态数据
        console.log('后端返回空数据，使用静态数据');
        const mappedStaticData = mapBackendDataToDisplay(staticSoftwareList);
        setSoftwareList(mappedStaticData);
      }
    } catch (error) {
      console.error('获取软件数据失败:', error);
      message.warning('获取数据失败，使用默认数据');

      // 网络错误或接口错误时，使用静态数据作为后备
      const mappedStaticData = mapBackendDataToDisplay(staticSoftwareList);
      setSoftwareList(mappedStaticData);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchSoftwareData();
  }, []);

  const carouselRef = React.useRef();

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handleImageClick = (software) => {
    console.log('点击软件:', software.name);
    navigate(`/software/${software.id}?from=carousel`);
  };

  // 暂时注释掉tag相关的函数
  // const getTagColor = (tag) => {
  //   const colorMap = {
  //     '图像处理': 'blue',
  //     '设计': 'purple',
  //     '专业版': 'gold',
  //     '办公': 'green',
  //     '协作': 'cyan',
  //     '云端': 'blue',
  //     '开发工具': 'orange',
  //     '免费': 'green',
  //     '开源': 'lime',
  //     'CAD': 'red',
  //     '工程': 'volcano',
  //     'UI设计': 'magenta'
  //   };
  //   return colorMap[tag] || 'default';
  // };

  // 如果正在加载，显示加载状态
  if (loading) {
    return (
      <div className={styles.carouselContainer} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px'
      }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  // 如果没有数据，不渲染轮播图
  if (!softwareList || softwareList.length === 0) {
    return (
      <div className={styles.carouselContainer} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        color: '#666'
      }}>
        <p>暂无软件数据</p>
      </div>
    );
  }

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
                  onError={(e) => {
                    // 图片加载失败时使用默认图片
                    e.target.src = `https://picsum.photos/600/400?random=${software.id}`;
                  }}
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

                {/* 暂时注释掉tags显示 */}
                {/* <div className={styles.tags}>
                  {software.tags && software.tags.map((tag, index) => (
                    <Tag key={index} color={getTagColor(tag)} className={styles.tag}>
                      {tag}
                    </Tag>
                  ))}
                </div> */}

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