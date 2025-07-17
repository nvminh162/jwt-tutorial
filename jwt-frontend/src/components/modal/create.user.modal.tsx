import { App, Col, Form, Input, Modal, Row } from "antd";
import { useState } from "react";
import type { FormProps } from 'antd';
import { createUserApi } from "../../services/api";

interface IProps {
    openCreateModal: boolean;
    setOpenCreateModal: (v: boolean) => void;
    fetchUsers: any;
}

type FieldType = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const CreateUserModal = (props: IProps) => {
    const { notification, message } = App.useApp();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const {
        openCreateModal, setOpenCreateModal, fetchUsers
    }
        = props;

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { fullName, email, password, confirmPassword } = values;
        setLoading(true)
        try {
            const res = await createUserApi(fullName, email, password, confirmPassword);
            if (res?.data?.data) {
                message.success("Create user succeed.");
                setOpenCreateModal(false);
                await fetchUsers();
                form.resetFields();
            }
        } catch (error: any) {
            const m = error?.response?.data?.errors ?? "unknown";
            notification.error({
                message: "Có lỗi xảy ra",
                description: JSON.stringify(m)
            })
        }
        setLoading(false)
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title="Create a new user"
            maskClosable={false}
            open={openCreateModal}
            onOk={() => form.submit()}
            onCancel={() => {
                setOpenCreateModal(false)
            }}
            okText={"Save"}
            okButtonProps={{
                loading: loading
            }}
        >
            <Form
                name="create-user"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Row gutter={15}>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Fullname"
                            name="fullName"
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please input your confirmPassword!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default CreateUserModal;
