import React from 'react'
import { Calendar, Layout } from 'antd'
import ListSchedule from './listSchedule'
import Schedule from './schedule'

const { Content } = Layout

export default function LabSchedule() {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
  }

  return (
    <Layout>
      <Content>
        <Schedule />
        <ListSchedule />
      </Content>
    </Layout>
  )
}
