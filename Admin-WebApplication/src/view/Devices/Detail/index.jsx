import React, { useEffect, useState } from 'react'
import {
    getOneDevice,
    updateDevice,
    deleteDevice,
} from '../../../services/devices'
import { useParams, Link, useHistory } from 'react-router-dom'
import { config } from '../../../constants/config'
import { openNotification } from '../../../components/notification/notification'
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
    Input,
    Select,
} from 'antd'
import {
    RiArrowLeftSLine,
    RiErrorWarningLine,
    RiSave2Fill,
    RiDeleteBin5Fill,
} from 'react-icons/ri'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from 'react-google-maps'

const { Sider, Content } = Layout

export default function Detail() {
    const history = useHistory()
    const { deviceID } = useParams()
    const [editData, seteditData] = useState()

    let newLatLng = [
        { lat: parseFloat(editData?.lat), lng: parseFloat(editData?.long) },
    ]

    const onMarkerDragEnd = (event) => {
        newLatLng[0].lat = event.latLng.lat()
        newLatLng[0].lng = event.latLng.lng()
        console.log('newLat', newLatLng[0].lat, 'newLng', newLatLng[0].lng)
    }

    const MapWithAMarker = withScriptjs(
        withGoogleMap(() => (
            <GoogleMap defaultZoom={16} defaultCenter={newLatLng[0]}>
                <Marker
                    draggable={true}
                    position={newLatLng[0]}
                    onDragEnd={(e) => onMarkerDragEnd(e)}
                />
            </GoogleMap>
        ))
    )

    const handleDelete = async (deviceID) => {
        try {
            await deleteDevice(deviceID).then((response) => {
                if (response.status === 200) {
                    openNotification({
                        message: 'ลบสำเสร็จ',
                        description: 'ลบข้อมูลเครื่องกั้นเรียบร้อย',
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
                description: 'ไม่สามารถลบข้อมูลเครื่องกั้นได้',
                error: true,
            })
        }
    }

    const onFinish = async (values) => {
        try {
            const data = {
                _id: values._id,
                MacAddress: values.MacAddress,
                title: values.title,
                description: values.description,
                status: values.status,
                lat: newLatLng[0].lat,
                long: newLatLng[0].lng,
            }
            await updateDevice(data).then((response) => {
                if (response.status === 200) {
                    fetchOneDevice()
                    openNotification({
                        message: 'แก้ไขสำเสร็จ',
                        description: 'แก้ไขข้อมูลเครื่องกั้นเรียบร้อย',
                        error: false,
                    })
                }
            })
        } catch (error) {
            openNotification({
                message: 'เกิดข้อผิดพลาด',
                description: 'ไม่สามารแก้ไขข้อมูลเครื่องกั้นได้',
                error: true,
            })
        }
    }

    const fetchOneDevice = async () => {
        try {
            await getOneDevice(deviceID).then((response) => {
                if (response.status === 200) {
                    seteditData(response.data.data)
                }
            })
        } catch (error) {
            history.goBack()
        }
    }

    useEffect(() => {
        if (deviceID) {
            fetchOneDevice()
        } else {
            history.goBack()
        }
    }, [deviceID, history])

    if (!editData) {
        return <></>
    }

    return (
        <Card className="da-contact-detail da-mb-32">
            <Layout className="da-flex-wrap">
                <Sider
                    className="da-p-24 da-border-right-1"
                    theme="light"
                    width={200}
                >
                    <Row>
                        <Col span={24}>
                            <Link to="/device-management">
                                <Button
                                    type="text"
                                    shape="square"
                                    icon={<RiArrowLeftSLine size={24} />}
                                ></Button>
                            </Link>
                        </Col>

                        <Col span={24} className="da-text-center">
                            <Avatar
                                size={100}
                                className="da-m-auto"
                                style={{ fontSize: '2rem' }}
                            >
                                {editData.title}
                            </Avatar>
                        </Col>

                        <Col span={24} className="da-mt-16 da-text-center">
                            <h4>{editData.description}</h4>
                        </Col>
                    </Row>
                </Sider>

                <Content className="da-bg-color-black-0 da-p-24">
                    <Row gutter={[32, 32]}>
                        <Col span={12}>
                            <MapWithAMarker
                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLEMAPSAPI}&v=3.exp&libraries=geometry,drawing,places`}
                                loadingElement={
                                    <div style={{ height: '100%' }} />
                                }
                                containerElement={
                                    <div style={{ height: '500px' }} />
                                }
                                mapElement={<div style={{ height: '100%' }} />}
                            />
                        </Col>
                        <Col span={12}>
                            <Form
                                layout="vertical"
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Row gutter={[8, 0]}>
                                    <Col md={24} span={24}>
                                        <Form.Item
                                            name="_id"
                                            initialValue={editData._id}
                                        >
                                            <Input
                                                addonBefore="ID เครื่อง"
                                                disabled={true}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12} span={24}>
                                        <Form.Item
                                            name="title"
                                            initialValue={editData.title}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'This is required!',
                                                },
                                            ]}
                                        >
                                            <Input addonBefore="ช่องจอดที่" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12} span={24}>
                                        <Form.Item
                                            name="description"
                                            initialValue={editData.description}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'This is required!',
                                                },
                                            ]}
                                        >
                                            <Input addonBefore="ชื่อสถานที่" />
                                        </Form.Item>
                                    </Col>

                                    <Col md={12} span={24}>
                                        <Form.Item
                                            name="MacAddress"
                                            initialValue={editData.MacAddress}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'This is required!',
                                                },
                                            ]}
                                        >
                                            <Input addonBefore="MAC address" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12} span={24}>
                                        <Form.Item
                                            name="status"
                                            initialValue={editData.status}
                                        >
                                            <Select>
                                                <Select.Option value={0}>
                                                    ว่าง
                                                </Select.Option>
                                                <Select.Option value={1}>
                                                    ไม่ว่าง
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Divider />

                                    <Col span={12}>
                                        <Popconfirm
                                            title="แน่ใจหรือไม่ว่าต้องการลบข้อมูลเครื่องกั้น?"
                                            onConfirm={() =>
                                                handleDelete(editData._id)
                                            }
                                            okText="Yes"
                                            cancelText="No"
                                            icon={
                                                <RiErrorWarningLine className="remix-icon da-text-color-primary-1" />
                                            }
                                        >
                                            <Button
                                                icon={
                                                    <RiDeleteBin5Fill
                                                        style={{
                                                            marginRight: 6,
                                                            fontSize: 19,
                                                        }}
                                                    />
                                                }
                                                style={{ height: '45px' }}
                                                htmlType="submit"
                                                block
                                            >
                                                ลบเครื่องกั้น
                                            </Button>
                                        </Popconfirm>
                                    </Col>

                                    <Col span={12}>
                                        <Button
                                            icon={
                                                <RiSave2Fill
                                                    style={{
                                                        marginRight: 6,
                                                        fontSize: 19,
                                                    }}
                                                />
                                            }
                                            style={{ height: '45px' }}
                                            type="primary"
                                            htmlType="submit"
                                            block
                                        >
                                            บันทึกการแก้ไข
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Card>
    )
}
