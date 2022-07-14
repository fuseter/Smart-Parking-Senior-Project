import React from "react";

import { Card, Row, Col, Button, Progress } from "antd";
import { Document } from "react-iconly";

import illustartion from "../../../../../assets/images/illustrations/welcome-illustration-3.svg";

export default function WelcomeCardThree() {
  return (
    <Card className="da-border-color-black-40 da-mb-32 da-card-3 da-welcomeCard">
      <Row>
        <Col xl={12} sm={18} xs={24}>
          <Row justify="space-between">
            <h2 className="da-mb-8 da-ml-4">Congratulations⚡️</h2>
            <div className="da-dot-1 da-bg-color-primary-4" />
          </Row>

          <p className="da-mb-32">
            You're close to achieving <br /> your goal
            </p>

          <Row>
            <Col span={18}>
              <h3 className="da-mb-0 da-text-color-black-60">£ 23.000.00</h3>
              <Progress percent={30} strokeWidth={4} />
            </Col>
          </Row>

          <Button
            icon={<Document set="curved" className="remix-icon" />}
            type="text"
            className="da-pl-0 da-text-color-primary-1 da-mt-8"
          >
            Report Detail
          </Button>

        </Col>
        <img src={illustartion} className="da-img-3" alt="Congratulations⚡️" />
      </Row>
    </Card>
  );
}
