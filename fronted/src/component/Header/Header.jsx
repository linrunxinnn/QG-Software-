import React, { useState } from 'react';
import { Input, Badge, Avatar, Modal, Form, Button, Dropdown } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LoginOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons';
import styles from './Header.module.css';
import qgLogo from '../../assets/qg.png';

const { Search } = Input;

const Header = () => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form] = Form.useForm();

  // 模拟用户信息
  const userInfo = {
    name: '张三',
    avatar: qgLogo
  };

  // 通知状态 - 布尔值，false表示有未读通知（显示小红点）
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  // 搜索处理函数
  const handleSearch = (value) => {
    console.log('搜索软件:', value);
    // TODO: 后续实现跳转到软件详情页面
  };

  // 铃铛点击处理
  const handleNotificationClick = () => {
    console.log('点击铃铛，跳转到消息页面');
    // TODO: 后续实现跳转到消息页面
    // 点击后可以将未读状态设为已读
    setHasUnreadNotifications(true);
  };

  // 首页点击处理
  const handleHomeClick = () => {
    console.log('点击首页，跳转到首页');
    // TODO: 后续实现跳转到首页
  };

  // 设置点击处理
  const handleSettingsClick = () => {
    console.log('点击设置，跳转到设置页面');
    // TODO: 后续实现跳转到设置页面
  };

  // 登录处理
  const handleLogin = async (values) => {
    try {
      console.log('登录信息:', values);
      // TODO: 后续接入后端登录接口
      setIsLoggedIn(true);
      setIsLoginModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('登录失败:', error);
    }
  };

  // 登出处理
  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log('用户登出');
  };

  // 用户菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => console.log('跳转到个人中心')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => console.log('跳转到设置页面')
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 左侧：Logo图片、首页和设置 */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <img
              src={qgLogo}
              alt="Logo"
              className={styles.logoImage}
            />
            <div
              className={styles.homeButton}
              onClick={handleHomeClick}
            >
              <HomeOutlined className={styles.homeIcon} />
              <span className={styles.homeText}>首页</span>
            </div>
            <div
              className={styles.settingsButton}
              onClick={handleSettingsClick}
            >
              <SettingOutlined className={styles.settingsIcon} />
              <span className={styles.settingsText}>设置</span>
            </div>
          </div>
        </div>

        {/* 中间：搜索栏 */}
        <div className={styles.center}>
          <Search
            placeholder="搜索软件名称..."
            allowClear
            enterButton={<SearchOutlined />}
            size="middle"
            onSearch={handleSearch}
            className={styles.searchInput}
          />
        </div>

        {/* 右侧：通知、头像用户名、登录 */}
        <div className={styles.right}>
          {/* 通知铃铛 - 简化版，只显示小红点 */}
          <Badge dot={!hasUnreadNotifications} className={styles.notification}>
            <BellOutlined
              className={styles.notificationIcon}
              onClick={handleNotificationClick}
            />
          </Badge>

          {/* 头像和用户名 */}
          <div className={styles.avatarSection}>
            <Avatar
              size="small"
              src={qgLogo}
              icon={<UserOutlined />}
              className={styles.avatar}
            />
            <span className={styles.defaultUserName}>用户名</span>
          </div>

          {/* 登录状态判断 */}
          {isLoggedIn ? (
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <div className={styles.userInfo}>
                <Avatar
                  size="small"
                  src={userInfo.avatar}
                  icon={<UserOutlined />}
                />
                <span className={styles.userName}>{userInfo.name}</span>
              </div>
            </Dropdown>
          ) : (
            <Button
              type="default"
              icon={<LoginOutlined />}
              onClick={() => setIsLoginModalVisible(true)}
              className={styles.loginButton}
            >
              登录
            </Button>
          )}
        </div>
      </div>

      {/* 登录弹窗 */}
      <Modal
        title="用户登录"
        open={isLoginModalVisible}
        onCancel={() => setIsLoginModalVisible(false)}
        footer={null}
        width={400}
      >
        <Form
          form={form}
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名!' },
              { min: 3, message: '用户名至少3个字符!' }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 6, message: '密码至少6个字符!' }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </header>
  );
};

export default Header;