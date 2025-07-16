import type { FormProps } from "antd";
import { App, Button, Form, Input } from "antd";
import { loginAPI } from "../services/api";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/app.provider";

type FieldType = {
  username?: string;
  password?: string;
};

const LoginPage = () => {
  const { setUsername } = useAppContext();

  const navigate = useNavigate();

  const { notification } = App.useApp();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    try {
      const res = await loginAPI(username!, password!);
      if (res?.data?.data) {
        const access_token = res.data.data.access_token;
        localStorage.setItem("access_token", access_token);
        setUsername(username!);
        navigate("/");
      }
    } catch (error: any) {
      const m = error?.response?.data?.message ?? "Unknown";
      notification.error({
        message: "Có lỗi xảy ra",
        description: m,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: 600,
        padding: 50,
        margin: "auto",
      }}
    >
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
