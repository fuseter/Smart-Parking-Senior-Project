import React, { useState } from 'react'

import { Card, Row, Col } from 'antd'
import Chart from 'react-apexcharts'

export default function EarningsDonutCard(props) {
    const { circleChart } = props

    const [data] = useState({
        series: [circleChart.deviceActive, circleChart.deviceinActive],
        options: {
            chart: {
                id: 'earnings-donut-card',
                fontFamily: 'Manrope, sans-serif',
                type: 'donut',
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            colors: ['#FE0030', '#FFB1B1'],
            labels: ['เครื่องกั้นที่ไม่ว่าง', 'เครื่องกั้นที่ว่าง'],

            dataLabels: {
                enabled: false,
            },

            plotOptions: {
                pie: {
                    donut: {
                        size: '90%',
                        labels: {
                            show: true,
                            name: {
                                fontSize: '2rem',
                            },
                            value: {
                                fontSize: '24px',
                                fontWeight: 'regular',
                                color: 'B2BEC3',
                            },
                            total: {
                                show: true,
                                fontSize: '24px',
                                fontWeight: 'regular',
                                label: 'เครื่องกั้น',
                                color: '#636E72',
                            },
                        },
                    },
                },
            },
            responsive: [
                {
                    breakpoint: 426,
                    options: {
                        legend: {
                            itemMargin: {
                                horizontal: 16,
                                vertical: 8,
                            },
                        },
                    },
                },
            ],

            legend: {
                itemMargin: {
                    horizontal: 12,
                    vertical: 24,
                },
                horizontalAlign: 'center',
                position: 'bottom',
                fontSize: '12px',
                inverseOrder: true,
                markers: {
                    radius: 12,
                },
            },
        },
    })

    return (
        <Card className="da-border-color-black-40 da-card-6">
            <Row>
                <Col span={24}>
                    <h5 className="da-mb-32">สถานะเครื่องกั้น</h5>
                </Col>

                <Col span={24}>
                    <div id="earnings-donut-card" className="da-donut-chart">
                        <Chart
                            options={data.options}
                            series={data.series}
                            type="donut"
                            height={350}
                            legend="legend"
                        />
                    </div>
                </Col>
            </Row>
        </Card>
    )
}
