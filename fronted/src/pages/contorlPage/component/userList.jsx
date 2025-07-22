import React, { useState } from 'react';
import { Input, Button, List, Modal, message, Avatar } from 'antd';
import { LockOutlined, SearchOutlined } from '@ant-design/icons';

const UserList = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);

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

    return (
        <div className="user-list-container">
            {/* 搜索框 */}
            <Input
                placeholder="搜索用户"
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ width: '300px', marginBottom: '20px' }}
            />

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
        </div>
    );
};

export default UserList;
