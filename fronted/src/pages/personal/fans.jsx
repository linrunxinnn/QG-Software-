import React, { useState } from 'react';
import { ArrowLeft, Users, Heart, Calendar } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PersonalInfo from './component/PersonalInfo/PersonalInfo';
import styles from './fans.module.css';

const Fans = () => {
  const navigate = useNavigate();
  const { userInfo, statistics } = useOutletContext();

  // 模拟关注/粉丝数据
  const [fansList] = useState([
    {
      id: 1,
      name: 'Adobe Inc.',
      avatar: 'https://picsum.photos/60/60?random=10',
      type: 'company',
      description: '全球领先的创意软件公司，提供Photoshop、Illustrator等专业工具',
      followersCount: 125000,
      softwareCount: 28,
      followDate: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Microsoft',
      avatar: 'https://picsum.photos/60/60?random=11',
      type: 'company',
      description: '微软公司，Office、Windows等产品的开发商',
      followersCount: 89000,
      softwareCount: 45,
      followDate: '2024-02-20',
      verified: true
    },
    {
      id: 3,
      name: 'JetBrains',
      avatar: 'https://picsum.photos/60/60?random=12',
      type: 'company',
      description: '专业开发工具提供商，IntelliJ IDEA、PyCharm等IDE的制作者',
      followersCount: 45000,
      softwareCount: 15,
      followDate: '2024-03-10',
      verified: true
    },
    {
      id: 4,
      name: '独立开发者小张',
      avatar: 'https://picsum.photos/60/60?random=13',
      type: 'individual',
      description: '专注于效率工具开发，已发布多款实用软件',
      followersCount: 1200,
      softwareCount: 5,
      followDate: '2024-04-05',
      verified: false
    }
  ]);

  const [loading, setLoading] = useState(false);

  // 处理返回
  const handleBack = () => {
    navigate('/personal');
  };

  // 处理取消关注（仅用户身份显示）
  const handleUnfollow = (item) => {
    console.log('取消关注:', item.name);
    // 这里实现取消关注逻辑
    // 可以添加确认弹窗
    if (window.confirm(`确定要取消关注 ${item.name} 吗？`)) {
      // 调用API取消关注
      // await unfollowSupplier(item.id);
      // 更新列表或刷新数据
    }
  };

  // 处理查看详情（仅用户身份显示）
  const handleViewProfile = (item) => {
    console.log('查看详情:', item.name);
    // 跳转到供应商详情页面
    navigate(`/supplier/${item.id}`);
  };

  // 确保 userInfo 存在，并提供默认值
  const currentUserRole = userInfo?.role || 'user';
  const pageTitle = currentUserRole === 'developer' ? '我的粉丝' : '我的关注';
  const emptyText = currentUserRole === 'developer' ? '还没有粉丝关注你' : '你还没有关注任何开发商';

  return (
    <div className={styles.fansPage}>
      {/* 个人信息展示 */}
      {userInfo && (
        <div className={styles.personalInfoSection}>
          <PersonalInfo userInfo={userInfo} statistics={statistics} />
        </div>
      )}

      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles.statsInfo}>
            <Users size={16} />
            <span>{fansList.length} 个</span>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : fansList.length === 0 ? (
          <div className={styles.empty}>
            <Users size={48} />
            <h3>暂无数据</h3>
            <p>{emptyText}</p>
          </div>
        ) : (
          <div className={styles.fansList}>
            {fansList.map(item => (
              <div
                key={item.id}
                className={`${styles.fansCard} ${currentUserRole === 'developer' ? styles.noActions : ''}`}
              >
                <div className={styles.fansInfo}>
                  <div className={styles.avatarSection}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={styles.avatar}
                    />
                    {item.verified && (
                      <div className={styles.verifiedBadge}>✓</div>
                    )}
                  </div>

                  <div className={styles.infoSection}>
                    <div className={styles.nameSection}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <span className={styles.type}>
                        {item.type === 'company' ? '企业开发商' : '个人开发者'}
                      </span>
                    </div>
                    <p className={styles.description}>{item.description}</p>

                    <div className={styles.stats}>
                      <div className={styles.statItem}>
                        <Heart size={14} />
                        <span>{item.followersCount.toLocaleString()} 关注者</span>
                      </div>
                      <div className={styles.statItem}>
                        <Users size={14} />
                        <span>{item.softwareCount} 个软件</span>
                      </div>
                      <div className={styles.statItem}>
                        <Calendar size={14} />
                        <span>
                          {currentUserRole === 'developer' ? '关注时间' : '关注于'} {item.followDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 根据用户身份条件渲染操作按钮 */}
                {currentUserRole === 'user' && (
                  <div className={styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => handleViewProfile(item)}
                    >
                      查看详情
                    </button>
                    <button
                      className={styles.unfollowBtn}
                      onClick={() => handleUnfollow(item)}
                    >
                      取消关注
                    </button>
                  </div>
                )}

                {/* 开发商身份不显示任何操作按钮，只显示信息 */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fans;