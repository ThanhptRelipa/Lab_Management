import React, { useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/auth'

const FormChangePassword = ({ onCancel }) => {
  const dispatch = useDispatch()
  const { successChangePassword, messageChangePassword, loadingChangePassword, errorChangePassword } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (successChangePassword) {
      toast(messageChangePassword)
      setTimeout(() => {
        onCancel()
      }, 3000)
    }
    if (errorChangePassword !== '') {
      toast(errorChangePassword)
    }
  }, [successChangePassword, errorChangePassword])

  const onFinish = (values) => {
    const { password, password_confirmation } = values
    if (password !== password_confirmation) {
      toast('Confirm password fail')
    } else {
      dispatch(authActions.changePassword(values))
    }
  }

  return (
    <Form
      name='basic'
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
      autoComplete='off'
    >
      <Form.Item
        label='Old Password'
        name='old_password'
        rules={[
          {
            required: true,
            message: 'Please input your old password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='New Password'
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your new password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label='Confirm Password'
        name='password_confirmation'
        rules={[
          {
            required: true,
            message: 'Please input your confirm new password!'
          }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16
        }}
      >
        <Button loading={loadingChangePassword} type='primary' htmlType='submit'>
          Change Password
        </Button>
      </Form.Item>
      <ToastContainer />
    </Form>
  )
}

export default FormChangePassword
