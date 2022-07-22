import React, { useState } from 'react'
import { Form, Input, Button, Typography, Col, Upload, Modal } from 'antd'
import { LockOutlined, UserOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'

import { post } from '../../api/BaseRequest'
import './register.css'

const { Title } = Typography

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const RegisterPage = () => {
  const [checkPhones, setCheckPhones] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [fileSource, setFileSource] = useState()
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
      phone: values.phone.charAt(0) === '0' ? values.phone : `0${values.phone}`,
      avatarSource: fileSource
    }
    console.log(registerData)
    postRegisterAPI(registerData)
  }

  const onFinishFailed = (values) => {}

  const handleChange = (info) => {
    console.log(info.file)
    setFileSource(info.file.originFileObj)
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <div className='wrapperRegister'>
      <div className='bg_img_register'></div>
      <Form
        className='form_register'
        name='basic'
        encType='multipart/form-data'
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
        <Col className='col-left'>
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
              <Input.Password
                size='large'
                prefix={<LockOutlined />}
                className='item_input_form'
                placeholder='Password'
              />
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
        </Col>
        <Col style={{}}>
          <text>Avatar</text>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt='avatar'
                style={{
                  width: '100%'
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Col>
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
