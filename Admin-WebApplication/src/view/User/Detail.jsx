import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import {
    Layout,
    Row,
    Col,
    Avatar,
    Button,
    Divider,
    Card,
    Popconfirm,
    Form,
    Select,
    Input,
} from 'antd'
import {
    RiArrowLeftSLine,
    RiErrorWarningLine,
    RiSave2Fill,
    RiDeleteBin5Fill,
    RiShieldCheckFill,
    RiSpam2Fill,
} from 'react-icons/ri'
import imageProfile from '../../assets/images/logo/profile.png'
import {
    getOneUser,
    updateUserProfile,
    deleteUser,
} from '../../services/authentication'
import { openNotification } from '../../components/notification/notification'

const { Sider, Content } = Layout

export default function Detail() {
    const { Option } = Select
    const history = useHistory()
    const { uid } = useParams()
    const [userData, setuserData] = useState()
    const dividerClass = 'da-border-color-black-40'

    const fetchOneUser = async () => {
        try {
            await getOneUser(uid).then((response) => {
                if (response.status === 200) {
                    setuserData(response.data.data)
                }
            })
        } catch (error) {
            history.goBack()
        }
    }

    const onFinish = async (values) => {
        try {
            const data = {
                _id: userData._id,
                name: values.name,
                email: values.email,
                role: values.role,
                is_verify: values.is_verify,
                phone: values.phone,
            }

            await updateUserProfile(data).then((response) => {
                if (response.status === 200) {
                    fetchOneUser()
                    openNotification({
                        message: 'แก้ไขสำเสร็จ',
                        description: 'แก้ไขข้อมูลผู้ใช้เรียบร้อย',
                        error: false,
                    })
                }
            })
        } catch (error) {
            openNotification({
                message: 'เกิดข้อผิดพลาด',
                description: 'ไม่สามารแก้ไขข้อมูลผู้ใช้ได้',
                error: true,
            })
        }
    }

    const delUser = async () => {
        try {
            await deleteUser(userData._id).then((response) => {
                if (response.status === 200) {
                    openNotification({
                        message: 'ลบสำเร็จ',
                        description: 'ลบบัญชีผู้ใช้งานเรียบร้อย',
                        error: false,
                    })
                    setTimeout(() => {
                        history.goBack()
                    }, 1000)
                }
            })
        } catch (error) {
            openNotification({
                message: 'เกิดข้อผิดพลาด',
                description: 'ไม่สามารถลบบัญชีผู้ใช้งานได้',
                error: true,
            })
        }
    }

    useEffect(() => {
        if (uid) {
            fetchOneUser()
        } else {
            history.goBack()
        }
    }, [uid, history])

    if (!userData) {
        return <></>
    }

    return (
        <Card className="da-contact-detail da-mb-32">
            <Layout className="da-flex-wrap">
                <Sider
                    className="da-p-24 da-border-right-1"
                    theme="light"
                    width={254}
                >
                    <Row>
                        <Col span={24}>
                            <Link to="/user-management">
                                <Button
                                    type="text"
                                    shape="square"
                                    icon={<RiArrowLeftSLine size={24} />}
                                ></Button>
                            </Link>
                        </Col>
                        <Col span={24} className="da-text-center">
                            <Avatar
                                size={128}
                                // icon={<RiUserLine className="remix-icon" />}
                                className="da-m-auto"
                                src={imageProfile}
                            />
                        </Col>

                        <Col
                            span={24}
                            className="da-text-center"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Row style={{ marginTop: 15 }}>
                                {userData.is_verify ? (
                                    <>
                                        <RiShieldCheckFill
                                            style={{
                                                fontSize: 21,
                                                color: '#4cd137',
                                                marginRight: 5,
                                            }}
                                        />
                                        <p>ยืนยันบัญชีแล้ว</p>
                                    </>
                                ) : (
                                    <>
                                        <RiSpam2Fill
                                            style={{
                                                fontSize: 21,
                                                color: '#FE0030',
                                                marginRight: 5,
                                            }}
                                        />
                                        <p>ยังไม่ยืนยันบัญชี</p>
                                    </>
                                )}
                            </Row>
                        </Col>
                        <Col span={24} className="da-mt-5 da-text-center">
                            <h4>{userData.name}</h4>
                        </Col>
                    </Row>
                </Sider>

                <Content className="da-bg-color-black-0 da-p-24">
                    <>
                        <Col md={15} span={24}>
                            <h2>ข้อมูลส่วนตัว</h2>
                            <p className="da-p1-body da-mb-0">
                                Personal Informations
                            </p>
                        </Col>

                        <Divider className={dividerClass} />
                    </>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Row
                            gutter={[8, 0]}
                            style={{ padding: '10px 35px 0px 35px' }}
                        >
                            <Col md={12} span={24}>
                                <Form.Item
                                    name="email"
                                    label="อีเมล"
                                    initialValue={userData.email}
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
                            <Col md={12} span={24}>
                                <Form.Item
                                    initialValue={userData.name}
                                    name="name"
                                    label="ชื่อ"
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
                            <Col md={12} span={24}>
                                <Form.Item
                                    initialValue={userData.phone}
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
                            <Col md={12} span={24}>
                                <Form.Item
                                    initialValue={userData.is_verify}
                                    name="is_verify"
                                    label="ยืนยันบัญชี"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This is required!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Role">
                                        <Option value={true}>ยืนยันแล้ว</Option>
                                        <Option value={false}>
                                            ยังไม่ยืนยัน
                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col md={12} span={12}>
                                <Form.Item
                                    name="role"
                                    label="Role"
                                    initialValue={userData.role}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This is required!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Role">
                                        <Option value="is_user">
                                            ผู้ใช้งาน
                                        </Option>
                                        <Option value="is_admin">แอดมิน</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Divider />

                            <Col
                                span={24}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Popconfirm
                                    title="แน่ใจหรือไม่ว่าต้องการลบบัญชีผู้ใช้?"
                                    onConfirm={() => delUser()}
                                    okText="Yes"
                                    cancelText="No"
                                    icon={
                                        <RiErrorWarningLine className="remix-icon da-text-color-primary-1" />
                                    }
                                >
                                    <Button
                                        htmlType="submit"
                                        icon={
                                            <RiDeleteBin5Fill
                                                style={{
                                                    marginRight: 6,
                                                    fontSize: 19,
                                                }}
                                            />
                                        }
                                        style={{ marginRight: 10 }}
                                    >
                                        ลบบัญชีผู้ใช้
                                    </Button>
                                </Popconfirm>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={
                                        <RiSave2Fill
                                            style={{
                                                marginRight: 6,
                                                fontSize: 19,
                                            }}
                                        />
                                    }

                                    // loading={isLoading}
                                >
                                    บันทึกการแก้ไข
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Content>
            </Layout>
        </Card>
    )
}
