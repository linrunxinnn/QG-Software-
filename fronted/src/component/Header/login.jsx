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
const LoginForm = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  // 登录处理
  const handleLogin = async (values) => {
    try {
      console.log("登录信息:", values);
      // TODO: 后续接入后端登录接口
      // setIsLoggedIn(true);
      // setIsLoginModalVisible(false);
      message.success("登录成功");
      onSuccess(1); // 假设 userData 是从后端获取的用户数据
      //返回的用户信息中有身份，如果身份为管理员则还要跳转到管理员页面
      // const role = 3;
      // if (role === 3) {
      //   navigator("/manager");
      // }
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
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "请输入邮箱!" },
            { type: "email", message: "请输入有效的邮箱!" },
          ]}
        >
          <Input placeholder="请输入邮箱" />
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
