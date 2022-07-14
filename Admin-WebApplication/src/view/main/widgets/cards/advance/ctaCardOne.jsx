import React from "react";

import { Card, Row, Col, Button } from "antd";

import illustration from "../../../../../assets/images/illustrations/time-management-1.svg";

export default function CtaCardOne() {
  return (
    <Card className="da-border-color-black-40 da-card-6">
      <Row>
        <Col className="da-text-center" span={24}>
          <img src={illustration} alt="Buy Pro Account to explore Premium Features" />
          <h4 className="da-mb-0 da-my-24 da-mr-4 da-text-color-black-100  da-font-weight-700">
            Buy Pro Account to explore Premium Features
          </h4>
          
          <Button type="primary">Purchase Now</Button>
        </Col>
      </Row>
    </Card>
  );
}
