import React, { useState } from 'react';
import { Input, Button, Upload, Form, Switch, InputNumber, Image, Modal, message } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Detail = ({ software }) => {
    // 是否可编辑
    const [editable, setEditable] = useState(true);
    // 是否驳回
    const [isRejected, setIsRejected] = useState(false);
    const [form] = Form.useForm();

    // 提交表单处理函数
    const onSubmit = (values) => {
        console.log('Submitted values:', values);
        message.success('软件信息已更新');
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
        <div className="software-detail-container">
            <h2>软件详细信息</h2>

            <Form
                form={form}
                layout="vertical"
                initialValues={software}
                onFinish={onSubmit}
                disabled={!editable}  // 根据 editable 状态控制是否可以编辑
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
                    name="description"
                    label="软件描述"
                    rules={[{ required: true, message: '请输入软件描述' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                {/* 软件佐证材料 */}
                <Form.Item
                    name="proofMaterials"
                    label="软件佐证材料"
                >
                    <Upload
                        action="/upload"
                        listType="picture-card"
                        fileList={software.proofMaterials}
                    >
                        <Button icon={<UploadOutlined />}>上传</Button>
                    </Upload>
                </Form.Item>

                {/* 软件包 */}
                <Form.Item
                    name="package"
                    label="软件包"
                >
                    <Upload
                        action="/upload"
                        listType="picture-card"
                        fileList={software.package}
                    >
                        <Button icon={<UploadOutlined />}>上传</Button>
                    </Upload>
                </Form.Item>

                {/* 预售状态 */}
                <Form.Item
                    name="preSale"
                    label="是否预售"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                {/* 价格 */}
                <Form.Item
                    name="price"
                    label="价格"
                    rules={[{ required: true, message: '请输入软件价格' }]}
                >
                    <InputNumber min={0} step={0.01} />
                </Form.Item>

                {/* 软件封面 */}
                <Form.Item
                    name="cover"
                    label="软件封面"
                >
                    <Upload
                        action="/upload"//指定上传文件的 URL 地址。当用户选择文件上传时，文件会发送到该地址
                        listType="picture-card"
                        fileList={software.cover}
                    >
                        <Button icon={<UploadOutlined />}>上传</Button>
                    </Upload>
                </Form.Item>

                {/* 确认按钮 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        同意发布
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        onClick={() => setEditable(!editable)}
                        icon={<CloseCircleOutlined />}
                    >
                        驳回发布
                    </Button>
                </Form.Item>
            </Form>


        </div>
    );
};

export default Detail;
