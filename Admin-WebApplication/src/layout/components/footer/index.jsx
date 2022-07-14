import { Col, Layout, Row } from 'antd'
import themeConfig from '../../../configs/themeConfig.jsx'
const { Footer } = Layout

export default function MenuFooter() {
    return (
        <Footer className="da-bg-color-black-10">
            <Row align="middle" justify="end">
                <Col
                    md={12}
                    span={24}
                    className="da-mt-sm-8 da-text-sm-center da-text-right"
                >
                    🥁 Version: {themeConfig.version}
                </Col>
            </Row>
        </Footer>
    )
}
