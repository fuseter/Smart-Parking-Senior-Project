import React from "react";

import { Card, Row, Col, Button, Input, Form } from "antd";

import illustration from "../../../../../assets/images/illustrations/newsletter-1.svg";

export default function SubscribeCard() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="da-border-color-black-40 da-card-6">
      <Row>
        <Col className="da-text-center" span={24}>
          <img className="da-mb-36 " src={illustration} alt="Illustrations" />

          <Form
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email:"
              name="email"
              className="da-mb-16 da-text-left"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>

            <Form.Item className="da-mb-0">
              <Button type="primary" htmlType="submit" block>
                Subscribe
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
