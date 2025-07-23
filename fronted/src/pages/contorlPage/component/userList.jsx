import React, { useState } from 'react';
import { Input, Button, List, Modal, message, Avatar, Badge } from 'antd';
import { LockOutlined, SearchOutlined } from '@ant-design/icons';
import { BellOutlined } from "@ant-design/icons";

const UserList = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
    // 更新搜索框的值
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        filterUsers(e.target.value);
    };

    // 根据搜索框的内容过滤用户列表
    const filterUsers = (query) => {
        const filtered = users.filter((user) => {
            return (
                user.name.toLowerCase().includes(query.toLowerCase())
            );
        });
        setFilteredUsers(filtered);
    };

    // 冻结用户的处理函数
    const handleFreezeUser = (userName) => {
        Modal.confirm({
            title: '确认冻结用户',
            content: `您确定要冻结用户 ${userName} 吗？`,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                message.success(`${userName} 已冻结`);
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
                dataSource={filteredUsers}
                renderItem={(user) => (
                    <List.Item
                        actions={[
                            <Button
                                icon={<LockOutlined />}
                                onClick={() => handleFreezeUser(user.name)}
                            >
                                冻结
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={user.avatarUrl} />}
                            title={user.name}
                            description={user.email}
                        />
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
