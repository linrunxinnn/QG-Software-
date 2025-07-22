import React from 'react';
import styles from './ActivityList.module.css';

const ActivityList = ({ activities = [], loading = false }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>加载中...</div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>暂无动态</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.activitiesList}>
        {activities.map(activity => (
          <div key={activity.id} className={styles.activityCard}>
            <div className={styles.activityIcon}>
              {activity.icon}
            </div>
            <div className={styles.activityContent}>
              <div className={styles.activityText}>{activity.content}</div>
              <div className={styles.activityTime}>{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;