import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import ProjectTableEcommerceCard from './projectTableEcommerceCard'
import EarningsDonutCard from './earningsDonutCard'
import ECommerceFeatureCard from './eCommerceFeatureCard'
import { allAmountActivity, allActivity } from '../../../../services/activity'
import { allAmountUser } from '../../../../services/authentication'
import { allAmountDevice } from '../../../../services/devices'
import { getallDevice } from '../../../../services/devices'

export default function Dashboard() {
    const [overall, setoverall] = useState({
        activity: 0,
        user: 0,
        device: 0,
    })
    const [circleChart, setcircleChart] = useState({
        deviceActive: 0,
        deviceinActive: 0,
    })

    const [allActivityLatest, setallActivityLatest] = useState([])

    useEffect(() => {
        Promise.all([
            allAmountActivity(),
            allAmountUser(),
            allAmountDevice(),
            getallDevice(),
            allActivity(),
        ])
            .then(
                ([
                    allActivity,
                    alluser,
                    allDevice,
                    allDevicesStatus,
                    allActivityLatest,
                ]) => {
                    setoverall({
                        activity: allActivity.data.data,
                        user: alluser.data.data,
                        device: allDevice.data.data,
                    })

                    const deviceActives = allDevicesStatus.data.data.filter(
                        (data) => data.status === 1
                    ).length
                    const deviceinActives = allDevicesStatus.data.data.filter(
                        (data) => data.status === 0
                    ).length

                    setcircleChart({
                        deviceActive: deviceActives,
                        deviceinActive: deviceinActives,
                    })

                    setallActivityLatest(
                        allActivityLatest.data.data.slice(0, 5)
                    )
                }
            )
            .catch((error) => {
                console.log('error ==>', error)
            })
    }, [])

    return (
        <Row gutter={[32, 0]}>
            <Col span={24}>
                <Row align="middle" justify="start">
                    <Col md={12} span={24}>
                        <h3>Welcome back, Admin 👋</h3>

                        <p className="da-p1-body da-text-color-black-100 da-mb-0">
                            นี่คือภาพรวมของระบบ
                        </p>
                    </Col>

                    {/* <Col className="da-mt-sm-24">
                        <Select
                            style={{ width: '100%' }}
                            defaultValue="this-mounth"
                            id="month-select"
                        >
                            <Select.Option value="this-mounth">
                                This Month
                            </Select.Option>

                            <Select.Option value="this-week">
                                This Week
                            </Select.Option>

                            <Select.Option value="this-year">
                                This Year
                            </Select.Option>
                        </Select>
                    </Col> */}
                </Row>
            </Col>

            <Col span={24} className="da-mt-32">
                <Row gutter={[32, 32]}>
                    <Col span={24}>
                        <ECommerceFeatureCard overall={overall} />
                    </Col>

                    <Col xl={16} span={24} className="da-overflow-hidden">
                        <Row gutter={[32, 32]}>
                            <Col span={24}>
                                <ProjectTableEcommerceCard
                                    allActivityLatest={allActivityLatest}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col xl={8} span={24}>
                        <Row gutter={[32, 32]}>
                            <Col span={24}>
                                {circleChart.deviceActive !== 0 &&
                                circleChart.deviceinActive !== 0 ? (
                                    <EarningsDonutCard
                                        circleChart={circleChart}
                                    />
                                ) : circleChart.deviceActive === 0 &&
                                  circleChart.deviceinActive !== 0 ? ( //ว่างทั้งหมด
                                    <EarningsDonutCard
                                        circleChart={circleChart}
                                    />
                                ) : circleChart.deviceActive !== 0 &&
                                  circleChart.deviceinActive === 0 ? ( // ไม่ว่างแค่หนึ่ง
                                    <EarningsDonutCard
                                        circleChart={circleChart}
                                    />
                                ) : (
                                    <></>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
