import React from 'react'
import moment from 'moment'
import { Row, Col, Radio, Space, Select, DatePicker, Button, Table, Pagination, Modal } from 'antd'
import { useState, useEffect } from 'react'
import styles from './request.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { requestsActions } from './../../redux/requests'
import { useHistory } from 'react-router-dom'
import FormConfirmLeave from '../../components/FormLeave/FormConfirmLeave'
import ConfirmLateEarly from '../../layouts/components/confirmRegisterLateEarly'
import ConfirmOT from '../../layouts/components/registerOT/ConfirmOT'
import { leaveActions } from '../../redux/leave'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { OTActions } from '../../redux/registerOT'
import FormForgetView from '../../components/FormForget/FormForgetView'

const RequestsPage = () => {
  const history = useHistory()
  const [dataModal, setDataModal] = useState()
  const { Option } = Select
  const { RangePicker } = DatePicker
  const [dates, setDates] = useState([])
  const [selectDisabled, setSelectDisable] = useState(false)
  const [rangePickerDisabled, setRangePickerDisable] = useState(true)
  const [params, setParams] = useState({ page: 1, per_page: 5 })
  const [visibleForgetCheck, setVisibleForgetCheck] = useState(false)
  const [visiblePaiLeave, setVisiblePaiLeave] = useState(false)
  const [visibleUnPaiLeave, setVisibleUnPaiLeave] = useState(false)
  const [visibleLateEarly, setVisibleLateEarly] = useState(false)
  const [visibleOT, setVisibleOT] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const valuecheckbox = ['this month', 'last month']
  const valueStatus = ['Sent', 'Confirmed', 'Approved']
  const valuePerPage = [30, 50, 100]
  const dispatch = useDispatch()
  const { requests, loadingRequests } = useSelector((state) => state.requests)
  const { infoUser, successGetInfo } = useSelector((state) => state.infoUser)
  const [valueCheckboxMonth, setValueCheckboxMonth] = useState(1)
  const [selectType, setSelectType] = useState(1)
  const [valueSort, setValueSort] = useState('asc')
  const [valueSearchStatus, setValueSearchStatus] = useState(0)
  const [nameRole, setNameRole] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { successConfirmLeave, successApprovedLeave, successRejectLeaveRequest } = useSelector((state) => state.leave)
  const { successApprovedOT, successConfirmOT } = useSelector((state) => state.OT)

  useEffect(() => {
    if (successConfirmLeave) {
      toast('Success Confirm Leave')
      dispatch(leaveActions.clearSuccess())
    }
    if (successApprovedLeave) {
      toast('Success Approved Leave')
      dispatch(leaveActions.clearSuccess())
    }
    if (successRejectLeaveRequest) {
      toast('Success Reject Leave')
      dispatch(leaveActions.clearSuccess())
    }
  }, [successConfirmLeave, successApprovedLeave, successRejectLeaveRequest])

  useEffect(() => {
    if (successConfirmOT) {
      toast('Success Confirm')
      dispatch(OTActions.clearSuccess())
    }
    if (successApprovedOT) {
      toast('Success Approved')
      dispatch(OTActions.clearSuccess())
    }
  }, [successApprovedOT, successConfirmOT])

  useEffect(() => {
    if (successConfirmOT) {
      toast('Success Confirm')
      dispatch(OTActions.clearSuccess())
    }
    if (successApprovedOT) {
      toast('Success Approved')
      dispatch(OTActions.clearSuccess())
    }
  }, [successApprovedOT, successConfirmOT])

  useEffect(() => {
    if (successGetInfo) {
      if (infoUser?.roles?.find((u) => ['Member'].includes(u.title)) && infoUser?.roles?.length === 1) {
        history.push('/')
      }
      const arrRoleId = []
      infoUser.roles.map((role) => {
        arrRoleId.push(role.id)
      })
      if (arrRoleId.includes(1) || arrRoleId.includes(2)) {
        setNameRole('Admin')
        dispatch(
          requestsActions.getAdminRequests(
            params,
            valueSort,
            valueSearchStatus,
            selectType,
            valueCheckboxMonth,
            startDate,
            endDate
          )
        )
        return
      }
      if (arrRoleId.includes(3)) {
        setNameRole('Manager')
        dispatch(
          requestsActions.getManagerRequests(
            params,
            valueSort,
            valueSearchStatus,
            selectType,
            valueCheckboxMonth,
            startDate,
            endDate
          )
        )
        return
      }
    }
  }, [successGetInfo])

  useEffect(() => {
    if (nameRole === 'Admin') {
      dispatch(
        requestsActions.getAdminRequests(
          params,
          valueSort,
          valueSearchStatus,
          selectType,
          valueCheckboxMonth,
          startDate,
          endDate
        )
      )
    }
    if (nameRole === 'Manager') {
      dispatch(
        requestsActions.getManagerRequests(
          params,
          valueSort,
          valueSearchStatus,
          selectType,
          valueCheckboxMonth,
          startDate,
          endDate
        )
      )
    }
  }, [params])

  const onCheckboxChange = (e) => {
    if (e.target.value === 1) {
      setSelectType(e.target.value)
      setSelectDisable(!selectDisabled)
      setRangePickerDisable(true)
    } else {
      setSelectType(e.target.value)
      setRangePickerDisable(!rangePickerDisabled)
      setSelectDisable(true)
    }
  }

  const handleChange = (value) => {
    setValueCheckboxMonth(value)
  }
  const handleSortChange = (value) => {
    setValueSort(value)
  }

  const handleChangeSearchStatus = (value) => {
    setValueSearchStatus(value)
  }

  const handleChangePerPage = (value) => {
    setParams({
      ...params,
      per_page: value
    })
  }

  const onChangePage = (e) => {
    setParams({
      ...params,
      page: e
    })
  }

  const onDateChange = (date, dateString) => {
    setStartDate(dateString[0])
    setEndDate(dateString[1])
  }

  const handleReset = () => {
    if (nameRole === 'Admin') {
      dispatch(requestsActions.getAdminRequests({ page: 1, per_page: 5 }, 'asc', 0, 1, 1))
    } else {
      dispatch(requestsActions.getManagerRequests({ page: 1, per_page: 5 }, 'asc', 0, 1, 1))
    }
  }

  const handleSearch = () => {
    setParams({
      ...params,
      page: 1
    })
    if (nameRole === 'Admin') {
      dispatch(
        requestsActions.getAdminRequests(
          params,
          valueSort,
          valueSearchStatus,
          selectType,
          valueCheckboxMonth,
          startDate,
          endDate
        )
      )
    } else {
      dispatch(
        requestsActions.getManagerRequests(
          params,
          valueSort,
          valueSearchStatus,
          selectType,
          valueCheckboxMonth,
          startDate,
          endDate
        )
      )
    }
  }

  const onActionClick = (record) => {
    if (record?.request_type === 1) {
      if (record.status === 0) {
        const managerData = {
          ...record,
          status: 1,
          manager_confirmed_comment: 'Confirmed',
          manager_confirmed_status: 1
        }
        dispatch(requestsActions.putManagerRequests(record.id, managerData))
      } else if (record.status === 1) {
        const adminData = {
          ...record,
          status: 2,
          admin_approved_comment: 'Approved',
          admin_approved_status: 1
        }
        dispatch(requestsActions.putAdminRequests(record.id, adminData))
      }
    }
    if (record?.request_type === 2 || record?.request_type === 3) {
      if (record.status === 0) {
        const managerData = {
          request_type: record?.request_type,
          leave_all_day: record?.leave_all_day,
          leave_start: record?.leave_start,
          leave_end: record?.leave_end,
          leave_time: record?.leave_time,
          reason: record?.reason,
          status: 1,
          member_id: record?.member_id,
          manager_confirmed_comment: 'Confirmed',
          manager_confirmed_status: 1
        }
        dispatch(leaveActions.confirm(managerData, record.id))
      } else if (record.status === 1) {
        const adminData = {
          status: 2,
          admin_approved_comment: 'Approved',
          admin_approved_status: 2
        }
        dispatch(leaveActions.approved(adminData, record.id))
      }
    }
    if (record?.request_type === 4 || record?.request_type === 5) {
      if (nameRole === 'Manager') {
        const managerDataRequest = {
          ...record,
          request_for_date: record.date?.split('|')[0],
          status: 1,
          manager_confirmed_comment: 'Confirmed',
          manager_confirmed_status: 1
        }
        dispatch(OTActions.confirm(managerDataRequest, record.id))
      }
      if (nameRole === 'Admin') {
        const adminDataRequest = {
          ...record,
          request_for_date: record.date?.split('|')[0],
          status: 2,
          admin_approved_comment: 'Approved',
          admin_approved_status: 1
        }
        dispatch(OTActions.approved(adminDataRequest, record.id))
      }
    }
  }

  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return false
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 90
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 90
    return tooEarly || tooLate
  }
  const onActionView = (record) => {
    setDataModal(record)
    switch (record.request_type) {
      case 1:
        return setVisibleForgetCheck(true)
      case 2:
        return setVisiblePaiLeave(true)
      case 3:
        return setVisibleUnPaiLeave(true)
      case 4:
        return setVisibleLateEarly(true)
      case 5:
        return setVisibleOT(true)
    }
  }

  const columns = [
    {
      title: 'No',
      key: 'id',
      render: (text, record, index) => index + 1,
      width: '5%'
    },
    {
      title: 'Member',
      dataIndex: 'member_full_name',
      key: 'member_full_name',
      align: 'left',
      width: '10%'
    },
    {
      title: 'Date',
      dataIndex: 'requests_for_date',
      key: 'requests_for_date',
      align: 'center',
      width: '11%',
      render: (record) => {
        return <Space>{moment(record).format('YYYY/MM/DD | ddd')}</Space>
      }
    },
    {
      title: 'Request type',
      dataIndex: 'request_type',
      key: 'request_type',
      width: '8%',
      align: 'center',
      render: (record) => {
        let requests = ''
        if (record === 1) requests = 'Forget check-in/out'
        if (record === 2) requests = 'Paid leave'
        if (record === 3) requests = 'Unpaid leave'
        if (record === 4) requests = 'Late/early'
        if (record === 5) requests = 'OT'
        return <Space>{requests}</Space>
      }
    },
    {
      title: 'OT',
      key: 'request_ot_time, requests_type',
      align: 'center',
      width: '5%',
      render: (record) => {
        return <Space>{record.request_type === 5 ? `${record.request_ot_time}` : ''}</Space>
      }
    },
    {
      title: 'Lack',
      key: 'compensation_time',
      align: 'center',
      width: '6%'
    },
    {
      title: 'Comp',
      key: 'compensation_time',
      align: 'center',
      width: '8%',
      render: (record) => {
        return (
          <Space>
            {record.request_type === 4
              ? `${record.compensation_time} ${moment(record.compensation_date).format('YYYY/MM/DD')}`
              : ''}
          </Space>
        )
      }
    },
    {
      title: 'Pleave',
      key: ', requests_type',
      align: 'center',
      width: '7%',
      render: (record) => {
        return <Space>{record.request_type === 2 ? '8:00' : ''}</Space>
      }
    },
    {
      title: 'Uleave',
      key: ' requests_type',
      align: 'center',
      width: '7%',
      render: (record) => {
        return <Space>{record.request_type === 3 ? '8:00' : ''}</Space>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '8%',
      render: (record) => {
        let status = ''
        if (record === -1) status = 'Reject'
        if (record === 0) status = 'Sent'
        if (record === 1) status = 'Confirmed'
        if (record === 2) status = 'Approved'
        return <Space>{status}</Space>
      }
    },
    {
      title: 'Request date',
      dataIndex: 'request_for_date',
      key: 'request_for_date',
      align: 'center',
      width: '9%'
    },
    {
      title: 'Action',
      align: 'center',
      render: (text, record, index) => {
        let status = ''
        if (record.status === 0) {
          status = 'Confirmed'
        }
        if (record.status === 1) {
          status = 'Approved'
          if (nameRole === 'Manager') {
            setDisabled(true)
          } else if (nameRole === 'Admin') {
            setDisabled(false)
          }
        }
        return (
          <>
            {status === '' ? (
              ''
            ) : (
              <Space>
                <Button disabled = {disabled} type='primary' onClick={() => onActionClick(record)}>
                  {status}
                </Button>
                <Button onClick={() => onActionView(record)}>View</Button>
              </Space>
            )}
          </>
        )
      }
    }
  ]
  return (
    <div>
      <Row>
        <Col span={24}>
          <div className={styles['content1']}>
            <Row justify='space-around' align='middle'>
              <Col span={22}>
                <div className={styles['content1-header']}>
                  <div className={styles['content1-header-title']}>Requests</div>
                  <Row justify='space-around'>
                    <Col className={styles['cow-content']}>
                      <Radio.Group onChange={onCheckboxChange} defaultValue={selectType}>
                        <Space direction='vertical' size={30}>
                          <Row justify='space-around' align='middle'>
                            <Col span={24}>
                              <Radio value={1} checked={true}>
                                Choose from list
                              </Radio>
                              <Select
                                style={{ width: 150 }}
                                disabled={selectDisabled}
                                onChange={handleChange}
                                defaultValue={valuecheckbox}
                              >
                                {valuecheckbox.map((item, index) => (
                                  <Option key={index} value={index + 1}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            </Col>
                          </Row>
                          <Row justify='space-around' align='middle'>
                            <Col>
                              <Radio value={2}>Choose start,end</Radio>
                              <RangePicker
                                disabled={rangePickerDisabled}
                                disabledDate={disabledDate}
                                onCalendarChange={(val) => setDates(val)}
                                ranges={{
                                  Today: [moment(), moment()],
                                  'This Month': [moment().startOf('month'), moment().endOf('month')]
                                }}
                                onChange={onDateChange}
                              />
                            </Col>
                          </Row>
                        </Space>
                      </Radio.Group>
                    </Col>
                    <Col className={styles['cow-content']}>
                      <Space direction='vertical' size={30}>
                        <Row justify='space-around' align='middle'>
                          <Col span={12}>Sort by requests date</Col>
                          <Col span={12}>
                            <Select style={{ width: 150 }} onChange={handleSortChange} defaultValue={valueSort}>
                              <Option value={'asc'}>Asecending</Option>
                              <Option value={'desc'}>Decrease</Option>
                            </Select>
                          </Col>
                        </Row>
                        <Row justify='space-around' align='middle'>
                          <Col span={12}>Status</Col>
                          <Col span={12}>
                            <Select
                              style={{ width: 150 }}
                              onChange={handleChangeSearchStatus}
                              defaultValue={valueStatus}
                            >
                              {valueStatus.map((item, index) => (
                                <Option key={index} value={index}>
                                  {item}
                                </Option>
                              ))}
                            </Select>
                          </Col>
                        </Row>
                      </Space>
                    </Col>
                  </Row>
                  <Row>
                    <Col offset={11}>
                      <Button type='primary' onClick={handleSearch}>
                        Search
                      </Button>
                    </Col>
                    <Col offset={1}>
                      <Button type='primary' onClick={handleReset}>
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row justify='space-around' align='middle'>
              <Col span={22}>
                <div className={styles['content1-body']}>
                  <Row style={{ paddingTop: 10 }} align='middle'>
                    <Col span={4} offset={1}>
                      Total number of records: <b>{requests?.total}</b>
                    </Col>
                    <Col span={2} offset={15}>
                      Items per page:
                    </Col>
                    <Col>
                      <Select style={{ width: 70 }} onChange={handleChangePerPage}>
                        {valuePerPage.map((item, index) => (
                          <Option key={index} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Space direction='vertical' size={30} align='center'>
                        <Table
                          columns={columns}
                          dataSource={requests?.data}
                          pagination={false}
                          rowKey={(dataSource) => dataSource?.id}
                          bordered
                          loading={loadingRequests}
                          className={styles['table']}
                          tableLayout='fixed'
                        />
                        <Pagination
                          total={requests?.total}
                          pageSize={params.per_page}
                          onChange={onChangePage}
                          defaultCurrent={requests?.current_page}
                          showSizeChanger={false}
                        ></Pagination>
                        <Modal
                          visible={visibleForgetCheck}
                          footer={false}
                          width={1000}
                          title='Forget Check/in'
                          onCancel={() => setVisibleForgetCheck(false)}
                        >
                          <FormForgetView onCancel={setVisibleForgetCheck} dataModal={dataModal} role = {nameRole}/>
                        </Modal>
                        <Modal
                          visible={visiblePaiLeave}
                          footer={false}
                          width={1000}
                          title='Paid Leave'
                          onCancel={() => setVisiblePaiLeave(false)}
                        >
                          <FormConfirmLeave onCancel={() => setVisiblePaiLeave(false)} dataModalRequest={dataModal} />
                        </Modal>
                        <Modal
                          visible={visibleUnPaiLeave}
                          footer={false}
                          width={1000}
                          title='UnPaid Leave'
                          onCancel={() => setVisibleUnPaiLeave(false)}
                        >
                          <FormConfirmLeave onCancel={() => setVisiblePaiLeave(false)} dataModalRequest={dataModal} />
                        </Modal>
                        <Modal
                          visible={visibleLateEarly}
                          footer={false}
                          width={1000}
                          title='Late Early'
                          closable={false}
                          // onCancel={() => setVisibleLateEarly(false)}
                        >
                          <ConfirmLateEarly
                            status={dataModal?.status}
                            dataLateEarly={dataModal}
                            onCancel={setVisibleLateEarly}
                          />
                        </Modal>
                        <Modal
                          visible={visibleOT}
                          footer={false}
                          width={700}
                          title='OT '
                          closable={false}
                          // onCancel={() => setVisibleOT(false)}
                        >
                          <ConfirmOT status={dataModal?.status} dataOT={dataModal} onCancel={setVisibleOT} />
                        </Modal>
                      </Space>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default RequestsPage
