import React from 'react'
import { Layout } from 'antd'
import FormRegistBorrow from './formRegistBorrow'

const { Content } = Layout

export default function RegisterBorrow() {
  return (
    <Layout>
      <Content>
        <FormRegistBorrow />
      </Content>
    </Layout>
  )
}
