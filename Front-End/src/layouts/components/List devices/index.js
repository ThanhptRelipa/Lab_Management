import React, { useState } from 'react'
import { Layout } from 'antd'
import Filter from './filterDevices'
import List from './listDevice'

const { Content } = Layout

export default function ListDevices() {
  const data = [
    { key: '1', no: 1, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '2', no: 2, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '3', no: 3, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '4', no: 4, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '5', no: 5, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '6', no: 6, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '7', no: 7, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '8', no: 8, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '9', no: 9, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '10', no: 10, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '11', no: 11, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '12', no: 12, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' },
    { key: '13', no: 13, equitment: 'nguồn', code: 'ABC', type: 'phụ kiện', quantity: '100', note: 'không có' }
  ]

  const [itemsPerPage, setItemsPerPage] = useState(5)

  const handlePerPageChange = (value) => {
    setItemsPerPage(value)
  }
  return (
    <Layout>
      <Content>
        <Filter />
        <List
          data={data}
          handlePerPageChange={handlePerPageChange}
          itemsPerPage={itemsPerPage}
        />
      </Content>
    </Layout>
  )
}
