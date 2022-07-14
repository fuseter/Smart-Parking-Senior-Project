import React from "react";

import { Card, Row, Col, Button } from "antd";

import cardImg from "../../../../../assets/images/dasboard/analytics-payment-bg.svg";

export default function UpgradePlanCardOneBg() {
  return (
    <Card
      className="da-border-color-black-40 da-card-1 da-upgradePlanCardOne da-upgradePlanCardOne-bg"
      style={{
        backgroundImage: `url(${cardImg})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
      }}
    >
      <Row align="middle" className="da-mt-8">
        <Col span={24} className="da-mb-4">
          <Row align="middle" justify="space-between">
            <Col flex="1">
              <h4 className="da-mb-8">
                Get exclusive discounts for any payment method
              </h4>

              <p className="da-p1-body da-text-color-black-100 da-mb-0">
                by upgrading your plan to premium
              </p>
            </Col>

            <Button className="da-float-right da-mt-xs-16 da-text-color-primary-1">
              Upgradge Now
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
