import React, { useState } from 'react';
import { Tag, Modal, Button, Select, message, Collapse, Badge } from 'antd';
import { DownloadOutlined, ShoppingCartOutlined, DesktopOutlined, MobileOutlined, TabletOutlined, ExpandAltOutlined } from '@ant-design/icons';
import styles from './SoftwareDetail.module.css';

const { Option } = Select;
const { Panel } = Collapse;

const SoftwareDetail = () => {
  // 模拟软件详情数据
  const softwareInfo = {
    id: 1,
    name: 'Adobe Photoshop 2024',
    icon: 'https://picsum.photos/120/120?random=1',
    price: '¥998.00',
    
    version: 'v25.0.1',
    fileSize: '3.2 GB',
    status: '现货', // 现货、预售、缺货
    category: '图像处理',
    tags: ['图像处理', '设计', '专业版'],
    description: '专业的图像编辑和设计软件，提供强大的图像处理功能和创意工具，是设计师和摄影师的首选工具。支持多种文件格式，具备先进的AI功能和云端同步特性。',
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=4'
    ],
    features: [
      {
        title: '智能图像处理',
        description: '采用最新AI技术，提供智能修复、自动调色、对象识别等功能，让图像处理更加高效便捷。支持批量处理和自定义预设，大幅提升工作效率。'
      },
      {
        title: '专业设计工具',
        description: '丰富的画笔工具、图层管理、滤镜效果和调整选项，满足从基础编辑到专业设计的所有需求。支持矢量和位图混合编辑。'
      },
      {
        title: '云端协作支持',
        description: '与Creative Cloud深度集成，支持多设备同步、版本管理和团队协作。随时随地访问您的创作内容，与团队成员实时分享和协作。'
      },
      {
        title: '高性能渲染',
        description: '优化的渲染引擎，支持GPU加速，处理大型文件和复杂效果时依然保持流畅体验。支持HDR和广色域显示。'
      },
      {
        title: '插件生态系统',
        description: '丰富的第三方插件支持，扩展无限可能。从特效处理到工作流程优化，海量插件满足各种专业需求。'
      },
      {
        title: '跨平台兼容',
        description: '完美支持Windows和macOS系统，提供一致的用户体验。支持多种文件格式导入导出，与其他Adobe产品无缝集成。'
      }
    ]
  };

  // 状态管理
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [bindDeviceModalVisible, setBindDeviceModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [boundDevices, setBoundDevices] = useState([
    { id: 1, name: '我的MacBook Pro', type: 'desktop', status: 'active' },
    { id: 2, name: '办公电脑', type: 'desktop', status: 'active' }
  ]);
  const [expandedFeatures, setExpandedFeatures] = useState(false);

  // 设备类型选项
  const deviceOptions = [
    { value: 'desktop', label: '台式机/笔记本', icon: <DesktopOutlined /> },
    { value: 'mobile', label: '手机', icon: <MobileOutlined /> },
    { value: 'tablet', label: '平板电脑', icon: <TabletOutlined /> }
  ];

  // 获取状态颜色和文本
  const getStatusConfig = (status) => {
    const configs = {
      '现货': { color: 'green', text: '现货' },
      '预售': { color: 'orange', text: '预售' },
      '缺货': { color: 'red', text: '缺货' }
    };
    return configs[status] || configs['现货'];
  };

  // 获取标签颜色
  const getTagColor = (tag) => {
    const colorMap = {
      '图像处理': 'blue',
      '设计': 'purple',
      '专业版': 'gold',
      '办公': 'green',
      '协作': 'cyan',
      '云端': 'blue',
      '开发工具': 'orange',
      '免费': 'green',
      '开源': 'lime',
      'CAD': 'red',
      '工程': 'volcano',
      'UI设计': 'magenta'
    };
    return colorMap[tag] || 'default';
  };

  // 处理购买
  const handlePurchase = () => {
    if (softwareInfo.status === '缺货') {
      message.error('该软件暂时缺货，无法购买');
      return;
    }
    setPurchaseModalVisible(true);
  };

  // 确认购买
  const handleConfirmPurchase = () => {
    if (!selectedDevice) {
      message.error('请选择要绑定的设备类型');
      return;
    }
    message.success('购买成功！软件将在5分钟内发送到您的设备');
    setPurchaseModalVisible(false);
    setSelectedDevice('');
  };

  // 处理下载
  const handleDownload = () => {
    message.success('开始下载软件安装包');
  };

  // 绑定设备
  const handleBindDevice = () => {
    setBindDeviceModalVisible(true);
  };

  // 确认绑定设备
  const handleConfirmBindDevice = () => {
    if (!selectedDevice) {
      message.error('请选择设备类型');
      return;
    }
    const newDevice = {
      id: Date.now(),
      name: `新设备 ${boundDevices.length + 1}`,
      type: selectedDevice,
      status: 'active'
    };
    setBoundDevices([...boundDevices, newDevice]);
    message.success('设备绑定成功');
    setBindDeviceModalVisible(false);
    setSelectedDevice('');
  };

  // 解绑设备
  const handleUnbindDevice = (deviceId) => {
    setBoundDevices(boundDevices.filter(device => device.id !== deviceId));
    message.success('设备解绑成功');
  };

  const statusConfig = getStatusConfig(softwareInfo.status);

  return (
    <div className={styles.detailContainer}>
      {/* 软件基本信息区域 */}
      <div className={styles.headerSection}>
        <div className={styles.basicInfo}>
          <div className={styles.iconSection}>
            <img src={softwareInfo.icon} alt={softwareInfo.name} className={styles.softwareIcon} />
          </div>

          <div className={styles.infoSection}>
            <div className={styles.titleRow}>
              <h1 className={styles.softwareName}>{softwareInfo.name}</h1>
              <Button
                type="primary"
                size="large"
                className={styles.installBtn}
                disabled={softwareInfo.status === '缺货'}
              >
                {softwareInfo.status === '缺货' ? '暂不可用' : '立即安装'}
              </Button>
            </div>

            <div className={styles.metaInfo}>
              <div className={styles.priceSection}>
                <span className={styles.currentPrice}>{softwareInfo.price}</span>
                
                <Badge
                  color={statusConfig.color}
                  text={statusConfig.text}
                  className={styles.statusBadge}
                />
              </div>

              <div className={styles.detailMeta}>
                <span className={styles.metaItem}>版本: {softwareInfo.version}</span>
                <span className={styles.metaItem}>大小: {softwareInfo.fileSize}</span>
                <span className={styles.metaItem}>类别: {softwareInfo.category}</span>
              </div>

              <div className={styles.tags}>
                {softwareInfo.tags.map((tag, index) => (
                  <Tag key={index} color={getTagColor(tag)} className={styles.tag}>
                    {tag}
                  </Tag>
                ))}
              </div>

              <p className={styles.description}>{softwareInfo.description}</p>

              <div className={styles.actionButtons}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  size="large"
                  onClick={handlePurchase}
                  disabled={softwareInfo.status === '缺货'}
                  className={styles.actionBtn}
                >
                  {softwareInfo.status === '预售' ? '预购' : '购买'}
                </Button>
                <Button
                  icon={<DownloadOutlined />}
                  size="large"
                  onClick={handleDownload}
                  className={styles.actionBtn}
                >
                  下载试用
                </Button>
                <Button
                  icon={<DesktopOutlined />}
                  size="large"
                  onClick={handleBindDevice}
                  className={styles.actionBtn}
                >
                  绑定设备
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 软件图片详情 */}
      <div className={styles.imageSection}>
        <h2 className={styles.sectionTitle}>软件截图</h2>
        <div className={styles.imageGallery}>
          {softwareInfo.images.map((image, index) => (
            <div key={index} className={styles.imageItem}>
              <img src={image} alt={`截图 ${index + 1}`} className={styles.galleryImage} />
            </div>
          ))}
        </div>
      </div>

      {/* 产品应用介绍 */}
      <div className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>产品功能特色</h2>
          <Button
            type="link"
            icon={<ExpandAltOutlined />}
            onClick={() => setExpandedFeatures(!expandedFeatures)}
            className={styles.expandBtn}
          >
            {expandedFeatures ? '收起' : '查看更多'}
          </Button>
        </div>

        <div className={styles.featuresGrid}>
          {softwareInfo.features
            .slice(0, expandedFeatures ? softwareInfo.features.length : 3)
            .map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
        </div>
      </div>

      {/* 已绑定设备 */}
      <div className={styles.devicesSection}>
        <h2 className={styles.sectionTitle}>已绑定设备</h2>
        <div className={styles.devicesList}>
          {boundDevices.length === 0 ? (
            <div className={styles.emptyDevices}>
              <p>暂无绑定设备</p>
              <Button type="primary" onClick={handleBindDevice}>
                立即绑定设备
              </Button>
            </div>
          ) : (
            boundDevices.map((device) => (
              <div key={device.id} className={styles.deviceCard}>
                <div className={styles.deviceInfo}>
                  {device.type === 'desktop' && <DesktopOutlined className={styles.deviceIcon} />}
                  {device.type === 'mobile' && <MobileOutlined className={styles.deviceIcon} />}
                  {device.type === 'tablet' && <TabletOutlined className={styles.deviceIcon} />}
                  <span className={styles.deviceName}>{device.name}</span>
                  <Badge color="green" text="已激活" />
                </div>
                <Button
                  type="link"
                  danger
                  onClick={() => handleUnbindDevice(device.id)}
                >
                  解绑
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 购买设备选择弹窗 */}
      <Modal
        title="选择设备类型"
        open={purchaseModalVisible}
        onOk={handleConfirmPurchase}
        onCancel={() => setPurchaseModalVisible(false)}
        okText="确认购买"
        cancelText="取消"
        width={480}
      >
        <div className={styles.modalContent}>
          <p className={styles.modalDesc}>请选择要安装软件的设备类型：</p>
          <Select
            placeholder="选择设备类型"
            value={selectedDevice}
            onChange={setSelectedDevice}
            style={{ width: '100%' }}
            size="large"
          >
            {deviceOptions.map(option => (
              <Option key={option.value} value={option.value}>
                <div className={styles.deviceOption}>
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </Option>
            ))}
          </Select>
          <div className={styles.purchaseInfo}>
            <div className={styles.purchasePrice}>
              <span>购买价格：</span>
              <span className={styles.finalPrice}>{softwareInfo.price}</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* 绑定设备弹窗 */}
      <Modal
        title="绑定新设备"
        open={bindDeviceModalVisible}
        onOk={handleConfirmBindDevice}
        onCancel={() => setBindDeviceModalVisible(false)}
        okText="确认绑定"
        cancelText="取消"
        width={480}
      >
        <div className={styles.modalContent}>
          <p className={styles.modalDesc}>请选择要绑定的设备类型：</p>
          <Select
            placeholder="选择设备类型"
            value={selectedDevice}
            onChange={setSelectedDevice}
            style={{ width: '100%' }}
            size="large"
          >
            {deviceOptions.map(option => (
              <Option key={option.value} value={option.value}>
                <div className={styles.deviceOption}>
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </Option>
            ))}
          </Select>
          <div className={styles.bindInfo}>
            <p className={styles.bindNote}>
              * 每个软件最多可绑定5台设备<br />
              * 绑定后可在对应设备上激活使用
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SoftwareDetail;