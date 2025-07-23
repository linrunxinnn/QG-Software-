import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, HeartOff, Package, Users, Calendar, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './supplierProfile.module.css';

const SupplierProfile = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams();

  // 供应商信息状态
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [supplierSoftware, setSupplierSoftware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  // 获取供应商数据
  useEffect(() => {
    const fetchSupplierData = async () => {
      setLoading(true);
      try {
        // 模拟API调用
        // const [supplierRes, softwareRes] = await Promise.all([
        //   api.getSupplierInfo(supplierId),
        //   api.getSupplierSoftware(supplierId)
        // ]);

        // 临时模拟数据
        setTimeout(() => {
          setSupplierInfo({
            id: parseInt(supplierId),
            name: 'Adobe Inc.',
            avatar: 'https://picsum.photos/120/120?random=10',
            type: 'company',
            description: '全球领先的创意软件公司，提供Photoshop、Illustrator等专业工具',
            bio: 'Adobe Inc. 是一家美国跨国计算机软件公司，总部位于加利福尼亚州圣何塞。该公司从事数字媒体和数字营销软件的开发，历史上专注于图形、摄影、插图、动画、多媒体/视频、动态图形和印前软件的创建。',
            verified: true,
            followerCount: 125000,
            softwareCount: 28,
            joinDate: '2020-01-15',
            isFollowing: true
          });

          setSupplierSoftware([
            {
              id: 1,
              name: 'Photoshop 2024',
              icon: 'https://picsum.photos/60/60?random=21',
              category: '图像处理',
              version: 'v25.0',
              price: 299.00,
              status: 'published',
              description: '专业的图像编辑和处理软件'
            },
            {
              id: 2,
              name: 'Illustrator 2024',
              icon: 'https://picsum.photos/60/60?random=22',
              category: '矢量图形',
              version: 'v28.0',
              price: 399.00,
              status: 'published',
              description: '矢量图形设计和插画软件'
            },
            {
              id: 3,
              name: 'After Effects 2024',
              icon: 'https://picsum.photos/60/60?random=23',
              category: '视频特效',
              version: 'v24.0',
              price: 449.00,
              status: 'published',
              description: '专业的视频特效和动态图形软件'
            }
          ]);

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('获取供应商数据失败:', error);
        setLoading(false);
      }
    };

    if (supplierId) {
      fetchSupplierData();
    }
  }, [supplierId]);

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  // 处理关注/取消关注
  const handleFollowToggle = async () => {
    if (!supplierInfo) return;

    setFollowLoading(true);
    try {
      if (supplierInfo.isFollowing) {
        // await api.unfollowSupplier(supplierId);
        console.log('取消关注供应商:', supplierInfo.name);
      } else {
        // await api.followSupplier(supplierId);
        console.log('关注供应商:', supplierInfo.name);
      }

      // 更新状态
      setSupplierInfo(prev => ({
        ...prev,
        isFollowing: !prev.isFollowing,
        followerCount: prev.isFollowing
          ? prev.followerCount - 1
          : prev.followerCount + 1
      }));
    } catch (error) {
      console.error('操作失败:', error);
      alert('操作失败，请稍后重试');
    } finally {
      setFollowLoading(false);
    }
  };

  // 处理软件详情点击
  const handleSoftwareDetail = (software) => {
    console.log('查看软件详情:', software.name);
    navigate(`/software/${software.id}`);
  };

  // 渲染软件卡片
  const renderSoftwareCard = (software) => (
    <div key={software.id} className={styles.softwareCard}>
      <div className={styles.cardContent}>
        <img
          src={software.icon}
          alt={software.name}
          className={styles.softwareIcon}
        />
        <div className={styles.softwareInfo}>
          <div className={styles.titleRow}>
            <h3 className={styles.softwareName}>{software.name}</h3>
            <span className={styles.category}>{software.category}</span>
          </div>
          <p className={styles.softwareDesc}>{software.description}</p>
          <div className={styles.details}>
            <span className={styles.version}>版本: {software.version}</span>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.price}>¥{software.price}</span>
        <button
          className={styles.detailBtn}
          onClick={() => handleSoftwareDetail(software)}
        >
          查看详情
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.supplierPage}>
        <div className={styles.loading}>加载中...</div>
      </div>
    );
  }

  if (!supplierInfo) {
    return (
      <div className={styles.supplierPage}>
        <div className={styles.error}>
          <h3>供应商不存在</h3>
          <button onClick={handleBack}>返回</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.supplierPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 className={styles.pageTitle}>{supplierInfo.name}</h1>
        </div>

        <button
          className={`${styles.followBtn} ${supplierInfo.isFollowing ? styles.following : ''}`}
          onClick={handleFollowToggle}
          disabled={followLoading}
        >
          {followLoading ? (
            '处理中...'
          ) : supplierInfo.isFollowing ? (
            <>
              <HeartOff size={16} />
              已关注
            </>
          ) : (
            <>
              <Heart size={16} />
              关注
            </>
          )}
        </button>
      </div>

      {/* 供应商信息区域 */}
      <div className={styles.supplierInfo}>
        <div className={styles.infoCard}>
          <div className={styles.basicInfo}>
            <div className={styles.avatarSection}>
              <img
                src={supplierInfo.avatar}
                alt={supplierInfo.name}
                className={styles.avatar}
              />
              {supplierInfo.verified && (
                <div className={styles.verifiedBadge}>
                  <CheckCircle size={20} />
                </div>
              )}
            </div>

            <div className={styles.infoContent}>
              <div className={styles.nameSection}>
                <h2 className={styles.supplierName}>{supplierInfo.name}</h2>
                <span className={styles.type}>
                  {supplierInfo.type === 'company' ? '企业开发商' : '个人开发者'}
                </span>
              </div>

              <p className={styles.description}>{supplierInfo.description}</p>

              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <Users size={16} />
                  <span>{supplierInfo.followerCount.toLocaleString()} 关注者</span>
                </div>
                <div className={styles.statItem}>
                  <Package size={16} />
                  <span>{supplierInfo.softwareCount} 个软件</span>
                </div>
                <div className={styles.statItem}>
                  <Calendar size={16} />
                  <span>加入于 {supplierInfo.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {supplierInfo.bio && (
            <div className={styles.bioSection}>
              <h3>关于我们</h3>
              <p className={styles.bio}>{supplierInfo.bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* 软件列表区域 */}
      <div className={styles.softwareSection}>
        <div className={styles.sectionHeader}>
          <Package size={20} />
          <h2>软件产品</h2>
          <span className={styles.count}>{supplierSoftware.length}</span>
        </div>

        {supplierSoftware.length === 0 ? (
          <div className={styles.empty}>
            <Package size={48} />
            <h3>暂无软件产品</h3>
            <p>该供应商还没有发布任何软件</p>
          </div>
        ) : (
          <div className={styles.softwareList}>
            {supplierSoftware.map(software => renderSoftwareCard(software))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierProfile;