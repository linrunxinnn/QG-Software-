import React, { use, useState } from "react";
import { Button, Form, Input, message, Typography, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendCode } from "../../api/service/userService.js";
import {
  loginUserByPassword,
  loginUserByCode,
} from "../../store/slice/userSlice.js";
const { Text } = Typography;

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };
const LoginForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [loginType, setLoginType] = useState("password");
  const [codeLoading, setCodeLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  // 登录处理
  const handleLogin = async (values) => {
    console.log("登录表单提交:", values);
    try {
      if (loginType === "password") {
        const result = await dispatch(loginUserByPassword(values)).unwrap();
        onSuccess();
        message.success("登录成功");
        // 返回的用户信息中有身份，如果身份为管理员则还要跳转到管理员页面
        if (result.role === 1) {
          navigator("/manager");
        }
      } else {
        const result = await dispatch(loginUserByCode(values)).unwrap();
        onSuccess();
        message.success("登录成功");
        // 返回的用户信息中有身份，如果身份为管理员则还要跳转到管理员页面
        if (result.role === 1) {
          navigator("/manager");
        }
      }
    } catch (error) {
      console.error("登录失败:", error);
      message.error("登录失败，请重试");
    }
  };

  const handleGetCode = async () => {
    try {
      const email = form.getFieldValue("email");
      if (!email) {
        message.warning("请先输入邮箱");
        return;
      }
      form.validateFields(["email"]);
      setCodeLoading(true);
      const result = await sendCode(email);
      message.success("验证码已发送");
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      // 验证失败不处理
      message.error("验证码发送失败，请检查邮箱是否正确");
      console.error(error);
    } finally {
      setCodeLoading(false);
    }
  };

  // const onFinish = async (values) => {
  //   try {
  //     const res = await login(values);
  //     console.log("登录成功", res);
  //     const { token, user } = res.data;
  //     dispatch(setLogin({ token, user }));
  //     localStorage.setItem("token", token);
  //     navigator("/home");
  //   } catch (error) {
  //     console.log(error.message);
  //     message.error("登录失败，请检查您的邮箱和密码是否正确");
  //   }
  // };
  // const onReset = () => {
  //   form.resetFields();
  // };

  return (
    <div className="login-form">
      <Form
        form={form}
        name="login"
        onFinish={handleLogin}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱!" },
            { type: "email", message: "请输入有效的邮箱!" },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        {loginType === "password" ? (
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: "请输入密码!" },
              { min: 6, message: "密码至少6个字符!" },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        ) : (
          <Form.Item
            label="验证码"
            name="code"
            rules={[{ required: true, message: "请输入验证码!" }]}
          >
            <Input
              placeholder="请输入验证码"
              suffix={
                <Button
                  size="small"
                  type="link"
                  onClick={handleGetCode}
                  disabled={codeLoading || countdown > 0}
                >
                  {countdown > 0 ? `${countdown}s后重试` : "获取验证码"}
                </Button>
              }
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Text type="secondary">
            {loginType === "password" ? "没有密码？" : "记得密码？"}
            <Button
              type="link"
              size="small"
              onClick={() =>
                setLoginType((prev) =>
                  prev === "password" ? "code" : "password"
                )
              }
              style={{ paddingLeft: 4 }}
            >
              {loginType === "password" ? "使用验证码登录" : "使用密码登录"}
            </Button>
          </Text>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
