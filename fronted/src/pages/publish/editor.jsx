import React, { useState } from 'react';
import { Input, Button, Form, InputNumber, Modal, message, Row, Col, Select } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useParams, useLocation } from 'react-router-dom';
import styles from "../../component/softdetail/softdetail.module.css";
import { fetchUpdateAPI } from "../../api/service/userService"

const EditorDetail = () => {
    const location = useLocation();
    const { Id, intro, price } = location.state || {};
    const [form] = Form.useForm();
    // 提交表单时的处理函数
    const onSubmit = async (values) => {
        const data = { ...values, versionId: Id };
        try {
            const response = await fetchUpdateAPI(data.versionId, data);
            console.log('成功提交:', response);
            message.success('提交成功');
        } catch (error) {
            console.error('提交失败:', error);
            message.error('提交失败，请重试');
        }
    };


    return (
        <div className={styles.softwareDetailContainer}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onSubmit}
                initialValues={{  // 设置表单初始值
                    introduction: intro,  // 传递软件介绍
                    price: price,  // 传递价格
                }}
            >
                <Form.Item
                    name="introduction"
                    label="软件介绍"
                    rules={[{ required: true, message: '请输入软件介绍' }]}
                >
                    <Input.TextArea rows={5} />
                </Form.Item>
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
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditorDetail;