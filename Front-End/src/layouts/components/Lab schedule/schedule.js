import React from 'react'
import { Calendar, Col, Row } from 'antd'
import './labSchedule.css'
export default function Schedule() {
  return (
    <Row>
      <Col className='calendar' xl={22}>
        <Calendar
          fullscreen={false}
        />
      </Col>
    </Row>
  )
}
