import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import LeftContent from './leftContent'
import { loginService } from '../../services/authentication'
import Cookies from 'js-cookie'

export default function Login() {
    const [error, seterror] = useState(false)

    const onFinish = async (values) => {
        try {
            const data = {
                email: values.email,
                password: values.password,
                role: 'is_admin',
            }

            await loginService(data).then((response) => {
                if (response.status === 200) {
                    seterror(false)
                    Cookies.set('access-token', response.data.token)
                    setTimeout(() => {
                        window.location.href = '/dashboard'
                    }, 1000)
                } else {
                    seterror(true)
                    console.log('3434343434')
                }
            })
        } catch (error) {
            console.log('errorsdfsdsdsdsd')
            seterror(true)
        }
    }

    useEffect(() => {
        const VerifyUserLogin = () => {
            if (Cookies.get('access-token')) {
                window.location.href = '/dashboard'
            }
        }
        VerifyUserLogin()
    }, [])

    return (
        <Row gutter={[32, 0]} className="da-authentication-page">
            <LeftContent />

            <Col lg={12} span={24} className="da-py-sm-0 da-py-md-64">
                <Row className="da-h-100" align="middle" justify="center">
                    <Col
                        xxl={11}
                        xl={15}
                        lg={20}
                        md={20}
                        sm={24}
                        className="da-px-sm-8 da-pt-24 da-pb-48"
                    >
                        <h1 className="da-mb-sm-0">Login</h1>
                        <p className="da-mt-sm-0 da-mt-8 da-text-color-black-60">
                            Welcome back, please login to your account.
                        </p>

                        {error ? (
                            <p style={{ color: 'red' }}>เกิดข้อผิดพลาด</p>
                        ) : null}

                        <Form
                            layout="vertical"
                            name="basic"
                            initialValues={{ remember: true }}
                            className="da-mt-sm-16 da-mt-32"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email :"
                                className="da-mb-16"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password :"
                                className="da-mb-8"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item className="da-mt-16 da-mb-8">
                                <Button block type="primary" htmlType="submit">
                                    Sign in
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
