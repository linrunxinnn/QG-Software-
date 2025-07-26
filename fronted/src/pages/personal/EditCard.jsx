import React, { useState } from "react";
import { Modal, Form, Input, Upload, Button, message, Avatar } from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAvatar,
  updateUsername,
  updatePhone,
} from "../../store/slice/userSlice";

const EditCard = ({ type, visible, onClose }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const [avatarFile, setAvatarFile] = useState(null);

  // 提交修改
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      switch (type) {
        case "changeAvatar":
          if (!avatarFile) {
            message.warning("请选择头像文件");
            return;
          }
          const formData = new FormData();
          formData.append("avatar", avatarFile); // 只传文件
          // 将 userId 作为额外参数传递
          await dispatch(
            updateAvatar({ formData, userId: userInfo.id })
          ).unwrap();
          break;
        case "changeUsername":
          await dispatch(
            updateUsername({
              userId: userInfo.id,
              newUsername: values.newValue,
            })
          ).unwrap();
          break;
        case "changePhone":
          const res = await dispatch(
            updatePhone({
              userId: userInfo.id,
              newPhone: values.newValue,
            })
          ).unwrap();
          message.success("手机号修改成功");
          break;
        default:
          return;
      }
      // message.success("修改成功！");
      onClose();
    } catch (error) {
      message.error(`修改失败`);
      console.error("修改失败:", error);
    }
  };

  // 上传头像前的检查
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("请上传图片文件！");
      return false;
    }
    setAvatarFile(file);
    return false; // 阻止自动上传
  };

  // 根据 type 渲染不同的表单内容
  const renderFormContent = () => {
    switch (type) {
      case "changeAvatar":
        return (
          <>
            <Form.Item label="上传新头像">
              <Upload beforeUpload={beforeUpload} showUploadList={false}>
                <Button icon={<UploadOutlined />}>选择文件</Button>
              </Upload>
              {avatarFile && (
                <Avatar
                  src={URL.createObjectURL(avatarFile)}
                  size={100}
                  style={{ marginTop: 16 }}
                />
              )}
            </Form.Item>
          </>
        );
      case "changeUsername":
        return (
          <Form.Item
            label="新用户名"
            name="newValue"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input placeholder="输入新用户名" />
          </Form.Item>
        );

      case "changePhone":
        return (
          <Form.Item
            label="新手机号"
            name="newValue"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入有效的手机号" },
            ]}
          >
            <Input placeholder="输入新手机号" />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={
        type === "changeAvatar"
          ? "更换头像"
          : type === "changeUsername"
          ? "修改用户名"
          : "修改手机号"
      }
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          确认修改
        </Button>,
      ]}
      closeIcon={<CloseOutlined />}
    >
      <Form form={form} layout="vertical">
        {renderFormContent()}
      </Form>
    </Modal>
  );
};

export default EditCard;
