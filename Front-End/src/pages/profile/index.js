import { Avatar, Col, Descriptions, Row, Typography, Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import './profile.css'

export default function Profile() {
  const { userData } = useSelector((state) => state.userInfo)
  console.log(userData)

  return (
    <Row>
      <Col className='wrapper' xl={23}>
        <Col className='wrapper__row' xl={24}>
          <Col className='wrapper__row-item'>
            <Avatar
              className='wrapper__row-avatar'
              src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg'
              shape='square'
              size={100}
            />
            <Col className='wrapper__row-title'>
              <Typography.Title level={2}>{userData.lastName}</Typography.Title>
              <Typography.Text>User</Typography.Text>
            </Col>
          </Col>
          <Col className='wrapper__row-item'>
            <Button type='primary'>
                    Edit avatar
            </Button>
          </Col>

        </Col>
        <Col className='wrapper__row' xl={24}>
          <Descriptions className='user-info'>
            <Descriptions.Item label='Full Name'>{userData.firstName + ' ' + userData.lastName}</Descriptions.Item>
            <Descriptions.Item label='Code'>{userData.code}</Descriptions.Item>
            <Descriptions.Item label='Phone'>{userData.phone}</Descriptions.Item>
            <Descriptions.Item label='Email'>{userData.email}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Col>
    </Row>
  )
}
