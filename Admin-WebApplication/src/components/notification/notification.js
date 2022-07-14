import React from 'react'
import { notification } from 'antd'
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons'

export const openNotification = (props) => {
    const { message, description, error } = props

    notification.open({
        message: message,
        description: description,
        icon: error ? (
            <CloseCircleOutlined style={{ color: '#FE0030' }} />
        ) : (
            <CheckCircleFilled style={{ color: '#4cd137' }} />
        ),
    })
}
