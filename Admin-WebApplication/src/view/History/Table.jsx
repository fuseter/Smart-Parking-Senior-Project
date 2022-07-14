import { useState, useEffect } from 'react'
import { Col, Table, Card } from 'antd'
import { columns } from './columns'
import { allActivity } from '../../services/activity'

export default function UsersList() {
    const [activityData, setactivityData] = useState([])

    const fetchAllActivity = async () => {
        try {
            await allActivity().then((response) => {
                if (response.status === 200) {
                    setactivityData(response.data.data)

                    console.log('res ==>', response.data.data)
                }
            })
        } catch (error) {
            console.log('error  ==>', error)
        }
    }

    useEffect(() => {
        fetchAllActivity()
    }, [])

    return (
        <>
            <Card className="da-contact-card da-mb-32">
                <Col className="da-contact-card da-mt-32">
                    <Table
                        rowKey={(rescord) => rescord._id}
                        pagination={{ defaultPageSize: 6 }}
                        columns={columns}
                        dataSource={activityData}
                        scroll={{ x: 'calc(500px + 50%)' }}
                    />
                </Col>
            </Card>
        </>
    )
}
