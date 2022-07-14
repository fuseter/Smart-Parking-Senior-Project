import React from 'react'
import { Col, Row, Input, Form, Button, Space, Drawer } from 'antd'
import { config } from '../../constants/config'
import { RiAddCircleFill } from 'react-icons/ri'
import { registerDevice } from '../../services/devices'
import { openNotification } from '../../components/notification/notification'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
} from 'react-google-maps'

let newLatLng = [{ lat: 15.118524429823255, lng: 104.9075726928711 }]

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

export default function AddNewDevice({ open, toggleSidebar, fetchAllDevice }) {
    const onFinish = async (values) => {
        try {
            const data = {
                title: values.ParkingName,
                description: values.locationName,
                MacAddress: values.Macaddr,
                status: 0,
                lat: String(newLatLng[0].lat),
                long: String(newLatLng[0].lng),
            }

            await registerDevice(data).then((response) => {
                if (response.status === 200) {
                    toggleSidebar()
                    fetchAllDevice()
                    openNotification({
                        message: 'เพิ่มสำเร็จ',
                        description: 'เพิ่มเครื่องกั้นเรียบร้อย',
                        error: false,
                    })
                }
            })
        } catch (error) {
            openNotification({
                message: 'เกิดข้อผิดพลาด',
                description: 'ไม่สามารถเพิ่มเครื่องกั้นได้',
                error: true,
            })
        }
    }

    return (
        <>
            <Drawer
                title="เพิ่มเครื่องกั้น"
                placement="right"
                width={850}
                onClose={toggleSidebar}
                visible={open}
                extra={
                    <Space>
                        <Button onClick={toggleSidebar}>Cancel</Button>
                        <Button type="primary" onClick={toggleSidebar}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <MapWithAMarker
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${config.GOOGLEMAPSAPI}&v=3.exp&libraries=geometry,drawing,places`}
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                />
                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ marginTop: 40 }}
                >
                    <Row gutter={[8, 0]}>
                        <Col md={12} span={24}>
                            <Form.Item
                                name="ParkingName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This is required!',
                                    },
                                ]}
                            >
                                <Input addonBefore="ช่องจอดที่" />
                            </Form.Item>
                        </Col>
                        <Col md={12} span={24}>
                            <Form.Item
                                name="locationName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This is required!',
                                    },
                                ]}
                            >
                                <Input addonBefore="ชื่อสถานที่" />
                            </Form.Item>
                        </Col>

                        <Col md={24} span={24}>
                            <Form.Item
                                name="Macaddr"
                                rules={[
                                    {
                                        required: true,
                                        message: 'This is required!',
                                    },
                                ]}
                            >
                                <Input addonBefore="MAC address" />
                            </Form.Item>
                        </Col>

                        {/* <Divider /> */}

                        <Col span={24}>
                            <Button
                                icon={
                                    <RiAddCircleFill
                                        style={{ marginRight: 6, fontSize: 19 }}
                                    />
                                }
                                style={{ height: '45px' }}
                                type="primary"
                                htmlType="submit"
                                block
                            >
                                เพิ่มอุปกรณ์
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    )
}
