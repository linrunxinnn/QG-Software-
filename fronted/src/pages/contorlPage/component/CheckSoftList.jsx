import React, { useState, useEffect } from 'react';
import { Table, Tag, Menu, Layout } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSortCheckAPI } from '../../../api/service/userService';
import { all } from 'axios';

const { Header, Content } = Layout;

const SoftwareList = () => {
    const [data, setData] = useState([]);  // 存储返回的数据
    const [selectedStatus, setSelectedStatus] = useState('All');  // 默认显示全部
    const navigate = useNavigate();

    // 获取所有软件数据并格式化
    useEffect(() => {
        const fetchAllCheck = async () => {
            try {
                const allData = await fetchSortCheckAPI();
                // 格式化后的数据合并成一个数组
                setData(allData.flat());
            } catch (error) {
                console.error('获取数据失败:', error);
            }
        };
        // 加一个判断标志，防止多次请求
        let isMounted = true;
        if (isMounted) {
            fetchAllCheck();
        }
        return () => {
            isMounted = false; // 在卸载时防止在异步操作结束后修改状态
        };
    }, []); // 只有组件挂载时触发

    // 过滤数据函数，根据 selectedStatus 来过滤
    const filterSoftware = () => {
        if (selectedStatus === 'All') {
            return data;  // 如果是“全部”，返回所有数据
        }
        return data.filter((software) => {
            if (selectedStatus === 'Reviewed') {
                return software.status === 1 || software.status === 2;  // 已审核
            }
            return software.status === 0;  // 待审核
        });
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
            dataIndex: 'type',
            key: 'type',
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
                <Tag color={status === 0 ? 'orange' : 'green'}>
                    {status === 0 ? '待审核' : '已审核'}
                </Tag>
            ),
        },
    ];

    // 导航栏点击事件
    const handleMenuClick = (e) => {
        console.log("点击导航栏", e.target);
        setSelectedStatus(e.key);  // 更新选择的状态
    };

    // 跳转到审核页面详情
    const handleRowClick = (record) => {
        console.log(record);//输出3
        navigate(`detail/${record.name}`, {
            state: { authorId: record.authorId, id: record.id }
        });  // 跳转到软件的详情页面
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
                    dataSource={filterSoftware()}  // 使用过滤后的数据
                    pagination={true}  // 可以根据需求启用分页
                    onRow={(record) => ({
                        onClick: () => handleRowClick(record),  // 点击行时触发，record对应的是当前行的所有信息
                    })}
                />
            </Content>
        </Layout>
    );
};

export default SoftwareList;
