import React, { useState } from 'react';
import { Input, Button, Upload, Form, Switch, InputNumber, Image, Modal, message, Row, Col, Select } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import styles from "./softdetail.module.css"
import Load from "./load.jsx"

const CheckDetail = () => {
    const { name } = useParams();  // 获取路由中的动态参数 name来拉取信息


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


    return (
        <div className={styles.softwareDetailContainer}> {/* 使用 CSS Modules 中的类名 */}
            <h2>软件详细信息</h2>

            <Form
                form={form}
                layout="vertical"
                initialValues={software}
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
                    name="description"
                    label="软件描述"
                    rules={[{ required: true, message: '请输入软件描述' }]}
                >
                    <Input.TextArea rows={10} />
                </Form.Item>

                {/* 组织文件上传组件 */}
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item label="软件佐证材料">
                            <Load />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="软件包">
                            <Load />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="软件封面">
                            <Load />
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
                            name="sort"
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



                {/* 确认按钮 */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        发布
                    </Button>
                    <Button
                        style={{ marginLeft: '10px' }}
                        onClick={() => setEditable(!editable)}
                        icon={<CloseCircleOutlined />}
                    >
                        取消发布
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CheckDetail;
