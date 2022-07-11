import React, { useEffect, useState } from 'react'
import { Checkbox, Form, TimePicker, Button, Row, Col } from 'antd'
import moment from 'moment'
import style from '../modalCss/forget.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestsActions } from '../../redux/requests'

const FormForgetView = ({ onCancel, dataModal, role }) => {
  const [form] = Form.useForm()
  const initialCheckIn = dataModal.checkin_original
  const initialCheckOut = dataModal.checkout_original
  const [status, setStatus] = useState(dataModal.status)
  const [nameStatus, setNameStatus] = useState('')
  const [nameComment, setNameComment] = useState('')
  const [nameButton, setNameButton] = useState('')
  const [disableButton, setDisableButton] = useState(false)

  const yourName = useSelector((state) => state.infoUser.infoUser)

  const dispatch = useDispatch()

  const onFinish = (values) => {
    if (dataModal.status === 0) {
      dispatch(requestsActions.putManagerRequests(dataModal.id, {
        ...dataModal,
        status: 1,
        manager_confirmed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        manager_confirmed_comment: values.comment,
        manager_confirmed_status: 1,
        manager_id: yourName.id,
        manager_full_name: yourName.full_name
      }))
    } else if (dataModal.status === 1) {
      dispatch(requestsActions.putAdminRequests(dataModal.id, {
        ...dataModal,
        status: 2,
        admin_approved_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        admin_approved_comment: values.comment,
        admin_approved_status: 1,
        admin_full_name: yourName.full_name,
        admin_id: yourName.id
      }))
    }
  }

  const onFinishFailed = () => {}

  useEffect(() => {
    if (status === 0) {
      setNameStatus('Sent')
      setNameComment('Confirmed')
      setNameButton('Confirm')
    } else if (status === 1) {
      setNameStatus('Confirmed')
      setNameButton('Approved')
      if (role === 'Manager') {
        setDisableButton(true)
        setNameComment('Confirmed')
      } else if (role === 'Admin') {
        setDisableButton(false)
        setNameComment('Approved')
      }
    } else if (status === 2) {
      setNameStatus('Approved')
    } else {
      setNameStatus('Reject')
    }
    form.setFieldsValue({
      check_in: moment(dataModal.check_in),
      check_out: moment(dataModal.check_out),
      reason: dataModal.reason,
      comment: nameComment
    })
  })

  return (
    <>
      <div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          form={form}
        >
          <Row className={style.row}>
            <Col span={5}>
              <span>Member: </span>
            </Col>
            <Col span={19}>
              <Form.Item name='RegistrationDate' className={style.m_0}>
                <span>{dataModal.member_full_name}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <span>Registration date</span>
            </Col>
            <Col span={19}>
              <Form.Item name='RegistrationDate' className={style.m_0}>
                <span>{moment().format('DD/MM/YYYY HH:mm')}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Register for date</label>
            </Col>
            <Col span={19}>
              <Form.Item name='RegisterForDate' className={style.m_0}>
                <span>{dataModal.request_for_date}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>
                Check-in: <span style={{ color: 'red' }}>(*)</span>
              </label>
            </Col>
            <Col span={6}>
              <Form.Item
                name='check_in'
                className='m-0'
                rules={[
                  {
                    required: true,
                    message: 'Please enter the time'
                  }
                ]}
              >
                <TimePicker disabled format= 'HH:mm'/>
              </Form.Item>
            </Col>
            <Col span={13}>
              <span>({initialCheckIn})</span>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>
                Check-out: <span style={{ color: 'red' }}>(*)</span>
              </label>
            </Col>
            <Col span={6}>
              <Form.Item
                name='check_out'
                className={style.m_0}
                rules={[
                  {
                    required: true,
                    message: 'Please enter the time'
                  }
                ]}
              >
                <TimePicker disabled format= 'HH:mm'/>
              </Form.Item>
            </Col>
            <Col span={13}>
              <span>({initialCheckOut})</span>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Special reason</label>
            </Col>
            <Col span={19}>
              {!dataModal.error_count ? (
                <Form.Item name='special_reason' className={style.m_0}>
                  <Checkbox disabled defaultChecked value={'Check not counted as error'}>
                    Check not counted as error
                  </Checkbox>
                </Form.Item>
              ) : (
                <Form.Item name='special_reason' className={style.m_0}>
                  <Checkbox disabled value={'Check not counted as error'}>
                    Check not counted as error
                  </Checkbox>
                </Form.Item>
              )}
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Reason</label>
            </Col>
            <Col span={19}>
              <Form.Item name='reason' className={style.m_0}>
                <textarea disabled rows={6} cols={65} style={{ padding: '5px 10px', border: '1px solid #d9d9d9' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Status: </label>
            </Col>
            <Col span={19}>
              <Form.Item className={style.m_0}>
                <span>{nameStatus}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row className={style.row}>
            <Col span={5}>
              <label>Comment:</label>
            </Col>
            <Col span={19}>
              <Form.Item name='comment' className={style.m_0}>
                <textarea disabled = {disableButton} rows={6} cols={65} style={{ padding: '5px 10px', border: '1px solid #d9d9d9' }} />
              </Form.Item>
            </Col>
          </Row>
          <div className={style.wrapper_button_form}>
            <Button disabled = {disableButton} htmlType='submit' className={style.button_form} type='primary'>
              {nameButton}
            </Button>
            <Button disabled = {disableButton} danger className={style.button_form} type='primary'>
              Reject
            </Button>
            <Button onClick={() => onCancel()}>Cancel</Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default FormForgetView
