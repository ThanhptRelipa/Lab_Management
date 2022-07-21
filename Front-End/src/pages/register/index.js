import React, { useState } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'

import { post } from '../../api/BaseRequest'
import './register.css'

const { Title } = Typography

const RegisterPage = () => {
  const [checkPhones, setCheckPhones] = useState(false)

  const checkPhone = (e) => {
    setCheckPhones(e.target.value.charAt(0) === '0')
  }

  const postRegister = async(data) => {
    return await post(`api/register`, data)
  }

  const { mutate: postRegisterAPI, isLoading: isPostingRegisterAPI } = useMutation(postRegister, {
    onSuccess: (data) => {
      toast.success(`Register Success !`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      window.location.href = '/login'
    },
    onError: (errors) => {
      toast.error(`Register Failed !`, {
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
    const registerData = {
      ...values,
      phone: values.phone.charAt(0) === '0' ? values.phone : `0${values.phone}`
    }
    postRegisterAPI(registerData)
  }

  const onFinishFailed = (values) => {}

  return (
    <div className='wrapperRegister'>
      <div className='bg_img_register'></div>
      <Form
        className='form_register'
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
        <Title style={{ marginTop: 20 }}>
          <span className='title_form'>Register account TLU</span>
        </Title>

        <div className='register'>
          <Form.Item
            className='form_item'
            name='firstName'
            rules={[
              {
                required: true,
                message: 'Please input your firstname!'
              }
            ]}
            hasFeedback
          >
            <Input size='large' className='item_input_form' placeholder='First name' />
          </Form.Item>

          <Form.Item
            className='form_item'
            name='lastName'
            rules={[
              {
                required: true,
                message: 'Please input your LastName!'
              }
            ]}
            hasFeedback
          >
            <Input size='large' className='item_input_form' placeholder='Last name' />
          </Form.Item>

          <Form.Item
            className='form_item'
            name='code'
            rules={[
              {
                required: true,
                pattern: new RegExp(`^[aA0-9]{5,6}`),
                message: 'Please input your student code!'
              }
            ]}
            hasFeedback
          >
            <Input size='large' className='item_input_form' placeholder='Code' />
          </Form.Item>

          <Form.Item
            className='form_item'
            name='email'
            rules={[
              {
                required: true,
                pattern: new RegExp(`^[A-Za-zd.0-9-]+@thanglong\.edu\.vn$`),
                message: 'Please input your username!'
              }
            ]}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined />}
              size='large'
              className='item_input_form'
              placeholder='Email@thanglong.edu.vn'
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
          >
            <Input.Password size='large' prefix={<LockOutlined />} className='item_input_form' placeholder='Password' />
          </Form.Item>

          <Form.Item
            className='form_item'
            name='phone'
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
                pattern: new RegExp(checkPhones ? `[0-9]{10}` : `[0-9]{9}`)
              }
            ]}
            hasFeedback
          >
            <Input
              size='large'
              maxLength={checkPhones ? 10 : 9}
              className='item_input_form'
              placeholder='Phone number'
              onChange={(e) => checkPhone(e)}
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button className='btn_form' loading={isPostingRegisterAPI} type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
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

export default RegisterPage
