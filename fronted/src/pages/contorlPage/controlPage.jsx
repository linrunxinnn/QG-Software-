
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
import { Outlet, useNavigate } from 'react-router-dom';


const { Header, Sider, Content } = Layout;
const ControlPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate()

    //跳转页面函数
    const handleMenuClick = (key) => {
        if (key === "1") navigate('');
        else if (key === "2") navigate('user');
        else navigate('comment');
    }

    return (
        <Layout className='layout'>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ minHeight: '100vh' }} >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: '软件审核',
                            onClick: () => handleMenuClick('1'),
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: '账户管理',
                            onClick: () => handleMenuClick('2'),
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: '社区管理',
                            onClick: () => handleMenuClick('3'),
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
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    );
};
export default ControlPage;