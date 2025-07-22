
import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

import "./controlPage.css"
import Detail from "./component/detail"
import UserList from './component/userList';
import ShowCard from './component/showSoft';

const { Header, Sider, Content } = Layout;
const ControlPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    //从后台拉取
    const software = {
        name: '示例软件',
        description: '这是一个很棒的软件。',
        proofMaterials: [],
        package: [],
        preSale: true,
        price: 199.99,
        cover: [],
    };
    //从后台拉取
    const users = [
        { name: 'Alice', email: 'alice@example.com', avatarUrl: 'https://example.com/avatar1.jpg' },
        { name: 'Bob', email: 'bob@example.com', avatarUrl: 'https://example.com/avatar2.jpg' },
        { name: 'Charlie', email: 'charlie@example.com', avatarUrl: 'https://example.com/avatar3.jpg' },
    ];


    return (
        <Layout className='layout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer, height: 30 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/*软件审核详情页 <Detail software={software} /> */}
                    {/* 用户列表页  <UserList users={users}></UserList> */}
                    <ShowCard />
                </Content>
            </Layout>
        </Layout>
    );
};
export default ControlPage;