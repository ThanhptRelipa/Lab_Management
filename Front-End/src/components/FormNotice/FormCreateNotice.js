import React from 'react'
import { Form, Row, Col, Input, Select, Upload, message, Button, DatePicker } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import style from './createNotice.module.css'
import { noticeRedux } from '../../redux/notice'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

const { Option } = Select
const { TextArea } = Input
const CreateNotice = () => {
  const user = useSelector((state) => state.infoUser.infoUser)
  console.log(user)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  // Upload file
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  const onFinish = (value) => {
    const formData = new FormData()
    const newNotice = {
      published_date: value.PublishedDate.format('YYYY/MM/DD'),
      subject: value.Subject,
      message: value.message,
      status: +value.status,
      created_by: user.id,
      file_attachment: value.acttachment.file.originFileObj,
      published_to: +value.Departmemt
    }
    Object.keys(newNotice).forEach((key) => {
      formData.append(key, newNotice[key])
    })
    dispatch(noticeRedux.postCreateNotice(formData))
  }

  const onFinishFailed = (err) => {}

  const onDate = (date) => {}

  const onReset = () => {
    form.resetFields()
  }

  return (
    <>
      <h1>Create Notice</h1>
      <Form
        name='CreateNotice'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row className={style.row}>
          <Col span={5}>Subject: </Col>
          <Col span={19}>
            <Form.Item
              name='Subject'
              rules={[
                {
                  required: true,
                  message: 'Please input your subject'
                },
                {
                  min: 10,
                  message: 'Please input length less 10 character'
                }
              ]}
              className={style.m_0}
            >
              <Input placeholder='String for search' />
            </Form.Item>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col span={5}>To Department: </Col>
          <Col span={19}>
            <Form.Item name='Departmemt' className={style.m_0} initialValue = '0'>
              <Select defaultValue='All'>
                <Option value='0'>All</Option>
                <Option value='1'>D1</Option>
                <Option value='2'>D2</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col span={5}>Attachment: </Col>
          <Col span={19}>
            <Form.Item
              name='acttachment'
              rules={[
                {
                  required: true,
                  message: 'Please input attachment your file'
                }
              ]}
              className={style.m_0}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col span={5}>Published date: </Col>
          <Col span={19}>
            <Form.Item
              name='PublishedDate'
              rules={[
                {
                  required: true,
                  message: 'Please choose date'
                }
              ]}
              className={style.m_0}
            >
              <DatePicker onChange={onDate} />
            </Form.Item>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col span={5}>Status: </Col>
          <Col span={19}>
            <Form.Item name='status' className={style.m_0} initialValue = '0'>
              <Select defaultValue='Draft'>
                <Option value = '0'>Draft</Option>
                <Option value='1'>Public</Option>
                <Option value='2'>Schedule</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row className={style.row}>
          <Col span={5}>Message: </Col>
          <Col span={19}>
            <Form.Item
              name='message'
              rules={[
                {
                  required: true,
                  message: 'Please input your message'
                }
              ]}
              className={style.m_0}
            >
              <TextArea rows={6} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' className={style.button}>
            Create
          </Button>

          <Button htmlType='button' onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateNotice
