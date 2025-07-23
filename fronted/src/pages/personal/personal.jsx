import React, { useState, useRef } from 'react';
import {
  User,
  Heart,
  ShoppingCart,
  Clock,
  Edit3,
  Settings,
  X,
  Send
} from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import styles from './personal.module.css';

const Personal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const followingContentRef = useRef(null);

  // 用户数据
  const [userInfo, setUserInfo] = useState({
    id: 1,
    username: '张三',
    avatar: 'https://picsum.photos/120/120?random=1',
    role: 'user', // 'admin', 'user', 'developer'
    email: 'zhangsan@example.com',
    bio: '热爱技术，专注于软件开发和用户体验设计。喜欢探索新技术，分享开发经验。',
    followingCount: 128,
    followerCount: 256,
  });

  // 统计数据
  const [statistics] = useState({
    purchasedCount: 8,
    reservedCount: 3,
    totalSpent: '¥2,850'
  });

  // 弹窗状态
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeForm, setUpgradeForm] = useState({
    reason: '',
    experience: '',
    portfolio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 获取身份标签颜色和文本
  const getRoleConfig = (role) => {
    const configs = {
      'admin': { color: '#ef4444', text: '管理员' },
      'user': { color: '#3b82f6', text: '用户' },
      'developer': { color: '#10b981', text: '软件开发商' }
    };
    return configs[role] || configs['user'];
  };

  // 处理编辑资料 - 显示升级弹窗
  const handleEditProfile = () => {
    if (userInfo.role === 'user') {
      setShowUpgradeModal(true);
    } else {
      console.log('编辑资料');
    }
  };

  // 处理升级申请表单提交
  const handleUpgradeSubmit = async (e) => {
    e.preventDefault();
    if (!upgradeForm.reason.trim()) {
      alert('请填写申请理由');
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 这里应该调用实际的API
      console.log('升级申请提交：', upgradeForm);

      alert('申请已提交，我们会在3-5个工作日内审核您的申请');
      setShowUpgradeModal(false);
      setUpgradeForm({ reason: '', experience: '', portfolio: '' });
    } catch (error) {
      alert('提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
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
    navigate(path);
  };

  // 检查是否在主页面（显示导航卡片）
  const isMainPage = location.pathname === '/personal' || location.pathname === '/personal/';

  // Tab 配置 - 根据用户身份动态调整
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
      path: '/personal/momentsLayout',
      showForDeveloper: true // 标记这个tab需要开发商身份
    },
    {
      key: 'appointment',
      label: '软件详情',
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
      {/* 升级为开发商弹窗 */}
      {showUpgradeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>申请成为软件开发商</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowUpgradeModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpgradeSubmit} className={styles.upgradeForm}>
              <div className={styles.formGroup}>
                <label>申请理由 *</label>
                <textarea
                  value={upgradeForm.reason}
                  onChange={(e) => setUpgradeForm({
                    ...upgradeForm,
                    reason: e.target.value
                  })}
                  placeholder="请详细说明您申请成为软件开发商的理由..."
                  rows={4}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>开发经验</label>
                <textarea
                  value={upgradeForm.experience}
                  onChange={(e) => setUpgradeForm({
                    ...upgradeForm,
                    experience: e.target.value
                  })}
                  placeholder="请简述您的软件开发经验（选填）"
                  rows={3}
                />
              </div>
              <div className={styles.formGroup}>
                <label>作品集链接</label>
                <input
                  type="url"
                  value={upgradeForm.portfolio}
                  onChange={(e) => setUpgradeForm({
                    ...upgradeForm,
                    portfolio: e.target.value
                  })}
                  placeholder="https://your-portfolio.com（选填）"
                />
              </div>
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowUpgradeModal(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>提交中...</>
                  ) : (
                    <>
                      <Send size={16} />
                      提交申请
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 用户信息头部 */}
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
            </div>
          </div>
          <div className={styles.userActions}>
            <button className={styles.actionBtn} onClick={handleEditProfile}>
              <Edit3 size={16} />
              {userInfo.role === 'user' ? '升级为开发商' : '编辑资料'}
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
              <p className={styles.navDesc}>
                {userInfo.role === 'developer'
                  ? '查看我的最新动态和活动记录'
                  : '暂无动态，升级为开发商后可发布动态'
                }
              </p>
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

      {/* 我的关注内容区域 */}
      {isMainPage && (
        <div ref={followingContentRef} className={styles.followingContent}>
          <Outlet context={{ userInfo, statistics }} />
        </div>
      )}

      {/* 其他页面内容区域 */}
      {!isMainPage && (
        <div className={styles.contentSection}>
          <div className={styles.tabContentWrapper}>
            {/* 如果是动态页面且用户不是开发商，显示提示 */}
            {activeTab === 'momentsLayout' && userInfo.role !== 'developer' ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <User size={48} />
                </div>
                <h3>暂无动态</h3>
                <p>只有软件开发商可以发布动态，申请成为开发商后即可使用此功能。</p>
                <button
                  className={styles.upgradePromptBtn}
                  onClick={() => setShowUpgradeModal(true)}
                >
                  申请成为开发商
                </button>
              </div>
            ) : (
              <Outlet context={{ userInfo, statistics }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;