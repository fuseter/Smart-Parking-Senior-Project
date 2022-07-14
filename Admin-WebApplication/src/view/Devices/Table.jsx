import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Table, Card } from 'antd'
import { RiMapPinAddFill } from 'react-icons/ri'
import AddNewUser from './Modal'
import { getallDevice } from '../../services/devices'
import { Avatar, Tag } from 'antd'
import { useHistory } from 'react-router-dom'

export default function UsersList() {
    const [allDevice, setallDevice] = useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    let history = useHistory()

    const fetchAllDevice = async () => {
        try {
            await getallDevice().then((response) => {
                if (response.status === 200) {
                    setallDevice(response.data.data)
                }
            })
        } catch (error) {
            console.log('error')
        }
    }

    useEffect(() => {
        fetchAllDevice()
    }, [])

    const columns = [
        {
            title: 'ช่องจอด',
            dataIndex: 'title',
            key: 'avatar',

            render: (dataIndex) => {
                return (
                    <Avatar
                        size={45}
                        style={{
                            backgroundColor: '#FE0030',
                            verticalAlign: 'middle',
                            color: '#fff',
                        }}
                    >
                        {dataIndex}
                    </Avatar>
                )
            },
        },
        {
            title: 'ID เครื่อง',
            dataIndex: '_id',
            key: 'iddevice',
        },
        {
            title: 'MAC address',
            dataIndex: 'MacAddress',

            key: 'MacAddress',
        },
        {
            title: 'สถานที่',
            dataIndex: 'description',

            key: 'description',
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.status - b.status,

            render: (dataIndex) => {
                if (dataIndex === 0) {
                    return <Tag color="success">ว่าง</Tag>
                } else if (dataIndex === 1) {
                    return <Tag color="blue">ไม่ว่าง</Tag>
                }
            },
        },
        {
            title: 'Latitude',
            dataIndex: 'lat',

            key: 'lat',
        },
        {
            title: 'Longitude',
            dataIndex: 'long',

            key: 'long',
        },
    ]

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
                                        <RiMapPinAddFill
                                            size={16}
                                            className="remix-icon"
                                        />
                                    }
                                >
                                    เพิ่มอุปกรณ์เครื่องกั้น
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <Card className="da-contact-card da-mb-32">
                <Col className="da-contact-card da-mt-32">
                    <Table
                        // style={{ cursor: 'pointer' }}
                        rowKey={(record) => record._id}
                        pagination={{ defaultPageSize: 6 }}
                        columns={columns}
                        dataSource={allDevice}
                        scroll={{ x: 'calc(500px + 50%)' }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    history.push(
                                        `/device-management/${record._id}`
                                    )
                                },
                            }
                        }}
                    />
                </Col>

                <AddNewUser
                    open={sidebarOpen}
                    toggleSidebar={toggleSidebar}
                    fetchAllDevice={fetchAllDevice}
                />
            </Card>
        </>
    )
}
