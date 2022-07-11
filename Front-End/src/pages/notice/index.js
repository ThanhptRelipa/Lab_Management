import React from 'react'
import 'antd/dist/antd.css'
import { Col, Row, Select, Table, Space, Typography, Empty } from 'antd'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import SearchNotice from './searchNotice'
import { useDispatch, useSelector } from 'react-redux'
import { noticeRedux } from '../../redux/notice'
import { convertDataNotice } from './convertData'
import ModalNoticeEdit from '../../components/modalNotice/modamEdit'
import ModalNoticeView from '../../components/modalNotice/modalView'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'

const NoticePage = () => {
  const { Text } = Typography

  const [isModalEdit, setIsModalEdit] = useState(false)
  const [isModalView, setIsModalView] = useState(false)
  const [params, setParams] = useState({ page: 1, pageSize: 10 })
  const [valueSearch, setValueSearch] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()
  const { data, length, loading, optionSearch } = useSelector((state) => state.notice)
  const { infoUser, successGetInfo } = useSelector((state) => state.infoUser)

  useEffect(() => {
    if (optionSearch === 0) {
      dispatch(noticeRedux.selectTableNotice(params))
    } else if (optionSearch === 1) {
      dispatch(noticeRedux.searchTableNotice(valueSearch, params, false))
    }
  }, [params])

  useEffect(() => {
    if (successGetInfo) {
      if (infoUser?.roles?.find((u) => ['Manager', 'Member'].includes(u.title)) && infoUser?.roles?.length === 1) {
        history.push('/')
      }
    }
  }, [successGetInfo])

  const dataSource = convertDataNotice(data)

  const onChangeElement = (e) => {
    setParams({
      ...params,
      pageSize: e
    })
  }

  const handleChange = (e) => {
    setParams({
      ...params,
      page: e
    })
    dispatch(noticeRedux.loadingTableTrue())
  }

  const onSearch = (values) => {
    if (values.btnForm === 2) {
      setParams({ page: 1, pageSize: 10 })
      dispatch(noticeRedux.loadingTableTrue())
    } else if (values.btnForm === 1) {
      dispatch(noticeRedux.searchTableNotice(values, params, true))
      dispatch(noticeRedux.optionSearchorReset(1))
      setValueSearch(values)
    }
  }

  const onActionEdit = (e, record) => {
    e.stopPropagation()
    dispatch(noticeRedux.modalRowTable(record))
    setIsModalEdit(true)
  }

  const onActionView = (e, record) => {
    dispatch(noticeRedux.modalRowTable(record))
    e.stopPropagation()
    setIsModalView(true)
  }

  const cancelModalEdit = () => {
    setIsModalEdit(false)
  }

  const cancelModalView = () => {
    setIsModalView(false)
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      sorter: (a, b) => {
        return a.id - b.id
      },
      render: (id) => {
        return (
          <>
            <Text>{id}</Text>
          </>
        )
      }
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      sorter: (a, b) => {
        return a.subject < b.subject
      },
      render: (subject) => {
        return (
          <>
            <Link to='/notice/1' className={styles.buttonTable}>
              {subject}
            </Link>
          </>
        )
      }
    },
    {
      title: 'Author',
      dataIndex: 'author'
    },
    {
      title: 'To Department',
      dataIndex: 'published_to',
      sorter: (a, b) => a.published_to < b.published_to
    },
    {
      title: 'Publish Date',
      dataIndex: 'published_date',
      sorter: (a, b) => moment(a.published_date).unix() - moment(b.published_date).unix()
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        return (
          <>
            <Text>{status == 0 ? 'draft' : status === 1 ? 'published' : 'scheduled'}</Text>
          </>
        )
      }
    },
    {
      title: 'Atttachment',
      dataIndex: 'attachment',
      render: (attachment, record) => {
        return (
          <>
            <Typography.Link href={attachment} underline target='_blank'>
              {record.attachment_link}
            </Typography.Link>
          </>
        )
      }
    },
    {
      title: 'Detail',
      key: 'action',
      render: (index, record) => {
        return (
          <Space>
            <Text className={styles.buttonTable} underline onClick={(e) => onActionEdit(e, record)}>
              Edit
            </Text>
            <Text className={styles.buttonTable} underline onClick={(e) => onActionView(e, record)}>
              View
            </Text>
          </Space>
        )
      }
    }
  ]

  const locale = {
    emptyText: <Empty description={false} />
  }

  return (
    <>
      <SearchNotice onSearch={onSearch} />

      <Row className={styles.marginBottom}>
        <Col span={12}>
          <Text>
            Total number of records : <Text strong> {length}</Text>
          </Text>
        </Col>
        <Col span={12} className={styles.toTheRight}>
          <Select defaultValue='10' onChange={onChangeElement}>
            <Select.Option value='10'>10 / page</Select.Option>
            <Select.Option value='20'>20 / page</Select.Option>
            <Select.Option value='50'>50 / page</Select.Option>
            <Select.Option value='100'>100 / page</Select.Option>
          </Select>
          <Text>Item per page &ensp;</Text>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ['bottomCenter'],
          pageSize: params.pageSize,
          total: length,
          current: params.page,
          onChange: handleChange,
          showSizeChanger: false
        }}
        className={styles.boderTable}
        bordered={true}
        loading={loading}
        locale={locale}
      />
      <ModalNoticeEdit isModalVisible={isModalEdit} handleOk={cancelModalEdit} handleCancel={cancelModalEdit} />
      <ModalNoticeView isModalVisible={isModalView} handleOk={cancelModalView} handleCancel={cancelModalView} />
    </>
  )
}

export default NoticePage
