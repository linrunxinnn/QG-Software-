import React, { useState } from 'react';
import { ArrowLeft, Rocket, Package, AlertCircle, Plus, X, Calendar, FileText } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './momentsLayout.module.css';

const MomentsLayout = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext();

  // 简化的动态数据
  const [moments, setMoments] = useState([
    {
      id: 1,
      type: 'release',
      title: '新软件即将发布',
      content: '我的最新作品《效率管理大师 Pro》即将在下周正式发布！经过6个月的精心开发，这款软件将为用户带来全新的工作效率体验。',
      software: {
        name: '效率管理大师 Pro',
        icon: 'https://picsum.photos/50/50?random=1',
        releaseDate: '2024-07-30',
        version: 'v1.0'
      },
      timestamp: '2小时前',
      createdAt: '2024-07-23T10:00:00Z'
    },
    {
      id: 2,
      type: 'update',
      title: '软件重大更新发布',
      content: '《设计师工具箱》v3.2版本正式发布！新增AI智能抠图功能、批量处理工具，性能提升40%。',
      software: {
        name: '设计师工具箱',
        icon: 'https://picsum.photos/50/50?random=2',
        version: 'v3.2',
        features: ['AI智能抠图', '批量处理', '性能优化']
      },
      timestamp: '1天前',
      createdAt: '2024-07-22T14:30:00Z'
    },
    {
      id: 3,
      type: 'development',
      title: '开发进度更新',
      content: '《AI写作助手》开发进度更新：核心AI算法已完成90%，UI界面设计完成85%，预计下个月进入内测阶段。',
      software: {
        name: 'AI写作助手',
        icon: 'https://picsum.photos/50/50?random=5',
        progress: 87,
        phase: '开发中',
        estimatedRelease: '2024-09-15'
      },
      timestamp: '3天前',
      createdAt: '2024-07-20T09:15:00Z'
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    type: 'release',
    title: '',
    content: '',
    softwareName: '',
    version: '',
    features: '',
    progress: '',
    releaseDate: '',
    estimatedRelease: ''
  });

  // 获取动态类型配置
  const getMomentTypeConfig = (type) => {
    const configs = {
      release: { icon: <Rocket size={16} />, color: '#10b981', text: '新品发布' },
      update: { icon: <Package size={16} />, color: '#3b82f6', text: '版本更新' },
      development: { icon: <AlertCircle size={16} />, color: '#06b6d4', text: '开发进度' }
    };
    return configs[type] || configs['development'];
  };

  // 处理返回
  const handleBack = () => {
    navigate('/personal');
  };

  // 打开创建动态弹窗
  const handleCreateMoment = () => {
    setShowCreateModal(true);
  };

  // 关闭创建动态弹窗
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setCreateForm({
      type: 'release',
      title: '',
      content: '',
      softwareName: '',
      version: '',
      features: '',
      progress: '',
      releaseDate: '',
      estimatedRelease: ''
    });
  };

  // 处理表单输入
  const handleFormChange = (field, value) => {
    setCreateForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 提交创建动态
  const handleSubmitMoment = async () => {
    if (!createForm.title || !createForm.content || !createForm.softwareName) {
      alert('请填写必填项');
      return;
    }

    setLoading(true);

    try {
      // 构建软件信息对象
      const software = {
        name: createForm.softwareName,
        icon: `https://picsum.photos/50/50?random=${Date.now()}`, // 临时图标
        version: createForm.version || undefined,
        features: createForm.features ? createForm.features.split(',').map(f => f.trim()) : undefined,
        progress: createForm.progress ? parseInt(createForm.progress) : undefined,
        releaseDate: createForm.releaseDate || undefined,
        estimatedRelease: createForm.estimatedRelease || undefined,
        phase: createForm.type === 'development' ? '开发中' : undefined
      };

      // 创建新动态对象
      const newMoment = {
        id: Date.now(),
        type: createForm.type,
        title: createForm.title,
        content: createForm.content,
        software: software,
        timestamp: '刚刚',
        createdAt: new Date().toISOString()
      };

      // TODO: 这里应该调用后端API
      // const response = await fetch('/api/moments', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${userToken}`
      //   },
      //   body: JSON.stringify(newMoment)
      // });
      // const savedMoment = await response.json();

      // 暂时添加到本地状态
      setMoments(prev => [newMoment, ...prev]);

      handleCloseModal();
      alert('动态创建成功！');

    } catch (error) {
      console.error('创建动态失败:', error);
      alert('创建动态失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 渲染进度条
  const renderProgress = (progress) => {
    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className={styles.progressText}>{progress}%</span>
      </div>
    );
  };

  return (
    <div className={styles.momentsPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.pageTitle}>开发动态</h1>
        <button className={styles.createBtn} onClick={handleCreateMoment}>
          <Plus size={16} />
          <span>创建动态</span>
        </button>
      </div>

      {/* 动态内容 */}
      <div className={styles.content}>
        {loading && !showCreateModal ? (
          <div className={styles.loading}>加载中...</div>
        ) : moments.length === 0 ? (
          <div className={styles.empty}>
            <Rocket size={48} />
            <h3>暂无开发动态</h3>
            <p>发布你的第一个软件，开始记录开发历程吧！</p>
            <button className={styles.emptyCreateBtn} onClick={handleCreateMoment}>
              <Plus size={16} />
              创建第一个动态
            </button>
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
                            {/* 版本信息 */}
                            {moment.software.version && (
                              <span className={styles.version}>版本: {moment.software.version}</span>
                            )}

                            {/* 发布日期 */}
                            {moment.software.releaseDate && (
                              <span className={styles.releaseDate}>
                                <Calendar size={12} />
                                发布: {moment.software.releaseDate}
                              </span>
                            )}

                            {/* 预计发布日期 */}
                            {moment.software.estimatedRelease && (
                              <span className={styles.estimatedRelease}>
                                <Calendar size={12} />
                                预计: {moment.software.estimatedRelease}
                              </span>
                            )}

                            {/* 开发阶段 */}
                            {moment.software.phase && (
                              <span className={styles.phase}>阶段: {moment.software.phase}</span>
                            )}

                            {/* 开发进度 */}
                            {moment.software.progress && (
                              <div className={styles.progressWrapper}>
                                <span className={styles.progressLabel}>开发进度</span>
                                {renderProgress(moment.software.progress)}
                              </div>
                            )}

                            {/* 功能列表 */}
                            {moment.software.features && (
                              <div className={styles.features}>
                                <span className={styles.featuresLabel}>新功能:</span>
                                {moment.software.features.map((feature, index) => (
                                  <span key={index} className={styles.featureTag}>
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 创建动态弹窗 */}
      {showCreateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>创建开发动态</h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalContent}>
              <form className={styles.createForm}>
                {/* 动态类型 */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>动态类型 *</label>
                  <select
                    className={styles.formSelect}
                    value={createForm.type}
                    onChange={(e) => handleFormChange('type', e.target.value)}
                  >
                    <option value="release">新品发布</option>
                    <option value="update">版本更新</option>
                    <option value="development">开发进度</option>
                  </select>
                </div>

                {/* 动态标题 */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>动态标题 *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="请输入动态标题"
                    value={createForm.title}
                    onChange={(e) => handleFormChange('title', e.target.value)}
                  />
                </div>

                {/* 动态内容 */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>动态内容 *</label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="详细描述你的开发动态..."
                    rows={4}
                    value={createForm.content}
                    onChange={(e) => handleFormChange('content', e.target.value)}
                  />
                </div>

                {/* 软件名称 */}
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>软件名称 *</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="请输入软件名称"
                    value={createForm.softwareName}
                    onChange={(e) => handleFormChange('softwareName', e.target.value)}
                  />
                </div>

                {/* 版本号 */}
                {(createForm.type === 'release' || createForm.type === 'update') && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>版本号</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="如: v1.0, v2.1.3"
                      value={createForm.version}
                      onChange={(e) => handleFormChange('version', e.target.value)}
                    />
                  </div>
                )}

                {/* 新功能 */}
                {createForm.type === 'update' && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>新功能</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder="多个功能用逗号分隔，如: 新增登录, 优化性能"
                      value={createForm.features}
                      onChange={(e) => handleFormChange('features', e.target.value)}
                    />
                  </div>
                )}

                {/* 开发进度 */}
                {createForm.type === 'development' && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>开发进度 (%)</label>
                    <input
                      type="number"
                      className={styles.formInput}
                      placeholder="0-100"
                      min="0"
                      max="100"
                      value={createForm.progress}
                      onChange={(e) => handleFormChange('progress', e.target.value)}
                    />
                  </div>
                )}

                {/* 发布日期 */}
                {createForm.type === 'release' && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>发布日期</label>
                    <input
                      type="date"
                      className={styles.formInput}
                      value={createForm.releaseDate}
                      onChange={(e) => handleFormChange('releaseDate', e.target.value)}
                    />
                  </div>
                )}

                {/* 预计发布日期 */}
                {createForm.type === 'development' && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>预计发布日期</label>
                    <input
                      type="date"
                      className={styles.formInput}
                      value={createForm.estimatedRelease}
                      onChange={(e) => handleFormChange('estimatedRelease', e.target.value)}
                    />
                  </div>
                )}
              </form>
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCloseModal}
              >
                取消
              </button>
              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleSubmitMoment}
                disabled={loading}
              >
                {loading ? '创建中...' : '发布动态'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MomentsLayout;