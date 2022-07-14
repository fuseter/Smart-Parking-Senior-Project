import React from 'react'
import { Row, Col } from 'antd'
import bg from '../../assets/images/pages/authentication/bg.svg'
import logo from '../../assets/images/logo/NewLogo.svg'

export default function LeftContent() {
    return (
        <Col
            lg={12}
            span={24}
            className="da-bg-color-primary-4 da-position-relative"
        >
            <Row className="da-image-row da-h-100 da-px-sm-8 da-px-md-16 da-pb-sm-32 da-pt-md-96 da-pt-md-32">
                <Col className="da-logo-item da-m-sm-16 da-m-md-32 da-m-64">
                    <img src={logo} alt="Logo" style={{ width: 200 }} />
                </Col>

                <Col span={24}>
                    <Row align="middle" justify="center" className="da-h-100">
                        <Col
                            md={20}
                            span={24}
                            className="da-bg-item da-text-center da-mb-md-32"
                        >
                            <img src={bg} alt="BackgroundImage" style={{ width: 560 }} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}
