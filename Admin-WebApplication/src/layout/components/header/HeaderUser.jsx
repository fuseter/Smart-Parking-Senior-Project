import React from 'react'
import { Menu, Dropdown, Col, Avatar } from 'antd'
import { Logout } from 'react-iconly'
import avatarImg from '../../../assets/images/logo/profile.png'
import Cookies from 'js-cookie'

export default function HeaderUser() {
    const signOut = () => {
        Cookies.remove('access-token')
        setTimeout(() => {
            window.location.reload()
        }, 1000)
    }
    const menu = (
        <Menu>
            <Menu.Item
                onClick={() => signOut()}
                icon={
                    <Logout
                        set="curved"
                        className="remix-icon da-vertical-align-middle"
                        size={16}
                    />
                }
            >
                <div>Logout</div>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={menu}>
            <Col
                className="da-d-flex-center"
                onClick={(e) => e.preventDefault()}
            >
                <Avatar src={avatarImg} size={40} />
            </Col>
        </Dropdown>
    )
}
