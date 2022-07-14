import React from "react";

import { Card, Row, Col, Table, Tag } from "antd";

import watch from "../../../../../assets/images/product/watch-1.png";
import polaroid from "../../../../../assets/images/product/white-cam-1.png";
import headphone from "../../../../../assets/images/product/wireless-bluetooth-1.png";
import xboxController from "../../../../../assets/images/product/xbox-1.png";
import oculus from "../../../../../assets/images/product/3d-glasses-1.png";

export default function OrderlistTableCard() {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <p className="da-mb-0">{text}</p>,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",

      render: (text, record) => {
        return (
          <div className="da-bg-color-black-20 da-img-container da-border-radius da-text-center">
            <img src={record.product} alt="Product" />
          </div>
        );
      },
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Status",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag;
            if (tag === "closed") {
              color = "error";
            } else if (tag === "done") {
              color = "green";
            } else if (tag === "delayed") {
              color = "gold";
            } else {
              color = "blue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  const data = [
    {
      key: "1",
      no: "1",
      id: "#1341234123",
      date: "04/05/2021",
      tags: ["pending"],
      price: "$200",
      product: `${watch} `,
    },
    {
      key: "2",
      no: "2",
      id: "#1123412123",
      date: "04/05/2021",
      tags: ["delayed"],
      price: "$345",
      product: `${headphone} `,
    },
    {
      key: "3",
      no: "3",
      id: "#242367123",
      date: "04/05/2021",
      tags: ["closed"],
      price: "$277",
      product: `${xboxController} `,
    },
    {
      key: "4",
      no: "4",
      id: "#255167123",
      date: "04/05/2021",
      tags: ["done"],
      price: "$100",
      product: `${polaroid} `,
    },
    {
      key: "5",
      no: "5",
      id: "#242367123",
      date: "04/05/2021",
      tags: ["done"],
      price: "$100",
      product: `${oculus} `,
    },
  ];

  return (
    <Card className="da-border-color-black-40 da-card-6 da-order-table-card">
      <Row>
        <Col span={24} className="da-px-0">
          <h5 className="da-mb-8">Recent Orders</h5>

          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="da-overflow-scroll"
          />
        </Col>
      </Row>
    </Card>
  );
}
