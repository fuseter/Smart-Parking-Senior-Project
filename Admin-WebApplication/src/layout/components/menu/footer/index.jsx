import React from 'react'
import { Divider, Avatar, Row, Col } from 'antd'
import avatar from '../../../../assets/images/logo/profile.png'

export default function MenuFooter(props) {
    return (
        <Row
            className="da-sidebar-footer da-pb-24 da-px-24"
            align="middle"
            justify="space-between"
        >
            <Divider className="da-border-color-black-20 da-mt-0" />

            <Col>
                <Row align="middle">
                    <Avatar size={36} src={avatar} className="da-mr-8" />

                    <div>
                        <span className="da-d-block da-text-color-black-100 da-p1-body">
                            Admin
                        </span>
                    </div>
                </Row>
            </Col>

            {/* <Col>
        <Link
          to="/pages/profile/security"
          onClick={props.onClose}
        >
          <RiSettings3Line
            className="remix-icon da-text-color-black-100"
            size={24}
          />
        </Link>
      </Col> */}
        </Row>
    )
}
