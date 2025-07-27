import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Avatar, Collapse, Typography, Divider, message, Modal } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './showList.module.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishSortAPI } from "../../api/service/userService";
import { fetchSoftVersionAPI } from "../../api/service/userService";
import { fetcheditorStatusAPI } from "../../api/service/userService";

const { Panel } = Collapse;
const { Text } = Typography;

const SoftwareList = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [softwareData, setSoftwareData] = useState([]); // 将 softwareData 移到这里，作为状态变量
  const [versionData, setVersionData] = useState([])
  const [isopen, setIsopen] = useState(false)
  const [selectedSoftwareId, setSelectedSoftwareId] = useState(null);  // 存储选择的 softwareId
  const [render, setRender] = useState(true)
  const id = useSelector((state) => state.user.user.id);
  useEffect(() => {
    // 模拟软件数据（只用作示例）
    // //模拟版本数据
    // setVersionData(
    //   [
    //     {
    //       picture: "version1.jpg",
    //       version: "v1.0",
    //       published_time: "2025-07-20 12:00:00",
    //       versionId: "1",
    //       introduction: "垃圾接口",
    //       price: "无价之宝",
    //     },
    //     {
    //       picture: "version2.jpg",
    //       version: "v1.1",
    //       published_time: "2025-07-22 09:00:00",
    //       versionId: "2",
    //       introduction: "垃圾接口",
    //       price: "无价之宝",
    //     }
    //   ]
    // )


    // 调用 fetchPublishSortAPI 获取数据
    const getData = async () => {
      try {
        const data = await fetchPublishSortAPI(id);
        console.log(data);

        setSoftwareData(data);  // 更新组件状态
      } catch (error) {
        console.error("获取数据失败:", error);
      }
    };
    getData();  // 组件挂载时调用 API
  }, [render]);  // 空依赖数组，表示只在组件挂载时调用一次

  //获取版本信息的函数
  const getVersion = async (softwarename) => {
    try {
      const data = await fetchSoftVersionAPI(softwarename);
      setVersionData(data);  // 更新组件状态
    } catch (error) {
      console.error("获取数据失败:", error);
    }
  };

  //处理列表折叠
  const handleExpandToggle = (softId) => {
    setExpandedRow(expandedRow === softId ? null : softId);
    getVersion(softId)
  };

  const navigate = useNavigate();
  function editorsoft(Id, intro, price) {
    navigate("editor", {
      state: { Id, intro, price },
    });
  }

  //软件开发商发布已通过审核的软件
  const handlePublishEvent = async () => {
    setIsopen(false)
    if (selectedSoftwareId) {
      try {
        const response = await fetcheditorStatusAPI(selectedSoftwareId); // 调用 API
        setRender(!render)
        if (response.code) {
          message.success("发布软件成功");
        } else {
          console.error("发布软件失败:", response.message);
        }
      } catch (error) {
        console.error("API 调用失败:", error);
      }
    }
  };

  // 显示弹窗时，设置选中的 softwareId
  const showModal = (softwareId) => {
    setSelectedSoftwareId(softwareId);
    setIsopen(true);
  };

  return (
    <>
      <div className={styles.softwareListContainer}>
        {/* 检查 softwareData 是否为空 */}
        {
          softwareData?.map((software) => (
            <div key={software.name} className={styles.softwareRow}>
              {/* 父行：头像，软件名称，创建日期 */}
              <Row justify="space-between" align="middle">
                <Col>
                  <Avatar src={software.picture} size={50} />
                </Col>
                <Col flex="1" style={{ marginLeft: 20 }}>
                  <Text strong>{software.name}</Text>
                  <div>{software.published_time}</div>
                </Col>
                <Col>
                  <Button
                    onClick={software.status === 1 ? () => showModal(software.softId) : null}
                  >
                    {software.status === 0 ? "未审核" :
                      software.status === 1 ? "发布" :
                        software.status === 2 ? "已发布" : "未知状态"}
                  </Button>
                  <Button
                    type="primary"
                    //这里传的是Id点击就能传递软件id去查看软件的各个版本
                    onClick={() => handleExpandToggle(software.softId)}
                    icon={expandedRow === software.softId ? <UpOutlined /> : <DownOutlined />}
                  >
                    {expandedRow === software.softId ? '收起' : '查看版本'}
                  </Button>
                </Col>
              </Row>

              {expandedRow === software.softId && (
                <Collapse bordered={false}>
                  <Panel header="版本信息" key="1">
                    <ul>
                      {versionData.map((version, index) => (
                        <li key={index} className={styles.versionRow}>
                          <div className={styles.versionItem}>
                            <img src={version.picture} alt={"image"} className={styles.versionCover} />
                            <div className={styles.versionInfo}>
                              <span>{version.version}</span>
                              <div>{version.published_time}</div>
                            </div>
                            <Button type="link" onClick={() => editorsoft(version.versionId, version.introduction, version.price)}>修改版本信息</Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </Collapse>
              )}
              <Divider />
            </div>
          ))
        }
      </div>
      <Modal
        open={isopen}
        onOk={handlePublishEvent} // 确认时调用 handlePublishEvent 发送请求
        onCancel={() => setIsopen(false)} // 取消时关闭弹窗
        okText="确认发布"
        cancelText="取消"
      >
        确认发布软件吗
      </Modal>
    </>
  );
};

export default SoftwareList;
