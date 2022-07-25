import React from 'react'
import { Form, Input, Button, Typography, Checkbox, Spin } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { STORAGEKEY, setCookie } from '../../utils/storage'

import { post } from '../../api/BaseRequest'
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
        progress: undefined,
      })
    },
  })

  const onFinish = (values) => {
    postUserAPI(values)
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <>
      <div style={{ position: 'relative' }}>
<<<<<<< HEAD
        <div className="wrapperLogin">
          <div className="bg_img_login"></div>
          <Spin size="large" tip="Verifying login....." spinning={isPostingUserAPI}>
=======
<<<<<<< HEAD
        <div className="wrapperLogin">
          <div className="bg_img_login"></div>
          <Spin size="large" tip="Verifying login....." spinning={isPostingUserAPI}>
            <Form
              className="form_login"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Title className="title_form">
                <span className="title_form">LabRoom TLU</span>
              </Title>

              <div className="login">
                <Form.Item
                  className="form_item"
                  name="email"
=======
        <div className='wrapperLogin'>
          <div className='bg_img_login'></div>
          <Spin size='large' tip='Verifying login.....' spinning={isPostingUserAPI}>
>>>>>>> 64210688028570c1a1dcabc0cdac78c0d0dd7d37
            <Form
              className="form_login"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Title className="title_form">
                <span className="title_form">LabRoom TLU</span>
              </Title>

              <div className="login">
                <Form.Item
<<<<<<< HEAD
                  className="form_item"
                  name="email"
=======
                  className='form_item'
                  name='email'
>>>>>>> d0ea16c (Update Login)
>>>>>>> 64210688028570c1a1dcabc0cdac78c0d0dd7d37
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp(`^[A-Za-zd.0-9-]+@thanglong\.edu\.vn$`),
<<<<<<< HEAD
                      message: 'Please input your email!',
                    },
=======
<<<<<<< HEAD
                      message: 'Please input your email!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input prefix={<UserOutlined />} className="item_input_form" placeholder="Email@thanglong.edu.vn" />
                </Form.Item>

                <Form.Item
                  className="form_item"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password prefix={<LockOutlined />} className="item_input_form" placeholder="Password" />
                </Form.Item>

                <Form.Item className="form_option">
                  <div className="selectOption">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a href="#">Forgot password</a>
=======
                      message: 'Please input your email!'
                    }
>>>>>>> 64210688028570c1a1dcabc0cdac78c0d0dd7d37
                  ]}
                  hasFeedback
                >
                  <Input prefix={<UserOutlined />} className="item_input_form" placeholder="Email@thanglong.edu.vn" />
                </Form.Item>

                <Form.Item
                  className="form_item"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password prefix={<LockOutlined />} className="item_input_form" placeholder="Password" />
                </Form.Item>

                <Form.Item className="form_option">
                  <div className="selectOption">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
<<<<<<< HEAD
                    <a href="#">Forgot password</a>
=======
                    <a href='#'>Forgot password</a>
>>>>>>> d0ea16c (Update Login)
>>>>>>> 64210688028570c1a1dcabc0cdac78c0d0dd7d37
                  </div>
                </Form.Item>

                <Form.Item>
<<<<<<< HEAD
                  <Button className="btn_form" type="primary" htmlType="submit">
=======
<<<<<<< HEAD
                  <Button className="btn_form" type="primary" htmlType="submit">
=======
                  <Button className='btn_form' type='primary' htmlType='submit'>
>>>>>>> d0ea16c (Update Login)
>>>>>>> 64210688028570c1a1dcabc0cdac78c0d0dd7d37
                    Login
                  </Button>
                </Form.Item>
              </div>
              <div>
<<<<<<< HEAD
                <Link to="/register">{`Register, Don't have an account!`}</Link>
=======
<<<<<<< HEAD
                <Link to="/register">{`Register, Don't have an account!`}</Link>
=======
                <Link to='/register'>{`Register, Don't have an account!`}</Link>
>>>>>>> d0ea16c (Update Login)
>>>>>>> 64210688028570c1a1dcabc0cdac78c0d0dd7d37
              </div>
            </Form>
          </Spin>
          <ToastContainer
<<<<<<< HEAD
            position="top-right"
=======
<<<<<<< HEAD
            position="top-right"
=======
            position='top-right'
>>>>>>> d0ea16c (Update Login)
>>>>>>> 64210688028570c1a1dcabc0cdac78c0d0dd7d37
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
      </div>
    </>
  )
}

export default LoginPage
