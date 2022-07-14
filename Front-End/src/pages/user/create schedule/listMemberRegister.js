import React from 'react'
import { Col, Row } from 'antd'
import CustomizeTable from '../../../components/table/table'

const headCells = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'User Name',
    dataIndex: 'userName',
    key: 'userName'
  },
  {
    title: 'User Code',
    dataIndex: 'userCode',
    key: 'userCode'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Purpose',
    dataIndex: 'purpose',
    key: 'purpose',
    render: (value, row, index) => {
      const obj = {
        children: value,
        props: {}
      }
      obj.props.rowSpan = 0
      return obj
    }
  }
]

export default function ListMember(props) {
  const { data } = props
  return (
    <>
      <CustomizeTable
        headCells={headCells}
        data={data}
      />
    </>
  )
}
