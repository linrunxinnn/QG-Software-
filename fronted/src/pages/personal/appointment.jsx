import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Package,
  ShoppingBag,
  Edit3,
  Plus,
} from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./appointment.module.css";
import {
  getAppointment,
  getPurchase,
  getDeveloperSoftware,
} from "../../api/service/userService.js";
import { useSelector } from "react-redux";

const Appointment = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.user);
  // console.log("！！！！！用户信息:", userInfo);

  // 用户角色：'user' 或 'developer'
  const userRole = userInfo?.role || 3;

  //已预约
  const [reservedList, setReservedList] = useState([]);
  //已购买
  const [purchasedList, setPurchasedList] = useState([]);
  //已发布的软件列表
  const [mySoftwareList, setMySoftwareList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 获取数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userRole === 2) {
          // 获取开发商的软件列表
          async function getMySoftwareList() {
            try {
              const response = await getDeveloperSoftware(userInfo.id);
              setMySoftwareList(response.data);
              console.log("获取我的软件列表:", response.data);
            } catch (error) {
              console.error("获取我的软件列表失败:", error);
            }
          }
          getMySoftwareList();
          setLoading(false);
          // const response = await api.getMySoftwareList();
          // setMySoftwareList(response.data);
          // 临时模拟数据
          // setTimeout(() => {
          //   setMySoftwareList([
          //     {
          //       id: 1,
          //       name: "PhotoMaster Pro",
          //       icon: "https://picsum.photos/60/60?random=1",
          //       category: "图像处理",
          //       version: "v3.2.1",
          //       price: 299.0,
          //       status: "published", // published, draft, reviewing
          //     },
          //   ]);
          //   setLoading(false);
          // }, 1000);
        }
        // 获取用户的预约和购买列表
        // const [reservedRes, purchasedRes] = await Promise.all([
        //   api.getReservedSoftware(),
        //   api.getPurchasedSoftware()
        // ]);
        // setReservedList(reservedRes.data);
        // setPurchasedList(purchasedRes.data);
        async function getAppointmentList() {
          try {
            const response = await getAppointment(userInfo.id);
            setReservedList(response.data.records);
            console.log("获取我的预约列表:", response.data.records);
          } catch (error) {
            console.error("获取我的预约列表失败:", error);
          }
        }
        getAppointmentList();
        async function getReservedList() {
          try {
            const response = await getPurchase(userInfo.id);
            setPurchasedList(response.data?.records);
            console.log("获取我的购买列表:", response.data);
          } catch (error) {
            console.error("获取购买列表失败:", error);
          }
        }
        getReservedList();
        setLoading(false);
        // 临时模拟数据
        // setTimeout(() => {
        //   setReservedList([
        //     {
        //       id: 1,
        //       name: "AutoCAD 2025",
        //       icon: "https://picsum.photos/60/60?random=2",
        //       developer: "Autodesk",
        //       price: 1680.0,
        //       reserveDate: "2024-07-20",
        //       expectedReleaseDate: "2024-12-01",
        //     },
        //   ]);
        //   setPurchasedList([
        //     {
        //       id: 2,
        //       name: "Figma Enterprise",
        //       icon: "https://picsum.photos/60/60?random=3",
        //       developer: "Figma Inc.",
        //       price: 380.0,
        //       purchaseDate: "2024-07-18",
        //     },
        //   ]);
        //   setLoading(false);
        // }, 1000);
      } catch (error) {
        console.error("获取数据失败:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userRole]);

  // 获取状态配置
  const getStatusConfig = (status) => {
    const configs = {
      published: { text: "已发布", color: "#10b981", bgColor: "#d1fae5" },
      draft: { text: "草稿", color: "#f59e0b", bgColor: "#fef3c7" },
      reviewing: { text: "审核中", color: "#3b82f6", bgColor: "#dbeafe" },
    };
    return configs[status] || configs.draft;
  };

  // 处理返回
  const handleBack = () => {
    navigate("/personal");
  };

  // 处理跳转到全部软件页面
  const handleViewAll = () => {
    navigate("/publish");
  };

  // 处理软件详情/编辑点击
  const handleSoftwareClick = (software, type) => {
    if (userRole === 2) {
      // 跳转到编辑页面
      navigate(`/publish/edit/${software.id}`);
    } else {
      console.log(`跳转到软件详情页面 (${type}):`, software.name, software.id);
      // 后续使用: navigate(`/software/detail/${software.id}`);
    }
  };

  // 渲染软件卡片
  const renderSoftwareCard = (software, type = "") => (
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
            {userRole === 2 && (
              <span
                className={styles.statusBadge}
                style={{
                  color: getStatusConfig(software.status).color,
                  backgroundColor: getStatusConfig(software.status).bgColor,
                }}
              >
                {getStatusConfig(software.status).text}
              </span>
            )}
          </div>

          <div className={styles.details}>
            {userRole === 2 ? (
              <>
                <span className={styles.category}>{software.category}</span>
                <span className={styles.version}>版本: {software.version}</span>
                <div className={styles.stats}></div>
              </>
            ) : (
              <>
                <span className={styles.developer}>
                  开发商: {software.developer}
                </span>
                {type === "reserved" && software.expectedReleaseDate && (
                  <span className={styles.releaseDate}>
                    预计发布: {software.expectedReleaseDate}
                  </span>
                )}
                {type === "purchased" && software.purchaseDate && (
                  <span className={styles.purchaseDate}>
                    购买时间: {software.purchaseDate}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* <div className={styles.cardFooter}>
        <span className={styles.price}>¥{software.price}</span>
        <button
          className={styles.actionBtn}
          onClick={() => handleSoftwareClick(software, type)}
        >
          {userRole === 2 ? (
            <>
              <Edit3 size={14} />
              编辑
            </>
          ) : (
            "查看详情"
          )}
        </button>
      </div> */}
    </div>
  );

  const getPageTitle = () => {
    return userRole === 2 ? "我的软件" : "我的预约";
  };

  const getTotalCount = () => {
    if (userRole === 2) {
      return mySoftwareList?.length;
    }
    return reservedList?.length + purchasedList?.length;
  };

  if (loading) {
    return (
      <div className={styles.appointmentPage}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
        </div>
        <div className={styles.loading}>加载中...</div>
      </div>
    );
  }

  return (
    <div className={styles.appointmentPage}>
      {/* 页面头部 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className={styles.pageTitle}>{getPageTitle()}</h1>
        <div className={styles.headerRight}>
          <div className={styles.statsInfo}>
            {userRole === 2 ? <Package size={16} /> : <Clock size={16} />}
            <span>
              {getTotalCount()} 个{userRole === 2 ? "软件" : "项目"}
            </span>
          </div>
          {/* 开发商角色显示全部按钮 */}
          {userRole === 2 && (
            <button className={styles.viewAllBtn} onClick={handleViewAll}>
              <Package size={16} />
              全部
            </button>
          )}
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {userRole !== 3 && ( // 开发商视图：我的软件
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Package size={20} />
              <h2>我的软件</h2>
              <span className={styles.count}>{mySoftwareList?.length}</span>
            </div>

            {mySoftwareList?.length === 0 ? (
              <div className={styles.empty}>
                <Package size={48} />
                <h3>暂无软件</h3>
                <p>还没有发布任何软件，去创建一个吧！</p>
              </div>
            ) : (
              <div className={styles.softwareList}>
                {mySoftwareList &&
                  mySoftwareList.map((software) =>
                    renderSoftwareCard(software)
                  )}
              </div>
            )}
          </div>
        )}
        {/* 用户视图：已预约和已购买 */}
        <>
          {/* 已预约软件 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <Clock size={20} />
              <h2>已预约软件</h2>
              <span className={styles.count}>{reservedList.length}</span>
            </div>

            {reservedList.length === 0 ? (
              <div className={styles.empty}>
                <Clock size={48} />
                <h3>暂无预约</h3>
                <p>还没有预约任何软件，去软件商店看看吧！</p>
              </div>
            ) : (
              <div className={styles.softwareList}>
                {reservedList.map((software) =>
                  renderSoftwareCard(software, "reserved")
                )}
              </div>
            )}
          </div>

          {/* 已购买软件 */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <ShoppingBag size={20} />
              <h2>已购买软件</h2>
              <span className={styles.count}>
                {purchasedList ? purchasedList.length : 0}
              </span>
            </div>

            {!purchasedList ? (
              <div className={styles.empty}>
                <ShoppingBag size={48} />
                <h3>暂无购买</h3>
                <p>还没有购买任何软件</p>
              </div>
            ) : (
              <div className={styles.softwareList}>
                {purchasedList &&
                  purchasedList.map((software) =>
                    renderSoftwareCard(software, "purchased")
                  )}
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default Appointment;
