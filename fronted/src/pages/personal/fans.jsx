import React, { useState, useEffect, use } from "react";
import { ArrowLeft, Users, Heart, Calendar } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PersonalInfo from "./component/PersonalInfo/PersonalInfo";
import {
  fetchFollowedDevelopers,
  fetchDeveloperFans,
  unfollowDeveloper,
} from "../../api/service/developerService.js";
import styles from "./fans.module.css";
import { useSelector } from "react-redux";
import { message } from "antd";

const Fans = () => {
  const navigate = useNavigate();
  const { userInfo, statistics } = useOutletContext();
  const user = useSelector((state) => state.user.userInfo);

  const [fansList, setFansList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 确保 userInfo 存在，并提供默认值
  const currentUserRole = userInfo?.role || 3;
  const currentUserId = userInfo?.id || "2"; // 默认用户ID，实际应该从userInfo获取
  const pageTitle = currentUserRole === 2 ? "我的粉丝" : "我的关注";
  const emptyText =
    currentUserRole === 2 ? "还没有粉丝关注你" : "你还没有关注任何开发商";

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        let result;

        if (currentUserRole === 2) {
          // 开发者获取粉丝列表
          try {
            result = await fetchDeveloperFans(currentUserId);
            console.log("获取到的粉丝数据:", result);
          } catch (err) {
            // 如果接口还没准备好，使用虚拟数据
            console.log("粉丝接口暂未实现，使用虚拟数据");
          }
        } else {
          // 用户获取关注的开发者列表
          try {
            result = await fetchFollowedDevelopers(currentUserId);
            console.log("获取到的关注数据:", result);
          } catch (err) {
            // 如果接口调用失败，使用虚拟数据
            console.log("使用虚拟数据:", err);
          }
        }

        if (result) {
          setFansList(result.data);
        } else {
          message.error(result.msg || "获取数据失败");
        }
      } catch (err) {
        console.error("获取数据失败:", err);
        message.error("网络错误，请稍后重试");
        // 发生错误时也使用虚拟数据
        const mockData = getMockFollowedDevelopers();
        setFansList(mockData.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserRole, currentUserId]);

  // 处理返回
  const handleBack = () => {
    navigate("/personal");
  };

  // 处理取消关注（仅用户身份显示）
  const handleUnfollow = async (item) => {
    if (!window.confirm(`确定要取消关注 ${item.name} 吗？`)) {
      return;
    }

    try {
      setLoading(true);
      const result = await unfollowDeveloper(currentUserId, item.id);

      if (result.code === 200) {
        // 更新本地列表，移除取消关注的项目
        setFansList((prevList) => prevList.filter((fan) => fan.id !== item.id));
        alert(result.msg || "取消关注成功！");
      } else {
        alert(result.msg || "取消关注失败");
      }
    } catch (error) {
      console.error("取消关注失败:", error);
      alert("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // 处理查看详情（仅用户身份显示）
  const handleViewProfile = (item) => {
    console.log("查看详情:", item.name);
    // 跳转到供应商详情页面
    navigate(`/supplier/${item.id}`);
  };

  return (
    <div className={styles.fansPage}>
      {/* 个人信息展示 */}
      {/* {userInfo && (
        <div className={styles.personalInfoSection}>
          <PersonalInfo userInfo={userInfo} statistics={statistics} />
        </div>
      )} */}

      {/* 页面头部 */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>{pageTitle}</h1>
          <div className={styles.statsInfo}>
            <Users size={16} />
            <span>{fansList.length} 个</span>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {error && (
          <div className={styles.error}>
            <p>错误: {error}</p>
            <button onClick={() => window.location.reload()}>重新加载</button>
          </div>
        )}

        {loading ? (
          <div className={styles.loading}>加载中...</div>
        ) : fansList.length === 0 ? (
          <div className={styles.empty}>
            <Users size={48} />
            <h3>暂无数据</h3>
            <p>{emptyText}</p>
          </div>
        ) : (
          <div className={styles.fansList}>
            {fansList.map((item) => (
              <div
                key={item.id}
                className={`${styles.fansCard} ${
                  currentUserRole === 2 ? styles.noActions : ""
                }`}
              >
                <div className={styles.fansInfo}>
                  <div className={styles.avatarSection}>
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className={styles.avatar}
                      onError={(e) => {
                        // 头像加载失败时使用默认头像
                        e.target.src = "";
                      }}
                    />
                    {item.verified && (
                      <div className={styles.verifiedBadge}>✓</div>
                    )}
                  </div>

                  <div className={styles.infoSection}>
                    <div className={styles.nameSection}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <span className={styles.type}>
                        {item.type === 2 ? "开发者" : "普通用户"}
                      </span>
                    </div>
                    <p className={styles.description}>{item.description}</p>

                    <div className={styles.stats}></div>
                  </div>
                </div>

                {/* 根据用户身份条件渲染操作按钮 */}
                {currentUserRole === 3 && (
                  <div className={styles.actions}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => handleViewProfile(item)}
                      disabled={loading}
                    >
                      查看详情
                    </button>
                  </div>
                )}

                {/* 开发商身份不显示任何操作按钮，只显示信息 */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fans;
