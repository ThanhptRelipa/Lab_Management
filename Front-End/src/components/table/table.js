import React from 'react'
import { Col, Row, Table } from 'antd'
import './table.css'

export default function CustomizeTable(props) {
  const { headCells, data, itemsPerPage } = props
  let validData

  if (data && data !== []) {
    validData = true
  } else {
    validData = false
  }
  return (
    <Row>
      <Col className='customTable' xl={22}>
        {
          validData
            ? <Table
              columns={headCells}
              dataSource={data}
              pagination={{
                position: ['bottomCenter'],
                defaultCurrent: 1,
                total: data.length,
                pageSize: itemsPerPage
              }}
            />
            : <Table
              columns={headCells}
            />
        }
      </Col>
    </Row>
  )
}
