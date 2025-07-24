import React, { useState } from 'react';
import { Input, Button, Form, InputNumber, Modal, message, Row, Col, Select } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import styles from "./softdetail.module.css";
import Load from "./load.jsx";
import axios from 'axios'; // 引入axios
import { submitSoftwareData } from "../../api/service/userService"

const CheckDetail = () => {
    const { name } = useParams();  // 获取路由中的动态参数 name来拉取信息
    const [isRejected, setIsRejected] = useState(false);
    const [form] = Form.useForm();

    // 提交表单处理函数
    const onSubmit = async (values, name) => {
        const result = await submitSoftwareData(values, name);
        if (result.success) {
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    // 驳回申请
    const handleReject = () => {
        Modal.confirm({
            title: '确认驳回',
            content: '您确定要驳回该软件的发布申请吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                setIsRejected(true);
                message.error('软件发布申请已驳回');
            },
        });
    };

    return (
        <div className={styles.softwareDetailContainer}>
            <h2>软件详细信息</h2>

            <Form
                form={form}
                layout="vertical"
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


                {/* 软件介绍 */}
                <Form.Item
                    name="introduction"
                    label="软件介绍"
                    rules={[{ required: true, message: '请输入软件介绍' }]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>

                {/* 软件版本 */}
                <Form.Item
                    name="version"
                    label="版本号"
                    rules={[{ required: true, message: '请输入软件版本号' }]}
                >
                    <Input />
                </Form.Item>

                {/* 软件价格 */}
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

                    {/* 软件类型 */}
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
                </Row>

                {/* 上传文件 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="软件封面" name="picture">
                            <Load value={form.getFieldValue('picture')} onChange={(newFileList) => form.setFieldsValue({ picture: newFileList })} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="软件包" name="file">
                            <Load value={form.getFieldValue('file')} onChange={(newFileList) => form.setFieldsValue({ file: newFileList })} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="佐证材料" name="proof">
                            <Load value={form.getFieldValue('proof')} onChange={(newFileList) => form.setFieldsValue({ proof: newFileList })} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 确认按钮 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        onClick={handleReject}
                        icon={<CloseCircleOutlined />}
                    >
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CheckDetail;
