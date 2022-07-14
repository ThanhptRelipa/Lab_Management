import React from 'react'
import { Col, Row } from 'antd'
import CustomizeTable from '../../../components/table/table'

export default function ListSchedule() {
  const headCells = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Time Start',
      dataIndex: 'timeStart',
      key: 'timeStart'
    },
    {
      title: 'Day Start',
      dataIndex: 'dayStart',
      key: 'dayStart'
    },
    {
      title: 'Time End',
      dataIndex: 'timeEnd',
      key: 'timeEnd'
    },
    {
      title: 'Day End',
      dataIndex: 'dayEnd',
      key: 'dayEnd'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager'
    }
  ]
  return (
    <Row>
      <Col xl={24}>
        <CustomizeTable
          headCells={headCells}
        />
      </Col>
    </Row>
  )
}
