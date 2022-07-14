import React from 'react'
import { Col, Form, Row, Typography, Select } from 'antd'
import CustomizeTable from '../../../components/table/table'
const headCells = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Equitment',
    dataIndex: 'equitment',
    key: 'equitment'
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note'
  }
]

const { Text } = Typography
const { Option } = Select
export default function List(props) {
  const { data, handlePerPageChange, itemsPerPage } = props

  return (
    <>
      <Row>
        <Col className='table-info' xl={22}>
          <Form>
            <Form.Item className='table-info-detail' label='Total equitmemt'>
              <Text>{data.length}</Text>
            </Form.Item>
          </Form>
          <Form>
            <Form.Item className='table-info-detail' label='Items per page'>
              <Select defaultValue={5} onChange={handlePerPageChange}>
                <Option value={5}>5</Option>
                <Option value={10}>10</Option>
                <Option value={15}>15</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <CustomizeTable
        headCells={headCells}
        data={data}
        itemsPerPage={itemsPerPage}
      />
    </>
  )
}
