import React, { useState } from 'react'
import { Col, Form, Row, Input, DatePicker, Button, Radio } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'

const { RangePicker } = DatePicker

const FormRegistBorrow = () => {
  // const
  const formatTime = 'YYYY-MM-DD HH:mm'
  // apiSelector
  const apiSelector = useSelector((state) => state.userInfo)
  console.log(apiSelector)
  // state
  const [valueRadio, setValueRadio] = useState(1)

  const onChangeRadio = (e) => {
    setValueRadio(e.target.value)
  }

  const onChange = (value, dateString) => {
    console.log('Formatted Selected Time: ', dateString)
  }

  const getDisabledTime = () => {
    const hours = []
    for (let i = 0; i < moment().hour(); i++) {
      hours.push(i)
    }
    return hours
  }

  const getDisabledMinutes = (selectedHour) => {
    const minutes = []
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i)
      }
    }
    return minutes
  }
  return (
    <>
      <Row className='form-create' xl={20}>
        <Form className='form' name='form' layout='vertical'>
          <Col className='form__row' xl={24}>
            <Form.Item
              className='form__row-input'
              name='code'
              label='Code'
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <p className='textCode'>123465498741321</p>
            </Form.Item>

            <Button type='primary' onClick={() => console.log('btn')}>
              Auto Fill
            </Button>
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
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { pattern: /^(?:\d*)$/, message: 'It is not a valid phone number' }
                ]}
              >
                <Input placeholder='Fill your phone...' />
              </Form.Item>
            </Col>
            <Col xl={10} style={{ marginLeft: 20 }}>
              <Form.Item
                className='form__row-input'
                name='office'
                label='Office'
                rules={[{ required: true, message: 'Please input your code!' }]}
              >
                <Radio.Group onChange={onChangeRadio} value={valueRadio}>
                  <Radio value={1}>Student</Radio>
                  <Radio value={2}>Teacher</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Col>
          <Col className='form__row' xl={24}>
            <Col xl={10}>
              <Form.Item
                className='form__row-input'
                name='dayStart'
                label='Day Start'
                rules={[{ required: true, message: 'Please choose the date!' }]}
              >
                <RangePicker
                  showTime={{
                    format: 'HH:mm'
                  }}
                  defaultValue={moment()}
                  format={formatTime}
                  onChange={onChange}
                  disabledDate={(current) => {
                    return moment().add(-1, 'days') >= current || moment().add(1, 'month') <= current
                  }}
                  disabledHours={() => getDisabledTime()}
                  disabledMinutes={(selectedHour) => getDisabledMinutes(selectedHour)}
                />
              </Form.Item>
            </Col>
            <Col xl={10}>
              <Form.Item
                className='form__row-input'
                name='email'
                label='Email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'It is not a valid email' }
                ]}
              >
                <Input placeholder='Fill your email...' />
              </Form.Item>
            </Col>
          </Col>
        </Form>
      </Row>
    </>
  )
}

export default FormRegistBorrow
