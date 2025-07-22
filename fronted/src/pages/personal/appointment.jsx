import React, { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Bell, X } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './appointment.module.css';

const Appointment = () => {
  const navigate = useNavigate();
  const { userInfo, statistics } = useOutletContext();
  // 模拟预约软件数据
  const [appointmentList, setAppointmentList] = useState([
    {
      id: 1,
      name: 'AutoCAD 2025',
      icon: 'https://picsum.photos/80/80?random=4',
      developer: 'Autodesk',
      description: '业界领先的CAD设计软件新版本，增加了更多AI辅助功能和云端协作特性。',
      currentVersion: 'v2024.2',
      newVersion: 'v2025.1',
      reserveDate: '2024-07-20',
      expectedReleaseDate: '2024-12-01',
      price: '¥1,680.00',
      status: 'waiting', // waiting, coming_soon, released, cancelled
      priority: 'high', // high, medium, low
      notifyEnabled: true,
      category: 'CAD设计',
      features: ['AI智能建模', '云端协作', '增强渲染', '移动端支持']
    },
    {
      id: 2,
      name: 'Figma Enterprise 2024',
      icon: 'https://picsum.photos/80/80?random=5',
      developer: 'Figma Inc.',
      description: '新一代UI/UX设计工具企业版，提供更强大的团队协作和管理功能。',
      currentVersion: 'v116.7',
      newVersion: 'v2024.1',
      reserveDate: '2024-07-18',
      expectedReleaseDate: '2024-11-15',
      price: '¥380.00/月',
      status: 'coming_soon',
      priority: 'medium',
      notifyEnabled: true,
      category: 'UI设计',
      features: ['高级协作', '企业管理', 'API集成', '高级组件库']
    },
    {
      id: 3,
      name: 'Adobe Creative Suite 2025',
      icon: 'https://picsum.photos/80/80?random=6',
      developer: 'Adobe Inc.',
      description: 'Adobe全套创意工具包2025版本，集成了最新的AI技术和云端服务。',
      currentVersion: 'v2024.1',
      newVersion: 'v2025.1',
      reserveDate: '2024-07-15',
      expectedReleaseDate: '2025-02-01',
      price: '¥2,880.00',
      status: 'waiting',
      priority: 'high',
      notifyEnabled: false,
      category: '创意设计',
      features: ['AI创作助手', '跨应用协作', '云端同步', '移动端集成']
    }
  ]);

  const [loading, setLoading] = useState(false);

  // 获取状态配置
  const getStatusConfig = (status) => {
    const configs = {
      waiting: { text: '等待发布', color: '#f59e0b', bgColor: '#fef3c7' },
      coming_soon: { text: '即将发布', color: '#3b82f6', bgColor: '#dbeafe' },
      released: { text: '已发布', color: '#10b981', bgColor: '#d1fae5' },
      cancelled: { text: '已取消', color: '#ef4444', bgColor: '#fee2e2' }
    };
    return configs[status] || configs['waiting'];
  };

  // 获取优先级配置
  const getPriorityConfig = (priority) => {
    const configs = {
      high: { text: '高', color: '#ef4444' },
      medium: { text: '中', color: '#f59e0b' },
      low: { text: '低', color: '#10b981' }
    };
    return configs[priority] || configs['medium'];
  };

  // 处理返回
  const handleBack = () => {
    navigate('/personal');
  };

  // 计算剩余天数
  const getDaysUntilRelease = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const diffTime = release - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // 处理取消预约
  const handleCancelAppointment = (id) => {
    setAppointmentList(appointmentList.map(item =>
      item.id === id ? { ...item, status: 'cancelled' } : item
    ));
    console.log('取消预约:', id);
  };

  // 处理通知设置
  const handleToggleNotify = (id) => {
    setAppointmentList(appointmentList.map(item =>
      item.id === id ? { ...item, notifyEnabled: !item.notifyEnabled } : item
    ));
  };

  // 处理查看详情
  const handleViewDetail = (item) => {
    console.log('查看详情:', item.name);
  };

  // 过滤已取消的预约
  const activeAppointments = appointmentList.filter(item => item.status !== 'cancelled');

  return (
    <div className={styles.appointmentPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.pageTitle}>已预约软件</h1>
        <div className={styles.statsInfo}>
          <Clock size={16} />
          <span>{activeAppointments.length} 个预约</span>
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : activeAppointments.length === 0 ? (
          <div className={styles.empty}>
            <Clock size={48} />
            <h3>暂无预约</h3>
            <p>还没有预约任何软件，去软件商店看看吧！</p>
          </div>
        ) : (
          <div className={styles.appointmentList}>
            {activeAppointments.map(item => {
              const statusConfig = getStatusConfig(item.status);
              const priorityConfig = getPriorityConfig(item.priority);
              const daysLeft = getDaysUntilRelease(item.expectedReleaseDate);

              return (
                <div key={item.id} className={styles.appointmentCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.softwareInfo}>
                      <img
                        src={item.icon}
                        alt={item.name}
                        className={styles.softwareIcon}
                      />
                      <div className={styles.basicInfo}>
                        <div className={styles.titleRow}>
                          <h3 className={styles.softwareName}>{item.name}</h3>
                          <div className={styles.badges}>
                            <span
                              className={styles.priorityBadge}
                              style={{ color: priorityConfig.color }}
                            >
                              {priorityConfig.text}优先级
                            </span>
                            <span
                              className={styles.statusBadge}
                              style={{
                                color: statusConfig.color,
                                backgroundColor: statusConfig.bgColor
                              }}
                            >
                              {statusConfig.text}
                            </span>
                          </div>
                        </div>
                        <div className={styles.developerInfo}>
                          <span className={styles.developer}>开发商: {item.developer}</span>
                          <span className={styles.category}>{item.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardActions}>
                      <button
                        className={`${styles.notifyBtn} ${item.notifyEnabled ? styles.active : ''}`}
                        onClick={() => handleToggleNotify(item.id)}
                        title={item.notifyEnabled ? '关闭通知' : '开启通知'}
                      >
                        <Bell size={16} />
                      </button>
                      <button
                        className={styles.cancelBtn}
                        onClick={() => handleCancelAppointment(item.id)}
                        title="取消预约"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.cardBody}>
                    <p className={styles.description}>{item.description}</p>

                    <div className={styles.versionInfo}>
                      <div className={styles.versionItem}>
                        <span className={styles.label}>当前版本:</span>
                        <span className={styles.version}>{item.currentVersion}</span>
                      </div>
                      <div className={styles.versionItem}>
                        <span className={styles.label}>预约版本:</span>
                        <span className={styles.version}>{item.newVersion}</span>
                      </div>
                    </div>

                    <div className={styles.features}>
                      <span className={styles.featuresLabel}>新功能:</span>
                      <div className={styles.featuresList}>
                        {item.features.map((feature, index) => (
                          <span key={index} className={styles.featureTag}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.timeInfo}>
                      <div className={styles.timeItem}>
                        <Calendar size={14} />
                        <span>预约时间: {item.reserveDate}</span>
                      </div>
                      <div className={styles.timeItem}>
                        <Clock size={14} />
                        <span>预计发布: {item.expectedReleaseDate}</span>
                      </div>
                      {daysLeft > 0 && (
                        <div className={styles.countdown}>
                          还有 <strong>{daysLeft}</strong> 天
                        </div>
                      )}
                    </div>

                    <div className={styles.priceInfo}>
                      <span className={styles.price}>{item.price}</span>
                      <button
                        className={styles.viewDetailBtn}
                        onClick={() => handleViewDetail(item)}
                      >
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;