import React from 'react';
import styles from './SoftwareList.module.css';

const SoftwareList = ({
  softwareList = [],
  type = 'purchased', // 'purchased' | 'reserved'
  loading = false,
  onViewDetail,
  onCancelReserve,
  emptyText
}) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>加载中...</div>
      </div>
    );
  }

  if (softwareList.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          {emptyText || (type === 'purchased' ? '暂未购买任何软件' : '暂无预约软件')}
        </div>
      </div>
    );
  }

  const getStatusConfig = (status, type) => {
    if (type === 'purchased') {
      return {
        active: { text: '已激活', className: 'active' },
        expired: { text: '已过期', className: 'expired' }
      }[status] || { text: '未知', className: 'unknown' };
    } else {
      return {
        waiting: { text: '等待发布', className: 'waiting' },
        released: { text: '已发布', className: 'released' }
      }[status] || { text: '等待发布', className: 'waiting' };
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.softwareGrid}>
        {softwareList.map(software => {
          const statusConfig = getStatusConfig(software.status, type);

          return (
            <div key={software.id} className={styles.softwareCard}>
              <img
                src={software.icon}
                alt={software.name}
                className={styles.softwareIcon}
              />
              <div className={styles.softwareName} title={software.name}>
                {software.name}
              </div>

              {type === 'purchased' ? (
                <>
                  <div className={styles.softwareDate}>
                    购买时间: {software.purchaseDate}
                  </div>
                  <div className={`${styles.softwareStatus} ${styles[statusConfig.className]}`}>
                    {statusConfig.text}
                  </div>
                  <button
                    className={`${styles.actionBtn} ${styles.primary}`}
                    onClick={() => onViewDetail?.(software)}
                  >
                    查看详情
                  </button>
                </>
              ) : (
                <>
                  <div className={styles.softwareDate}>
                    预约时间: {software.reserveDate}
                  </div>
                  <div className={styles.releaseDate}>
                    预计发布: {software.releaseDate}
                  </div>
                  <div className={`${styles.softwareStatus} ${styles[statusConfig.className]}`}>
                    {statusConfig.text}
                  </div>
                  <button
                    className={`${styles.actionBtn} ${styles.danger}`}
                    onClick={() => onCancelReserve?.(software)}
                  >
                    取消预约
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SoftwareList;