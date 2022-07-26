import React, { useState } from 'react'
import { Col, Form, Input, Row, DatePicker, Checkbox, Button, Radio, Space } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import { stepIncrement } from '../../../redux/slices/StepSlice'
import './createSchedule.css'

const { TextArea } = Input

const { RangePicker } = DatePicker

const RoomRegisterForm = () => {
  // const
  const [form] = Form.useForm()
  const formatTime = 'YYYY-MM-DD HH:mm'
  const dispatch = useDispatch()

  const getDisabledTime = () => {
    const hours = [18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6]
    for (let i = 0; i < hours; i++) {
      hours.push(i)
    }
    return hours
  }

  // state
  const [valueOffice, setValueOffice] = useState(1)
  const [valueShare, setValueShare] = useState(false)
  const [dateRegister, setDateRegister] = useState([])
  const [step] = useState(0)

  // redux
  const { userData } = useSelector((state) => state.userInfo)

  // function
  const onFinish = (values) => {
    form.resetFields()
    dispatch(stepIncrement(step))
    // eslint-disable-next-line no-unused-vars
    const { registerTime, ...rest } = values
    const newData = {
      ...rest,
      startTime: dateRegister[0],
      endTime: dateRegister[1],
      shareLab: valueShare
    }
    console.log(newData)
  }

  const onReset = () => {
    form.resetFields()
  }

  const autoFillValue = () => {
    form.setFieldsValue({
      username: userData.lastName + ' ' + userData.firstName,
      usercode: userData.code,
      phone: `0${userData.phone}`,
      email: userData.email
    })
  }

  const onChangeRanger = (value, dateString) => {
    setDateRegister(dateString)
  }

  const onChangeOffice = (e) => {
    setValueOffice(e.target.value)
  }

  const onChangeShare = (e) => {
    console.log(e.target.checked)
    setValueShare(e.target.checked)
  }

  return (
    <>
      <Row className='form-create' xl={20}>
        <Form
          className='form'
          name='form'
          layout='vertical'
          form={form}
          onFinish={onFinish}
          initialValues={{ office: 1 }}
        >
          <Col className='form__row' xl={24}>
            <Form.Item
              className='form__row-input'
              name='code'
              label='Code'
              style={{ display: 'flex', flexDirection: 'row' }}
            >
              <p className='textCode'>123465498741321</p>
            </Form.Item>

            <div>
              <Space>
                <Checkbox checked={valueShare} onChange={onChangeShare}>
                  Share Lab
                </Checkbox>

                <Button type='primary' onClick={() => autoFillValue()}>
                  Autofill Your Information
                </Button>
              </Space>
            </div>
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
            <Col
              xl={10}
              style={{ marginLeft: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Form.Item
                className='form__row-input'
                name='office'
                label='Office'
                rules={[{ required: true, message: 'Please input your code!' }]}
              >
                <Radio.Group onChange={onChangeOffice} defaultValue={valueOffice}>
                  <Radio value={1}>Student</Radio>
                  <Radio value={2}>Teacher</Radio>
                </Radio.Group>
              </Form.Item>

              {valueOffice === 2 && (
                <Form.Item
                  className='form__row-input'
                  name='peopleAmout'
                  label='Amount'
                  rules={[{ required: true, message: 'Please input your amount!' }]}
                >
                  <Input />
                </Form.Item>
              )}
            </Col>
          </Col>
          <Col className='form__row' xl={24}>
            <Col xl={10}>
              <Form.Item
                className='form__row-input'
                name='registerTime'
                label='Register Time'
                rules={[{ required: true, message: 'Please choose the date!' }]}
              >
                <RangePicker
                  showTime={{
                    format: 'HH:mm'
                  }}
                  format={formatTime}
                  onCalendarChange={onChangeRanger}
                  disabledDate={(current) => {
                    return moment().subtract(0, 'days') > current
                  }}
                  disabledHours={() => getDisabledTime()}
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
          <Row className='form__row' xl={24}>
            <Col xl={24}>
              <Form.Item
                className='form__row-input'
                name='purpose'
                label='Purpose'
                rules={[{ required: true, message: 'Please choose the date!' }]}
              >
                <TextArea rows={4} placeholder='Fill your purpose......' />
              </Form.Item>
            </Col>
          </Row>
          <Row xl={24} className='row-btn'>
            <Button type='primary' htmlType='submit'>
              Submit Form
            </Button>
            <Button type='primary' className='btn-spacing-left' danger htmlType='button' onClick={onReset}>
              Reset Form
            </Button>
          </Row>
        </Form>
      </Row>
    </>
  )
}

export default RoomRegisterForm
