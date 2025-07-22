import React, { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share, Clock, ShoppingCart, Users, Star } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './momentsLayout.module.css';

const MomentsLayout = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext();
  // 模拟动态数据
  const [moments] = useState([
    {
      id: 1,
      type: 'purchase',
      title: '购买了新软件',
      content: '刚刚购买了 Adobe Photoshop 2024，期待体验新功能！这次更新加入了很多AI功能，应该会大大提升工作效率。',
      software: {
        name: 'Adobe Photoshop 2024',
        icon: 'https://picsum.photos/50/50?random=1',
        price: '¥998.00'
      },
      timestamp: '2小时前',
      likes: 15,
      comments: 3,
      liked: false
    },
    {
      id: 2,
      type: 'follow',
      title: '关注了新的开发商',
      content: '关注了 JetBrains，他们的IDE产品真的很不错，特别是IntelliJ IDEA，用起来非常顺手。',
      developer: {
        name: 'JetBrains',
        avatar: 'https://picsum.photos/50/50?random=2',
        type: 'company'
      },
      timestamp: '1天前',
      likes: 8,
      comments: 1,
      liked: true
    },
    {
      id: 3,
      type: 'reserve',
      title: '预约了即将发布的软件',
      content: '预约了 AutoCAD 2025，听说这次会有重大更新，增加了很多云端协作功能。',
      software: {
        name: 'AutoCAD 2025',
        icon: 'https://picsum.photos/50/50?random=3',
        releaseDate: '2024-12-01'
      },
      timestamp: '3天前',
      likes: 22,
      comments: 7,
      liked: false
    },
    {
      id: 4,
      type: 'review',
      title: '发表了软件评价',
      content: '使用Visual Studio Code已经一年了，真的是非常优秀的代码编辑器。插件生态丰富，性能也很好。强烈推荐给所有开发者！',
      software: {
        name: 'Visual Studio Code',
        icon: 'https://picsum.photos/50/50?random=4',
        rating: 5
      },
      timestamp: '5天前',
      likes: 45,
      comments: 12,
      liked: true
    },
    {
      id: 5,
      type: 'share',
      title: '分享了软件',
      content: '发现了一个很不错的效率工具，推荐给大家试试。界面简洁，功能强大，价格也很合理。',
      software: {
        name: '效率大师 Pro',
        icon: 'https://picsum.photos/50/50?random=5',
        price: '¥68.00'
      },
      timestamp: '1周前',
      likes: 18,
      comments: 5,
      liked: false
    }
  ]);

  const [loading, setLoading] = useState(false);

  // 获取动态类型图标和颜色
  const getMomentTypeConfig = (type) => {
    const configs = {
      purchase: { icon: <ShoppingCart size={16} />, color: '#10b981', text: '购买' },
      follow: { icon: <Users size={16} />, color: '#3b82f6', text: '关注' },
      reserve: { icon: <Clock size={16} />, color: '#f59e0b', text: '预约' },
      review: { icon: <Star size={16} />, color: '#ef4444', text: '评价' },
      share: { icon: <Share size={16} />, color: '#8b5cf6', text: '分享' }
    };
    return configs[type] || configs['share'];
  };

  // 处理返回
  const handleBack = () => {
    navigate('/personal');
  };

  // 处理点赞
  const handleLike = (momentId) => {
    console.log('点赞动态:', momentId);
  };

  // 处理评论
  const handleComment = (momentId) => {
    console.log('评论动态:', momentId);
  };

  // 处理分享
  const handleShare = (momentId) => {
    console.log('分享动态:', momentId);
  };

  // 渲染星级评分
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={14}
        fill={index < rating ? '#fbbf24' : 'none'}
        color={index < rating ? '#fbbf24' : '#d1d5db'}
      />
    ));
  };

  return (
    <div className={styles.momentsPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.pageTitle}>我的动态</h1>
        <div className={styles.statsInfo}>
          <Clock size={16} />
          <span>{moments.length} 条动态</span>
        </div>
      </div>

      {/* 动态内容 */}
      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : moments.length === 0 ? (
          <div className={styles.empty}>
            <Clock size={48} />
            <h3>暂无动态</h3>
            <p>开始使用软件，创建你的第一条动态吧！</p>
          </div>
        ) : (
          <div className={styles.momentsList}>
            {moments.map(moment => {
              const typeConfig = getMomentTypeConfig(moment.type);

              return (
                <div key={moment.id} className={styles.momentCard}>
                  <div className={styles.momentHeader}>
                    <div className={styles.typeInfo}>
                      <div
                        className={styles.typeIcon}
                        style={{ backgroundColor: typeConfig.color }}
                      >
                        {typeConfig.icon}
                      </div>
                      <div className={styles.momentMeta}>
                        <h3 className={styles.momentTitle}>{moment.title}</h3>
                        <div className={styles.timestamp}>{moment.timestamp}</div>
                      </div>
                    </div>
                    <span
                      className={styles.typeBadge}
                      style={{ backgroundColor: typeConfig.color }}
                    >
                      {typeConfig.text}
                    </span>
                  </div>

                  <div className={styles.momentContent}>
                    <p className={styles.contentText}>{moment.content}</p>

                    {/* 软件信息卡片 */}
                    {moment.software && (
                      <div className={styles.softwareCard}>
                        <img
                          src={moment.software.icon}
                          alt={moment.software.name}
                          className={styles.softwareIcon}
                        />
                        <div className={styles.softwareInfo}>
                          <h4 className={styles.softwareName}>{moment.software.name}</h4>
                          <div className={styles.softwareMeta}>
                            {moment.software.price && (
                              <span className={styles.price}>{moment.software.price}</span>
                            )}
                            {moment.software.releaseDate && (
                              <span className={styles.releaseDate}>发布时间: {moment.software.releaseDate}</span>
                            )}
                            {moment.software.rating && (
                              <div className={styles.rating}>
                                {renderStars(moment.software.rating)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 开发商信息卡片 */}
                    {moment.developer && (
                      <div className={styles.developerCard}>
                        <img
                          src={moment.developer.avatar}
                          alt={moment.developer.name}
                          className={styles.developerAvatar}
                        />
                        <div className={styles.developerInfo}>
                          <h4 className={styles.developerName}>{moment.developer.name}</h4>
                          <span className={styles.developerType}>
                            {moment.developer.type === 'company' ? '企业开发商' : '个人开发者'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 动态操作 */}
                  <div className={styles.momentActions}>
                    <button
                      className={`${styles.actionBtn} ${moment.liked ? styles.liked : ''}`}
                      onClick={() => handleLike(moment.id)}
                    >
                      <Heart size={16} fill={moment.liked ? '#ef4444' : 'none'} />
                      <span>{moment.likes}</span>
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleComment(moment.id)}
                    >
                      <MessageCircle size={16} />
                      <span>{moment.comments}</span>
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleShare(moment.id)}
                    >
                      <Share size={16} />
                      <span>分享</span>
                    </button>
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

export default MomentsLayout;