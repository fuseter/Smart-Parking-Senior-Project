import React from 'react'
import { Card, Row, Col } from 'antd'
import { People, Location, Setting } from 'react-iconly'

export default function ECommerceFeatureCard(props) {
    const { overall } = props

    return (
        <Row gutter={[32, 32]}>
            <Col xl={8} md={12} span={24}>
                <Card className="da-border-color-black-40">
                    <Row>
                        <Col className="da-statistic-icon-bg da-mr-16 da-mb-xs-16 da-bg-color-danger-4">
                            <Location className="da-text-color-danger-1 remix-icon" />
                        </Col>

                        <Col className="da-mt-8">
                            <h3 className="da-mb-4">{overall.activity}</h3>

                            <p className="da-p1-body da-mb-0 da-text-color-black-80">
                                การจอดทั้งหมด
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>

            <Col xl={8} md={12} span={24}>
                <Card className="da-border-color-black-40">
                    <Row>
                        <Col className="da-statistic-icon-bg da-mr-16 da-mb-xs-16 da-bg-color-warning-4">
                            <Setting className="da-text-color-warning-1 remix-icon" />
                        </Col>

                        <Col className="da-mt-8">
                            <h3 className="da-mb-4">{overall.device}</h3>

                            <p className="da-p1-body da-mb-0 da-text-color-black-80">
                                เครื่องกั้นทั้งหมด
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>

            <Col xl={8} md={12} span={24}>
                <Card className="da-border-color-black-40">
                    <Row>
                        <Col className="da-statistic-icon-bg da-mr-16 da-mb-xs-16 da-bg-color-secondary-4">
                            <People set="light" primaryColor="blueviolet" />
                        </Col>

                        <Col className="da-mt-8">
                            <h3 className="da-mb-4">{overall.user}</h3>

                            <p className="da-p1-body da-mb-0 da-text-color-black-80">
                                บัญชีผู้ใช้ทั้งหมด
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}
