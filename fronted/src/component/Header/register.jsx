import React from "react";
import { Button, Form, Input, Select, Space, Typography, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendCode } from "../../api/service/userService.js";
import { registerUser } from "../../store/slice/userSlice.js";

const { Option } = Select;

const RegisterForm = ({ onSuccess }) => {
  // State and event control
  const [countdown, setCountdown] = useState(0);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handlerSendVerificationCode = async () => {
    if (countdown > 0) {
      message.warning(`请等待 ${countdown} 秒后重试`);
      return;
    }

    const email = form.getFieldValue("email");
    if (!email) {
      message.warning("请输入邮箱地址");
      return;
    }

    try {
      const res = await sendCode(email);
      message.success(`验证码已发送到 ${email}`);
      setCountdown(60);
    } catch (error) {
      console.log(error.message);
      message.warning("验证码发送失败，请检查您的邮箱是否正确");
    }
  };

  const onFinish = async (values) => {
    try {
      if (values.password !== values.confirmPassword) {
        message.warning("两次输入的密码不一致，请重新输入");
        return;
      }
      console.log("注册表单提交:", values);
      const result = await dispatch(registerUser(values)).unwrap();
      onSuccess(1);
      message.success("注册成功");
    } catch (error) {
      console.log(error.message);
      message.warning("注册失败，请检查您的信息是否正确");
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="login-form">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[{ required: true, type: "email", message: "请输入有效邮箱" }]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 6, message: "密码至少6个字符!" },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认密码"
          rules={[
            { required: true, message: "请输入确认密码" },
            { min: 6, message: "密码至少6个字符!" },
          ]}
        >
          <Input.Password placeholder="请输入确认密码" />
        </Form.Item>
        <Form.Item
          label="验证码"
          required
          rules={[{ required: true, message: "请输入验证码" }]}
        >
          <Space.Compact>
            <Form.Item
              name="code"
              noStyle
              rules={[{ required: true, message: "请输入验证码" }]}
            >
              <Input.OTP
                formatter={(str) => str.toUpperCase()}
                style={{ flex: 1 }}
              />
            </Form.Item>
            <Button
              type="link"
              onClick={handlerSendVerificationCode}
              disabled={countdown > 0}
            >
              {countdown > 0 ? `${countdown}s后重试` : "发送验证码"}
            </Button>
          </Space.Compact>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};
export default RegisterForm;
