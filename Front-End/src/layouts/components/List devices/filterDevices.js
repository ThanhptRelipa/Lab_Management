import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import './list.css'

const { Option } = Select
export default function Filter() {
  // const [filter, setFilter] = useState({
  //   equitmentName: '',
  //   equitmentCode: ''
  // })

  // const handleReset = () => {
  //   setFilter({
  //     equitmentName: '',
  //     equitmentCode: ''
  //   })
  // }
  return (
    <Row>
      <Col className='filter' xl={22}>
        <Col className='filter__wrapper' xl={24}>
          <Form className='filter__wrapper-option'>
            <Form.Item className='filter__wrapper-option-field' label='Name Equitment'>
              <Input placeholder='string for search' />
            </Form.Item>
          </Form>
          <Form className='filter__wrapper-option'>
            <Form.Item className='filter__wrapper-option-field' label='Code Equitment'>
              <Input placeholder='string for search' />
            </Form.Item>
          </Form>
        </Col>
        <Col className='filter__wrapper' xl={24}>
          <Form className='filter__wrapper-option'>
            <Form.Item className='filter__wrapper-option-field' label='Type Equitment'>
              <Select defaultValue='1'>
                <Option value='1'>android</Option>
                <Option value='2'>IOS</Option>
                <Option value='3'>MAC</Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
        <Col className='filter__button' xl={24}>
          <Button className='filter__button-btn'>Search</Button>
          <Button className='filter__button-btn'>Reset</Button>
        </Col>
      </Col>
    </Row>
  )
}
