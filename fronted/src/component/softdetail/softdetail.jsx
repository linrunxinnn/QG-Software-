import React, { useState } from 'react';
import { Input, Button, Form, InputNumber, Modal, message, Row, Col, Select } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./softdetail.module.css";
import Load from "./load.jsx";
import { submitSoftwareData } from "../../api/service/userService"
import { useDispatch, useSelector } from "react-redux";

const CheckDetail = () => {
    const [form] = Form.useForm();
    const [isOpen, setisOpen] = useState(false);  // 初始值改为 false
    const [value, setvalue] = useState({});
    const navigate = useNavigate()

    const id = useSelector((state) => state.user.user.id);
    // 提交表单处理函数
    const onSubmit = async (values) => {
        const result = await submitSoftwareData(values, id);
        if (result.success) {
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    // 显示弹窗，确认是否上传
    const ensure = async (values) => {
        setisOpen(true);  // 设置为 true 显示弹窗
        setvalue(values); // 提前储存数据
    };

    // 驳回申请
    const handleReject = () => {
        Modal.confirm({
            title: '确认取消',
            content: '您确定要取消该软件的发布申请吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                setisOpen(false);
                navigate("/publish")
                message.error('软件发布申请已取消');
            },
            onCancel: () => {
                setisOpen(false);
            }
        });
    };

    // 发布提交表单请求
    const ensureRequest = () => {
        setisOpen(false); // 关闭弹窗
        if (value) {
            onSubmit(value);
            navigate("/publish")
        }
    }

    return (
        <div className={styles.softwareDetailContainer}>
            <h2>软件详细信息</h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => ensure(values)} // 提交时触发弹窗
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
                                <Select.Option value="健康">健康</Select.Option>
                                <Select.Option value="教育">教育</Select.Option>
                                <Select.Option value="运动">运动</Select.Option>
                                <Select.Option value="办公">办公</Select.Option>
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

            {/* 确认发布的 Modal */}
            <Modal
                open={isOpen}
                onOk={ensureRequest} // 确认时调用 ensureRequest 提交数据
                onCancel={() => setisOpen(false)} // 取消时关闭弹窗
                okText="确认发布"
                cancelText="取消"
            >
                确认发布吗？
            </Modal>
        </div>
    );
};

export default CheckDetail;
