import React from 'react'
import { Button, Col, Form, Row, Input, Tooltip } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import CustomizeTable from '../../../components/table/table'
import './createSchedule.css'
export default function AddMember(props) {
  const { displayFormAddMember, handleOpenFormAddMember, setStep } = props
  const headCells = [
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
    }
  ]
  return (
    <Row>
      <Col className='form-create' xl={20}>
        <Tooltip title='Add Member'>
          <Button type='primary' shape='circle' icon={<UserAddOutlined />} onClick={() => handleOpenFormAddMember()} />
        </Tooltip>
        {displayFormAddMember && (
          <Form className='form' name='form' layout='vertical'>
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
            <Col className='form-row' xl={24}>
              <Col xl={10}>
                <Form.Item
                  className='form__row-input'
                  name='phone'
                  label='phone'
                  rules={[
                    { required: true, message: 'Please input your phone number!' },
                    { pattern: /^(?:\d*)$/, message: 'It is not a valid phone number' }
                  ]}
                >
                  <Input placeholder='Fill your phone...' />
                </Form.Item>
              </Col>
              <Col xl={10}>
                <Form.Item className='form__row-input'>
                  <Button>Add</Button>
                </Form.Item>
              </Col>
            </Col>
          </Form>
        )}
        <CustomizeTable headCells={headCells} />
        <Col className='form__button-double'>
          <Button
            // htmlType="submit"
            onClick={() => setStep(0)}
          >
            prev
          </Button>
          <Button type='primary' htmlType='submit' onClick={() => setStep(2)}>
            Next
          </Button>
        </Col>
      </Col>
    </Row>
  )
}
