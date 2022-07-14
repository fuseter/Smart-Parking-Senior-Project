import React, { useState, useEffect } from 'react'
import AddNewUser from './Modal'
import { Col, Table, Card } from 'antd'
import { RiUserAddLine } from 'react-icons/ri'
import { Avatar, Tag, Image, Row, Button } from 'antd'
import { getallUser } from '../../services/authentication'
import UserProfile from '../../assets/images/logo/profile.png'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

export default function UsersList() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    const [allUser, setallUser] = useState([])
    const history = useHistory()

    const columns = [
        {
            title: '',
            dataIndex: '_id',
            key: 'userProfile',
            render: (dataIndex) => {
                return (
                    <Avatar
                        size={55}
                        src={<Image src={UserProfile} alt="userProfile" />}
                    />
                )
            },
        },
        {
            title: 'ID ผู้ใช้',
            dataIndex: '_id',
        },
        {
            title: 'ชื่อผู้ใช้',
            dataIndex: 'name',
        },
        {
            title: 'อีเมล',
            dataIndex: 'email',
        },
        {
            title: 'โทรศัพท์',
            dataIndex: 'phone',
        },
        {
            title: 'ยืนยันบัญชี',
            dataIndex: 'is_verify',
            render: (dataIndex) => {
                if (dataIndex === true) {
                    return (
                        <Tag icon={<CheckCircleOutlined />} color="success">
                            &nbsp; ยืนยันแล้ว
                        </Tag>
                    )
                } else if (dataIndex === false) {
                    return (
                        <Tag icon={<CloseCircleOutlined />} color="error">
                            &nbsp; ยังไม่ยืนยัน
                        </Tag>
                    )
                }
            },
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (dataIndex) => {
                if (dataIndex === 'is_user') {
                    return <div>ผู้ใช้งาน</div>
                } else if (dataIndex === 'is_admin') {
                    return <div>แอดมิน</div>
                }
            },
        },
    ]

    const fetchAllUser = async () => {
        try {
            await getallUser().then((response) => {
                if (response.status === 200) {
                    setallUser(response.data.data)
                }
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchAllUser()
    }, [])

    return (
        <>
            <div className="da-mb-32">
                <Row gutter={[32, 32]} justify="end">
                    <Col md={15} span={24}>
                        <Row justify="end" align="middle" gutter={[16]}>
                            <Col>
                                <Button
                                    block
                                    className="da-mt-sm-16"
                                    type="primary"
                                    onClick={toggleSidebar}
                                    icon={
                                        <RiUserAddLine
                                            size={16}
                                            className="remix-icon"
                                        />
                                    }
                                >
                                    สร้างบัญชีผู้ใช้
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Card className="da-contact-card da-mb-32">
                <Col className="da-contact-card da-mt-32">
                    <Table
                        rowKey={(rescord) => rescord._id}
                        pagination={{ defaultPageSize: 6 }}
                        columns={columns}
                        dataSource={allUser}
                        scroll={{ x: 'calc(500px + 50%)' }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    history.push(
                                        `/user-management/${record._id}`
                                    )
                                },
                            }
                        }}
                    />
                </Col>

                <AddNewUser
                    open={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    fetchAllUser={fetchAllUser}
                />
            </Card>
        </>
    )
}
