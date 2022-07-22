import React from 'react'
import { Col, Form, Input, Row, DatePicker, Checkbox, Button } from 'antd'
import './createSchedule.css'

export default function FormCreate(props) {
  const { data,
    handleChangeUserName,
    handleChangeUserCode,
    handleChangePhone,
    handleChangeEmail,
    handleChangeDayStart,
    handleChangeDayEnd,
    handleChangePurpose,
    handleChangeCheckShare,
    onAddMember,
    setStep
  } = props
  return (
    <>
      <Row>
        <Col className='form-create' xl={22}>
          <Form
            className='form'
            name='form'
            layout='vertical'
            onFinish={onAddMember}
          >
            <Col className='form__row' xl={24}>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='username'
                  label='User Name'
                  onChange={e => handleChangeUserName(e)}
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
                  onChange={e => handleChangeUserCode(e)}
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
                  onChange={e => handleChangePhone(e)}
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
                  onChange={e => handleChangeEmail(e)}
                  rules={[{ required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'It is not a valid email' }]}
                >
                  <Input placeholder='Fill your email...' />
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
                  <DatePicker showTime onChange={handleChangeDayStart} />
                </Form.Item>
              </Col>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='dayEnd'
                  label='Day End'
                  rules={[{ required: true, message: 'Please choose the date!' }]}
                >
                  <DatePicker showTime onChange={handleChangeDayEnd} />
                </Form.Item>
              </Col>
            </Col>
            <Col className='form__row'>
              <Col xl={24}>
                <Form.Item
                  className='form__row-input'
                  name='purpose'
                  label='Purpose'
                  rules={[{ required: true, message: 'Please fill your reason!' }]}
                >
                  <Input.TextArea rows={4} placeholder='Fill your purpose...' />
                </Form.Item>
              </Col>
            </Col>
            <Col className='form__row' xl={24}>
              <Col xl={24}>
                <Form.Item>
                  <Checkbox>Share the lab</Checkbox>
                </Form.Item>
              </Col>
            </Col>
            <Col className='form__button-single' xl={24}>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={()=> setStep(1)}
                >
                                    Next
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  )
}
