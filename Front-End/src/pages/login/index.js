import React from 'react'
import { Form, Input, Button, Typography, Checkbox } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { post } from '../../api/BaseRequest'
import { STORAGEKEY, setCookie } from '../../utils/storage'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'

const { Title } = Typography

const LoginPage = () => {
  const postUser = (data) => post(`api/login`, data)

  const { mutate: postUserAPI, isLoading: isPostingUserAPI } = useMutation(postUser, {
    onSuccess: (data) => {
      setCookie(STORAGEKEY.ACCESS_TOKEN, data.accessToken)
      window.location.href = '/'
    },
    onError: (errors) => {
      toast.error(`Login Failed !`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  })

  const onFinish = (values) => {
    postUserAPI(values)
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <div className='wrapperLogin'>
      <div className='bg_img_login'></div>
      <Form
        className='form_login'
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
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Title className='title_form'>
          <span className='title_form'>LabRoom TLU</span>
        </Title>

        <div className='login'>
          <Form.Item
            className='form_item'
            name='email'
            rules={[
              {
                required: true,
                pattern: new RegExp(`^[A-Za-zd.0-9-]+@thanglong\.edu\.vn$`),
                message: 'Please input your email!'
              }
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined />} className='item_input_form' placeholder='Email@thanglong.edu.vn' />
          </Form.Item>

          <Form.Item
            className='form_item'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} className='item_input_form' placeholder='Password' />
          </Form.Item>

          <Form.Item className='form_option'>
            <div className='selectOption'>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href='#'>Forgot password</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button className='btn_form' loading={isPostingUserAPI} type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </div>
        <div>
          <Link to='/register'>{`Register, Don't have an account!`}</Link>
        </div>
      </Form>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default LoginPage
