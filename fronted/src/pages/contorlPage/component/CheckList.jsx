import React, { useState } from 'react';
import { Table, Tag, Menu, Layout } from 'antd';
// import './App.css';  // 你可以将样式写在外部文件中
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

// 示例数据：待审核软件的列表
const softwareData = [
    {
        key: '1',
        name: 'Software 1',
        category: 'Productivity',
        publisher: 'Company A',
        status: 'Pending',
    },
    {
        key: '2',
        name: 'Software 2',
        category: 'Utility',
        publisher: 'Company B',
        status: 'Reviewed',
    },
    {
        key: '3',
        name: 'Software 3',
        category: 'Entertainment',
        publisher: 'Company C',
        status: 'Pending',
    },
    {
        key: '4',
        name: 'Software 4',
        category: 'Security',
        publisher: 'Company D',
        status: 'Reviewed',
    },
];

const SoftwareList = () => {
    const [selectedStatus, setSelectedStatus] = useState('All');  // 默认显示全部

    // 过滤数据函数
    const filterSoftware = () => {
        if (selectedStatus === 'All') {
            return softwareData;
        }
        return softwareData.filter((software) => software.status === selectedStatus);
    };

    // 表格的列配置
    const columns = [
        {
            title: '软件名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: '发布者',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Pending' ? 'orange' : 'green'}>
                    {status}
                </Tag>
            ),
        },
    ];

    // 导航栏点击事件
    const handleMenuClick = (e) => {
        setSelectedStatus(e.key);  // 更新选择的状态
    };

    const navigate = useNavigate()


    //跳转到审核页面详情
    const handleRowClick = (softwareName) => {
        // 跳转到软件的详情页面
        navigate(`detail/${softwareName}`);
    };

    return (
        <Layout>
            {/* 导航栏 */}
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" onClick={handleMenuClick} selectedKeys={[selectedStatus]}>
                    <Menu.Item key="All">全部</Menu.Item>
                    <Menu.Item key="Reviewed">已审核</Menu.Item>
                    <Menu.Item key="Pending">待审核</Menu.Item>
                </Menu>
            </Header>

            {/* 内容部分 */}
            <Content style={{ padding: '20px' }}>
                <div className="header-title">
                    <h2>软件的审核</h2>
                </div>
                <Table
                    columns={columns}
                    dataSource={filterSoftware()}//这里就是数据来源
                    pagination={false}  // 可以根据需求启用分页
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record.name),  // 点击行时触发
                    })}
                />
            </Content>
        </Layout>
    );
};

export default SoftwareList;
