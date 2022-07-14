import React, { useEffect } from 'react'
import './login.css'
import { Form, Input, Button, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../redux/auth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

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
      <Title className='title_form'>
        <span className='title_form'>LabRoom TLU</span>
      </Title>
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
        <Form.Item
          className='form_item'
          name='username'
          rules={[
            {
              pattern: new RegExp('^[a-z\d\.-]+@thanglong\.edu\.vn$'),
              message: 'Wrong form'
            }
          ]}
        >
          <Input className='item_input' placeholder='Username@thanglong.edu.vn' />
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
        >
          <Input.Password className='item_input' placeholder='Password' />
        </Form.Item>

        <div>
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
