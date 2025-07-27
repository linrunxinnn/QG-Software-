import React, { useState, useEffect } from 'react';
import { Input, Button, Form, InputNumber, Modal, message, Row, Col, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from "./softdetail.module.css";
import Load from "./load.jsx"; // 加载组件
import { fetchSoftApplyAPI } from "../../../api/service/userService.js";
import { fetchContollerAdmitAPI } from "../../../api/service/userService.js";
import { fetchControlcancelAPI } from "../../../api/service/userService.js";

const CheckDetail = () => {
    const { name } = useParams();  // 获取路由中的动态参数 name 来拉取信息
    const [form] = Form.useForm();
    const location = useLocation();
    const { authorId, id, } = location.state;
    const [data, setData] = useState(null);  // 初始为 null
    const [loading, setLoading] = useState(true);  // 加载状态
    const navigator = useNavigate()
    useEffect(() => {
        // 检查 id 和 authorId 是否为空
        if (authorId && id) {
            const fetchData = async () => {
                try {
                    // 调用 API 获取数据
                    const result = await fetchSoftApplyAPI(authorId, id);
                    setData(result);  // 设置数据
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                } finally {
                    setLoading(false);  // 数据加载完成后设置为 false
                }
            };
            fetchData();  // 调用异步函数获取数据
        } else {
            console.log('id or authorId is missing or invalid');
        }
    }, [authorId, id]);

    // 提交表单处理函数
    const onSubmit = async () => {
        const result = await fetchContollerAdmitAPI(id, authorId, data.id);
        navigator("/manager")
        if (result) {
            message.success("同意申请成功");
        } else {
            message.error("同意申请失败");
        }
    }
    // 驳回申请
    const handleReject = () => {
        Modal.confirm({
            title: '确认驳回',
            content: '您确定要驳回该软件的发布申请吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    const result = await fetchControlcancelAPI(id, authorId, data.id);
                    message.success("驳回申请成功")
                    navigator("/manager")
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
                message.error('软件发布申请已驳回');
            },
        });
    };

    // 如果数据还在加载中，显示加载组件
    if (loading) {
        return <Load />;
    }

    return (
        <div className={styles.softwareDetailContainer}>
            <h2>软件详细信息</h2>

            <Form
                form={form}
                layout="vertical"
                initialValues={data}  // 使用 data 作为 initialValues 填充表单
                onFinish={onSubmit}
            >
                {/* 软件名称 */}
                <Form.Item
                    name="name"
                    label="软件名称"
                    rules={[{ required: true, message: '请输入软件名称' }]}
                >
                    <Input />
                </Form.Item>

                {/* 软件描述 */}
                <Form.Item
                    name="introduction"
                    label="软件描述"
                    rules={[{ required: true, message: '请输入软件描述' }]}
                >
                    <Input.TextArea rows={10} />
                </Form.Item>

                {/* 组织文件上传组件 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="软件佐证材料">
                            <div>
                                {data && data.material ? (
                                    <a target="_blank" href={data.material}>点击查看佐证材料</a>
                                ) : (
                                    <span>未提供佐证材料</span>
                                )}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="软件封面">
                            <div style={{ width: "50%", height: "50%" }}>
                                {data && data.picture ? (
                                    <img src={data.picture} alt="封面" />
                                ) : (
                                    <span>未提供软件封面</span>
                                )}
                            </div>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="price"
                            label="价格"
                            rules={[{ required: true, message: '请输入软件价格' }]}
                        >
                            <InputNumber min={0} step={0.01} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="type"
                            label="类型"
                            rules={[{ required: true, message: '请输入软件类型' }]}
                        >
                            <Select placeholder="请选择软件类型">
                                <Select.Option value="health">健康</Select.Option>
                                <Select.Option value="education">教育</Select.Option>
                                <Select.Option value="sports">运动</Select.Option>
                                <Select.Option value="office">办公</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="version"
                            label="版本"
                            rules={[{ required: true, message: '请输入版本' }]}
                        >
                            <InputNumber min={0} step={0.01} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 确认按钮 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        同意
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        onClick={handleReject}
                        icon={<CloseCircleOutlined />}
                    >
                        驳回
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CheckDetail;
