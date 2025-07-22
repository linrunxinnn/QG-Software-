import React, { useState, useRef } from 'react';
import {
  User,
  Heart,
  ShoppingCart,
  Clock,
  Edit3,
  Settings
} from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import styles from './personal.module.css';

const Personal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const followingContentRef = useRef(null);

  // 用户数据
  const [userInfo] = useState({
    id: 1,
    username: '张三',
    avatar: 'https://picsum.photos/120/120?random=1',
    role: 'user', // 'admin', 'user', 'developer'
    email: 'zhangsan@example.com',
    phone: '138****8888',
    bio: '热爱技术，专注于软件开发和用户体验设计。喜欢探索新技术，分享开发经验。',
    followingCount: 128,
    followerCount: 256,
    joinDate: '2023-05-15'
  });

  // 统计数据
  const [statistics] = useState({
    purchasedCount: 8,
    reservedCount: 3,
    totalSpent: '¥2,850'
  });

  // 获取身份标签颜色和文本
  const getRoleConfig = (role) => {
    const configs = {
      'admin': { color: '#ef4444', text: '管理员' },
      'user': { color: '#3b82f6', text: '用户' },
      'developer': { color: '#10b981', text: '软件开发商' }
    };
    return configs[role] || configs['user'];
  };

  // 处理编辑资料
  const handleEditProfile = () => {
    console.log('编辑资料');
  };

  // 处理设置
  const handleSettings = () => {
    navigate('/personal/settings');
  };

  // 导航到不同页面
  const handleNavigate = (path) => {
    navigate(`/personal/${path}`);
  };

  // 平滑滚动到关注内容
  const scrollToFollowing = () => {
    if (followingContentRef.current) {
      followingContentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // 处理tab点击
  const handleTabClick = (tabKey, path) => {
    if (tabKey === '' && (location.pathname === '/personal' || location.pathname === '/personal/')) {
      // 如果已经在主页面，点击"我的关注"tab就滚动到内容区域
      scrollToFollowing();
    } else if (tabKey === '') {
      // 如果不在主页面，先导航到主页面，然后滚动
      navigate('/personal');
      // 使用setTimeout确保导航完成后再滚动
      setTimeout(() => {
        scrollToFollowing();
      }, 100);
    } else {
      // 其他tab正常跳转
      navigate(path);
    }
  };

  // 检查是否在主页面（显示导航卡片）
  const isMainPage = location.pathname === '/personal' || location.pathname === '/personal/';

  // Tab 配置
  const tabs = [
    {
      key: '',
      label: userInfo.role === 'developer' ? '我的粉丝' : '我的关注',
      icon: <Heart size={16} />,
      path: '/personal'
    },
    {
      key: 'momentsLayout',
      label: '动态',
      icon: <User size={16} />,
      path: '/personal/momentsLayout'
    },
    {
      key: 'appointment',
      label: '已预约',
      icon: <Clock size={16} />,
      path: '/personal/appointment'
    },
    {
      key: 'settings',
      label: '设置',
      icon: <Settings size={16} />,
      path: '/personal/settings'
    }
  ];

  // 获取当前活动的tab
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/personal' || path === '/personal/') return '';
    const segments = path.split('/');
    return segments[segments.length - 1] || '';
  };

  const activeTab = getCurrentTab();

  return (
    <div className={styles.personalPage}>
      {/* 用户信息头部 - 固定在主页面 */}
      <div className={styles.userHeader}>
        <div className={styles.userInfo}>
          <img
            src={userInfo.avatar}
            alt={userInfo.username}
            className={styles.userAvatar}
          />
          <div className={styles.userDetails}>
            <div className={styles.userNameSection}>
              <h2 className={styles.userName}>{userInfo.username}</h2>
              <span
                className={styles.userRole}
                style={{ backgroundColor: getRoleConfig(userInfo.role).color }}
              >
                {getRoleConfig(userInfo.role).text}
              </span>
            </div>
            <div className={styles.userStats}>
              <span className={styles.stat}>
                {userInfo.role === 'developer' ? '粉丝' : '关注'}:
                <strong>
                  {userInfo.role === 'developer' ? userInfo.followerCount : userInfo.followingCount}
                </strong>
              </span>
              <span className={styles.stat}>加入时间: {userInfo.joinDate}</span>
            </div>
          </div>
          <div className={styles.userActions}>
            <button className={styles.actionBtn} onClick={handleEditProfile}>
              <Edit3 size={16} />
              编辑资料
            </button>
            <button className={styles.actionBtn} onClick={handleSettings}>
              <Settings size={16} />
              设置
            </button>
          </div>
        </div>
      </div>

      {/* Tab 导航栏 */}
      <div className={styles.tabBar}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`${styles.tabItem} ${activeTab === tab.key ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(tab.key, tab.path)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 快速导航卡片 - 仅在主页面显示 */}
      {isMainPage && (
        <div className={styles.quickNav}>
          <div
            className={styles.navCard}
            onClick={() => scrollToFollowing()}
          >
            <div className={styles.navIcon}>
              <Heart size={24} />
            </div>
            <div className={styles.navContent}>
              <h3 className={styles.navTitle}>
                {userInfo.role === 'developer' ? '我的粉丝' : '我的关注'}
              </h3>
              <p className={styles.navDesc}>
                {userInfo.role === 'developer'
                  ? `${userInfo.followerCount} 位粉丝关注了你`
                  : `关注了 ${userInfo.followingCount} 个软件开发商`}
              </p>
            </div>
          </div>

          <div
            className={styles.navCard}
            onClick={() => handleNavigate('momentsLayout')}
          >
            <div className={styles.navIcon}>
              <User size={24} />
            </div>
            <div className={styles.navContent}>
              <h3 className={styles.navTitle}>动态</h3>
              <p className={styles.navDesc}>查看我的最新动态和活动记录</p>
            </div>
          </div>

          <div
            className={styles.navCard}
            onClick={() => handleNavigate('appointment')}
          >
            <div className={styles.navIcon}>
              <Clock size={24} />
            </div>
            <div className={styles.navContent}>
              <h3 className={styles.navTitle}>已预约</h3>
              <p className={styles.navDesc}>{statistics.reservedCount} 个软件等待发布</p>
            </div>
          </div>
        </div>
      )}

      {/* 我的关注内容区域 - 添加ref引用 */}
      {isMainPage && (
        <div ref={followingContentRef} className={styles.followingContent}>
          <Outlet context={{ userInfo, statistics }} />
        </div>
      )}

      {/* 其他页面内容区域 */}
      {!isMainPage && (
        <div className={styles.contentSection}>
          <div className={styles.tabContentWrapper}>
            <Outlet context={{ userInfo, statistics }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;