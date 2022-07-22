import { Avatar, Col, Descriptions, Row, Typography, Button } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import './profile.css'

const Profile = () => {
  const { userData } = useSelector((state) => state.userInfo)
  console.log(userData)

  return (
    <Row>
      <Col className='wrapper' xl={23}>
        <Col className='wrapper__row' xl={24}>
          <Col className='wrapper__row-item'>
            <Avatar
              className='wrapper__row-avatar'
              src='https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/273464181_1953237191528399_5365515146976666502_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=17zTzrqVuPIAX-fk5sX&_nc_ht=scontent.fhan3-4.fna&oh=00_AT9O_Xt3BM7YaxPaunqtbXIyZlG8VSxfnpPxkoXj824j-A&oe=62DF9B32'
              shape='square'
              size={100}
            />
            <Col className='wrapper__row-title'>
              <Typography.Title level={2}>
                {userData.lastName} {userData.firstName}
              </Typography.Title>
              <Typography.Text>User</Typography.Text>
            </Col>
          </Col>
          <Col className='wrapper__row-item'>
            <Button type='primary'>Edit avatar</Button>
          </Col>
        </Col>
        <Col className='wrapper__row' xl={24}>
          <Descriptions className='user-info'>
            <Descriptions.Item label='Full Name'>{userData.firstName + ' ' + userData.lastName}</Descriptions.Item>
            <Descriptions.Item label='Code'>{userData.code}</Descriptions.Item>
            <Descriptions.Item label='Phone'>0{userData.phone}</Descriptions.Item>
            <Descriptions.Item label='Email'>{userData.email}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Col>
    </Row>
  )
}

export default Profile
