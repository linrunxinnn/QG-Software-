import React, { useState, useEffect, use } from "react";
import {
  Input,
  Badge,
  Avatar,
  Modal,
  Form,
  Button,
  Dropdown,
  Tabs,
  Tooltip,
  message, // 添加 message 导入
  AutoComplete,
} from "antd";
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  LoginOutlined,
  SettingOutlined,
  LogoutOutlined,
  HomeOutlined,
  FileOutlined,
} from "@ant-design/icons";
import styles from "./Header.module.css";
import qgLogo from "../../assets/qg.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./login.jsx";
import RegisterForm from "./register.jsx";
import ResetForm from "./reset.jsx";
import { logout } from "../../store/slice/userSlice.js";
import { mainSearch } from "../../api/service/mainApi.js";
import { hasInfo } from "../../api/service/userService.js";

const { Search } = Input;

const Header = () => {
  // 状态定义
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [options, setOptions] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const name = JSON.parse(localStorage.getItem("user"))?.name || "用户";
  // 三个表单实例
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [resetForm] = Form.useForm();
  //搜索栏结果
  const [searchResult, setSearchResult] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
      console.log("用户已登录，设置状态为已登录");
      setUserInfo(user);
    }
  }, []);

  useEffect(() => {
    async function checkUserInfo() {
      console.log("检查用户登录状态", isLoggedIn);
      if (isLoggedIn) {
        const userId = userInfo.id;
        console.log("检查用户信息，用户ID:", userId);
        try {
          const response = await hasInfo(userId);
          if (!response.data) {
            // message.warning("请先完善个人信息");
            setIsLoginModalVisible(false);
            setActiveTab("reset");
          }
        } catch (error) {
          console.error("检查用户信息失败:", error);
        }
      }
    }
    checkUserInfo();
  }, [isLoggedIn, userInfo]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("头像", userInfo);

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
            handleModalClose();
            window.location.reload();
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
            handleModalClose();
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

  // 铃铛点击处理
  const handleNotificationClick = () => {
    if (!isLoggedIn) {
      message.warning("请先登录");
      return;
    } else {
      navigate("/moments");
    }

    // 点击后可以将未读状态设为已读
    setHasUnreadNotifications(true);
  };

  // 发布按钮点击处理
  const handlePublishClick = () => {
    console.log("点击发布按钮，跳转到发布页面");
    navigate("/publish");
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
    dispatch(logout());
    window.location.reload();
    message.success("退出登录成功");
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

  // const mockSearch = (value) => {
  //   console.log("模拟搜索:", value);
  //   // 模拟接口请求
  //   if (!value) return [];
  //   // return ["QQ", "微信", "钉钉", "飞书", "微信读书"]

  //   return value.map((item) => ({ value: item }));
  // };

  // const LiveSearch = () => {
  //   const [options, setOptions] = useState([]);
  // };

  const handleSearch = async (value) => {
    console.log("搜索关键词:", value);
    try {
      const response = await mainSearch(value);
      const resultList = response.data || [];
      console.log("搜索结果:", resultList);

      // 转成 AutoComplete 所需格式
      const formattedOptions = resultList.map((item) => ({
        value: item.id, // select 后回传的值
        label: (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold" }}>{item.name}</span>
            <span style={{ fontSize: 12, color: "#888" }}>{item.info}</span>
          </div>
        ),
      }));

      setOptions(formattedOptions);
    } catch (err) {
      console.error("搜索失败:", err);
      setOptions([]);
    }
  };

  const handleSelect = (value) => {
    console.log("Selected:", value);
    // 你可以在这里跳转或处理选中的结果
    navigate(`/software/${value}`);
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
          <AutoComplete
            options={options}
            style={{ width: 400 }}
            onSelect={handleSelect}
            onSearch={handleSearch}
          >
            <Input
              size="middle"
              placeholder="搜索软件名称..."
              prefix={<SearchOutlined />}
              allowClear
            />
          </AutoComplete>
        </div>

        {/* 右侧：通知、头像用户名、登录 */}
        <div className={styles.right}>
          {
            //发布按键，如果是软件提供商的话显示
            //如果未登录，则不显示，已登录则如果是软件提供商则显示
            isLoggedIn && userInfo.role === 2 && (
              <Tooltip title="发布">
                <FileOutlined
                  className={styles.publish}
                  onClick={handlePublishClick}
                />
              </Tooltip>
            )
          }
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
                <span className={styles.userName}>{name || userInfo.name}</span>
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
