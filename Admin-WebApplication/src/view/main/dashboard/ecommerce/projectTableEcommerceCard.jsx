import React from 'react'
import { Card, Row, Col, Table, Tag } from 'antd'

export default function ProjectTableEcommerceCard(props) {
    const { allActivityLatest } = props

    const columns = [
        {
            title: (
                <span className="da-d-block da-badge-text da-text-color-black-60">
                    ช่องจอดที่
                </span>
            ),
            dataIndex: 'title',
            key: 'title',
            render: (text) => (
                <p className="da-mb-0 da-text-color-black-100">{text}</p>
            ),
        },
        {
            title: (
                <span className="da-d-block da-badge-text da-text-color-black-60">
                    MAC address
                </span>
            ),
            dataIndex: 'MacAddress',
            key: 'MacAddress',
            render: (text) => (
                <p className="da-mb-0 da-text-color-black-100">{text}</p>
            ),
        },
        {
            title: (
                <span className="da-d-block da-badge-text da-text-color-black-60">
                    ID ผู้ใช้งาน
                </span>
            ),
            dataIndex: 'uid',
            key: 'uid',
            render: (text) => (
                <p className="da-mb-0 da-text-color-black-100">{text}</p>
            ),
        },
        {
            title: (
                <span className="da-d-block da-badge-text da-text-color-black-60">
                    Status
                </span>
            ),
            key: 'status',
            dataIndex: 'status',
            render: (dataIndex) => {
                if (dataIndex === 0) {
                    return <Tag color="success">ว่าง</Tag>
                } else if (dataIndex === 1) {
                    return <Tag color="blue">ไม่ว่าง</Tag>
                }
            },
        },
    ]

    return (
        <Card className="da-border-color-black-40 da-project-ecommerce-table-card">
            <Row>
                <Col span={24}>
                    <Row align="middle" justify="start">
                        <h5 className="da-mb-32">ประวัติการจอดล่าสุด</h5>
                    </Row>

                    <Table
                        rowKey={(record) => record._id}
                        columns={columns}
                        dataSource={allActivityLatest}
                        pagination={false}
                        className="da-overflow-scroll"
                    />
                </Col>
            </Row>
        </Card>
    )
}
