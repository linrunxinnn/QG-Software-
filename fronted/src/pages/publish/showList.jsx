import React, { useState } from 'react';
import { Row, Col, Button, Avatar, Collapse, Typography, Divider } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './showList.module.css';
import { useNavigate } from "react-router-dom";

const { Panel } = Collapse;
const { Text } = Typography;

const SoftwareList = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  // 假设软件数据
  const softwareData = [
    {
      id: 1,
      avatar: 'https://i.pravatar.cc/150?img=1',
      name: '软件A',
      createTime: '2025-06-30',
      cover: 'https://via.placeholder.com/150x100',
      versions: [
        { version: 'v1.0', cover: 'https://via.placeholder.com/150x100', createTime: '2025-01-01' },
        { version: 'v1.1', cover: 'https://via.placeholder.com/150x100', createTime: '2025-02-15' },
        { version: 'v2.0', cover: 'https://via.placeholder.com/150x100', createTime: '2025-06-10' },
      ],
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/150?img=2',
      name: '软件B',
      createTime: '2025-05-20',
      cover: 'https://via.placeholder.com/150x100',
      versions: [
        { version: 'v1.0', cover: 'https://via.placeholder.com/150x100', createTime: '2025-03-01' },
        { version: 'v2.0', cover: 'https://via.placeholder.com/150x100', createTime: '2025-05-25' },
      ],
    },
  ];

  const handleExpandToggle = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };
  const navigate = useNavigate()
  function createsoft() {
    navigate("create")
  }
  return (
    <div className={styles.softwareListContainer}>
      {softwareData.map((software) => (
        <div key={software.id} className={styles.softwareRow}>
          {/* Parent Row: Avatar, Software Name, Creation Date */}
          <Row justify="space-between" align="middle">
            <Col>
              <Avatar src={software.avatar} size={50} />
            </Col>
            <Col flex="1" style={{ marginLeft: 20 }}>
              <Text strong>{software.name}</Text>
              <div>{software.createTime}</div>
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => handleExpandToggle(software.id)}
                icon={expandedRow === software.id ? <UpOutlined /> : <DownOutlined />}
              >
                {expandedRow === software.id ? '收起' : '查看版本'}
              </Button>
            </Col>
          </Row>

          {expandedRow === software.id && (
            <Collapse bordered={false}>
              <Panel header="版本信息" key="1">
                <ul>
                  {software.versions.map((version, index) => (
                    <li key={index} className={styles.versionRow}>
                      {/* Version Row: Cover, Version Name, Create Date */}
                      <div className={styles.versionItem}>
                        <img src={version.cover} alt={`version cover ${index}`} className={styles.versionCover} />
                        <div className={styles.versionInfo}>
                          <Text strong>{version.version}</Text>
                          <div>{version.createTime}</div>
                        </div>
                        <Button type="link" onClick={() => createsoft()}>修改版本信息</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>
            </Collapse>
          )}
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default SoftwareList;
