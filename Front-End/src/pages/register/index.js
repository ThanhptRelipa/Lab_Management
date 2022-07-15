import React from 'react'
import { Form, Input, Button, Typography, Checkbox } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from './register.module.css'

const { Title } = Typography

const RegisterPage = () => {
  const onFinish = (values) => {}

  const onFinishFailed = (values) => {}

  return (
    <div className={styles.wrapper}>
      <div className={styles.bg_img}></div>
      <Form
        className={styles.form_login}
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
        <Title className={styles.title_form}>
          <span className={styles.title_form}>Register account TLU</span>
        </Title>

        <div className={styles.register}>
          <Form.Item
            className={styles.form_item}
            name="FirstName"
            rules={[
              {
                required: true,
                message: 'Please input your firstname!',
              },
            ]}
            hasFeedback
          >
            <Input className={styles.item_input} placeholder="first name" />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name="LastName"
            rules={[
              {
                required: true,
                message: 'Please input your LastName!',
              },
            ]}
            hasFeedback
          >
            <Input className={styles.item_input} placeholder="Last name" />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name="StudentCode"
            rules={[
              {
                required: true,
                message: 'Please input your student code!',
              },
            ]}
            hasFeedback
          >
            <Input className={styles.item_input} placeholder="Student code" />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name="username"
            rules={[
              {
                required: true,
                pattern: new RegExp(`^[A-Za-zd.-]+@thanglong\.edu\.vn$`),
                message: 'Please input your username!',
              },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined />} className={styles.item_input} placeholder="email@thanglong.edu.vn" />
          </Form.Item>

          <Form.Item
            className={styles.form_item}
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} className={styles.item_input} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button className={styles.item_input} loading={true} type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default RegisterPage
