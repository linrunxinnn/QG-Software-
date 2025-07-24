import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message, Modal } from 'antd';
import { Document, Page } from 'react-pdf'; // 用于PDF预览

// 获取文件的Base64编码
const getBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

// 文件上传组件
const Load = ({ value, onChange }) => {
    const [previewOpen, setPreviewOpen] = useState(false); // 控制预览弹窗是否打开
    const [previewImage, setPreviewImage] = useState(''); // 存储预览图片的URL
    const [previewPdf, setPreviewPdf] = useState(null); // 存储预览的PDF文件
    const [fileList, setFileList] = useState(value || []); // 文件列表

    // 预览上传的文件
    const handlePreview = async (file) => {
        if (file.type.startsWith('image/')) {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj); // 将文件转为Base64格式
            }
            setPreviewImage(file.url || file.preview); // 设置预览的图片
            setPreviewOpen(true); // 打开预览弹窗
        } else if (file.type === 'application/pdf') {
            setPreviewPdf(file.originFileObj); // 存储PDF文件
            setPreviewOpen(true); // 打开预览弹窗
        }
    };

    // 处理文件列表变化
    const handleChange = ({ fileList: newFileList, file }) => {
        if (file.status === 'removed') {
            message.success(`${file.name} 文件已删除`);
        }

        // 如果文件上传了新文件，则覆盖之前的文件
        if (newFileList.length > 1) {
            newFileList = [newFileList[newFileList.length - 1]]; // 只保留最新的文件
        }

        setFileList(newFileList);
        onChange(newFileList); // 更新父组件的文件列表
    };

    // 上传按钮
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload
                listType="picture-card" // 设置卡片样式
                fileList={fileList}
                onPreview={handlePreview} // 处理预览事件
                onChange={handleChange} // 处理文件变化
                onRemove={(file) => {
                    message.success(`${file.name} 文件已删除`);
                }}
                accept="image/*,application/pdf" // 允许上传图片和PDF文件
                beforeUpload={() => false} // 阻止文件自动上传(破组件的自动上传)

            >
                {uploadButton}
            </Upload>

            {/* 文件预览弹窗 */}
            <Modal
                footer={null}
                onCancel={() => {
                    setPreviewOpen(false);
                    setPreviewImage(''); // 关闭后清空图片
                    setPreviewPdf(null); // 关闭后清空PDF
                }}
                width={800}
            >
                {previewImage ? (
                    <Image
                        src={previewImage}
                        alt="Preview"
                        style={{ width: '100%', height: 'auto' }}
                    />
                ) : previewPdf ? (
                    <Document file={previewPdf}>
                        <Page pageNumber={1} />
                    </Document>
                ) : null}
            </Modal>
        </>
    );
};

export default Load;
