import React, { useEffect, useState } from 'react'
import style from './FormLeave.module.css'
import moment from 'moment'
import { TimePicker, Checkbox, Radio, Input, Button, Form, Row, Col } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { leaveActions } from '../../redux/leave'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const { RangePicker } = TimePicker
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }]
}
const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
const disabledTimePM = [18, 19, 20, 21, 22, 23]

const FormConfirmLeave = ({ onCancel, dataModalRequest }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { infoUser } = useSelector((state) => state.infoUser)
  const [isMember, setIsMember] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isManager, setIsManager] = useState(false)
  const [status, setStatus] = useState(dataModalRequest?.status)
  const [nameStatus, setNameStatus] = useState()
  const {
    loadingConfirmLeave,
    loadingApprovedLeave,
    loadingRejectLeaveRequest,

    successConfirmLeave,
    successRejectLeaveRequest,
    successApprovedLeave
  } = useSelector((state) => state.leave)

  const dataForm = {
    request_type: dataModalRequest?.request_type,
    leave_all_day: dataModalRequest?.leave_all_day ? 1 : 0,
    leave_start: dataModalRequest?.leave_start,
    leave_end: dataModalRequest?.leave_end,
    leave_time: dataModalRequest?.leave_time,
    reason: dataModalRequest?.reason,
    member_id: infoUser?.id
  }

  const onFinish = (values) => {
    const dataConfirm = {
      ...dataForm,
      manager_confirmed_status: 1,
      manager_id: infoUser?.id,
      manager_confirmed_at: moment().format('DD-MM-YY hh:mm')
    }
    const dataApprove = {
      ...dataConfirm,
      admin_approved_status: 2,
      admin_id: infoUser?.id,
      admin_approved_at: moment().format('DD-MM-YY hh:mm')
    }

    if (status === 0 && isManager) {
      dispatch(leaveActions.confirm(dataConfirm, dataModalRequest?.id))
    }
    if (status === 1 && isAdmin) {
      dispatch(leaveActions.approved(dataApprove, dataModalRequest?.id))
    }
  }

  useEffect(() => {
    if (successConfirmLeave) {
      dispatch(leaveActions.getRequest(dataModalRequest?.id))
      setStatus(1)
      dispatch(leaveActions.clearSuccess())
    }
    if (successApprovedLeave) {
      dispatch(leaveActions.getRequest(dataModalRequest?.id))
      setStatus(2)
      dispatch(leaveActions.clearSuccess())
    }
    if (successRejectLeaveRequest) {
      setStatus(-1)
    }
  }, [successConfirmLeave, successRejectLeaveRequest, successApprovedLeave, successRejectLeaveRequest])

  useEffect(() => {
    const arrRoleId = []
    infoUser.roles.map((role) => {
      arrRoleId.push(role.id)
    })
    if (arrRoleId.includes(1) || arrRoleId.includes(2)) {
      setIsAdmin(true)
      setIsManager(true)
      return
    }
    if (arrRoleId.includes(3)) {
      setIsManager(true)
      return
    }
    if (arrRoleId.includes(4)) {
      setIsMember(true)
      return
    }
  }, [])

  useEffect(() => {
    if (status === 0) {
      setNameStatus('sent')
    }
    if (status === 1) {
      setNameStatus('confirm')
    }
    if (status === 2) {
      setNameStatus('approved')
    }
    if (status === -1) {
      setNameStatus('reject')
    }
  }, [status])

  const handleReject = () => {
    const dataReject = {
      ...dataForm,
      status: -1,
      manager_confirmed_status: 1,
      manager_id: infoUser?.id,
      manager_confirmed_at: moment().format('DD-MM-YY hh:mm'),
      admin_approved_status: 2,
      admin_id: infoUser?.id,
      admin_approved_at: moment().format('DD-MM-YY hh:mm')
    }
    dispatch(leaveActions.reject(dataReject, dataModalRequest?.id))
    setTimeout(() => {
      onCancel()
    }, 3000)
  }

  const rangerTime = (time) => {
    const totalSecondsStart = moment.duration(time[0].format('HH:mm')).asSeconds()
    const totalSecondsEnd = moment.duration(time[1].format('HH:mm')).asSeconds()
    setLeaveTime(totalSecondsEnd - totalSecondsStart)
  }

  return (
    <>
      <div className={style.wrapper_form}>
        <Form
          form={form}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete='off'
          initialValues={{
            leave_all_day: dataModalRequest?.leave_all_day !== 0,
            reason: dataModalRequest?.reason,
            Range: [moment(dataModalRequest?.leave_start, 'HH:mm'), moment(dataModalRequest?.leave_end, 'HH:mm')],
            manager_confirmed_comment: dataModalRequest?.manager_confirmed_comment,
            admin_approved_comment: dataModalRequest?.admin_approved_comment,
            request_type: dataModalRequest?.request_type
          }}
        >
          <Row gutter={[10, 10]}>
            {nameStatus !== undefined && !isMember && (
              <div style={{ display: 'flex', width: '100%' }}>
                <Col className={style.form_item} span={4}>
                  Member:
                </Col>
                <Col className={style.form_item} span={20}>
                  <span>{dataModalRequest?.member_full_name}</span>
                </Col>
              </div>
            )}
            <Col className={style.form_item} span={4}>
              Registration date:
            </Col>
            <Col className={style.form_item} span={18}>
              <span> {moment().format('DD-MM-YY hh:mm')}</span>
            </Col>

            <Col className={style.form_item} span={4}>
              Register for date:
            </Col>
            <Col className={style.form_item} span={20}>
              <span>{dataModalRequest?.request_for_date}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Check-in:
            </Col>
            <Col span={8} className={style.form_item}>
              <span> {dataModalRequest?.check_in}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Check-out:
            </Col>
            <Col span={8} className={style.form_item}>
              <span> {dataModalRequest?.check_out}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Work time:
            </Col>
            <Col span={8} className={style.form_item}>
              <span> {dataModalRequest?.leave_time}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Lack time:
            </Col>
            <Col span={8} className={style.form_item}>
              <span> {dataModalRequest?.leave_time}</span>
            </Col>

            <Col span={24} className={style.leaveAll}>
              <Form.Item className={style.wrapper_item_form} className={style.item_form} name='leave_all_day' noStyle>
                <Checkbox
                  defaultChecked={dataModalRequest?.leave_all_day !== 0}
                  disabled={
                    nameStatus == 'confirm' ||
                    nameStatus == 'approved' ||
                    (nameStatus !== undefined && (isAdmin || isAdmin))
                  }
                >
                  Leave all day
                </Checkbox>
              </Form.Item>
            </Col>

            <Col span={4} className={style.form_item}>
              Range:
            </Col>
            <Col span={8} className={style.form_item}>
              <Form.Item name='Range' {...rangeConfig}>
                <RangePicker
                  disabled={
                    nameStatus == 'confirm' ||
                    nameStatus == 'approved' ||
                    (status !== undefined && (isAdmin || isAdmin))
                  }
                  className={style.timeBox}
                  disabledHours={() => [...disabledTimeAM, ...disabledTimePM]}
                  onChange={rangerTime}
                  format='HH:mm'
                />
              </Form.Item>
            </Col>

            <Col span={4} className={style.form_item} className={style.timeBox}>
              <Form.Item name='request_type' rules={[{ required: true, message: 'Please pick an item!' }]}>
                <Radio.Group
                  disabled={
                    nameStatus == 'confirm' ||
                    nameStatus == 'approved' ||
                    (status !== undefined && (isAdmin || isManager))
                  }
                  className={style.wrapper_button_radio}
                >
                  <Radio value={2}>Paid</Radio>
                  <Radio value={3}>Unpaid</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={8} className={style.form_item}>
              Time count:
              <span
                style={{
                  color: dataModalRequest?.leave_time < moment.duration(`1:00:00`).asSeconds() ? 'red' : 'unset'
                }}
              >
                {moment
                  .utc(moment.duration(dataModalRequest?.leave_time, 'seconds').as('milliseconds'))
                  .format('HH:mm')}
              </span>
            </Col>

            <Col span={4} className={style.form_item}>
              Reason:
            </Col>
            <Col span={20} className={style.form_item}>
              <Form.Item
                className={style.item_form}
                name='reason'
                rules={[{ required: true, message: 'Please input Intro' }]}
              >
                <Input.TextArea
                  disabled={status === 1 || (status === 0 && !isMember)}
                  showCount
                  maxLength={100}
                  rows={4}
                />
              </Form.Item>
            </Col>
            {nameStatus && !isAdmin && (
              <div style={{ display: 'flex', width: '100%' }}>
                <Col className={style.form_item} span={4}>
                  Status:
                </Col>
                <Col className={style.form_item} span={20}>
                  <span> {nameStatus}</span>
                </Col>
              </div>
            )}
            {nameStatus == 'confirm' ||
              (nameStatus == 'approved' && (
                <div style={{ display: 'flex', width: '100%' }}>
                  <Col className={style.form_item} span={4}>
                    {infoUser?.full_name}:
                  </Col>
                  <Col className={style.form_item} span={20}>
                    <span>Confirm</span>
                  </Col>
                </div>
              ))}
            {nameStatus == 'approved' && isAdmin && (
              <div style={{ display: 'flex', width: '100%' }}>
                <Col className={style.form_item} span={4}>
                  {infoUser?.full_name}:
                </Col>
                <Col className={style.form_item} span={20}>
                  <span>Approved</span>
                </Col>
              </div>
            )}
            {isManager && (
              <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                <Col className={style.form_item} span={4}>
                  Comment Confirm:
                </Col>
                <Col className={style.form_item} span={20}>
                  <Form.Item
                    className={style.item_form}
                    name='manager_confirmed_comment'
                    rules={[{ required: true, message: 'Please input comment' }]}
                  >
                    <Input.TextArea
                      disabled={nameStatus !== 'sent' || (nameStatus === 'approved' && isAdmin)}
                      showCount
                      maxLength={100}
                      rows={4}
                    />
                  </Form.Item>
                </Col>
              </div>
            )}
            {nameStatus === 'confirm' && isAdmin && (
              <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
                <Col className={style.form_item} span={4}>
                  Comment Approved:
                </Col>
                <Col className={style.form_item} span={20}>
                  <Form.Item
                    className={style.item_form}
                    name='admin_approved_comment'
                    rules={[{ required: true, message: 'Please input comment' }]}
                  >
                    <Input.TextArea showCount maxLength={100} rows={4} />
                  </Form.Item>
                </Col>
              </div>
            )}
          </Row>

          <div className={style.wrapper_item_button_form}>
            {nameStatus === 'sent' ||
              (status === -1 && isManager && (
                <Button
                  loading={loadingConfirmLeave}
                  disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && isMember}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Confirmed
                </Button>
              ))}

            {status === 1 ||
              (status === -1 && isAdmin && (
                <Button
                  disabled={nameStatus === 'approved' && (isMember || isManager)}
                  loading={loadingApprovedLeave}
                  className={style.button_form}
                  htmlType='submit'
                  type='primary'
                >
                  Approved
                </Button>
              ))}
            {(nameStatus === 'sent' || nameStatus === 'confirm' || nameStatus === 'reject') && (isManager || isAdmin) && (
              <Button
                onClick={handleReject}
                loading={loadingRejectLeaveRequest}
                className={style.button_form}
                htmlType='submit'
                type='danger'
              >
                Reject
              </Button>
            )}

            <Button className={style.button_form} onClick={(e) => onCancel()}>
              Cancel
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    </>
  )
}

export default FormConfirmLeave
