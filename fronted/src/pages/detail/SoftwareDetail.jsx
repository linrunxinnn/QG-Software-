import React, { useState, useEffect } from 'react';
import { Tag, Modal, Button, Select, message, Collapse, Badge, Avatar, Card } from 'antd';
import { DownloadOutlined, ShoppingCartOutlined, DesktopOutlined, MobileOutlined, TabletOutlined, ExpandAltOutlined, UserOutlined, HeartOutlined, HeartFilled, CalendarOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import CommentSection from '../../component/CommentSection/CommentSection';
import {
  getSoftwareDetailPageData,
  mapSoftwareData,
  mapDeveloperData
} from '../../api/service/softwareDetailApi';
import {
  toggleFollowDeveloper,
  purchaseSoftware,
  reserveSoftware,
  downloadSoftware,
  validatePurchaseData,
  validateReserveData,
  formatErrorMessage
} from '../../api/service/userOperationApi';
import styles from './SoftwareDetail.module.css';

const { Option } = Select;
const { Panel } = Collapse;

const SoftwareDetail = () => {
  const { id: softwareId } = useParams(); // 从路由参数获取软件ID

  // 软件基本信息状态
  const [softwareInfo, setSoftwareInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 用户状态信息
  const [userStatus, setUserStatus] = useState({
    hasPurchased: false,        // 是否已购买
    hasReserved: false,         // 是否已预约
    purchaseDate: null,         // 购买日期
    reserveDate: null,          // 预约日期
    licenseType: null           // 许可证类型
  });

  // 开发商信息状态
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // 其他状态管理
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [reserveModalVisible, setReserveModalVisible] = useState(false);
  const [bindDeviceModalVisible, setBindDeviceModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [boundDevices, setBoundDevices] = useState([]);
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  // 静态软件截图数据（保留作为后备）
  const staticImages = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4'
  ];

  // 静态产品功能特色数据（保留作为后备）
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
    if (softwareId) {
      fetchSoftwareDetail();
    }
  }, [softwareId]);

  // 获取软件详情和相关数据
  const fetchSoftwareDetail = async () => {
    try {
      setLoading(true);

      // 获取当前用户ID（从localStorage或其他地方获取）
      const currentUserId = localStorage.getItem('userId') || 'current_user_id';

      // 尝试从API获取真实数据
      const result = await getSoftwareDetailPageData(softwareId, currentUserId);

      if (result.success && result.data.software) {
        // 使用API返回的数据
        const { software, developer, isFollowing: followingStatus } = result.data;

        setSoftwareInfo(software);
        setDeveloperInfo(developer);
        setIsFollowing(followingStatus);

        // 获取用户状态
        await fetchUserStatus(software.id);

      } else {
        // API失败时使用静态模拟数据
        console.warn('API获取失败，使用模拟数据:', result.error);
        await loadMockData();
      }

    } catch (error) {
      console.error('获取软件详情失败:', error);
      message.error('获取软件信息失败，使用模拟数据');

      // 出错时使用静态模拟数据
      await loadMockData();
    } finally {
      setLoading(false);
    }
  };

  // 加载模拟数据（保留原有逻辑）
  const loadMockData = async () => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 800));

    // 模拟软件数据
    const mockSoftwareData = {
      id: softwareId || 1,
      name: 'Adobe Photoshop 2024',
      icon: 'https://picsum.photos/120/120?random=1',
      price: '¥998.00',
      version: 'v25.0.1',
      status: '现货', // 🔄 将这里从 '现货' 改为 '可预约'
      category: '图像处理',
      description: '专业的图像编辑和设计软件，提供强大的图像处理功能和创意工具，是设计师和摄影师的首选工具。支持多种文件格式，具备先进的AI功能和云端同步特性。',
      images: staticImages,
      features: staticFeatures,
      developerId: 'dev_001'
    };

    setSoftwareInfo(mockSoftwareData);

    // 模拟开发商数据
    const mockDeveloperData = {
      id: 'dev_001',
      name: 'Creative Studio',
      avatar: 'https://picsum.photos/60/60?random=10',
      type: 'company',
      description: '专业的创意软件开发团队，致力于为用户提供高质量的设计工具',
      followersCount: 25000,
      softwareCount: 12,
      isVerified: true
    };

    setDeveloperInfo(mockDeveloperData);
    setIsFollowing(Math.random() > 0.5);

    // 获取用户状态
    await fetchUserStatus(mockSoftwareData.id);
  };

  // 获取用户对该软件的状态（购买/预约状态）
  const fetchUserStatus = async (softwareId) => {
    try {
      // TODO: 后续添加用户状态API调用
      /*
      const response = await getUserSoftwareStatus(softwareId);
      if (response.success) {
        setUserStatus(response.data);
        setBoundDevices(response.data.boundDevices || []);
      }
      */

      await new Promise(resolve => setTimeout(resolve, 300));

      // 模拟用户状态数据
      const mockUserStatus = {
        hasPurchased: false, // Math.random() > 0.7, // 30%概率已购买
        hasReserved: false, // Math.random() > 0.8,   // 20%概率已预约
        purchaseDate: null, // '2024-07-15',
        reserveDate: null, // '2024-07-10',
        licenseType: null, // 'standard',
        boundDevices: [
          // { id: 1, name: '我的MacBook Pro', type: 'desktop', status: 'active' },
          // { id: 2, name: '办公电脑', type: 'desktop', status: 'active' }
        ]
      };

      setUserStatus(mockUserStatus);
      setBoundDevices(mockUserStatus.boundDevices || []);

    } catch (error) {
      console.error('获取用户状态失败:', error);
    }
  };

  // 处理关注/取消关注 - 使用新的接口
  const handleFollowToggle = async () => {
    if (!developerInfo) return;

    setFollowLoading(true);
    try {
      const currentUserId = localStorage.getItem('userId') || 'current_user_id';

      const result = await toggleFollowDeveloper(currentUserId, developerInfo.id, isFollowing);

      if (result.success) {
        setIsFollowing(result.data.isFollowing);
        setDeveloperInfo(prev => ({
          ...prev,
          followersCount: prev.followersCount + (result.data.isFollowing ? 1 : -1)
        }));
        message.success(result.data.isFollowing ? '关注成功' : '取消关注成功');
      } else {
        message.error(formatErrorMessage(result.error));
      }

    } catch (error) {
      message.error('操作失败，请稍后重试');
    } finally {
      setFollowLoading(false);
    }
  };

  // 获取状态颜色和文本
  const getStatusConfig = (status) => {
    const configs = {
      '现货': { color: 'green', text: '现货' },
      '可预约': { color: 'orange', text: '可预约' }
    };
    return configs[status] || configs['现货'];
  };

  // 处理预约
  const handleReserve = () => {
    if (!softwareInfo || softwareInfo.status !== '可预约') {
      message.error('该软件当前不支持预约');
      return;
    }
    setReserveModalVisible(true);
  };

  // 确认预约 - 使用新的接口
  const handleConfirmReserve = async () => {
    if (!selectedDevice) {
      message.error('请选择要绑定的设备类型');
      return;
    }

    try {
      const currentUserId = localStorage.getItem('userId') || 'current_user_id';

      // 参数验证
      const validation = validateReserveData(currentUserId, softwareInfo.id);
      if (!validation.valid) {
        message.error(validation.message);
        return;
      }

      const result = await reserveSoftware(currentUserId, softwareInfo.id);

      if (result.success) {
        // 更新用户状态
        setUserStatus(prev => ({
          ...prev,
          hasReserved: true,
          reserveDate: new Date().toISOString().split('T')[0]
        }));

        message.success('预约成功！我们会在软件发布时通知您');
        setReserveModalVisible(false);
        setSelectedDevice('');
      } else {
        message.error(formatErrorMessage(result.error));
      }

    } catch (error) {
      message.error('预约失败，请稍后重试');
    }
  };

  // 处理购买
  const handlePurchase = () => {
    if (!softwareInfo || softwareInfo.status !== '现货') {
      message.error('该软件当前不可购买');
      return;
    }
    setPurchaseModalVisible(true);
  };

  // 确认购买 - 使用新的接口
  const handleConfirmPurchase = async () => {
    if (!selectedDevice) {
      message.error('请选择要绑定的设备类型');
      return;
    }

    try {
      const currentUserId = localStorage.getItem('userId') || 'current_user_id';

      // 构建购买数据
      const purchaseData = {
        userid: currentUserId,
        developerid: softwareInfo.developerId,
        price: parseFloat(softwareInfo.price.replace('¥', '')),
        softwareid: softwareInfo.id
      };

      // 参数验证
      const validation = validatePurchaseData(purchaseData);
      if (!validation.valid) {
        message.error(validation.message);
        return;
      }

      const result = await purchaseSoftware(purchaseData);

      if (result.success) {
        // 更新用户状态
        setUserStatus(prev => ({
          ...prev,
          hasPurchased: true,
          purchaseDate: new Date().toISOString().split('T')[0],
          licenseType: 'standard'
        }));

        message.success('购买成功！软件将在5分钟内发送到您的设备');
        setPurchaseModalVisible(false);
        setSelectedDevice('');
      } else {
        message.error(formatErrorMessage(result.error));
      }

    } catch (error) {
      message.error('购买失败，请稍后重试');
    }
  };

  // 处理下载 - 使用新的接口
  const handleDownload = async () => {
    try {
      const result = await downloadSoftware(softwareInfo.id);

      if (result.success) {
        message.success(result.data.message);
      } else {
        message.error(formatErrorMessage(result.error));
      }
    } catch (error) {
      message.error('下载失败，请稍后重试');
    }
  };

  // 绑定设备
  const handleBindDevice = () => {
    setBindDeviceModalVisible(true);
  };

  // 确认绑定设备
  const handleConfirmBindDevice = async () => {
    if (!selectedDevice) {
      message.error('请选择设备类型');
      return;
    }

    try {
      // TODO: 调用绑定设备API
      /*
      await bindDevice({
        softwareId: softwareInfo.id,
        deviceType: selectedDevice,
        deviceName: `新设备 ${boundDevices.length + 1}`
      });
      */

      await new Promise(resolve => setTimeout(resolve, 500));

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

    } catch (error) {
      message.error('绑定失败，请稍后重试');
    }
  };

  // 解绑设备
  const handleUnbindDevice = async (deviceId) => {
    try {
      // TODO: 调用解绑设备API
      /*
      await unbindDevice(deviceId);
      */

      await new Promise(resolve => setTimeout(resolve, 300));

      setBoundDevices(boundDevices.filter(device => device.id !== deviceId));
      message.success('设备解绑成功');

    } catch (error) {
      message.error('解绑失败，请稍后重试');
    }
  };

  // 评论相关回调函数
  const handleCommentSubmit = (comment) => {
    console.log('新评论提交:', comment);
  };

  const handleCommentDelete = (commentId) => {
    console.log('删除评论:', commentId);
  };

  // 获取主要按钮的配置
  const getMainButtonConfig = () => {
    // 已购买：显示安装按钮
    if (userStatus.hasPurchased) {
      return {
        text: '立即安装',
        type: 'primary',
        disabled: false,
        onClick: handleDownload
      };
    }

    // 软件状态为可预约
    if (softwareInfo.status === '可预约') {
      if (userStatus.hasReserved) {
        // 已预约：显示已预约状态
        return {
          text: '已预约',
          type: 'default',
          disabled: true,
          onClick: null
        };
      } else {
        // 未预约：显示预约按钮
        return {
          text: '立即预约',
          type: 'primary',
          disabled: false,
          onClick: handleReserve
        };
      }
    }

    // 软件状态为现货：显示购买按钮
    return {
      text: '立即购买',
      type: 'primary',
      disabled: false,
      onClick: handlePurchase
    };
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
  const mainButtonConfig = getMainButtonConfig();

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
              <Button
                type={mainButtonConfig.type}
                size="large"
                className={styles.purchaseBtn}
                onClick={mainButtonConfig.onClick}
                disabled={mainButtonConfig.disabled}
              >
                {mainButtonConfig.text}
              </Button>
            </div>

            <div className={styles.metaInfo}>
              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>{softwareInfo.price}</span>
                <Badge
                  color={statusConfig.color}
                  text={statusConfig.text}
                  className={styles.statusBadge}
                />
                {userStatus.hasPurchased && (
                  <Tag color="green" className={styles.purchasedTag}>
                    已购买 ({userStatus.purchaseDate})
                  </Tag>
                )}
                {userStatus.hasReserved && !userStatus.hasPurchased && (
                  <Tag color="orange" className={styles.reservedTag}>
                    已预约 ({userStatus.reserveDate})
                  </Tag>
                )}
              </div>

              <div className={styles.detailMeta}>
                <span className={styles.metaItem}>版本: {softwareInfo.version}</span>
                <span className={styles.metaItem}>类别: {softwareInfo.category}</span>
              </div>

              <p className={styles.description}>{softwareInfo.description}</p>

              <div className={styles.actionButtons}>
                {/* 根据状态显示不同的操作按钮 */}
                {!userStatus.hasPurchased && !userStatus.hasReserved && softwareInfo.status === '可预约' && (
                  <Button
                    type="primary"
                    icon={<CalendarOutlined />}
                    size="large"
                    onClick={handleReserve}
                    className={styles.actionBtn}
                  >
                    预约
                  </Button>
                )}

                {!userStatus.hasPurchased && softwareInfo.status === '现货' && (
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    onClick={handlePurchase}
                    className={styles.actionBtn}
                  >
                    购买
                  </Button>
                )}

                {userStatus.hasPurchased && (
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
          {(softwareInfo.images || staticImages).map((image, index) => (
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
          {(softwareInfo.features || staticFeatures)
            .slice(0, expandedFeatures ? (softwareInfo.features || staticFeatures).length : 3)
            .map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* 已绑定设备 - 只有已购买才显示 */}
      {userStatus.hasPurchased && (
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

      {/* 用户评论区 */}
      <CommentSection
        softwareId={softwareInfo.id}
        userInfo={{
          hasPurchased: userStatus.hasPurchased,
          userId: 'current_user_id',
          username: '当前用户',
          avatar: 'https://picsum.photos/40/40?random=100'
        }}
        onCommentSubmit={handleCommentSubmit}
        onCommentDelete={handleCommentDelete}
        className={styles.commentSectionContainer}
      />

      {/* 预约弹窗 */}
      <Modal
        title="预约软件"
        open={reserveModalVisible}
        onOk={handleConfirmReserve}
        onCancel={() => setReserveModalVisible(false)}
        okText="确认预约"
        cancelText="取消"
        width={480}
      >
        <div className={styles.modalContent}>
          <p className={styles.modalDesc}>请选择要使用软件的设备类型：</p>
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
          <div className={styles.reserveInfo}>
            <div className={styles.reservePrice}>
              <span>预约价格：</span>
              <span className={styles.finalPrice}>{softwareInfo.price}</span>
            </div>
            <p className={styles.reserveNote}>
              * 预约成功后，我们会在软件发布时第一时间通知您<br />
              * 预约用户可享受首发优惠价格
            </p>
          </div>
        </div>
      </Modal>

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