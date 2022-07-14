import { useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// Redux
import { deleteUser, getUser } from '../../redux/contact/contactActions'
import { useDispatch } from 'react-redux'

import {
    Layout,
    Row,
    Col,
    Avatar,
    Button,
    Divider,
    Card,
    Popconfirm,
} from 'antd'
import {
    RiArrowLeftSLine,
    RiUserLine,
    RiErrorWarningLine,
} from 'react-icons/ri'

import illustration from '../../assets/images/apps/contact/sidebar.png'

const { Sider, Content } = Layout

export default function Detail({ selectedUser }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUser(parseInt(id)))
    }, [dispatch])

    const listTitle = 'da-p1-body'
    const listResult = 'da-mt-sm-4 da-p1-body da-text-color-black-100'
    const dividerClass = 'da-border-color-black-40'

    // Popconfirm
    function confirm(userId) {
        history.push('/apps/contact')
        dispatch(deleteUser(userId))
    }

    return (
        <Card className="da-contact-detail da-mb-32">
            <Layout className="da-flex-wrap">
                <Sider
                    className="da-p-24 da-border-right-1"
                    theme="light"
                    width={254}
                >
                    <Row>
                        <Col span={24}>
                            <Link to="/apps/contact">
                                <Button
                                    type="text"
                                    shape="square"
                                    icon={<RiArrowLeftSLine size={24} />}
                                ></Button>
                            </Link>
                        </Col>

                        <Col span={24} className="da-text-center">
                            <Avatar
                                size={128}
                                icon={<RiUserLine className="remix-icon" />}
                                className="da-m-auto"
                            />
                        </Col>

                        <Col span={24} className="da-mt-16 da-text-center">
                            <h4>{selectedUser.fullName}</h4>
                        </Col>

                        <Col span={24} className="da-text-center">
                            <p>{selectedUser.email}</p>
                        </Col>

                        <Col span={24} className="da-mt-16">
                            <Popconfirm
                                title="Are you sure to delete this contact?"
                                onConfirm={() => confirm(selectedUser.id)}
                                okText="Yes"
                                cancelText="No"
                                icon={
                                    <RiErrorWarningLine className="remix-icon da-text-color-primary-1" />
                                }
                            >
                                <Button block type="primary">
                                    Delete Contact
                                </Button>
                            </Popconfirm>
                        </Col>

                        <Col className="da-footer-img">
                            <img
                                className="img-fluid"
                                src={illustration}
                                alt="illustration"
                            />
                        </Col>
                    </Row>
                </Sider>

                <Content className="da-bg-color-black-0 da-p-24">
                    {selectedUser.informationText && (
                        <>
                            <Col md={15} span={24}>
                                <h2>Personal Informations</h2>
                                <p className="da-p1-body da-mb-0">
                                    {selectedUser.informationText}
                                </p>
                            </Col>

                            <Divider className={dividerClass} />
                        </>
                    )}

                    {selectedUser.aboutText && (
                        <>
                            <Col md={15} span={24}>
                                <h3>About</h3>
                                <p className="da-p1-body da-mb-0">
                                    {selectedUser.aboutText}
                                </p>
                            </Col>

                            <Divider className={dividerClass} />
                        </>
                    )}

                    <Row align="middle" justify="space-between">
                        <Col md={12} span={24}>
                            <h3>Contact</h3>
                        </Col>

                        <Col
                            span={24}
                            className="da-profile-content-list da-mt-8 da-pb-sm-0 da-pb-120"
                        >
                            <ul>
                                <li>
                                    <span className={listTitle}>Full Name</span>
                                    <span className={listResult}>
                                        {selectedUser.fullName}
                                    </span>
                                </li>

                                <li className="da-mt-18">
                                    <span className={listTitle}>
                                        Display Name
                                    </span>
                                    <span className={listResult}>
                                        {selectedUser.username}
                                    </span>
                                </li>

                                <li className="da-mt-18">
                                    <span className={listTitle}>Email</span>
                                    <a
                                        className={listResult}
                                        href={'mailto:' + selectedUser.email}
                                    >
                                        {selectedUser.email}
                                    </a>
                                </li>

                                <li className="da-mt-18">
                                    <span className={listTitle}>Phone</span>
                                    <a
                                        className={listResult}
                                        href={'tel:' + selectedUser.contact}
                                    >
                                        {selectedUser.contact}
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Card>
    )
}
