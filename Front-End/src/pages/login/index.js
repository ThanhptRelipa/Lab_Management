import React, { useEffect } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { authActions } from '../../redux/auth'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'

const { Title } = Typography
const LoginPage = () => {
  const { successLogin, loadingLogin, errorLogin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (successLogin === true) {
      window.location.href = '/'
    }
  }, [successLogin])

  useEffect(() => {
    if (errorLogin !== '') {
      toast(errorLogin)
    }
  }, [errorLogin])

  const onFinish = (values) => {
    dispatch(authActions.login(values))
  }

  const onFinishFailed = (errorInfo) => {}

  return (
    <div className='wrapper'>
      <div className='bg_img'></div>
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
            name='username'
            rules={[
              {
                pattern: new RegExp('^[a-zd.-]+@thanglong.edu.vn$'),
                message: 'Wrong form'
              }
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              className='item_input'
              placeholder='Username@thanglong.edu.vn'
            />
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
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              className='item_input'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button className='item_input' loading={loadingLogin} type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </div>
        <div>
          <Link to='/register'>Register, Don't have account!</Link>
        </div>
      </Form>
      <ToastContainer />
    </div>
  )
}

export default LoginPage
