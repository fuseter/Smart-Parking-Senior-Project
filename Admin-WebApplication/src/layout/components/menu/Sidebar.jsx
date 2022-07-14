import React, { useState, createElement } from 'react'
import { useLocation, Link } from 'react-router-dom'

import { Avatar, Layout, Drawer, Menu, Button, Row, Col } from 'antd'
import { RiMenuFoldLine, RiMenuUnfoldLine, RiCloseFill } from 'react-icons/ri'

import navigation from '../../../navigation'
import MenuLogo from './logo'
import MenuFooter from './footer'

import logoSmall from '../../../assets/images/logo/car-park.svg'
import avatar from '../../../assets/images/logo/profile.png'

const { Sider } = Layout
const { SubMenu } = Menu

export default function Sidebar(props) {
    const { visible, setVisible } = props

    const [collapsed, setCollapsed] = useState(false)

    // Location
    const location = useLocation()
    const { pathname } = location

    const splitLocation = pathname.split('/')

    // Mobile Sidebar
    const onClose = () => {
        setVisible(false)
    }

    // Menu
    function toggle() {
        setCollapsed(!collapsed)
    }

    const trigger = createElement(
        collapsed ? RiMenuUnfoldLine : RiMenuFoldLine,
        {
            className: 'trigger',
            onClick: toggle,
        }
    )

    const splitLocationUrl =
        splitLocation[splitLocation.length - 2] +
        '/' +
        splitLocation[splitLocation.length - 1]

    const menuItem = navigation.map((item, index) => {
        if (item.header) {
            return (
                <Menu.ItemGroup
                    key={index}
                    title={item.header}
                ></Menu.ItemGroup>
            )
        }

        if (item.children) {
            return (
                <SubMenu key={item.id} icon={item.icon} title={item.title}>
                    {item.children.map((childrens, index) => {
                        if (!childrens.children) {
                            const childrenNavLink = childrens.navLink.split('/')

                            return (
                                <Menu.Item
                                    key={childrens.id}
                                    className={
                                        splitLocationUrl ===
                                        childrenNavLink[
                                            childrenNavLink.length - 2
                                        ] +
                                            '/' +
                                            childrenNavLink[
                                                childrenNavLink.length - 1
                                            ]
                                            ? 'ant-menu-item-selected'
                                            : 'ant-menu-item-selected-in-active'
                                    }
                                    onClick={onClose}
                                >
                                    {childrens.id === 'product-detail' ? (
                                        <Link
                                            to={childrens.navLink}
                                            // onClick={() =>

                                            // }
                                        >
                                            {childrens.title}
                                        </Link>
                                    ) : childrens.id.split('-')[0] ===
                                      'email' ? (
                                        <a href={childrens.navLink}>
                                            {childrens.title}
                                        </a>
                                    ) : (
                                        <Link to={childrens.navLink}>
                                            {childrens.title}
                                        </Link>
                                    )}
                                </Menu.Item>
                            )
                        } else {
                            return (
                                <SubMenu
                                    key={childrens.id}
                                    title={childrens.title}
                                >
                                    {childrens.children.map(
                                        (childItem, index) => {
                                            const childrenItemLink =
                                                childItem.navLink.split('/')

                                            return (
                                                <Menu.Item
                                                    key={childItem.id}
                                                    className={
                                                        splitLocationUrl ===
                                                        childrenItemLink[
                                                            childrenItemLink.length -
                                                                2
                                                        ] +
                                                            '/' +
                                                            childrenItemLink[
                                                                childrenItemLink.length -
                                                                    1
                                                            ]
                                                            ? 'ant-menu-item-selected'
                                                            : 'ant-menu-item-selected-in-active'
                                                    }
                                                    onClick={onClose}
                                                >
                                                    <Link
                                                        to={childItem.navLink}
                                                    >
                                                        {childItem.title}
                                                    </Link>
                                                </Menu.Item>
                                            )
                                        }
                                    )}
                                </SubMenu>
                            )
                        }
                    })}
                </SubMenu>
            )
        } else {
            const itemNavLink = item.navLink.split('/')

            return (
                <Menu.Item
                    key={item.id}
                    icon={item.icon}
                    onClick={onClose}
                    className={
                        item.id === 'profile'
                            ? splitLocation[splitLocation.length - 3] +
                                  '/' +
                                  splitLocation[splitLocation.length - 2] ===
                              itemNavLink[itemNavLink.length - 3] +
                                  '/' +
                                  itemNavLink[itemNavLink.length - 2]
                                ? 'ant-menu-item-selected'
                                : 'ant-menu-item-selected-in-active'
                            : splitLocation[splitLocation.length - 2] +
                                  '/' +
                                  splitLocation[splitLocation.length - 1] ===
                              itemNavLink[itemNavLink.length - 2] +
                                  '/' +
                                  itemNavLink[itemNavLink.length - 1]
                            ? 'ant-menu-item-selected'
                            : 'ant-menu-item-selected-in-active'
                    }
                >
                    <Link to={item.navLink}>{item.title}</Link>
                </Menu.Item>
            )
        }
    })

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            theme="light"
            width={256}
            className="da-sidebar"
        >
            <Row
                className="da-mr-12 da-ml-24 da-mt-24"
                align="bottom"
                justify="space-between"
            >
                <Col>{collapsed === false ? <MenuLogo /> : ''}</Col>

                <Col className="da-pr-0">
                    <Button
                        icon={trigger}
                        type="text"
                        className="da-float-right"
                    ></Button>
                </Col>

                {collapsed !== false && (
                    <Col className="da-mt-8">
                        <Link to="/" onClick={onClose}>
                            <img
                                className="da-logo"
                                src={logoSmall}
                                alt="logo"
                            />
                        </Link>
                    </Col>
                )}
            </Row>

            <Menu
                mode="inline"
                defaultOpenKeys={[
                    splitLocation.length === 5
                        ? splitLocation[splitLocation.length - 3]
                        : null,
                    splitLocation[splitLocation.length - 2],
                ]}
            >
                {menuItem}
            </Menu>

            {collapsed === false ? (
                <MenuFooter onClose={onClose} />
            ) : (
                <Row
                    className="da-sidebar-footer da-py-16"
                    align="middle"
                    justify="center"
                >
                    <Col>
                        <Avatar size={36} src={avatar} />
                    </Col>
                </Row>
            )}

            <Drawer
                title={<MenuLogo onClose={onClose} />}
                className="da-mobile-sidebar"
                placement="left"
                closable={true}
                onClose={onClose}
                visible={visible}
                closeIcon={
                    <RiCloseFill
                        className="remix-icon da-text-color-black-80"
                        size={24}
                    />
                }
            >
                <Menu
                    mode="inline"
                    defaultOpenKeys={[
                        splitLocation.length === 5
                            ? splitLocation[splitLocation.length - 3]
                            : null,
                        splitLocation[splitLocation.length - 2],
                    ]}
                >
                    {menuItem}
                </Menu>

                <MenuFooter onClose={onClose} />
            </Drawer>
        </Sider>
    )
}
