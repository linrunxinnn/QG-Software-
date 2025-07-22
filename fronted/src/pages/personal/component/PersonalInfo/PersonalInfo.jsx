import React from 'react';
import styles from './PersonalInfo.module.css';

const PersonalInfo = ({ userInfo, statistics }) => {
  // 获取身份标签颜色和文本
  const getRoleConfig = (role) => {
    const configs = {
      'admin': { color: '#ef4444', text: '管理员' },
      'user': { color: '#3b82f6', text: '用户' },
      'developer': { color: '#10b981', text: '软件开发商' }
    };
    return configs[role] || configs['user'];
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>基本信息</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.label}>用户名：</span>
              <span className={styles.value}>{userInfo.username}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>身份：</span>
              <span
                className={styles.roleTag}
                style={{ backgroundColor: getRoleConfig(userInfo.role).color }}
              >
                {getRoleConfig(userInfo.role).text}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>邮箱：</span>
              <span className={styles.value}>{userInfo.email || '未设置'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>手机：</span>
              <span className={styles.value}>{userInfo.phone || '未设置'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>加入时间：</span>
              <span className={styles.value}>{userInfo.joinDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3 className={styles.cardTitle}>账户统计</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>
                {userInfo.role === 'developer' ? userInfo.followerCount : userInfo.followingCount}
              </div>
              <div className={styles.statLabel}>
                {userInfo.role === 'developer' ? '粉丝数' : '关注数'}
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{statistics?.purchasedCount || 0}</div>
              <div className={styles.statLabel}>已购软件</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{statistics?.reservedCount || 0}</div>
              <div className={styles.statLabel}>预约软件</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>{statistics?.totalSpent || '¥0'}</div>
              <div className={styles.statLabel}>总消费</div>
            </div>
          </div>
        </div>

        {userInfo.bio && (
          <div className={`${styles.infoCard} ${styles.bioCard}`}>
            <h3 className={styles.cardTitle}>个人简介</h3>
            <p className={styles.bioText}>{userInfo.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;