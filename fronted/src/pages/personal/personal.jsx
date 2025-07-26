import React, { useState, useRef, useEffect } from "react";
import {
  User,
  Heart,
  ShoppingCart,
  Clock,
  Edit3,
  Settings,
  X,
  Send,
  Upload,
  File,
  Trash2,
} from "lucide-react";
import { Card, InputNumber, Button, Modal } from "antd";
import { MoneyCollectOutlined } from "@ant-design/icons";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import styles from "./personal.module.css";
import {
  getUserInfo,
  setUser,
  fetchUserInfo,
} from "../../store/slice/userSlice.js";
import { useSelector } from "react-redux";
// 导入新创建的API服务
import { applyToDeveloper } from "../../api/service/applyDeveloperService.js";
import { getHaveSubscribed } from "../../api/service/subscribe.js";
import { applyDeveloper } from "../../api/service/applyDevelopers.js";
import { rechargeUser, getUserBalance } from "../../api/service/userService.js";

const Personal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const followingContentRef = useRef(null);
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user);
  const name = useSelector((state) => state.user.name);
  const [isRechargeVisible, setIsRechargeVisible] = useState(false);
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setcurrentBalance] = useState(0);
  // 用户数据
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    if (user) {
      setUserInfo(user.user);
      console.log("用户信息!!!!!:", user);
    }
    const balance = async () => {
      await getUserBalance(user.user.id).then((res) => {
        console.log("用户余额:", res.data);
        setcurrentBalance(res.data);
      });
    };
    balance();
    if (user.user && user.user.role === 3) {
      const fetchSubscribed = async () => {
        try {
          const subscribed = await getHaveSubscribed(user.user.id);
          setUserInfo((prev) => ({
            ...prev,
            subscribed: subscribed,
          }));
          // console.log("已订阅软件:", subscribed);
        } catch (error) {
          console.error("获取已订阅软件失败:", error);
        }
      };
      fetchSubscribed();
    }
  }, [user.id, user, currentBalance]);

  // const [userInfo, setUserInfo] = useState({
  //   id: 1,
  //   username: '张三',
  //   avatar: 'https://picsum.photos/120/120?random=1',
  //   role: 'user', // 'admin', 'user', 'developer'
  //   email: 'zhangsan@example.com',
  //   bio: '热爱技术，专注于软件开发和用户体验设计。喜欢探索新技术，分享开发经验。',
  //   followingCount: 128,
  //   followerCount: 256,
  // });

  // 统计数据
  const [statistics] = useState({
    purchasedCount: 8,
    reservedCount: 3,
    totalSpent: "¥2,850",
  });

  // 弹窗状态
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeForm, setUpgradeForm] = useState({
    reason: "",
    experience: "",
    portfolio: "",
    supportingFiles: [], // 新增佐证材料字段
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 获取身份标签颜色和文本
  const getRoleConfig = (role) => {
    const configs = {
      1: { color: "#ef4444", text: "管理员" },
      2: { color: "#10b981", text: "软件开发商" },
      3: { color: "#3b82f6", text: "用户" },
    };
    return configs[role] || configs[3];
  };
  console.log("用户信息:", userInfo);

  // 处理升级申请 - 只有普通用户可以看到此按钮
  const handleUpgradeToDeveloper = () => {
    setShowUpgradeModal(true);
  };

  // 处理文件上传
  const handleFileUpload = (e) => {
    // Option 1 (Recommended): Directly get files from the input event
    // const files = Array.from(e.target.files);

    // Option 2 (As per your request): Use FormData to get the file
    // IMPORTANT: For this to work, your <input type="file"> MUST have a `name` attribute.
    // And if you only want ONE file, ensure `multiple` is removed from the input.
    const formData = new FormData(e.target.form);
    const file = formData.get("supportingFile"); // Get a single file by the name attribute of your input

    const maxSize = 10 * 1024 * 1024; // 10MB
    // No allowedTypes array, as you requested no file type restrictions

    const errors = [];
    let validFile = null;

    if (!file) {
      // If no file was selected or found by name
      errors.push("请选择一个文件进行上传。");
    } else {
      if (file.size > maxSize) {
        errors.push(`${file.name}: 文件大小超过10MB`);
      } else {
        validFile = {
          file: file, // Store the actual File object
          name: file.name,
          size: file.size,
          type: file.type,
          id: Date.now() + Math.random(), // Unique ID for keying in UI
        };
      }
    }

    if (errors.length > 0) {
      alert("以下文件上传失败：\n" + errors.join("\n"));
    }

    // If a valid file exists, replace the existing supportingFiles array with this single file
    if (validFile) {
      setUpgradeForm((prev) => ({
        ...prev,
        supportingFiles: [validFile], // Only keep the single new valid file
      }));
    } else {
      // If validation failed or no file, clear the supportingFiles
      setUpgradeForm((prev) => ({
        ...prev,
        supportingFiles: [],
      }));
    }

    // 清空input值，允许重复选择同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  // const handleFileUpload = (e) => {
  //   // const files = Array.from(e.target.files);
  //   const files = new FormData(e.target.form).getAll("supportingFiles");
  //   const maxSize = 10 * 1024 * 1024; // 10MB
  //   const allowedTypes = [
  //     "application/pdf",
  //     "image/jpeg",
  //     "image/png",
  //     "image/gif",
  //     "application/msword",
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //   ];

  //   const validFiles = [];
  //   const errors = [];

  //   files.forEach((file) => {
  //     if (!allowedTypes.includes(file.type)) {
  //       errors.push(`${file.name}: 不支持的文件格式`);
  //       return;
  //     }
  //     if (file.size > maxSize) {
  //       errors.push(`${file.name}: 文件大小超过10MB`);
  //       return;
  //     }
  //     validFiles.push({
  //       file,
  //       name: file.name,
  //       size: file.size,
  //       type: file.type,
  //       id: Date.now() + Math.random(),
  //     });
  //   });

  //   if (errors.length > 0) {
  //     alert("以下文件上传失败：\n" + errors.join("\n"));
  //   }

  //   if (validFiles.length > 0) {
  //     setUpgradeForm((prev) => ({
  //       ...prev,
  //       supportingFiles: [...prev.supportingFiles, ...validFiles],
  //     }));
  //   }

  //   // 清空input值，允许重复选择同一文件
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  // 删除佐证文件
  const removeFile = (fileId) => {
    setUpgradeForm((prev) => ({
      ...prev,
      supportingFiles: prev.supportingFiles.filter((f) => f.id !== fileId),
    }));
  };

  // 格式化文件大小
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 获取文件图标
  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "🖼️";
    } else if (fileType === "application/pdf") {
      return "📄";
    } else if (fileType.includes("word")) {
      return "📝";
    }
    return "📁";
  };

  // 处理升级申请表单提交 - 更新为使用真实API
  const handleUpgradeSubmit = async (e) => {
    e.preventDefault();
    if (!upgradeForm.reason.trim()) {
      alert("请填写申请理由");
      return;
    }
    try {
      // 1. 构建 ApplyDeveloper 的 JSON 数据并转换为字符串
      const applyDeveloperData = {
        userId: userInfo.id, // 确保 userInfo.id 有效
        reason: upgradeForm.reason,
      };
      // 将 JavaScript 对象转换为 JSON 字符串
      const applyDeveloperJsonString = JSON.stringify(applyDeveloperData);

      // 2. 获取文件对象
      const selectedFile =
        upgradeForm.supportingFiles.length > 0
          ? upgradeForm.supportingFiles[0].file
          : null;

      // 3. 创建 FormData 对象
      const formData = new FormData();

      // 4. 将 JSON 字符串添加到 FormData 中，键名为 "applyDeveloper"
      // 这将作为请求体的一个部分发送
      formData.append("applyDeveloper", applyDeveloperJsonString);

      // 5. 将文件添加到 FormData 中，键名为 "file"
      // 这也将作为请求体的另一个部分发送
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        // 如果文件是必填项，可以在这里添加提示
        alert("请上传佐证材料"); // 根据你的业务逻辑，如果文件是必须的，则需要提示
        setIsSubmitting(false);
        return; // 提前结束函数
      }

      // 调试用：打印 FormData 的内容
      console.log("即将发送的 FormData 内容:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1]);
      }

      // 6. 调用真实的API，并传入完整的 FormData 对象
      // 确保 applyDeveloper 函数只接受一个参数 (FormData)
      const response = await applyDeveloper(formData); // 传入整个 formData

      // 检查响应状态
      if (response.code === 200) {
        alert("申请已提交，我们会在3-5个工作日内审核您的申请");
        setShowUpgradeModal(false); // 关闭弹窗
        // 重置表单状态
        setUpgradeForm({
          reason: "",
          experience: "",
          portfolio: "",
          supportingFiles: [],
        });
      } else {
        alert(response.msg || "申请提交失败，请稍后重试");
      }
    } catch (error) {}
  };

  // 处理充值
  const handleRecharge = () => {
    setIsRechargeVisible(true);
  };

  const handleCancel = () => {
    setIsRechargeVisible(false);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Here you would call your recharge API
      // await rechargeApi(amount);
      console.log("Recharging amount:", amount);

      // Simulate API call
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await rechargeUser(userInfo.id, amount);

      Modal.success({
        title: "充值成功",
        content: `成功充值 ${amount} 元`,
      });
      setIsRechargeVisible(false);
      window.location.reload(); // 重新加载页面以更新余额
    } catch (error) {
      Modal.error({
        title: "充值失败",
        content: error.message || "请稍后重试",
      });
    } finally {
      setLoading(false);
    }
  };

  const presetAmounts = [50, 100, 200, 500, 1000];
  // 处理设置
  const handleSettings = () => {
    navigate("/personal/settings");
  };

  // 导航到不同页面
  const handleNavigate = (path) => {
    navigate(`/personal/${path}`);
  };

  // 平滑滚动到关注内容
  const scrollToFollowing = () => {
    if (followingContentRef.current) {
      followingContentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // 处理tab点击
  const handleTabClick = (tabKey, path) => {
    navigate(path);
  };

  // 检查是否在主页面（显示导航卡片）
  const isMainPage =
    location.pathname === "/personal" || location.pathname === "/personal/";

  // Tab 配置 - 根据用户身份动态调整
  const tabs = [
    {
      key: "",
      label: userInfo && userInfo.role === 2 ? "我的粉丝" : "我的关注",
      icon: <Heart size={16} />,
      path: "/personal",
    },
    // {
    //   key: "momentsLayout",
    //   label: "动态",
    //   icon: <User size={16} />,
    //   path: "/personal/momentsLayout",
    //   showForDeveloper: true, // 标记这个tab需要开发商身份
    // },
    {
      key: "appointment",
      label: "软件详情",
      icon: <Clock size={16} />,
      path: "/personal/appointment",
    },
    {
      key: "settings",
      label: "设置",
      icon: <Settings size={16} />,
      path: "/personal/settings",
    },
  ];

  // 获取当前活动的tab
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === "/personal" || path === "/personal/") return "";
    const segments = path.split("/");
    return segments[segments.length - 1] || "";
  };

  const activeTab = getCurrentTab();

  return (
    <div className={styles.personalPage}>
      {/* 升级为开发商弹窗 */}
      {showUpgradeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>申请成为软件开发商</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowUpgradeModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpgradeSubmit} className={styles.upgradeForm}>
              <div className={styles.formGroup}>
                <label>申请理由 *</label>
                <textarea
                  value={upgradeForm.reason}
                  onChange={(e) =>
                    setUpgradeForm({
                      ...upgradeForm,
                      reason: e.target.value,
                    })
                  }
                  placeholder="请详细说明您申请成为软件开发商的理由..."
                  rows={4}
                  required
                />
              </div>
              {/* 
              <div className={styles.formGroup}>
                <label>开发经验</label>
                <textarea
                  value={upgradeForm.experience}
                  onChange={(e) => setUpgradeForm({
                    ...upgradeForm,
                    experience: e.target.value
                  })}
                  placeholder="请简述您的软件开发经验（选填）"
                  rows={3}
                />
              </div> */}

              {/* <div className={styles.formGroup}>
                <label>作品集链接</label>
                <input
                  type="url"
                  value={upgradeForm.portfolio}
                  onChange={(e) => setUpgradeForm({
                    ...upgradeForm,
                    portfolio: e.target.value
                  })}
                  placeholder="https://your-portfolio.com（选填）"
                />
              </div> */}

              {/* 佐证材料上传 */}
              <div className={styles.formGroup}>
                <label>佐证材料</label>
                <div className={styles.fileUploadSection}>
                  <div
                    className={styles.fileUploadArea}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={24} />
                    <p>点击上传佐证材料</p>
                    {/* Updated small tag to reflect single file and no type restriction */}
                    <small>支持任意文件格式，单个文件不超过10MB</small>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    // REMOVED: multiple attribute
                    // ADDED: name attribute, crucial for FormData.get()
                    name="supportingFile" // This name must match formData.get("supportingFile")
                    // REMOVED: accept attribute, as you requested no file type restrictions
                    onChange={handleFileUpload}
                    className={styles.hiddenFileInput}
                  />
                </div>

                {/* Uploaded File List - will now only show one file */}
                {upgradeForm.supportingFiles.length > 0 && (
                  <div className={styles.fileList}>
                    <h4>已上传文件 ({upgradeForm.supportingFiles.length})</h4>
                    {upgradeForm.supportingFiles.map((fileObj) => (
                      <div key={fileObj.id} className={styles.fileItem}>
                        <div className={styles.fileIcon}>
                          <span>{getFileIcon(fileObj.type)}</span>{" "}
                          {/* Keep getFileIcon for display */}
                        </div>
                        <div className={styles.fileInfo}>
                          <div className={styles.fileName}>{fileObj.name}</div>
                          <div className={styles.fileSize}>
                            {formatFileSize(fileObj.size)}
                          </div>
                        </div>
                        <button
                          type="button"
                          className={styles.removeFileBtn}
                          onClick={() => removeFile(fileObj.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowUpgradeModal(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>提交中...</>
                  ) : (
                    <>
                      <Send size={16} />
                      提交申请
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 用户信息头部 */}
      <div className={styles.userHeader}>
        <div className={styles.userInfo}>
          <img
            src={userInfo && userInfo.avatar}
            alt={userInfo && userInfo.name}
            className={styles.userAvatar}
          />
          <div className={styles.userDetails}>
            <div className={styles.userNameSection}>
              <h2 className={styles.userName}>
                {(userInfo && userInfo.name) || name}
              </h2>
              <span
                className={styles.userRole}
                style={{
                  backgroundColor: getRoleConfig(userInfo && userInfo.role)
                    .color,
                }}
              >
                {getRoleConfig(userInfo && userInfo.role).text}
              </span>
            </div>
            {/* <div className={styles.userStats}>
              <span className={styles.stat}>
                {userInfo && userInfo.role === 2 ? "粉丝" : "关注"}:
                <strong>
                  {userInfo && userInfo.role === 2
                    ? userInfo && userInfo.followerCount
                    : userInfo && userInfo.followingCount}
                </strong>
              </span>
            </div> */}
          </div>
          <div className={styles.userActions}>
            {/* 只有普通用户才显示升级为开发商按钮 */}
            {userInfo && userInfo.role === 3 && (
              <button
                className={styles.actionBtn}
                onClick={handleUpgradeToDeveloper}
              >
                <Edit3 size={16} />
                升级为开发商
              </button>
            )}
            <div className={styles.rechargeContainer}>
              <button
                className={styles.actionBtn}
                icon={<MoneyCollectOutlined />}
                onClick={handleRecharge}
              >
                <MoneyCollectOutlined />
                充值
              </button>

              <Modal
                title="账户充值"
                visible={isRechargeVisible}
                onCancel={handleCancel}
                footer={null}
                width={400}
                centered
              >
                <Card bordered={false} className={styles.rechargeCard}>
                  {/* 新增余额显示 */}
                  <div className={styles.balanceSection}>
                    <span>当前余额：</span>
                    <strong className={styles.balanceAmount}>
                      ¥{currentBalance}
                    </strong>
                  </div>

                  <div className={styles.amountSection}>
                    <h4>充值金额</h4>
                    <InputNumber
                      min={10}
                      max={10000}
                      value={amount}
                      defaultValue={100}
                      onChange={handleAmountChange}
                      formatter={(value) => `¥ ${value}`}
                      parser={(value) => value.replace(/¥\s?|(,*)/g, "")}
                      style={{ width: "100%", margin: "10px 0" }}
                    />

                    <div className={styles.presetAmounts}>
                      {presetAmounts.map((amt) => (
                        <Button
                          key={amt}
                          type={amount === amt ? "primary" : "default"}
                          onClick={() => setAmount(amt)}
                        >
                          ¥{amt}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="primary"
                    block
                    size="large"
                    onClick={handleSubmit}
                    loading={loading}
                    style={{ marginTop: 20 }}
                  >
                    立即充值 ¥{amount}
                  </Button>
                </Card>
              </Modal>
            </div>
            <button className={styles.actionBtn} onClick={handleSettings}>
              <Settings size={16} />
              设置
            </button>
          </div>
        </div>
      </div>

      {/* Tab 导航栏 */}
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabItem} ${
              activeTab === tab.key ? styles.activeTab : ""
            }`}
            onClick={() => handleTabClick(tab.key, tab.path)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 快速导航卡片 - 仅在主页面显示 */}
      {isMainPage && (
        <div className={styles.quickNav}>
          <div className={styles.navCard} onClick={() => scrollToFollowing()}>
            <div className={styles.navIcon}>
              <Heart size={24} />
            </div>
            <div className={styles.navContent}>
              <h3 className={styles.navTitle}>
                {userInfo && userInfo.role === 1 ? "我的粉丝" : "我的关注"}
              </h3>
              {/* <p className={styles.navDesc}>
                {userInfo && userInfo.role === 1
                  ? `${userInfo && userInfo.followerCount} 位粉丝关注了你`
                  : `关注了 ${
                      userInfo && userInfo.followingCount
                    } 个软件开发商`}
              </p> */}
            </div>
          </div>

          {/* <div
            className={styles.navCard}
            onClick={() => handleNavigate("momentsLayout")}
          >
            <div className={styles.navIcon}>
              <User size={24} />
            </div>
            <div className={styles.navContent}>
              <h3 className={styles.navTitle}>动态</h3>
              <p className={styles.navDesc}>
                {userInfo && userInfo.role === 2
                  ? "查看我的最新动态和活动记录"
                  : "暂无动态，升级为开发商后可发布动态"}
              </p>
            </div>
          </div> */}

          <div
            className={styles.navCard}
            onClick={() => handleNavigate("appointment")}
          >
            <div className={styles.navIcon}>
              <Clock size={24} />
            </div>
            <div className={styles.navContent}>
              <h3 className={styles.navTitle}>已预约</h3>
              {/* <p className={styles.navDesc}>
                {statistics.reservedCount} 个软件等待发布
              </p> */}
            </div>
          </div>
        </div>
      )}

      {/* 我的关注内容区域 */}
      {isMainPage && (
        <div ref={followingContentRef} className={styles.followingContent}>
          <Outlet context={{ userInfo, statistics }} />
        </div>
      )}

      {/* 其他页面内容区域 */}
      {!isMainPage && (
        <div className={styles.contentSection}>
          <div className={styles.tabContentWrapper}>
            {/* 如果是动态页面且用户不是开发商，显示提示 */}
            {activeTab === "momentsLayout" &&
            userInfo &&
            userInfo.role !== 2 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <User size={48} />
                </div>
                <h3>暂无动态</h3>
                <p>
                  只有软件开发商可以发布动态，申请成为开发商后即可使用此功能。
                </p>
                <button
                  className={styles.upgradePromptBtn}
                  onClick={() => setShowUpgradeModal(true)}
                >
                  申请成为开发商
                </button>
              </div>
            ) : (
              <Outlet context={{ userInfo, statistics }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Personal;
