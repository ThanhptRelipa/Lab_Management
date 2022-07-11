import React, { memo, useEffect, useState } from 'react'
import style from './FormLeave.module.css'
import moment from 'moment'
import { TimePicker, Checkbox, Radio, Input, Button, Form, Row, Col } from 'antd'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { leaveActions } from '../../redux/leave'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { timeSheetRedux } from '../../redux/timesheet'

const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }]
}
const disabledTimeAM = [0, 1, 2, 3, 4, 5, 6, 7]
const disabledTimePM = [18, 19, 20, 21, 22, 23]

const FormRegisterLeave = ({ onCancel, dataModal, infoUser }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [leaveTime, setLeaveTime] = useState(0)
  const [status, setStatus] = useState()
  const [isRegister, setIsRegister] = useState(true)
  const [nameStatus, setNameStatus] = useState('')
  const [idLeave, setIdLeave] = useState('')
  const [leaveAll, setLeaveAll] = useState(false)
  const {
    successRegisterLeave,
    successUpdateLeave,
    successGetLeaveRequest,
    successDeleteLeave,
    loadingRegisterLeave,
    loadingUpdateLeave,
    loadingDeleteLeave,
    dataGetLeave,
    IdRequest
  } = useSelector((state) => state.leave)

  const onFinish = (values) => {
    const { leave_all_day, reason, request_type, Range } = values
    const dataForm = {
      request_type: request_type,
      request_for_date: moment().format('YYYY/MM/DD'),
      leave_all_day: leave_all_day ? 1 : 0,
      leave_start: moment(Range[0], 'seconds').format('HH:mm'),
      leave_end: moment(Range[1], 'seconds').format('HH:mm'),
      leave_time: moment.utc(moment.duration(leaveTime, 'seconds').as('milliseconds')).format('HH:mm'),
      member_id: infoUser?.id,
      request_for_date: dataModal?.date.split('|')[0],
      reason: reason
    }
    if (status === undefined && isRegister) {
      dispatch(leaveActions.register(dataForm))
    }
    if (nameStatus === 'sent') {
      dispatch(leaveActions.update(dataForm, idLeave))
    }
  }

  useEffect(() => {
    dataModal?.requests.map((request) => {
      if (request?.request_type === 2 || request?.request_type === 3) {
        setStatus(request?.status)
        setIdLeave(request?.id)
        setIsRegister(false)
      }
    })
  }, [])

  useEffect(() => {
    dispatch(leaveActions.getRequest(idLeave))
  }, [idLeave])

  useEffect(() => {
    if (dataGetLeave !== undefined) {
      form.setFieldsValue({
        leave_all_day: dataGetLeave?.leave_all_day !== 0,
        Range: dataGetLeave?.leave_start
          ? [moment(dataGetLeave?.leave_start, 'HH:mm'), moment(dataGetLeave?.leave_end, 'HH:mm')]
          : [],
        reason: dataGetLeave ? dataGetLeave.reason : '',
        request_type: dataGetLeave ? dataGetLeave.request_type : ''
      })
      setLeaveTime(dataGetLeave?.leave_time)
    }
  }, [successGetLeaveRequest])

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
    if (status === undefined) {
      setNameStatus('')
    }
  }, [status])

  useEffect(() => {
    if (successRegisterLeave) {
      toast('Register leave successfully')
      dispatch(leaveActions.getRequest(IdRequest))
      setIdLeave(IdRequest)
      dispatch(leaveActions.clearSuccess())
      dispatch(timeSheetRedux.reloadTable())
    }
    if (successGetLeaveRequest) {
      setStatus(dataGetLeave?.status)
      dispatch(leaveActions.clearSuccess())
    }
    if (successUpdateLeave) {
      toast('Update leave successfully')
      dispatch(leaveActions.getRequest(idLeave))
      dispatch(leaveActions.clearSuccess())
    }
    if (successDeleteLeave) {
      toast('Delete leave successfully')
      dispatch(leaveActions.clearSuccess())
    }
  }, [successRegisterLeave, successUpdateLeave, successGetLeaveRequest, successDeleteLeave])

  const handleDelete = () => {
    dispatch(leaveActions.delete(idLeave))
    setStatus()
    setLeaveTime(0)
    form.resetFields()
  }

  const rangerTime = (time) => {
    const totalSecondsStart = moment.duration(time[0].format('HH:mm')).asSeconds()
    const totalSecondsEnd = moment.duration(time[1].format('HH:mm')).asSeconds()
    setLeaveTime(totalSecondsEnd - totalSecondsStart)
  }

  const onChangeLeaveAll = (e) =>{
    setLeaveAll(e.target.checked)
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
        >
          <Row gutter={[10, 10]}>
            {nameStatus === 'sent' && (
              <div style={{ display: 'flex', width: '100%' }}>
                <Col className={style.form_item} span={4}>
                  Member:
                </Col>
                <Col className={style.form_item} span={20}>
                  <span>{dataGetLeave?.member_full_name}</span>
                </Col>
              </div>
            )}
            <Col className={style.form_item} span={4}>
              Registration date:
            </Col>
            <Col className={style.form_item} span={18}>
              <span>{dataModal?.date}</span>
            </Col>

            <Col className={style.form_item} span={4}>
              Register for date:
            </Col>
            <Col className={style.form_item} span={20}>
              <span>{moment().format('DD-MM-YYYY')}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Check-in:
            </Col>
            <Col span={8} className={style.form_item}>
              <span>{dataModal?.checkin}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Check-out:
            </Col>
            <Col span={8} className={style.form_item}>
              <span>{dataModal?.checkout}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Work time:
            </Col>
            <Col span={8} className={style.form_item}>
              <span>{dataModal?.Worktime}</span>
            </Col>

            <Col span={4} className={style.form_item}>
              Lack time:
            </Col>
            <Col span={8} className={style.form_item}>
              <span>{dataModal?.lack}</span>
            </Col>

            <Col span={24} className={style.leaveAll}>
              <Form.Item
                className={style.wrapper_item_form}
                className={style.item_form}
                name='leave_all_day'
                noStyle
              >
                <Checkbox onChange={onChangeLeaveAll} disabled={status !== undefined && status !== 0}>Leave all day</Checkbox>
              </Form.Item>
            </Col>

            <Col span={4} className={style.form_item}>
              Range:
            </Col>
            <Col span={8} className={style.form_item}>
              <Form.Item name='Range' {...rangeConfig}>
                <TimePicker.RangePicker
                  disabled={leaveAll || (status !== undefined && status !== 0)}
                  disabledHours={() => [...disabledTimeAM, ...disabledTimePM]}
                  className={style.timeBox}
                  onChange={rangerTime}
                  format='HH:mm'
                />
              </Form.Item>
            </Col>

            <Col span={4} className={style.form_item} className={style.timeBox}>
              <Form.Item name='request_type' rules={[{ required: true, message: 'Please pick an item!' }]}>
                <Radio.Group disabled={status !== undefined && status !== 0} className={style.wrapper_button_radio}>
                  <Radio value={2}>Paid</Radio>
                  <Radio value={3}>Unpaid</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col span={8} className={style.form_item}>
              Time count:
              <span
                style={{
                  color: leaveTime < moment.duration(`1:00:00`).asSeconds() ? 'red' : 'unset'
                }}
              >
                {moment.utc(moment.duration(leaveTime, 'seconds').as('milliseconds')).format('HH:mm')}
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
                <Input.TextArea disabled={status !== undefined && status !== 0} showCount maxLength={100} rows={4} />
              </Form.Item>
            </Col>
            {status !== undefined && (
              <div style={{ display: 'flex', width: '100%' }}>
                <Col className={style.form_item} span={4}>
                  Status:
                </Col>
                <Col className={style.form_item} span={20}>
                  <span> {nameStatus}</span>
                </Col>
              </div>
            )}
          </Row>

          <div className={style.wrapper_item_button_form}>
            {status === undefined && (
              <Button loading={loadingRegisterLeave} className={style.button_form} htmlType='submit' type='primary'>
                Register
              </Button>
            )}
            {status === 0 && (
              <Button loading={loadingUpdateLeave} className={style.button_form} htmlType='submit' type='primary'>
                Update
              </Button>
            )}
            {status === 0 && (
              <Button
                loading={loadingDeleteLeave}
                onClick={handleDelete}
                className={style.button_form}
                htmlType='submit'
                type='danger'
              >
                Delete
              </Button>
            )}
            <Button className={style.button_form} onClick={(e) => onCancel(window.location.reload())}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
      <ToastContainer />
    </>
  )
}

export default memo(FormRegisterLeave)
