import React, { useState, useEffect } from 'react';
import { Input, Button, List, Modal, message, Avatar, Badge } from 'antd';
import { LockOutlined, SearchOutlined } from '@ant-design/icons';
import { BellOutlined } from "@ant-design/icons";
import { fetchAccountAPI } from "../../../api/service/userService"
import { fetchstatusAPI } from "../../../api/service/userService"

const UserList = () => {
    //渲染的数据
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    // 更新搜索框的值
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 冻结用户的处理函数
    const handleFreezeUser = (useId) => {
        Modal.confirm({
            title: '确认冻结用户',
            content: `您确定要冻结该账户吗？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                fetchstatusAPI(useId)
            },
        });
    };

    //控制弹窗
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //初次挂载时自动获取数据
    const fetchUsers = async () => {
        try {
            const response = await fetchAccountAPI();
            if (response && response.data) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error("获取用户数据失败", error);
            message.error("获取用户数据失败");
        }
    };

    // 初次挂载时获取数据
    useEffect(() => {
        fetchUsers();
    }, []);


    // // 虚拟数据
    // setUsers([
    //     {
    //         id: 1,
    //         name: '张三',
    //         avatar: 'https://joeschmoe.io/api/v1/zhangsan',
    //         status: 1,
    //         role: 1,
    //         startTime: '2025-01-01',
    //         endTime: '2025-12-31',
    //     },
    //     {
    //         id: 2,
    //         name: '李四',
    //         avatarUrl: 'https://joeschmoe.io/api/v1/lisi',
    //         status: 0,
    //         role: 3,
    //         startTime: '',
    //         endTime: '',
    //     },
    // ]);
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
                bordered
                //数据的渲染处
                dataSource={users}
                //list的渲染方法
                renderItem={(user) => (
                    <List.Item
                        actions={[
                            <Button
                                icon={<LockOutlined />}
                                onClick={() => handleFreezeUser(user.id)}
                                type="primary"
                                ghost
                            >
                                冻结
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
                                {user.status ? (
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
            <Modal
                title="用户的申请"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>用户名:</div><span></span>
                <div>申请材料：</div>

            </Modal>
        </div>
    );
};

export default UserList;
