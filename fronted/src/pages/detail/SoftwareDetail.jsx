import React, { useState, useEffect } from 'react';
import { Tag, Modal, Button, Select, message, Collapse, Badge, Avatar, Card } from 'antd';
import { DownloadOutlined, ShoppingCartOutlined, DesktopOutlined, MobileOutlined, TabletOutlined, ExpandAltOutlined, UserOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import CommentSection from '../../component/CommentSection/CommentSection';
import styles from './SoftwareDetail.module.css';

const { Option } = Select;
const { Panel } = Collapse;

const SoftwareDetail = () => {
  // 软件基本信息状态
  const [softwareInfo, setSoftwareInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 购买状态
  const [purchaseStatus, setPurchaseStatus] = useState({
    hasPurchased: false,
    purchaseDate: null,
    licenseType: null
  });

  // 开发商信息状态
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // 其他状态管理
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [bindDeviceModalVisible, setBindDeviceModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [boundDevices, setBoundDevices] = useState([]);
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  // 静态软件截图数据
  const staticImages = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4'
  ];

  // 静态产品功能特色数据
  const staticFeatures = [
    {
      title: '智能图像处理',
      description: '采用最新AI技术，提供智能修复、自动调色、对象识别等功能，让图像处理更加高效便捷。支持批量处理和自定义预设，大幅提升工作效率。'
    },
    {
      title: '专业设计工具',
      description: '丰富的画笔工具、图层管理、滤镜效果和调整选项，满足从基础编辑到专业设计的所有需求。支持矢量和位图混合编辑。'
    },
    {
      title: '云端协作支持',
      description: '与Creative Cloud深度集成，支持多设备同步、版本管理和团队协作。随时随地访问您的创作内容，与团队成员实时分享和协作。'
    },
    {
      title: '高性能渲染',
      description: '优化的渲染引擎，支持GPU加速，处理大型文件和复杂效果时依然保持流畅体验。支持HDR和广色域显示。'
    },
    {
      title: '插件生态系统',
      description: '丰富的第三方插件支持，扩展无限可能。从特效处理到工作流程优化，海量插件满足各种专业需求。'
    },
    {
      title: '跨平台兼容',
      description: '完美支持Windows和macOS系统，提供一致的用户体验。支持多种文件格式导入导出，与其他Adobe产品无缝集成。'
    }
  ];

  // 设备类型选项
  const deviceOptions = [
    { value: 'desktop', label: '台式机/笔记本', icon: <DesktopOutlined /> },
    { value: 'mobile', label: '手机', icon: <MobileOutlined /> },
    { value: 'tablet', label: '平板电脑', icon: <TabletOutlined /> }
  ];

  // 页面加载时获取数据
  useEffect(() => {
    fetchSoftwareDetail();
  }, []);

  // 获取软件详情 - 目前使用模拟数据，后续可切换为真实API
  const fetchSoftwareDetail = async () => {
    try {
      setLoading(true);

      // TODO: 等后端接口有数据后，取消注释以下代码并注释掉模拟数据部分
      /*
      // 使用axios调用后端接口获取软件详情
      const response = await axios.get('//localhost:8080/softwares/SearchSoftwareNew', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const backendData = response.data;
      
      // 映射后端数据到前端数据结构
      const mappedSoftwareData = {
        id: backendData.id,
        name: backendData.name,
        icon: backendData.picture, // picture映射为icon
        price: `¥${backendData.price.toFixed(2)}`,
        version: `v${backendData.version}`,
        status: mapStatus(backendData.status), // 映射status
        category: backendData.type, // type映射为category
        description: backendData.introduction, // introduction映射为description
        images: staticImages, // 使用静态图片数据
        features: staticFeatures, // 使用静态功能特色数据
        publishedTime: backendData.publishedTime,
        link: backendData.link,
        installDetail: backendData.installDetail,
        author_id: backendData.author_id
      };
      */

      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 800));

      // 当前使用模拟数据
      const mockSoftwareData = {
        id: 1,
        name: 'Adobe Photoshop 2024',
        icon: 'https://picsum.photos/120/120?random=1',
        price: '¥998.00',
        version: 'v25.0.1',
        status: '可购买', // 使用映射后的状态
        category: '图像处理',
        description: '专业的图像编辑和设计软件，提供强大的图像处理功能和创意工具，是设计师和摄影师的首选工具。支持多种文件格式，具备先进的AI功能和云端同步特性。',
        images: staticImages, // 使用静态图片数据
        features: staticFeatures, // 使用静态功能特色数据
        developerId: 'dev_001' // 开发商ID，用于获取开发商信息
      };

      setSoftwareInfo(mockSoftwareData);

      // 模拟检查购买状态
      await checkPurchaseStatus(mockSoftwareData.id);

      // 模拟获取开发商信息
      await fetchDeveloperInfo(mockSoftwareData.developerId);

    } catch (error) {
      message.error('获取软件信息失败');
      console.error('获取软件详情失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 映射status状态
  const mapStatus = (statusCode) => {
    const statusMap = {
      0: '未发行',
      1: '可预约',
      2: '可购买'
    };
    return statusMap[statusCode] || '未知状态';
  };

  // 模拟检查购买状态的API调用
  const checkPurchaseStatus = async (softwareId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      // 模拟返回的购买状态数据
      const mockPurchaseData = {
        hasPurchased: Math.random() > 0.5, // 随机模拟已购买或未购买
        purchaseDate: '2024-07-15',
        licenseType: 'standard',
        boundDevices: [
          { id: 1, name: '我的MacBook Pro', type: 'desktop', status: 'active' },
          { id: 2, name: '办公电脑', type: 'desktop', status: 'active' }
        ]
      };

      setPurchaseStatus(mockPurchaseData);
      setBoundDevices(mockPurchaseData.boundDevices || []);

    } catch (error) {
      console.error('检查购买状态失败:', error);
    }
  };

  // 模拟获取开发商信息的API调用
  const fetchDeveloperInfo = async (authorId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 400));

      // 模拟返回的开发商数据
      const mockDeveloperData = {
        id: authorId,
        name: 'Creative Studio',
        avatar: 'https://picsum.photos/60/60?random=10',
        type: 'company', // company 或 individual
        description: '专业的创意软件开发团队，致力于为用户提供高质量的设计工具',
        followersCount: 25000,
        softwareCount: 12,
        isVerified: true,
        isFollowing: Math.random() > 0.5 // 随机模拟关注状态
      };

      setDeveloperInfo(mockDeveloperData);
      setIsFollowing(mockDeveloperData.isFollowing);

    } catch (error) {
      console.error('获取开发商信息失败:', error);
    }
  };

  // 处理关注/取消关注
  const handleFollowToggle = async () => {
    if (!developerInfo) return;

    setFollowLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newFollowStatus = !isFollowing;
      setIsFollowing(newFollowStatus);

      // 更新关注者数量
      setDeveloperInfo(prev => ({
        ...prev,
        followersCount: prev.followersCount + (newFollowStatus ? 1 : -1)
      }));

      message.success(newFollowStatus ? '关注成功' : '取消关注成功');

    } catch (error) {
      message.error('操作失败，请稍后重试');
    } finally {
      setFollowLoading(false);
    }
  };

  // 获取状态颜色和文本
  const getStatusConfig = (status) => {
    const configs = {
      '可购买': { color: 'green', text: '可购买' },
      '可预约': { color: 'orange', text: '可预约' },
      '未发行': { color: 'red', text: '未发行' }
    };
    return configs[status] || configs['未发行'];
  };

  // 处理购买
  const handlePurchase = () => {
    if (!softwareInfo || softwareInfo.status === '未发行') {
      message.error('该软件暂未发行，无法购买');
      return;
    }
    setPurchaseModalVisible(true);
  };

  // 确认购买
  const handleConfirmPurchase = async () => {
    if (!selectedDevice) {
      message.error('请选择要绑定的设备类型');
      return;
    }

    try {
      // 模拟购买API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 更新购买状态
      setPurchaseStatus({
        hasPurchased: true,
        purchaseDate: new Date().toISOString().split('T')[0],
        licenseType: 'standard'
      });

      message.success('购买成功！软件将在5分钟内发送到您的设备');
      setPurchaseModalVisible(false);
      setSelectedDevice('');

    } catch (error) {
      message.error('购买失败，请稍后重试');
    }
  };

  // 处理下载
  const handleDownload = () => {
    message.success('开始下载软件安装包');
  };

  // 绑定设备
  const handleBindDevice = () => {
    setBindDeviceModalVisible(true);
  };

  // 确认绑定设备
  const handleConfirmBindDevice = () => {
    if (!selectedDevice) {
      message.error('请选择设备类型');
      return;
    }
    const newDevice = {
      id: Date.now(),
      name: `新设备 ${boundDevices.length + 1}`,
      type: selectedDevice,
      status: 'active'
    };
    setBoundDevices([...boundDevices, newDevice]);
    message.success('设备绑定成功');
    setBindDeviceModalVisible(false);
    setSelectedDevice('');
  };

  // 解绑设备
  const handleUnbindDevice = (deviceId) => {
    setBoundDevices(boundDevices.filter(device => device.id !== deviceId));
    message.success('设备解绑成功');
  };

  // 评论相关回调函数
  const handleCommentSubmit = (comment) => {
    console.log('新评论提交:', comment);
  };

  const handleCommentDelete = (commentId) => {
    console.log('删除评论:', commentId);
  };

  // 加载状态
  if (loading) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>加载中...</div>
        </div>
      </div>
    );
  }

  // 如果没有软件信息，显示错误状态
  if (!softwareInfo) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.errorContainer}>
          <div className={styles.error}>软件信息获取失败</div>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(softwareInfo.status);

  return (
    <div className={styles.detailContainer}>
      {/* 开发商信息区域 */}
      {developerInfo && (
        <div className={styles.developerSection}>
          <Card className={styles.developerCard}>
            <div className={styles.developerInfo}>
              <div className={styles.developerBasic}>
                <Avatar
                  src={developerInfo.avatar}
                  size={50}
                  icon={<UserOutlined />}
                  className={styles.developerAvatar}
                />
                <div className={styles.developerDetails}>
                  <div className={styles.developerName}>
                    {developerInfo.name}
                    {developerInfo.isVerified && (
                      <span className={styles.verifiedBadge}>✓</span>
                    )}
                  </div>
                  <div className={styles.developerMeta}>
                    <span className={styles.developerType}>
                      {developerInfo.type === 'company' ? '企业开发商' : '个人开发者'}
                    </span>
                    <span className={styles.developerStats}>
                      {developerInfo.followersCount.toLocaleString()}关注者 · {developerInfo.softwareCount}个软件
                    </span>
                  </div>
                  <div className={styles.developerDesc}>{developerInfo.description}</div>
                </div>
              </div>
              <Button
                type={isFollowing ? 'default' : 'primary'}
                icon={isFollowing ? <HeartFilled /> : <HeartOutlined />}
                onClick={handleFollowToggle}
                loading={followLoading}
                className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
              >
                {isFollowing ? '已关注' : '关注'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* 软件基本信息区域 */}
      <div className={styles.headerSection}>
        <div className={styles.basicInfo}>
          <div className={styles.iconSection}>
            <img src={softwareInfo.icon} alt={softwareInfo.name} className={styles.softwareIcon} />
          </div>

          <div className={styles.infoSection}>
            <div className={styles.titleRow}>
              <h1 className={styles.softwareName}>{softwareInfo.name}</h1>
              {purchaseStatus.hasPurchased ? (
                <Button
                  type="primary"
                  size="large"
                  className={styles.installBtn}
                >
                  立即安装
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  className={styles.purchaseBtn}
                  onClick={handlePurchase}
                  disabled={softwareInfo.status === '未发行'}
                >
                  {softwareInfo.status === '未发行' ? '暂不可用' :
                    softwareInfo.status === '可预约' ? '预约' : '立即购买'}
                </Button>
              )}
            </div>

            <div className={styles.metaInfo}>
              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>{softwareInfo.price}</span>
                <Badge
                  color={statusConfig.color}
                  text={statusConfig.text}
                  className={styles.statusBadge}
                />
                {purchaseStatus.hasPurchased && (
                  <Tag color="green" className={styles.purchasedTag}>
                    已购买 ({purchaseStatus.purchaseDate})
                  </Tag>
                )}
              </div>

              <div className={styles.detailMeta}>
                <span className={styles.metaItem}>版本: {softwareInfo.version}</span>
                <span className={styles.metaItem}>类别: {softwareInfo.category}</span>
              </div>

              <p className={styles.description}>{softwareInfo.description}</p>

              <div className={styles.actionButtons}>
                {!purchaseStatus.hasPurchased && (
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    onClick={handlePurchase}
                    disabled={softwareInfo.status === '未发行'}
                    className={styles.actionBtn}
                  >
                    {softwareInfo.status === '可预约' ? '预约' : '购买'}
                  </Button>
                )}
                <Button
                  icon={<DownloadOutlined />}
                  size="large"
                  onClick={handleDownload}
                  className={styles.actionBtn}
                >
                  下载试用
                </Button>
                {purchaseStatus.hasPurchased && (
                  <Button
                    icon={<DesktopOutlined />}
                    size="large"
                    onClick={handleBindDevice}
                    className={styles.actionBtn}
                  >
                    绑定设备
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 软件图片详情 */}
      <div className={styles.imageSection}>
        <h2 className={styles.sectionTitle}>软件截图</h2>
        <div className={styles.imageGallery}>
          {staticImages.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <img src={image} alt={`截图 ${index + 1}`} className={styles.galleryImage} />
            </div>
          ))}
        </div>
      </div>

      {/* 产品应用介绍 */}
      <div className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>产品功能特色</h2>
          <Button
            type="link"
            icon={<ExpandAltOutlined />}
            onClick={() => setExpandedFeatures(!expandedFeatures)}
            className={styles.expandBtn}
          >
            {expandedFeatures ? '收起' : '查看更多'}
          </Button>
        </div>

        <div className={styles.featuresGrid}>
          {staticFeatures
            .slice(0, expandedFeatures ? staticFeatures.length : 3)
            .map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* 已绑定设备 - 只有已购买才显示 */}
      {purchaseStatus.hasPurchased && (
        <div className={styles.devicesSection}>
          <h2 className={styles.sectionTitle}>已绑定设备</h2>
          <div className={styles.devicesList}>
            {boundDevices.length === 0 ? (
              <div className={styles.emptyDevices}>
                <p>暂无绑定设备</p>
                <Button type="primary" onClick={handleBindDevice}>
                  立即绑定设备
                </Button>
              </div>
            ) : (
              boundDevices.map((device) => (
                <div key={device.id} className={styles.deviceCard}>
                  <div className={styles.deviceInfo}>
                    {device.type === 'desktop' && <DesktopOutlined className={styles.deviceIcon} />}
                    {device.type === 'mobile' && <MobileOutlined className={styles.deviceIcon} />}
                    {device.type === 'tablet' && <TabletOutlined className={styles.deviceIcon} />}
                    <span className={styles.deviceName}>{device.name}</span>
                    <Badge color="green" text="已激活" />
                  </div>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleUnbindDevice(device.id)}
                  >
                    解绑
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 用户评论区 - 根据购买状态传递不同参数 */}
      <CommentSection
        softwareId={softwareInfo.id}
        userInfo={{
          hasPurchased: purchaseStatus.hasPurchased,
          userId: 'current_user_id',
          username: '当前用户',
          avatar: 'https://picsum.photos/40/40?random=100'
        }}
        onCommentSubmit={handleCommentSubmit}
        onCommentDelete={handleCommentDelete}
        className={styles.commentSectionContainer}
      />

      {/* 购买设备选择弹窗 */}
      <Modal
        title="选择设备类型"
        open={purchaseModalVisible}
        onOk={handleConfirmPurchase}
        onCancel={() => setPurchaseModalVisible(false)}
        okText="确认购买"
        cancelText="取消"
        width={480}
      >
        <div className={styles.modalContent}>
          <p className={styles.modalDesc}>请选择要安装软件的设备类型：</p>
          <Select
            placeholder="选择设备类型"
            value={selectedDevice}
            onChange={setSelectedDevice}
            style={{ width: '100%' }}
            size="large"
          >
            {deviceOptions.map(option => (
              <Option key={option.value} value={option.value}>
                <div className={styles.deviceOption}>
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </Option>
            ))}
          </Select>
          <div className={styles.purchaseInfo}>
            <div className={styles.purchasePrice}>
              <span>购买价格：</span>
              <span className={styles.finalPrice}>{softwareInfo.price}</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* 绑定设备弹窗 */}
      <Modal
        title="绑定新设备"
        open={bindDeviceModalVisible}
        onOk={handleConfirmBindDevice}
        onCancel={() => setBindDeviceModalVisible(false)}
        okText="确认绑定"
        cancelText="取消"
        width={480}
      >
        <div className={styles.modalContent}>
          <p className={styles.modalDesc}>请选择要绑定的设备类型：</p>
          <Select
            placeholder="选择设备类型"
            value={selectedDevice}
            onChange={setSelectedDevice}
            style={{ width: '100%' }}
            size="large"
          >
            {deviceOptions.map(option => (
              <Option key={option.value} value={option.value}>
                <div className={styles.deviceOption}>
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </Option>
            ))}
          </Select>
          <div className={styles.bindInfo}>
            <p className={styles.bindNote}>
              * 每个软件最多可绑定3台设备<br />
              * 绑定后可在对应设备上激活使用
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SoftwareDetail;