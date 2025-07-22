import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  Download,
  Globe,
  Moon,
  Eye,
  Trash2,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import styles from './settings.module.css';

const Settings = () => {
  const navigate = useNavigate();
  const { userInfo } = useOutletContext();
  // 设置状态
  const [settings, setSettings] = useState({
    // 通知设置
    emailNotifications: true,
    pushNotifications: true,
    softwareUpdates: true,
    promotionalEmails: false,

    // 隐私设置
    profileVisibility: 'public', // public, friends, private
    activityVisibility: 'friends',
    showEmail: false,
    showPhone: false,

    // 应用设置
    theme: 'system', // light, dark, system
    language: 'zh-CN',
    autoDownload: false,
    downloadPath: '/Downloads',

    // 账户设置
    twoFactorAuth: false,
    loginNotifications: true
  });

  const [activeSection, setActiveSection] = useState('profile');

  // 设置选项配置
  const settingSections = [
    {
      key: 'profile',
      title: '个人资料',
      icon: <User size={20} />,
      description: '管理您的个人信息和头像'
    },
    {
      key: 'notifications',
      title: '通知设置',
      icon: <Bell size={20} />,
      description: '设置通知偏好和提醒方式'
    },
    {
      key: 'privacy',
      title: '隐私安全',
      icon: <Shield size={20} />,
      description: '控制您的隐私和安全设置'
    },
    {
      key: 'payment',
      title: '支付管理',
      icon: <CreditCard size={20} />,
      description: '管理支付方式和账单信息'
    },
    {
      key: 'application',
      title: '应用设置',
      icon: <Download size={20} />,
      description: '自定义应用行为和偏好'
    },
    {
      key: 'help',
      title: '帮助支持',
      icon: <HelpCircle size={20} />,
      description: '获取帮助和联系支持团队'
    }
  ];

  // 处理返回
  const handleBack = () => {
    navigate('/personal');
  };

  // 处理设置更新
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // 处理开关切换
  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 处理退出登录
  const handleLogout = () => {
    console.log('用户退出登录');
  };

  // 处理删除账户
  const handleDeleteAccount = () => {
    console.log('删除账户请求');
  };

  // 渲染设置项
  const renderSettingItem = (title, description, control, danger = false) => (
    <div className={`${styles.settingItem} ${danger ? styles.danger : ''}`}>
      <div className={styles.settingInfo}>
        <h4 className={styles.settingTitle}>{title}</h4>
        {description && <p className={styles.settingDesc}>{description}</p>}
      </div>
      <div className={styles.settingControl}>
        {control}
      </div>
    </div>
  );

  // 渲染开关控件
  const renderSwitch = (key, disabled = false) => (
    <button
      className={`${styles.switch} ${settings[key] ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
      onClick={() => !disabled && handleToggle(key)}
      disabled={disabled}
    >
      <div className={styles.switchHandle}></div>
    </button>
  );

  // 渲染选择器控件
  const renderSelect = (key, options) => (
    <select
      className={styles.select}
      value={settings[key]}
      onChange={(e) => handleSettingChange(key, e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  // 渲染设置内容
  const renderSettingContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className={styles.settingContent}>
            <h3 className={styles.sectionTitle}>个人资料设置</h3>
            {renderSettingItem(
              '头像',
              '更换您的个人头像',
              <button className={styles.actionBtn}>更换头像</button>
            )}
            {renderSettingItem(
              '用户名',
              '修改您的显示名称',
              <button className={styles.actionBtn}>修改</button>
            )}
            {renderSettingItem(
              '邮箱地址',
              '更新您的联系邮箱',
              <button className={styles.actionBtn}>修改</button>
            )}
            {renderSettingItem(
              '手机号码',
              '绑定或更换手机号码',
              <button className={styles.actionBtn}>修改</button>
            )}
            {renderSettingItem(
              '个人简介',
              '编辑您的个人简介',
              <button className={styles.actionBtn}>编辑</button>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div className={styles.settingContent}>
            <h3 className={styles.sectionTitle}>通知设置</h3>
            {renderSettingItem(
              '邮件通知',
              '接收重要信息的邮件通知',
              renderSwitch('emailNotifications')
            )}
            {renderSettingItem(
              '推送通知',
              '接收应用内推送消息',
              renderSwitch('pushNotifications')
            )}
            {renderSettingItem(
              '软件更新通知',
              '软件有新版本时通知我',
              renderSwitch('softwareUpdates')
            )}
            {renderSettingItem(
              '促销邮件',
              '接收优惠活动和促销信息',
              renderSwitch('promotionalEmails')
            )}
          </div>
        );

      case 'privacy':
        return (
          <div className={styles.settingContent}>
            <h3 className={styles.sectionTitle}>隐私安全设置</h3>
            {renderSettingItem(
              '个人资料可见性',
              '控制其他用户查看您资料的权限',
              renderSelect('profileVisibility', [
                { value: 'public', label: '公开' },
                { value: 'friends', label: '仅关注的人' },
                { value: 'private', label: '私密' }
              ])
            )}
            {renderSettingItem(
              '动态可见性',
              '控制谁可以看到您的动态',
              renderSelect('activityVisibility', [
                { value: 'public', label: '公开' },
                { value: 'friends', label: '仅关注的人' },
                { value: 'private', label: '仅自己' }
              ])
            )}
            {renderSettingItem(
              '显示邮箱地址',
              '在个人资料中显示邮箱',
              renderSwitch('showEmail')
            )}
            {renderSettingItem(
              '显示手机号码',
              '在个人资料中显示手机号',
              renderSwitch('showPhone')
            )}
            {renderSettingItem(
              '两步验证',
              '为账户添加额外的安全保护',
              renderSwitch('twoFactorAuth')
            )}
            {renderSettingItem(
              '登录通知',
              '新设备登录时发送通知',
              renderSwitch('loginNotifications')
            )}
          </div>
        );

      case 'payment':
        return (
          <div className={styles.settingContent}>
            <h3 className={styles.sectionTitle}>支付管理</h3>
            {renderSettingItem(
              '支付方式',
              '管理您的信用卡和支付账户',
              <button className={styles.actionBtn}>管理</button>
            )}
            {renderSettingItem(
              '账单历史',
              '查看购买记录和发票',
              <button className={styles.actionBtn}>查看</button>
            )}
            {renderSettingItem(
              '自动续费',
              '管理订阅服务的自动续费',
              <button className={styles.actionBtn}>设置</button>
            )}
            {renderSettingItem(
              '退款申请',
              '申请订单退款或取消',
              <button className={styles.actionBtn}>申请</button>
            )}
          </div>
        );

      case 'application':
        return (
          <div className={styles.settingContent}>
            <h3 className={styles.sectionTitle}>应用设置</h3>
            {renderSettingItem(
              '主题模式',
              '选择应用的外观主题',
              renderSelect('theme', [
                { value: 'system', label: '跟随系统' },
                { value: 'light', label: '浅色模式' },
                { value: 'dark', label: '深色模式' }
              ])
            )}
            {renderSettingItem(
              '语言',
              '选择应用显示语言',
              renderSelect('language', [
                { value: 'zh-CN', label: '简体中文' },
                { value: 'en-US', label: 'English' },
                { value: 'ja-JP', label: '日本語' }
              ])
            )}
            {renderSettingItem(
              '自动下载',
              '购买后自动开始下载',
              renderSwitch('autoDownload')
            )}
            {renderSettingItem(
              '下载路径',
              '设置软件下载保存位置',
              <button className={styles.actionBtn}>选择路径</button>
            )}
          </div>
        );

      case 'help':
        return (
          <div className={styles.settingContent}>
            <h3 className={styles.sectionTitle}>帮助与支持</h3>
            {renderSettingItem(
              '使用帮助',
              '查看使用指南和常见问题',
              <button className={styles.actionBtn}>查看</button>
            )}
            {renderSettingItem(
              '联系客服',
              '遇到问题时联系我们的支持团队',
              <button className={styles.actionBtn}>联系</button>
            )}
            {renderSettingItem(
              '意见反馈',
              '告诉我们您的建议和想法',
              <button className={styles.actionBtn}>反馈</button>
            )}
            {renderSettingItem(
              '关于我们',
              '了解更多关于我们的信息',
              <button className={styles.actionBtn}>查看</button>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.settingsPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.pageTitle}>设置</h1>
      </div>

      <div className={styles.settingsContainer}>
        {/* 设置菜单 */}
        <div className={styles.settingsMenu}>
          {settingSections.map(section => (
            <button
              key={section.key}
              className={`${styles.menuItem} ${activeSection === section.key ? styles.active : ''}`}
              onClick={() => setActiveSection(section.key)}
            >
              <div className={styles.menuIcon}>{section.icon}</div>
              <div className={styles.menuInfo}>
                <div className={styles.menuTitle}>{section.title}</div>
                <div className={styles.menuDesc}>{section.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* 设置内容 */}
        <div className={styles.settingsContent}>
          {renderSettingContent()}

          {/* 危险操作区域 */}
          <div className={styles.dangerZone}>
            <h3 className={styles.dangerTitle}>危险操作</h3>
            <div className={styles.dangerActions}>
              {renderSettingItem(
                '退出登录',
                '退出当前账户登录状态',
                <button className={styles.dangerBtn} onClick={handleLogout}>
                  <LogOut size={16} />
                  退出登录
                </button>,
                true
              )}
              {renderSettingItem(
                '删除账户',
                '永久删除您的账户和所有数据',
                <button className={styles.dangerBtn} onClick={handleDeleteAccount}>
                  <Trash2 size={16} />
                  删除账户
                </button>,
                true
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;