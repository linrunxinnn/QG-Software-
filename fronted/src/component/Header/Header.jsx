import React, { useState, useEffect } from "react";
import {
  Input,
  Badge,
  Avatar,
  Modal,
  Form,
  Button,
  Dropdown,
  Tabs,
  message, // 添加 message 导入
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LoginOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styles from "./Header.module.css";
import qgLogo from "../../assets/qg.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./login.jsx";
import RegisterForm from "./register.jsx";
import ResetForm from "./reset.jsx";

const { Search } = Input;

const Header = () => {
  // 状态定义
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [options, setOptions] = useState([]);
  // 三个表单实例
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [resetForm] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Tab配置
  const tabItems = [
    {
      key: "login",
      label: "登录",
      children: (
        <LoginForm
          onSuccess={(userData) => {
            setIsLoggedIn(true);
            setIsLoginModalVisible(false);
          }}
        />
      ),
    },
    {
      key: "register",
      label: "注册",
      children: (
        <RegisterForm
          onSuccess={(userData) => {
            setIsLoggedIn(true);
            setIsLoginModalVisible(false);
          }}
        />
      ),
    },
    {
      key: "reset",
      label: "修改密码",
      children: (
        <ResetForm
          onSuccess={() => {
            setActiveTab("login");
            message.success("密码修改成功，请重新登录");
          }}
        />
      ),
    },
  ];

  // Modal关闭处理
  const handleModalClose = () => {
    setIsLoginModalVisible(false);
    setActiveTab("login");
    loginForm.resetFields();
    registerForm.resetFields();
    resetForm.resetFields();
  };

  // 模拟用户信息
  const userInfo = {
    name: "张三",
    avatar: qgLogo,
  };

  // 铃铛点击处理
  const handleNotificationClick = () => {
    console.log("点击铃铛，跳转到消息页面");
    navigate("/moments");
    // 点击后可以将未读状态设为已读
    setHasUnreadNotifications(true);
  };

  // 首页点击处理
  const handleHomeClick = () => {
    console.log("点击首页，跳转到首页");
    navigate("/");
  };

  // 设置点击处理
  const handleSettingsClick = () => {
    console.log("点击设置，跳转到设置页面");
    navigate("/personal/settings");
  };

  // 登出处理
  const handleLogout = () => {
    setIsLoggedIn(false);
    message.success("退出登录成功");
    console.log("用户登出");
    // 使用redux中暴露的logout方法清除用户信息
  };

  // Tab切换处理
  const handleTabChange = (key) => {
    setActiveTab(key);
    // 清空所有表单
    loginForm.resetFields();
    registerForm.resetFields();
    resetForm.resetFields();
    // 重置倒计时
  };

  //查询
  const handleSearch = (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    // 模拟异步获取结果
    const mockResult = [
      { value: "软件1" },
      { value: "软件2" },
      { value: "软件3" },
    ].filter((item) => item.value.includes(value));
    setOptions(mockResult);
  };

  const handleSelect = (value) => {
    console.log("Selected:", value);
    // 你可以在这里跳转或处理选中的结果
    navigate(`/detail/${value}`);
  };

  // 用户菜单
  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "个人中心",
      onClick: () => navigate("/personal"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "设置",
      onClick: () => navigate("/personal/settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      onClick: handleLogout,
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 左侧：Logo图片、首页和设置 */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <div className={styles.logo}>
              <img src={qgLogo} alt="Logo" className={styles.logoImage} />
            </div>
            <div className={styles.homeButton} onClick={handleHomeClick}>
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
          {/* <div className={styles.avatarSection}>
            <Avatar
              size="small"
              src={qgLogo}
              icon={<UserOutlined />}
              className={styles.avatar}
            />
            <span className={styles.defaultUserName}>用户名</span>
          </div> */}

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
                  className={styles.userAvatar}
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
        title="用户认证"
        open={isLoginModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={400}
        destroyOnHidden // 修复：使用新的属性名
      >
        <Tabs
          activeKey={activeTab}
          items={tabItems}
          onChange={handleTabChange}
        />
      </Modal>
    </header>
  );
};

export default Header;
