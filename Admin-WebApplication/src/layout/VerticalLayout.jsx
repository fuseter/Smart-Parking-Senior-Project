import React, { useState } from 'react'

import ScrollToTop from 'react-scroll-up'
import { Layout, Button } from 'antd'
import { RiArrowUpLine } from 'react-icons/ri'

import Sidebar from './components/menu/Sidebar'
import MenuHeader from './components/header'
import MenuFooter from './components/footer'

const { Content } = Layout

export default function VerticalLayout(props) {
    const { children } = props

    const [visible, setVisible] = useState(false)

    return (
        <div>
            <Layout className="da-app-layout">
                <Sidebar visible={visible} setVisible={setVisible} />

                <Layout>
                    <MenuHeader setVisible={setVisible} />

                    <Content className="da-content-main">{children}</Content>

                    <MenuFooter />
                </Layout>
            </Layout>

            <div className="scroll-to-top">
                <ScrollToTop showUnder={300} style={{ bottom: '5%' }}>
                    <Button
                        className="da-primary-shadow"
                        type="primary"
                        shape="circle"
                        icon={<RiArrowUpLine />}
                    />
                </ScrollToTop>
            </div>
        </div>
    )
}
