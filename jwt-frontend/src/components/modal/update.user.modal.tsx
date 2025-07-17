import { App, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import type { FormProps } from 'antd';
import { updateUserApi } from "../../services/api";

interface IProps {
    openUpdateModal: boolean;
    setOpenUpdateModal: (v: boolean) => void;
    fetchUsers: any;
    setDataUpdate: any;
    dataUpdate: {
        id: number;
        username: string;
        address: string;
        fullName: string;
        phone: string;
    } | null;
}

type FieldType = {
    fullName: string;
    username: string;
    address: string;
    phone: string;
};

const UpdateUserModal = (props: IProps) => {
    const { notification, message } = App.useApp();
    const [loading, setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();

    const {
        openUpdateModal, setOpenUpdateModal, fetchUsers,
        dataUpdate, setDataUpdate
    }
        = props;

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                username: dataUpdate.username,
                fullName: dataUpdate.fullName,
                address: dataUpdate.address,
                phone: dataUpdate.phone
            })
        }
    }, [dataUpdate])

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { fullName, address, phone } = values;
        setLoading(true)
        try {
            const res = await updateUserApi(dataUpdate?.id!, fullName, address, phone);
            if (res?.data?.data) {
                message.success("Update user succeed.");
                setOpenUpdateModal(false);
                await fetchUsers();
                form.resetFields();
                setDataUpdate(null);
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
            title="Update a user"
            maskClosable={false}
            open={openUpdateModal}
            onOk={() => form.submit()}
            onCancel={() => {
                setOpenUpdateModal(false)
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
                            label="Email"
                            name="username"
                        >
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Fullname"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your fullName!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input your address!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item<FieldType>
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your phone!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default UpdateUserModal;
