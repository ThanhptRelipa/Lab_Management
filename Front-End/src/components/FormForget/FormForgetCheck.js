import React, { useEffect, useState } from 'react'
import { Checkbox, Form, TimePicker, Button, Row, Col } from 'antd'
import moment from 'moment'
import style from '../modalCss/forget.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { ForgetCheckAction } from '../../redux/forgetCheck'
import { timeSheetRedux } from '../../redux/timesheet'

const FormForgetCheck = ({ onCancel, dataModal }) => {
  const requestForget = dataModal.requests.find((id) => {
    return id.request_type === 1
  })
  const [form] = Form.useForm()
  const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
  const disabledTimePM = [20, 21, 22, 23]
  const initialCheckIn = dataModal.checkin
  const initialCheckOut = dataModal.checkout
  const [status, setStatus] = useState(requestForget?.status)
  const [disableButton, setDisableButton] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const [nameStatus, setNameStatus] = useState('')
  const [nameComment, setNameComment] = useState('')
  const [disabledTimeCheckIn, setDisableTimeCheckIn] = useState([...disabledTimeAM, ...disabledTimePM])
  const dispatch = useDispatch()
  const checkSuccess = useSelector((state) => state.forgetCheck.success)
  const dataBase = useSelector((state) => state.forgetCheck.forgetcheck)
  const user = useSelector((state) => state.infoUser.infoUser)

  useEffect(() => {
    if (requestForget) {
      dispatch(ForgetCheckAction.fetchForgetCheck(requestForget.id))
      setIsRequest(false)
    } else {
      setIsRequest(true)
    }
  }, [dataModal])

  const onFinish = (values) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      checkSuccess
    }, 2000)
    if (!requestForget) {
      setStatus(0)
      dispatch(
        ForgetCheckAction.registerForgetCheck({
          request_type: 1,
          request_for_date: dataModal.date.slice(0, 10),
          error_count: +!values.RSpecialReason,
          create_at: moment().format('YYYY-MM-DD HH:mm:ss'),
          check_in: values.RCheckIn.format('HH:mm'),
          check_out: values.RCheckOut.format('HH:mm'),
          reason: values.RReason
        })
      )
      dispatch(timeSheetRedux.reloadTable())
    } else {
      const dataUpdate = {
        ...dataBase.data,
        error_count: +!values.SpecialReason,
        check_in: values.CheckIn.format('HH:mm'),
        check_out: values.CheckOut.format('HH:mm'),
        reason: values.Reason
      }
      dispatch(ForgetCheckAction.updateForgetCheck(requestForget.id, dataUpdate))
      dispatch(timeSheetRedux.reloadTable())
    }
  }

  const onFinishFailed = () => {}

  const onCheckin = (time) => {
    const disabledTimeCheckOut = []
    if (time) {
      disabledTimeCheckOut.pop()
    } else {
      for (let i = moment(time).hour(); i > 0; i--) {
        disabledTimeCheckOut.push(i)
      }
      setDisableTimeCheckIn([...disabledTimeCheckIn, ...disabledTimeCheckOut])
    }
  }

  const onCheckout = (time) => {}

  const onReset = () => {
    form.resetFields()
  }

  useEffect(() => {
    if (status === 0) {
      setNameStatus('Sent')
      setDisableButton(false)
    } else if (status === 1) {
      setNameStatus('Confimred')
      setNameComment(dataBase?.data?.manager_confirmed_comment)
      setIsHidden(true)
      setDisableButton(true)
    } else if (status === 2) {
      setNameStatus('Approved')
      setNameComment(dataBase?.data?.admin_approved_comment || 'Approved')
      setIsHidden(true)
      setDisableButton(true)
    } else {
      setNameStatus('Reject')
      setNameComment(dataBase?.data?.admin_approved_comment)
      setIsHidden(true)
      setDisableButton(true)
    }
  }, [dataBase, status])

  useEffect(() => {
    form.setFieldsValue({
      CheckIn: moment(dataBase?.data?.check_in),
      CheckOut: moment(dataBase?.data?.check_out),
      Reason: dataBase?.data?.reason,
      Comment: 'name'
    })
  }, [dataBase])

  return (
    <>
      <div>
        {isRequest ? (
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
                  <span>{dataModal.date}</span>
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
                  name='RCheckIn'
                  className='m-0'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the time'
                    }
                  ]}
                >
                  <TimePicker disabledTime={() => disabledTimeCheckIn} format='HH:mm' onChange={onCheckin} />
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
                  name='RCheckOut'
                  className={style.m_0}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the time'
                    }
                  ]}
                >
                  <TimePicker disabledTime={() => disabledTimeCheckIn} format='HH:mm' onChange={onCheckout} />
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
                <Form.Item name='RSpecialReason' className={style.m_0}>
                  <Checkbox.Group>
                    <Checkbox value={'Check not counted as error'}>Check not counted as error</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row className={style.row}>
              <Col span={5}>
                <label>Reason</label>
              </Col>
              <Col span={19}>
                <Form.Item name='RReason' className={style.m_0}>
                  <textarea rows={6} cols={65} style={{ padding: '5px 10px', border: '1px solid #d9d9d9' }} />
                </Form.Item>
              </Col>
            </Row>
            {checkSuccess && (
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
            )}
            <div className={style.wrapper_button_form}>
              <Button loading={isLoading} type='primary' htmlType='submit' className={style.button_form}>
                Register
              </Button>
              <Button onClick={() => onCancel()}>Cancel</Button>
            </div>
          </Form>
        ) : (
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
                  <span>{dataModal.date}</span>
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
                  name='CheckIn'
                  className='m-0'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the time'
                    }
                  ]}
                >
                  <TimePicker
                    disabledTime={() => disabledTimeCheckIn}
                    format='HH:mm'
                    onChange={onCheckin}
                    disabled={disableButton}
                  />
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
                  name='CheckOut'
                  className={style.m_0}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the time'
                    }
                  ]}
                >
                  <TimePicker
                    disabledTime={() => disabledTimeCheckIn}
                    format='HH:mm'
                    onChange={onCheckout}
                    disabled={disableButton}
                  />
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
                {!dataBase?.data?.error_count ? (
                  <Form.Item name='SpecialReason' className={style.m_0}>
                    <Checkbox disabled={disableButton} defaultChecked value={'Check not counted as error'}>
                      Check not counted as error
                    </Checkbox>
                  </Form.Item>
                ) : (
                  <Form.Item name='SpecialReason' className={style.m_0}>
                    <Checkbox disabled = {disableButton} value={'Check not counted as error'}>Check not counted as error</Checkbox>
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Row className={style.row}>
              <Col span={5}>
                <label>Reason</label>
              </Col>
              <Col span={19}>
                <Form.Item name='Reason' className={style.m_0}>
                  <textarea
                    disabled={disableButton}
                    rows={6}
                    cols={65}
                    style={{ padding: '5px 10px', border: '1px solid #d9d9d9' }}
                  />
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

            {isHidden && (
              <Row className={style.row}>
                <Col span={5}>
                  <label>{user.full_name}:</label>
                </Col>
                <Col span={19}>
                  <Form.Item name= 'Comment' className={style.m_0}>
                    <span>{nameComment}</span>
                  </Form.Item>
                </Col>
              </Row>
            )}

            <div className={style.wrapper_button_form}>
              <Button disabled={disableButton} htmlType='submit' className={style.button_form} type='primary'>
                Update
              </Button>
              <Button onClick={() => onReset()} disabled={disableButton} className={style.button_form} type='primary'>
                Delete
              </Button>
              <Button onClick={() => onCancel()}>Cancel</Button>
            </div>
          </Form>
        )}
      </div>
    </>
  )
}

export default FormForgetCheck
