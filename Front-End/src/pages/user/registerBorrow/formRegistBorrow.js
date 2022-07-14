import React from 'react'
import { Col, Form, Row, Input, DatePicker } from 'antd'

export default function FormRegistBorrow() {
  return (
    <>
      <Row>
        <Col className='form-create' xl={20}>
          <Form
            className='form'
            name='form'
            layout='vertical'
          >
            <Col className='form__row' xl={24}>
              <Form.Item
                className='form__row-input'
                name='code'
                label='Code'
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <p>123465498741321</p>
              </Form.Item>
            </Col>
            <Col className='form__row' xl={24}>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='username'
                  label='User Name'
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input placeholder='Fill your name...' />
                </Form.Item>
              </Col>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='usercode'
                  label='User Code'
                  rules={[{ required: true, message: 'Please input your code!' }]}
                >
                  <Input placeholder='Fill your code...' />
                </Form.Item>
              </Col>
            </Col>
            <Col className='form__row' xl={24}>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='phone'
                  label='Phone'
                  rules={[{ required: true, message: 'Please input your phone number!' },
                    { pattern: /^(?:\d*)$/, message: 'It is not a valid phone number' }]}
                >
                  <Input placeholder='Fill your phone...' />
                </Form.Item>
              </Col>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='email'
                  label='Email'
                  rules={[{ required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'It is not a valid email' }]}
                >
                  <Input placeholder='Fill your email...' />
                </Form.Item>
              </Col>
            </Col>
            <Col className='form__row'>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='dayStart'
                  label='Day Start'
                  rules={[{ required: true, message: 'Please choose the date!' }]}
                >
                  <DatePicker showTime />
                </Form.Item>
              </Col>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='dayEnd'
                  label='Day End'
                  rules={[{ required: true, message: 'Please choose the date!' }]}
                >
                  <DatePicker showTime />
                </Form.Item>
              </Col>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  )
}
