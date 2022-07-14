import React from "react";

import { Card, Row, Col, Button, Tag, Rate } from "antd";
import {
  RiHeartFill,
  RiShoppingBagLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

import xboxGamepad from "../../../../../assets/images/product/white-cam-card.png";

export default function EcommerceCardSix() {
  return (
    <Card className="da-border-color-black-40 da-card-3 da-eCommerceCardOne">
      <Row gutter={32}>
        <Col sm={8} xs={24} className="da-mb-xs-24">
          <Row justify="space-between" align="top">
            <Tag className="da-border-none" color="blue">
              Featured
            </Tag>

            <Rate
              defaultValue={1}
              count={1}
              className="da-text-color-danger-1 da-border-radius-round remix-icon da-p-8 da-bg-color-danger-4 da-rate"
              character={<RiHeartFill />}
            ></Rate>
          </Row>

          <Col className="da-text-center">
            <img src={xboxGamepad} alt="Digital Camera White Adition" />
          </Col>
        </Col>

        <Col sm={8} xs={24}>
          <Rate defaultValue={4.5} size={16} allowHalf></Rate>

          <div className="da-my-8">
            <h4 className="da-mb-4">Digital Camera White Adition</h4>
            <p className="da-caption da-mb-0 da-text-color-black-60">
              By <span className="da-text-color-black-80"> Polaroid</span>
            </p>
          </div>

          <p className="da-mb-0 da-p1-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit
            amet urna eu nunc faucibus scelerisque quis sed est.
          </p>
        </Col>

        <Col
          sm={8}
          xs={24}
          className="da-text-right da-text-xs-left da-mt-xs-24"
        >
          <h3 className="da-mb-8 da-mr-8 da-text-color-primary-1 da-font-weight-700">
            $39.00
          </h3>

          <div>
            <Row
              align="middle"
              justify="end"
              className="da-mb-4"
            >
              <RiCheckboxCircleFill
                className="da-text-color-success-1 da-mr-4"
                size={16}
              />
              <p className="da-mb-0">Flexible credit available</p>
            </Row>

            <Row
              align="middle"
              justify="end"
              className="da-mb-32 da-text-xs-left"
            >
              <RiCheckboxCircleFill
                className="da-text-color-success-1 da-mr-4"
                size={16}
              />
              <p className="da-mb-0">Free Shipping Worldwide</p>
            </Row>
          </div>

          <Button type="ghost" className="da-mb-8" block>
            Check Detail
          </Button>

          <Button
            icon={<RiShoppingBagLine className="remix-icon " />}
            type="primary"
            block
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
