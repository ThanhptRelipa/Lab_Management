import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, DatePicker, Button, Modal, Form, Input } from 'antd'
import 'antd/dist/antd.css'
import style from './registerLateEarly.module.css'
import moment from 'moment'
import { LateEarlyActions } from '../../../redux/lateEarly'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { timeSheetRedux } from '../../../redux/timesheet'

const initial_in_office = moment.duration(`09:00:00`).asSeconds()

const RegisterLateEarly = ({
  dataLateEarly = {},
  onCancel,
  onOk,
  isUser = false,
  isManager = false,
  isAdmin = false
}) => {
  const { date, checkin, checkout, late, early } = dataLateEarly
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const request = useSelector((state) =>state.lateEarly.dataRequest)
  const getDate = useSelector((state) => state.lateEarly.dataDateCoverUp)

  const in_office_seconds = moment.duration(getDate?.in_office).asSeconds()
  const timeLateSeconds = moment.duration(late).asSeconds()
  const timeEarlySeconds = moment.duration(early).asSeconds()
  const timeRequestSeconds = timeLateSeconds + timeEarlySeconds
  const timeRequest = moment.utc(timeRequestSeconds * 1000).format('HH:mm')
  const overtimeSeconds = in_office_seconds - initial_in_office

  const [dateCoverUp, setDateCoverUp] = useState('')
  const [reason, setReason] = useState('test')
  const [comment, setComment] = useState('')
  const [overTime, setOverTime] = useState('')
  const [nameUserConfirm] = useState('Vu Van Vinh')
  const [nameUserApproved] = useState('Trần Xuân Đức')
  const [dateConfirm] = useState('2022-02-20 12:04')
  const [nameStatus, setNameStatus] = useState()
  const {
    loadingRegisterLateEarly,
    loadingUpdateLateEarly,
    loadingDeleteLateEarly,
    loadingConfirmLateEarly,
    loadingApprovedLateEarly,
    loadingRejectLateEarly,

    successRegisterLateEarly,
    successUpdateLateEarly,
    successDeleteLateEarly,
    successConfirmLateEarly,
    successApprovedLateEarly,
    successRejectLateEarly,

    errorRegisterLateEarly,
    errorUpdateLateEarly,
    errorDeleteLateEarly,
    errorConfirmLateEarly,
    errorApprovedLateEarly,
    errorRejectLateEarly
  } = useSelector((state) => state.lateEarly)

  const dataRequest = {
    request_type: 4,
    request_for_date: date.split('|')[0],
    compensation_time: timeRequest,
    compensation_date: dateCoverUp,
    request_ot_time: '',
    reason: reason
  }

  useEffect(() => {
    if (overtimeSeconds > 0) {
      setOverTime(
        moment
          .utc(
            moment
              .duration(overtimeSeconds, 'seconds')
              .as('milliseconds')
          )
          .format('HH:mm')
      )
    } else {
      setOverTime('00:00')
    }
  }, [getDate])

  useEffect(() => {
    if (dataLateEarly.requests?.length) {
      for (const request of dataLateEarly.requests) {
        if (request.request_type === 4) {
          dispatch(LateEarlyActions.getRequest(request.id))
          break
        }
      }
    }
  }, [dataLateEarly])

  useEffect(() => {
    if (request?.status === 0) {
      setNameStatus('sent')
    }
    if (request?.status === 1) {
      setNameStatus('confirm')
    }
    if (request?.status === 2) {
      setNameStatus('approved')
    }
    if (request?.status === -1) {
      setNameStatus('reject')
    }
    setReason(request?.reason)
    form.setFieldsValue({ reason: request?.reason, dateCoverUp: moment(request?.compensation_date) })
  }, [request])

  useEffect(() => {
    if (successRegisterLateEarly === true) {
      toast('successRegisterLateEarly')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successUpdateLateEarly === true) {
      toast('successUpdateLateEarly')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successConfirmLateEarly === true) {
      toast('Success Confirm LateEarly')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successDeleteLateEarly === true) {
      toast('Success DeleteLateEarly Request')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successApprovedLateEarly === true) {
      toast('Success Approved Request')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (successRejectLateEarly === true) {
      toast('Success Reject Request')
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorRegisterLateEarly !== '') {
      toast(errorRegisterLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorUpdateLateEarly !== '') {
      toast(errorUpdateLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorConfirmLateEarly !== '') {
      toast(errorConfirmLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorDeleteLateEarly !== '') {
      toast(errorDeleteLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorApprovedLateEarly !== '') {
      toast(errorApprovedLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
    if (errorRejectLateEarly !== '') {
      toast(errorRejectLateEarly)
      dispatch(LateEarlyActions.clearSuccess())
    }
  }, [
    successRegisterLateEarly,
    successUpdateLateEarly,
    successConfirmLateEarly,
    successDeleteLateEarly,
    successRejectLateEarly,

    errorRegisterLateEarly,
    errorUpdateLateEarly,
    errorConfirmLateEarly,
    errorApprovedLateEarly,
    errorDeleteLateEarly,
    errorRejectLateEarly
  ])

  const handleRegister = () => {
    if (reason !== '' && dateCoverUp !== 0) {
      dispatch(LateEarlyActions.registerLateEarly(dataRequest))
      setTimeout(() => {
        onOk()
      }, 3000)
    }
    dispatch(timeSheetRedux.reloadTable())
  }

  const handleUpdateLateEarly = () => {
    dispatch(LateEarlyActions.updateLateEarly(dataRequest, request.id))
    setTimeout(() => {
      onOk()
    }, 3000)
    dispatch(timeSheetRedux.reloadTable())
  }

  const handleDeleteLateEarly = () => {
    dispatch(LateEarlyActions.deleteLateEarly(request.id))
    setTimeout(() => {
      onOk()
    }, 3000)
    dispatch(timeSheetRedux.reloadTable())
  }

  const handleConfirmLateEarly = () => {
    const dataConfirm = {
      ...dataRequest,
      manager_confirmed_status: 1,
      manager_id: 1,
      manager_confirmed_comment: comment,
      manager_confirmed_at: moment().format('DD-MM-YY hh:mm')
    }
    dispatch(LateEarlyActions.confirm(dataConfirm, dataLateEarly.id))
  }

  const handleApprovedLateEarly = () => {
    const dataApproved = {
      ...dataRequest,
      admin_approved_status: 1,
      admin_id: 68,
      admin_approved_comment: comment,
      admin_approved_at: moment().format('DD-MM-YY hh:mm')
    }
    dispatch(LateEarlyActions.approved(dataApproved, dataLateEarly.id))
  }

  const handleCancel = () => {
    form.resetFields()
    onCancel()
    if (request.id) {
      setNameStatus()
      dispatch(LateEarlyActions.getCleanRequest(request.id))
    }
  }

  const disabledDate = (current) => {
    return current && current >= moment().startOf('day')
  }

  const handleChangeDateCoverUp = (e) => {
    setDateCoverUp(e.format('YYYY-MM-DD'))
    dispatch(LateEarlyActions.getDataDateCoverUp(e.format('YYYY-MM-DD')))
  }

  return (
    <div className={style.registerLateEarly}>
      <Form
        form={form}
      >
        {nameStatus !== undefined && !isUser && (
          <Row className={style.row_lineHeight}>
            <Col xs={10} sm={5}>
              Member:
            </Col>
            <Col sm={7}>Vu Van Vịnh</Col>
          </Row>
        )}
        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Registration date:
          </Col>
          <Col sm={7}>{moment().format('YYYY-MM-DD HH:mm')}</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Register for date:
          </Col>
          <Col sm={7}>{date.split('|')[0]}</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Check-in:
          </Col>
          <Col xs={14} sm={8}>
            {checkin}
          </Col>
          <Col xs={10} sm={2}>
            Check-out:
          </Col>
          <Col sm={7}>{checkout}</Col>
        </Row>

        <Row className={style.row_lineHeight}>
          <Col xs={10} sm={5}>
            Late time:
          </Col>
          <Col xs={14} sm={8}>
            <span style={{ color: 'red' }}>{late}</span>
          </Col>
          <Col xs={10} sm={2}>Early time:</Col>
          <Col xs={14} sm={7}>
            <span style={{ color: 'red' }}>{early}</span>
          </Col>
        </Row>

        <Row className={style.date_corer_up}>
          <Col xs={10} sm={5}>
            Date cover up: <span style={{ color: 'red' }}>(*)</span>
          </Col>
          <Col sm={8}>
            <Form.Item
              name='dateCoverUp'
              rules={[
                {
                  required: true,
                  message: 'Please input your date cover up!'
                }
              ]}
            >
              <DatePicker
                disabled={
                  ((nameStatus == 'confirm' || nameStatus == 'approved') &&
                    true) ||
                  (nameStatus !== undefined && (isManager || isAdmin) && true)
                }
                format='YYYY-MM-DD'
                disabledDate={disabledDate}
                onChange={handleChangeDateCoverUp}
              />
            </Form.Item>
          </Col>
          <Col xs={10} sm={2}>
            Overtime:
          </Col>
          <Col sm={4}>
            <b>{overTime}</b>
          </Col>
          <Col sm={3}>Time request:</Col>
          <Col sm={2}>
            <span
              style={{
                color: (overtimeSeconds < timeLateSeconds) ? 'red' : 'unset'
              }}>
              {timeRequest}
            </span>
          </Col>
        </Row>

        <Row className={style.reason}>
          <Col xs={10} sm={5}>
            Reason: <span style={{ color: 'red' }}>(*)</span>
          </Col>
          <Col xs={24} sm={19}>
            <Form.Item
              name='reason'
              rules={[
                {
                  required: true,
                  message: 'Please input your reason!'
                }
              ]}
            >
              <Input.TextArea
                disabled={
                  ((nameStatus == 'confirm' || nameStatus == 'approved') &&
                    true) ||
                  (nameStatus !== undefined && (isManager || isAdmin) && true)
                }
                style={{ height: '120px' }}
                onChange={(e) => setReason(e.target.value)}
                showCount
                maxLength={100}
              />
            </Form.Item>
          </Col>
        </Row>
        {nameStatus && !isAdmin && (
          <Row className={style.status}>
            <Col xs={10} sm={5}>
              Status:
            </Col>
            <Col xs={10} sm={5}>
              <span> {nameStatus}</span>
            </Col>
          </Row>
        )}
        {nameStatus && isAdmin && (
          <Row className={style.status}>
            <Col xs={10} sm={5}>
              {nameUserApproved}
            </Col>
            <Col xs={10} sm={5}>
              <span> Confirm | {dateConfirm}</span>
            </Col>
          </Row>
        )}
        {(nameStatus == 'confirm' || nameStatus == 'approved') && isUser && (
          <Row className={style.confirm}>
            <Col xs={10} sm={5}>
              {nameUserConfirm}:
            </Col>
            <Col xs={10} sm={5}>
              <span>Confirm</span>
            </Col>
          </Row>
        )}

        {nameStatus !== undefined && !isUser && (
          <Row className={style.comment}>
            <Col xs={10} sm={5}>
              Comment:
            </Col>
            <Col xs={24} sm={19}>
              <Form.Item
                name='comment'
                rules={[
                  {
                    required: true,
                    message: 'Please input your reason!'
                  }
                ]}
              >
                <Input.TextArea
                  disabled={
                    (nameStatus !== 'sent' && isManager && true) ||
                    (nameStatus === 'approved' && isAdmin)
                  }
                  style={{ height: '120px' }}
                  onChange={(e) => setComment(e.target.value)}
                  showCount
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <Row gutter={30} justify='center' className={style.row_button}>
          {!nameStatus && (
            <Col>
              <Button
                htmlType='submit'
                type='primary'
                onClick={handleRegister}
                loading={loadingRegisterLateEarly}
                disabled={(isAdmin || isManager) && true}
              >
                Register
              </Button>
            </Col>
          )}

          {nameStatus && isUser && (
            <Col>
              <Button
                disabled={(nameStatus === 'confirm' || nameStatus === 'approved') && true}
                htmlType='submit'
                type='primary'
                onClick={handleUpdateLateEarly}
                loading={loadingUpdateLateEarly}
              >
                Update
              </Button>
            </Col>
          )}

          {nameStatus && isUser && (
            <Col>
              <Button
                disabled={
                  (nameStatus === 'confirm' || nameStatus === 'approved') && true
                }
                htmlType='submit'
                type='danger'
                onClick={handleDeleteLateEarly}
                loading={loadingDeleteLateEarly}
              >
                Delete
              </Button>
            </Col>
          )}

          {nameStatus !== undefined && isManager && (
            <Col>
              <Button
                disabled={
                  (nameStatus === 'approved' || nameStatus === 'confirm') &&
                  isUser && true
                }
                htmlType='submit'
                type='primary'
                onClick={handleConfirmLateEarly}
                loading={loadingConfirmLateEarly}
              >
                Confirmed
              </Button>
            </Col>
          )}

          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button
                disabled={nameStatus === 'approved' && isManager && isUser && true}
                htmlType='submit'
                type='primary'
                onClick={handleApprovedLateEarly}
                loading={loadingApprovedLateEarly}
              >
                Approved
              </Button>
            </Col>
          )}
          {nameStatus !== undefined && isManager && (
            <Col>
              <Button
                disabled={(nameStatus === 'approved' || nameStatus === 'confirm') && isUser && true}
                htmlType='submit'
                type='danger'
                loading={loadingRejectLateEarly}
              >
                Reject
              </Button>
            </Col>
          )}
          {nameStatus === 'confirm' && isAdmin && (
            <Col>
              <Button
                htmlType='submit'
                type='danger'
                loading={loadingRejectLateEarly}
              >
                Reject
              </Button>
            </Col>
          )}
          <Col>
            <Button className={style.button_form} onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </div>
  )
}

export default RegisterLateEarly
