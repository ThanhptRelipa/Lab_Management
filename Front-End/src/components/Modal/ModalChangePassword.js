import { Modal, Form, Input, Button, Space, Spin } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'
import { useMutation } from 'react-query'

import { patch } from '../../api/BaseRequest'

const ModalChangePassword = ({ isModalVisible, setIsModalVisible }) => {
  const [form] = Form.useForm()

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const patchChangePassword = (data) => patch(`api/updatePassword`, data)

  const { mutate: patchPassword, isLoading: isPatchingPassword } = useMutation(patchChangePassword, {
    onSuccess: (data) => {
      toast.success(`${data.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })

      setIsModalVisible(false)
    },
    onError: (error) => {
      toast.error(`${error.response.data.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  })

  const onFinish = (values) => {
    patchPassword(values)
    form.resetFields()
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <>
      <Modal title='Change Password' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <Spin tip='Changing password......' spinning={isPatchingPassword}>
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
              dependencies={['oldPassword']}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('oldPassword') !== value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The new password is the same as the old password'))
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label='Confirm Password'
              name='confirmPassword'
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                  }
                })
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
        </Spin>
      </Modal>
    </>
  )
}

export default ModalChangePassword
