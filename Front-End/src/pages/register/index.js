import React from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'

import { post } from '../../api/BaseRequest'
import styles from './register.module.css'

const { Title } = Typography

const RegisterPage = () => {
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
    <div className={styles.wrapper}>
      <div className={styles.bg_img}></div>
      <Form
        className={styles.form_login}
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
          <span className={styles.title_form}>Register account TLU</span>
        </Title>

        <div className={styles.register}>
          <Form.Item
            className={styles.form_item}
            name='firstName'
            rules={[
              {
                required: true,
                message: 'Please input your firstname!'
              }
            ]}
            hasFeedback
          >
            <Input size='large' className={styles.item_input} placeholder='first name' />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name='lastName'
            rules={[
              {
                required: true,
                message: 'Please input your LastName!'
              }
            ]}
            hasFeedback
          >
            <Input size='large' className={styles.item_input} placeholder='Last name' />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
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
            <Input size='large' className={styles.item_input} placeholder='Code' />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
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
              className={styles.item_input}
              placeholder='email@thanglong.edu.vn'
            />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password
              size='large'
              prefix={<LockOutlined />}
              className={styles.item_input}
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name='phone'
            rules={[
              {
                required: true,
                message: 'Please input your phone!',
                pattern: new RegExp(`[0-9]{10}`)
              }
            ]}
            hasFeedback
          >
            <Input
              size='large'
              maxLength={10}
              addonBefore='(+84)'
              className={styles.item_input}
              placeholder='Phone number'
            />
          </Form.Item>
        </div>
        <Form.Item>
          <Button className={styles.item_input} loading={isPostingRegisterAPI} type='primary' htmlType='submit'>
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
