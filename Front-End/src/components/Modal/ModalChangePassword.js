import { Modal, Form, Input, Button, Space } from 'antd'
import React from 'react'

const ModalChangePassword = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const onFinish = (values) => {
    console.log(values)
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <>
      <Modal title='Basic Modal' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <Form
          name='Change Password'
          form={form}
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Old password'
            name='oldPassword'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='New password'
            name='newPassword'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label='Re-new password'
            name='reNewPassword'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <Space>
              <Button key='submit' type='primary' htmlType='submit'>
                Change Password
              </Button>
              <Button key='cancel' onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalChangePassword
