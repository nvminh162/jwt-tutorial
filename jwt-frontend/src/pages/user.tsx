import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Button, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import type { TableProps } from 'antd';
import { deleteUserApi, getUsersApi } from "../services/api";
import CreateUserModal from "../components/modal/create.user.modal";
import UpdateUserModal from "../components/modal/update.user.modal";

interface IUser {
    id: number;
    username: string;
    address: string;
    fullName: string;
    phone: string;
}
const UserPage = () => {
    const { message } = App.useApp();

    const [users, setUsers] = useState<IUser[]>([]);

    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);


    const fetchUsers = async () => {
        const res = await getUsersApi();
        if (res?.data?.data) {
            setUsers(res.data.data)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: "Action",
            render: (_, record) => {

                return (
                    <>
                        <EditOutlined
                            onClick={() => handleClickEdit(record)}
                            style={{
                                cursor: "pointer",
                                color: "orange",
                                marginRight: 10
                            }}
                        />
                        <Popconfirm
                            title="Delete the user"
                            description="Are you sure to delete this user?"
                            onConfirm={() => handleClickDelete(record)}
                            // onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{
                                cursor: "pointer",
                                color: "red",
                            }} />
                        </Popconfirm>
                    </>
                )
            }
        }
    ];

    const handleClickEdit = (data: IUser) => {
        setDataUpdate(data);
        setOpenUpdateModal(true);
    }

    const handleClickDelete = async (data: IUser) => {
        const res = await deleteUserApi(data.id);
        if (res.data) {
            message.success("Xóa user thành công");
            await fetchUsers()
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Users</h3>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setOpenCreateModal(true)}
                >Add new</Button>
            </div>
            <Table
                dataSource={users}
                columns={columns}
                bordered
                rowKey={"id"}
            />

            <CreateUserModal
                openCreateModal={openCreateModal}
                setOpenCreateModal={setOpenCreateModal}
                fetchUsers={fetchUsers}
            />

            <UpdateUserModal
                openUpdateModal={openUpdateModal}
                setOpenUpdateModal={setOpenUpdateModal}
                fetchUsers={fetchUsers}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </div>
    )
}

export default UserPage;
