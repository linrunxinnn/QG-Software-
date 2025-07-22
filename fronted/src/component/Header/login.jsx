import React, { use } from "react";
import { Button, Form, Input, message, Select, Space } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const LoginForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  // 登录处理
  const handleLogin = async (values) => {
    try {
      console.log("登录信息:", values);
      // TODO: 后续接入后端登录接口
      setIsLoggedIn(true);
      setIsLoginModalVisible(false);
      loginForm.resetFields(); // 修复：使用正确的表单实例
      message.success("登录成功");
    } catch (error) {
      console.error("登录失败:", error);
      message.error("登录失败，请重试");
    }
  };

  const onFinish = async (values) => {
    try {
      const res = await login(values);
      console.log("登录成功", res);
      const { token, user } = res.data;
      dispatch(setLogin({ token, user }));
      localStorage.setItem("token", token);
      navigator("/home");
    } catch (error) {
      console.log(error.message);
      message.error("登录失败，请检查您的邮箱和密码是否正确");
    }
  };
  const onReset = () => {
    form.resetFields();
  };

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
          label="用户名"
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { min: 3, message: "用户名至少3个字符!" },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginForm;
