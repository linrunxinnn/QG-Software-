import React, { useState, useEffect } from 'react';
import { Input, Button, List, Modal, message, Avatar, Badge, Row, Col, Collapse } from 'antd';
import { LockOutlined, SearchOutlined } from '@ant-design/icons';
import { BellOutlined } from "@ant-design/icons";
import { fetchAccountAPI } from "../../../api/service/userService"
import { fetchstatusAPI } from "../../../api/service/userService"
import { fetchApplyAPI } from "../../../api/service/userService"
import { fetchBanAPI } from "../../../api/service/userService"
import { fetchAdmitAPI } from "../../../api/service/userService"
import { fetchfrezeeAPI } from "../../../api/service/userService"

const UserList = () => {
    //渲染的数据
    const [users, setUsers] = useState([])//用户的数据
    const [searchQuery, setSearchQuery] = useState('');//搜索框
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);//是否接收到用户的申请请求
    const [expandedRow, setexpandedRow] = useState(null);//是否展开用户申请的详情
    const [Application, setApplication] = useState([])//用户的申请数据
    const [render, setRender] = useState(true)//控制是否重新渲染用户列表

    // 更新搜索框的值
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 冻结用户的处理函数
    const handleFreezeUser = async (userId, useStatus) => {
        if (useStatus === 1) {
            Modal.confirm({
                title: '确认冻结用户',
                content: `您确定要冻结该账户吗？`,
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {

                    try {
                        // 异步调用冻结用户的API
                        const response = await fetchstatusAPI(userId, "2025-12-31 23:59:59");
                        if (response.data.code) {
                            message.success("冻结用户成功");
                        }
                        setRender(!render)//应该放在获取数据之后更改状态才会触发重新渲染
                    } catch (error) {
                        message.error("冻结用户失败，请稍后再试");
                    }
                },
            });
        } else {
            Modal.confirm({
                title: '确认解冻用户',
                content: `您确定要解冻该账户吗？`,
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {

                    try {
                        // 异步调用解冻用户的API
                        const response = await fetchfrezeeAPI(userId, "2024-12-31 23:59:59");
                        if (response.data.code) {
                            message.success("解冻用户成功");
                            setRender(!render)
                        }
                    } catch (error) {
                        message.error("解冻用户失败，请稍后再试");
                    }
                },
            });
        }
    };


    //控制弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = async () => { // 添加async关键字
        try {
            setIsModalOpen(true);
            const applications = await fetchApplyAPI();
            setApplication(applications);
            console.log(Application);
            console.log(Application[0].userId);
        } catch (error) {
            console.error('获取申请数据失败:', error);
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //控制弹窗内部的进一步展开
    const handleExpandToggle = (name) => {
        setexpandedRow(expandedRow === name ? null : name);
    };


    //初次挂载时自动获取数据
    const fetchUsers = async () => {
        try {
            const response = await fetchAccountAPI();
            console.log(response);

            if (response) {
                console.log("重新渲染的数据", response);
                setUsers(response);
            }
        } catch (error) {
            console.error("获取用户数据失败", error);
            message.error("获取用户数据失败");
        }
    };

    // 初次挂载时获取数据
    useEffect(() => {
        fetchUsers();
        console.log("重新渲染用户数据");

    }, [render]);


    const admit = async (id, userId) => {
        try {
            setexpandedRow(false)
            console.log(userId);
            const response = await fetchAdmitAPI(id, userId);
            message.success("同意用户申请成功")
        } catch (error) {
            console.error("同意用户申请失败", error);
            message.error("同意用户申请失败");
        }
    }

    const Ban = async (id, userId) => {
        try {
            setexpandedRow(false)
            const response = await fetchBanAPI(id, userId);
        } catch (error) {
            console.error("拒绝用户申请失败", error);
            message.error("拒绝用户申请失败");
        }
    }
    return (
        <div className="user-list-container">
            {/* 搜索框 */}
            <div>
                <Input
                    placeholder="搜索用户"
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '20%', marginBottom: '20px' }}
                />
                <span style={{ float: "right" }}>
                    <Badge
                        dot={!hasUnreadNotifications}
                    >
                        <BellOutlined onClick={() => showModal()} />
                    </Badge>
                </span>
            </div>
            {/* 用户列表 */}
            <List
                pagination={{ pageSize: 15 }}  // 可以根据需求启用分页
                bordered
                //数据的渲染处
                dataSource={users}
                //list的渲染方法
                renderItem={(user) => (
                    <List.Item
                        actions={[
                            <Button
                                icon={<LockOutlined />}
                                onClick={() => handleFreezeUser(user.id, user.status)}
                                type="primary"
                                ghost
                            >
                                {user.status ? "冻结" : "解冻"}
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={user.avatarUrl} />}
                            title={user.name}
                        />
                        {/* 用户冻结状态和身份 */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '14px', color: '#888' }}>
                                {!user.status ? (
                                    <span style={{ color: '#FF4D4F', fontWeight: '500' }}>
                                        已冻结 | 封号时间: {user.startTime} - {user.endTime}
                                    </span>
                                ) : (
                                    <span style={{ color: '#52C41A', fontWeight: '500' }}>
                                        正常
                                    </span>
                                )}
                            </span>
                            <span style={{ fontSize: '14px', color: '#555' }}>
                                <strong>身份:</strong>
                                {user.role === 1 ? "管理员" : user.role === 2 ? "开发商" : "用户"}
                            </span>
                        </div>
                    </List.Item>
                )}
            />
            {/* 弹窗 */}
            <Modal
                title="用户的申请"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    {Application.map((apply) => (
                        <div key={apply.name} style={{
                            margin: "5px"
                        }}>
                            <Row justify="space-between" align="middle"  >
                                <Col flex="1" style={{ marginLeft: 20 }}>
                                    <span>{apply.name}</span>
                                </Col>
                                <Col>
                                    <Button
                                        type="primary"
                                        onClick={() => handleExpandToggle(apply.name)}
                                    >
                                        {expandedRow === apply.name ? '收起' : '查看详情'}
                                    </Button>
                                </Col>
                            </Row>

                            {expandedRow === apply.name && (
                                <Collapse bordered={false}>
                                    <Collapse.Panel header="申请" key="1">
                                        <div>
                                            <h3>申请理由</h3>
                                            <div>{apply.reason}</div>

                                            <h3>佐证材料</h3>
                                            <div>
                                                <a href={apply.material} target="_blank" rel="noopener noreferrer">
                                                    {apply.material}
                                                </a>
                                            </div>
                                            <Button onClick={() => admit(apply.id, apply.userId)} >同意</Button>
                                            <Button onClick={() => Ban(apply.id, apply.userId)}>取消</Button>
                                        </div>
                                    </Collapse.Panel>
                                </Collapse>
                            )}
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default UserList;
