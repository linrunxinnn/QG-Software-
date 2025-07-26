import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Tag, Modal, Button, Select, message, Collapse, Badge, Avatar, Card, Dropdown, Menu, Space } from 'antd';
import { DownloadOutlined, ShoppingCartOutlined, DesktopOutlined, MobileOutlined, TabletOutlined, ExpandAltOutlined, UserOutlined, HeartOutlined, HeartFilled, CalendarOutlined, HistoryOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import CommentSection from '../../component/CommentSection/CommentSection';
import {
  getSoftwareDetailPageData,
  mapSoftwareData,
  mapDeveloperData,
  getSubscribeStatus
} from '../../api/service/softwareDetailApi';
import {
  toggleFollowDeveloper,
  purchaseSoftware,
  reserveSoftware,
  downloadSoftware,
  validatePurchaseData,
  validateReserveData,
  formatErrorMessage,
  getSoftwareStatus,
  mapSoftwareStatus,
  getSoftwareVersions,
  mapVersionsData,
  downloadSoftwareVersion,
  bindDeviceWithMachineCode
} from '../../api/service/userOperationApi';
import styles from './SoftwareDetail.module.css';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { Panel } = Collapse;

const SoftwareDetail = () => {
  const { id: softwareId } = useParams(); // 从路由参数获取软件ID

  // 新增：用户ID状态追踪
  const [currentUserId, setCurrentUserId] = useState(null);
  const prevUserIdRef = useRef(null);

  // 统一的用户ID获取函数
  const getCurrentUserId = useCallback(() => {
    try {
      // 优先从 localStorage 的 'user' 对象中获取 id
      const user = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        if (userObj && userObj.id) {
          return Number(userObj.id);
        }
      }

      // 备选方案：从 'userId' 中获取
      const userId = localStorage.getItem('userId');
      if (userId && userId !== 'current_user_id') {
        return Number(userId);
      }

      // 如果都没有，返回 null 而不是字符串
      console.warn('未找到有效的用户ID');
      return null;
    } catch (error) {
      console.error('获取用户ID失败:', error);
      return null;
    }
  }, []);

  // 软件基本信息状态
  const [softwareInfo, setSoftwareInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  //  新的状态管理 - 使用统一的状态对象
  const [softwareStatus, setSoftwareStatus] = useState({
    softwareStatus: '暂不可用',    // 软件状态：可预约/现货
    canReserve: false,            // 是否可以预约
    canPurchase: false,           // 是否可以购买
    hasReserved: false,           // 是否已预约
    hasPurchased: false,          // 是否已购买
    canDownload: false,           // 是否可以下载
    buttonConfig: {               // 主按钮配置
      text: '暂不可用',
      type: 'default',
      disabled: true,
      action: null
    }
  });

  //  新增：版本管理状态
  const [versionsData, setVersionsData] = useState([]);
  const [versionsLoading, setVersionsLoading] = useState(false);

  // 开发商信息状态
  const [developerInfo, setDeveloperInfo] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // 修改：弹窗状态管理
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [reserveModalVisible, setReserveModalVisible] = useState(false);
  const [bindingDevice, setBindingDevice] = useState(false); // 绑定设备加载状态
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

  // 新增：监听用户ID变化的Hook
  useEffect(() => {
    const checkUserIdChange = () => {
      const newUserId = getCurrentUserId();
      const prevUserId = prevUserIdRef.current;

      // 更新当前用户ID状态
      setCurrentUserId(newUserId);

      // 如果用户ID发生了变化，重新获取相关数据
      if (newUserId !== prevUserId) {
        console.log('检测到用户ID变化:', {
          from: prevUserId,
          to: newUserId
        });

        // 更新ref值
        prevUserIdRef.current = newUserId;

        // 如果软件信息已经加载，则只更新用户相关数据
        if (softwareInfo) {
          updateUserRelatedData(newUserId);
        }
        // 如果软件信息还未加载，fetchSoftwareDetail会处理
      }
    };

    // 初始检查
    checkUserIdChange();

    // 监听localStorage变化（跨标签页同步）
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'userId') {
        console.log('检测到localStorage变化:', e.key);
        checkUserIdChange();
      }
    };

    // 定期检查用户ID变化（处理同一标签页内的登录）
    const intervalId = setInterval(checkUserIdChange, 1000);

    // 添加事件监听
    window.addEventListener('storage', handleStorageChange);

    // 清理
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [getCurrentUserId, softwareInfo]);

  //  新增：更新用户相关数据的函数
  const updateUserRelatedData = async (userId) => {
    if (!softwareInfo) return;

    try {
      console.log('更新用户相关数据:', { userId, softwareId: softwareInfo.id });

      // 1. 更新软件状态
      if (userId) {
        await fetchSoftwareStatus(softwareInfo.id, userId);
      } else {
        // 用户登出，设置默认状态
        setDefaultSoftwareStatus();
      }

      // 2. 更新关注状态
      if (userId && developerInfo) {
        const subscribeResult = await getSubscribeStatus(developerInfo.id, userId);
        if (subscribeResult.success) {
          setIsFollowing(subscribeResult.data);
        }
      } else {
        // 用户登出，重置关注状态
        setIsFollowing(false);
      }

    } catch (error) {
      console.error('更新用户相关数据失败:', error);
    }
  };

  // 页面加载时获取数据
  useEffect(() => {
    if (softwareId) {
      fetchSoftwareDetail();
    }
  }, [softwareId]);

  //  当用户已购买时获取版本信息
  useEffect(() => {
    if (softwareStatus.hasPurchased && softwareId) {
      fetchSoftwareVersions();
    }
  }, [softwareStatus.hasPurchased, softwareId]);

  // 简化：直接绑定当前设备的机械码
  const bindCurrentDevice = async () => {
    try {
      setBindingDevice(true);

      if (!currentUserId) {
        message.error('用户未登录，无法绑定设备');
        return { success: false, error: '用户未登录' };
      }

      if (!softwareInfo) {
        message.error('软件信息不存在，无法绑定设备');
        return { success: false, error: '软件信息不存在' };
      }

      console.log('正在绑定设备，用户ID:', currentUserId, '软件ID:', softwareInfo.id);

      //  调用修复后的绑定API
      const result = await bindDeviceWithMachineCode(currentUserId, softwareInfo.id, softwareInfo.name);

      if (result.success) {
        message.success('设备绑定成功！机械码已保存到数据库');
        return { success: true, data: result.data };
      } else {
        // 显示具体的错误信息
        message.error(result.error);
        return { success: false, error: result.error };
      }

    } catch (error) {
      console.error('绑定设备失败:', error);
      message.error('绑定失败，请稍后重试');
      return { success: false, error: error.message };
    } finally {
      setBindingDevice(false);
    }
  };

  // 获取软件详情和相关数据
  const fetchSoftwareDetail = async () => {
    try {
      setLoading(true);
      const userId = getCurrentUserId();

      console.log("获取到的用户ID:", userId, "类型:", typeof userId);

      if (!userId) {
        console.warn('用户未登录，仅获取软件基本信息');
      }

      // 1️⃣ 使用修复后的API获取软件详情
      const result = await getSoftwareDetailPageData(softwareId, userId);

      if (result.success && result.data.software) {
        const { software, developer, isFollowing: followingStatus } = result.data;

        setSoftwareInfo(software);
        setDeveloperInfo(developer);
        setIsFollowing(followingStatus);

        // 2️⃣ 获取软件状态（需要用户登录）
        if (userId) {
          await fetchSoftwareStatus(software.id, userId);
        } else {
          // 用户未登录时的默认状态
          setDefaultSoftwareStatus();
        }

      } else {
        console.warn('API获取失败，使用模拟数据:', result.error);
        await loadMockData();
      }

    } catch (error) {
      console.error('获取软件详情失败:', error);
      message.error('获取软件信息失败，使用模拟数据');
      await loadMockData();
    } finally {
      setLoading(false);
    }
  };

  // 新的软件状态获取函数
  const fetchSoftwareStatus = async (softwareId, userId) => {
    try {
      console.log('正在获取软件状态:', { userId, softwareId, userIdType: typeof userId });

      // 调用新的软件状态API，确保传递数值类型的用户ID
      const result = await getSoftwareStatus(userId, softwareId);

      if (result.success) {
        console.log('软件状态API返回:', result.data);

        // 使用新的映射函数处理状态数据
        const mappedStatus = mapSoftwareStatus(result.data);
        console.log('映射后的软件状态:', mappedStatus);

        setSoftwareStatus(mappedStatus);

      } else {
        console.error('获取软件状态失败:', result.error);
        setDefaultSoftwareStatus();
      }

    } catch (error) {
      console.error('获取软件状态异常:', error);
      setDefaultSoftwareStatus();
    }
  };

  // 获取软件版本列表
  const fetchSoftwareVersions = async () => {
    try {
      setVersionsLoading(true);
      console.log('正在获取软件版本列表:', { softwareId });

      const result = await getSoftwareVersions(softwareId);

      if (result.success) {
        console.log('版本列表API返回:', result.data);
        const mappedVersions = mapVersionsData(result.data);
        console.log('映射后的版本数据:', mappedVersions);
        setVersionsData(mappedVersions);
      } else {
        console.warn('获取版本列表失败，使用模拟数据:', result.error);
        setVersionsData(getMockVersions());
      }

    } catch (error) {
      console.error('获取版本列表异常:', error);
      setVersionsData(getMockVersions());
    } finally {
      setVersionsLoading(false);
    }
  };

  // 模拟版本数据
  const getMockVersions = () => {
    return [
      {
        id: '1',
        version: 'v25.0.1',
        link: 'https://example.com/download/v25.0.1',
        releaseDate: '2024-07-01',
        size: '2.1 GB',
        description: '最新版本，修复已知问题，优化性能',
        isLatest: true
      },
      {
        id: '2',
        version: 'v25.0.0',
        link: 'https://example.com/download/v25.0.0',
        releaseDate: '2024-06-15',
        size: '2.0 GB',
        description: '重大更新，新增AI功能',
        isLatest: false
      },
      {
        id: '3',
        version: 'v24.7.3',
        link: 'https://example.com/download/v24.7.3',
        releaseDate: '2024-05-20',
        size: '1.9 GB',
        description: '稳定版本，兼容性优化',
        isLatest: false
      }
    ];
  };

  //  设置默认软件状态
  const setDefaultSoftwareStatus = () => {
    setSoftwareStatus({
      softwareStatus: '暂不可用',
      canReserve: false,
      canPurchase: false,
      hasReserved: false,
      hasPurchased: false,
      canDownload: false,
      buttonConfig: {
        text: '暂不可用',
        type: 'default',
        disabled: true,
        action: null
      }
    });
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
      status: '现货',
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

    // 模拟软件状态
    await fetchMockSoftwareStatus(mockSoftwareData.id);
  };

  //  模拟软件状态获取
  const fetchMockSoftwareStatus = async (softwareId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      // 随机生成一个状态码进行测试
      const mockStatusCodes = [0, 1, 3, 4];
      const randomStatusCode = mockStatusCodes[Math.floor(Math.random() * mockStatusCodes.length)];

      console.log('模拟状态码:', randomStatusCode);
      const mappedStatus = mapSoftwareStatus(randomStatusCode);
      setSoftwareStatus(mappedStatus);

    } catch (error) {
      console.error('获取模拟软件状态失败:', error);
      setDefaultSoftwareStatus();
    }
  };

  // 修改：处理关注/取消关注 - 使用currentUserId
  const handleFollowToggle = async () => {
    if (!developerInfo) return;

    if (!currentUserId) {
      message.error('请先登录');
      return;
    }

    setFollowLoading(true);
    try {
      console.log('关注操作，用户ID类型:', typeof currentUserId, '值:', currentUserId);

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

  // 统一的按钮点击处理函数
  const handleMainButtonClick = () => {
    const action = softwareStatus.buttonConfig.action;

    switch (action) {
      case 'reserve':
        handleReserve();
        break;
      case 'purchase':
        handlePurchase();
        break;
      case 'download':
        handleDownload();
        break;
      default:
        break;
    }
  };

  //  修改：处理预约 - 使用currentUserId
  const handleReserve = () => {
    if (!currentUserId) {
      message.error('请先登录');
      return;
    }

    if (!softwareStatus.canReserve) {
      message.error('该软件当前不支持预约');
      return;
    }
    setReserveModalVisible(true);
  };

  //  修改：确认预约 - 使用currentUserId
  const handleConfirmReserve = async () => {
    try {
      if (!currentUserId) {
        message.error('请先登录');
        return;
      }

      const validation = validateReserveData(currentUserId, softwareInfo.id);
      if (!validation.valid) {
        message.error(validation.message);
        return;
      }

      console.log('预约操作，用户ID类型:', typeof currentUserId, '值:', currentUserId);

      const result = await reserveSoftware(currentUserId, softwareInfo.id);

      if (result.success) {
        //  预约成功后，重新获取软件状态
        await fetchSoftwareStatus(softwareInfo.id, currentUserId);
        message.success('预约成功！我们会在软件发布时通知您');
        setReserveModalVisible(false);
      } else {
        message.error(formatErrorMessage(result.error));
      }
    } catch (error) {
      message.error('预约失败，请稍后重试');
    }
  };

  // 处理购买 - 使用currentUserId
  const handlePurchase = () => {
    if (!currentUserId) {
      message.error('请先登录');
      return;
    }

    if (!softwareStatus.canPurchase) {
      message.error('该软件当前不可购买');
      return;
    }
    setPurchaseModalVisible(true);
  };

  //  修改：确认购买 - 使用currentUserId
  const handleConfirmPurchase = async () => {
    try {
      if (!currentUserId) {
        message.error('请先登录');
        return;
      }

      const purchaseData = {
        userid: currentUserId,  // 确保传递数值类型
        developerid: softwareInfo.developerId,
        price: parseFloat(softwareInfo.price.replace('¥', '')),
        softwareid: softwareInfo.id
      };

      console.log('购买操作，用户ID类型:', typeof currentUserId, '值:', currentUserId);
      console.log('购买数据:', purchaseData);

      const validation = validatePurchaseData(purchaseData);
      if (!validation.valid) {
        message.error(validation.message);
        return;
      }

      const result = await purchaseSoftware(purchaseData);

      if (result.success) {
        //  购买成功后，重新获取软件状态
        await fetchSoftwareStatus(softwareInfo.id, currentUserId);

        message.success('购买成功！');
        setPurchaseModalVisible(false);

        //  购买成功后自动绑定当前设备
        await bindCurrentDevice();
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
        // 下载后不需要更新状态，因为用户可以一直下载
      } else {
        message.error(formatErrorMessage(result.error));
      }
    } catch (error) {
      message.error('下载失败，请稍后重试');
    }
  };

  //  处理版本下载
  const handleVersionDownload = async (version) => {
    try {
      const result = await downloadSoftwareVersion(version.link, version.version);

      if (result.success) {
        message.success(result.data.message);
      } else {
        message.error(formatErrorMessage(result.error));
      }
    } catch (error) {
      message.error('下载失败，请稍后重试');
    }
  };

  //  生成版本下拉菜单
  const getVersionsMenu = () => {
    if (!versionsData || versionsData.length === 0) {
      return (
        <Menu>
          <Menu.Item disabled>
            暂无其他版本
          </Menu.Item>
        </Menu>
      );
    }

    return (
      <Menu className={styles.versionsMenu}>
        {versionsData.map((version) => (
          <Menu.Item
            key={version.id}
            className={styles.versionMenuItem}
            onClick={() => handleVersionDownload(version)}
          >
            <div className={styles.versionInfo}>
              <div className={styles.versionHeader}>
                <span className={styles.versionNumber}>
                  {version.version}
                  {version.isLatest && (
                    <Tag color="green" size="small" className={styles.latestTag}>
                      最新
                    </Tag>
                  )}
                </span>
                <span className={styles.versionSize}>{version.size}</span>
              </div>
              <div className={styles.versionDetails}>
                <span className={styles.versionDate}>{version.releaseDate}</span>
                <span className={styles.versionDesc}>{version.description}</span>
              </div>
            </div>
            <DownloadOutlined className={styles.downloadIcon} />
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  //  修改：手动绑定设备（已购买用户可以使用）
  const handleBindDevice = async () => {
    await bindCurrentDevice();
  };

  // 评论相关回调函数
  const handleCommentSubmit = (comment) => {
    console.log('新评论提交:', comment);
  };

  const handleCommentDelete = (commentId) => {
    console.log('删除评论:', commentId);
  };

  //  获取状态颜色和文本配置
  const getStatusConfig = (status) => {
    const configs = {
      '现货': { color: 'green', text: '现货' },
      '可预约': { color: 'orange', text: '可预约' },
      '暂不可用': { color: 'gray', text: '暂不可用' }
    };
    return configs[status] || configs['暂不可用'];
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

  const statusConfig = getStatusConfig(softwareStatus.softwareStatus);
  const mainButtonConfig = softwareStatus.buttonConfig;

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
              {currentUserId && (
                <Button
                  type={isFollowing ? 'default' : 'primary'}
                  icon={isFollowing ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleFollowToggle}
                  loading={followLoading}
                  className={`${styles.followBtn} ${isFollowing ? styles.following : ''}`}
                >
                  {isFollowing ? '已关注' : '关注'}
                </Button>
              )}
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
              <div className={styles.downloadButtonGroup}>
                <Button
                  type={mainButtonConfig.type}
                  size="large"
                  className={styles.purchaseBtn}
                  onClick={handleMainButtonClick}
                  disabled={mainButtonConfig.disabled}
                >
                  {mainButtonConfig.text}
                </Button>

                {/*  多版本下载下拉按钮 - 只有已购买时显示 */}
                {softwareStatus.hasPurchased && (
                  <Dropdown
                    overlay={getVersionsMenu()}
                    placement="bottomRight"
                    arrow
                    disabled={versionsLoading}
                    overlayClassName={styles.versionsDropdown}
                  >
                    <Button
                      type="default"
                      size="large"
                      icon={<HistoryOutlined />}
                      className={styles.versionsBtn}
                      loading={versionsLoading}
                    >
                      其他版本
                    </Button>
                  </Dropdown>
                )}
              </div>
            </div>

            <div className={styles.metaInfo}>
              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>{softwareInfo.price}</span>
                <Badge
                  color={statusConfig.color}
                  text={statusConfig.text}
                  className={styles.statusBadge}
                />
                {/*  根据新状态显示标签 */}
                {softwareStatus.hasPurchased && (
                  <Tag color="green" className={styles.purchasedTag}>
                    已购买
                  </Tag>
                )}
                {softwareStatus.hasReserved && !softwareStatus.hasPurchased && (
                  <Tag color="orange" className={styles.reservedTag}>
                    已预约
                  </Tag>
                )}
              </div>

              <div className={styles.detailMeta}>
                <span className={styles.metaItem}>版本: {softwareInfo.version}</span>
                <span className={styles.metaItem}>类别: {softwareInfo.category}</span>
              </div>

              <p className={styles.description}>{softwareInfo.description}</p>

              {currentUserId && (
                <div className={styles.actionButtons}>
                  {/* 根据新状态显示不同的操作按钮 */}
                  {softwareStatus.canReserve && !softwareStatus.hasReserved && (
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

                  {softwareStatus.canPurchase && (
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

                  {/* 已购买用户可以手动绑定设备 */}
                  {softwareStatus.hasPurchased && (
                    <Button
                      icon={<DesktopOutlined />}
                      size="large"
                      onClick={handleBindDevice}
                      loading={bindingDevice}
                      className={styles.actionBtn}
                    >
                      绑定本机
                    </Button>
                  )}
                </div>
              )}
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

      {/* 用户评论区 */}
      <CommentSection
        softwareId={softwareInfo.id}
        userInfo={{
          hasPurchased: softwareStatus.hasPurchased,
          userId: currentUserId || 'guest',
          username: currentUserId ? '当前用户' : '游客',
          avatar: 'https://picsum.photos/40/40?random=100'
        }}
        onCommentSubmit={handleCommentSubmit}
        onCommentDelete={handleCommentDelete}
        className={styles.commentSectionContainer}
      />

      {/*  修改：预约弹窗 - 简化，去掉设备选择 */}
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
          <div className={styles.reserveInfo}>
            <div className={styles.reservePrice}>
              <span>预约价格：</span>
              <span className={styles.finalPrice}>{softwareInfo.price}</span>
            </div>
            <p className={styles.reserveNote}>
              * 预约成功后，我们会在软件发布时第一时间通知您<br />
              * 预约用户可享受首发优惠价格<br />
              * 预约无需绑定设备，购买时自动绑定当前设备
            </p>
          </div>
        </div>
      </Modal>

      {/*  修改：购买弹窗 - 改成绑定本机说明 */}
      <Modal
        title="购买软件"
        open={purchaseModalVisible}
        onOk={handleConfirmPurchase}
        onCancel={() => setPurchaseModalVisible(false)}
        okText="确认购买并绑定本机"
        cancelText="取消"
        width={480}
      >
        <div className={styles.modalContent}>
          <div className={styles.purchaseInfo}>
            <div className={styles.purchasePrice}>
              <span>购买价格：</span>
              <span className={styles.finalPrice}>{softwareInfo.price}</span>
            </div>
            <div className={styles.bindInfo}>
              <p className={styles.bindNote}>
                * 购买成功后将自动获取本机机械码并绑定<br />
                * 每个软件最多可绑定3台设备<br />
                * 绑定后可在对应设备上激活使用<br />
                * 重复绑定或超过3台设备会绑定失败
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SoftwareDetail;