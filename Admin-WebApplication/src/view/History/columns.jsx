import React from 'react'
import { Tag } from 'antd'
// import { User, Delete } from 'react-iconly'
// import { RiErrorWarningLine } from 'react-icons/ri'
import moment from 'moment/min/moment-with-locales'
import { CheckCircleOutlined, SyncOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

export const columns = [
    {
        title: 'ช่องจอด',
        dataIndex: 'title',
        key: 'avatar',
        render: (dataIndex) => {
            return (
                <Avatar
                    size={45}
                    style={{
                        backgroundColor: '#FE0030',
                        verticalAlign: 'middle',
                        color: '#fff',
                    }}
                >
                    {dataIndex}
                </Avatar>
            )
        },
    },

    {
        title: 'MAC address',
        dataIndex: 'MacAddress',
        key: 'MacAddress',
    },
    {
        title: 'สถานที่',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'ID ผู้ใช้งาน',
        dataIndex: 'uid',
        key: 'uid',
    },
    {
        title: 'สถานะ',
        dataIndex: 'status',
        key: 'status',
        render: (dataIndex) => {
            if (dataIndex === 0) {
                return (
                    <Tag icon={<CheckCircleOutlined />} color="green">
                        &nbsp; สำเสร็จ
                    </Tag>
                )
            } else if (dataIndex === 1) {
                return (
                    <Tag icon={<SyncOutlined spin />} color="geekblue">
                        &nbsp; กำลังใช้งาน
                    </Tag>
                )
            }
        },
    },
    {
        title: 'เวลา',
        dataIndex: 'time',
        key: 'time',
        render: (dataIndex) => {
            return <div>{moment(dataIndex).locale('th').format('lll')}</div>
        },
    },
    // {
    //     dataIndex: 'avatar',
    //     render: (dataIndex) => (
    //         <Popconfirm
    //             placement="topLeft"
    //             title="Are you sure to delete this contact?"
    //             onConfirm={() => confirm(dataIndex[0])}
    //             okText="Yes"
    //             cancelText="No"
    //             icon={
    //                 <RiErrorWarningLine className="remix-icon da-text-color-primary-1" />
    //             }
    //         >
    //             <div className="da-text-right">
    //                 <Delete
    //                     size={24}
    //                     className="da-cursor-pointer da-transition da-hover-text-color-danger-1 da-text-color-black-80"
    //                 />
    //             </div>
    //         </Popconfirm>
    //     ),
    // },
]
