import React, { useState } from 'react'
import { Modal, Col, Row, Divider, Input, Form, Button, Select } from 'antd'
import { createUser } from '../../services/authentication'
import { openNotification } from '../../components/notification/notification'

export default function AddNewUser({ open, toggleSidebar, fetchAllUser }) {
    const { Option } = Select
    const [form] = Form.useForm()
    const [isLoading, setisLoading] = useState(false)
    const [error, seterror] = useState({
        status: false,
        message: '',
    })

    const onFinish = async (values) => {
        setisLoading(true)
        try {
            if (values.password === values.confirmPassword) {
                seterror({
                    status: false,
                    message: '',
                })
                const data = {
                    name: 'guest SmartParking',
                    email: values.email,
                    password: values.password,
                    role: values.role,
                    is_verify: false,
                    phone: values.phone,
                }

                await createUser(data).then((response) => {
                    if (response.status === 201) {
                        console.log('res ==>', response)
                        setisLoading(false)
                        openNotification({
                            message: 'สร้างสำเร็จ',
                            description: 'สร้างบัญชีผู้ใช้เรียบร้อย',
                            error: false,
                        })
                        toggleSidebar()
                        fetchAllUser()
                        form.resetFields()
                    }
                })
            } else {
                seterror({
                    status: true,
                    message: '* รหัสผ่านไม่ตรงกัน',
                })
                setisLoading(false)
            }
        } catch (error) {
            openNotification({
                message: 'สร้างไม่สำเร็จ',
                description: 'เกิดข้อผิดพลาดหรือมีบัญชีผู้ใช้งานอยู่แล้ว',
                error: true,
            })
            setisLoading(false)
        }
    }

    return (
        <Modal
            title="สร้างบัญชีผู้ใช้"
            visible={open}
            onCancel={toggleSidebar}
            footer={null}
            bodyStyle={{ padding: 24 }}
        >
            <Form
                form={form}
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                {error.status ? (
                    <p style={{ color: 'red', marginBottom: 15 }}>
                        {error.message}
                    </p>
                ) : null}
                <Row gutter={[8, 0]}>
                    <Col md={24} span={24}>
                        <Form.Item
                            name="email"
                            label="อีเมล"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is required!',
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            name="phone"
                            label="เบอร์โทรศัพท์"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is required!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col md={24} span={24}>
                        <Form.Item
                            name="password"
                            label="รหัสผ่าน"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is required!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            name="confirmPassword"
                            label="ยืนยันรหัสผ่าน"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is required!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Col>
                    <Col md={24} span={24}>
                        <Form.Item
                            name="role"
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                    message: 'This is required!',
                                },
                            ]}
                        >
                            <Select placeholder="Role">
                                <Option value="is_user">ผู้ใช้งาน</Option>
                                <Option value="is_admin">แอดมิน</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Divider />

                    <Col span={24}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={isLoading}
                        >
                            สร้างบัญชีผู้ใช้
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}
