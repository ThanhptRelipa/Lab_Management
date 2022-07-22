import { Avatar, Dropdown, Menu } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import styles from './header.module.css'
import { STORAGEKEY, removeCookie } from '../../../utils/storage'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/slices/UserInfoSlice'

export default function Head() {
  const dispatch = useDispatch()
  const handleLogout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    await dispatch(logout())
    window.location.href = '/login'
  }

  const menuUser = (
    <Menu
      items={[
        {
          key: '1',
          label: <p onClick={handleLogout}>logout</p>,
          icon: <LogoutOutlined />
        }
      ]}
    />
  )

  return (
    <div className={styles.headerRight}>
      <FontAwesomeIcon className={styles.icon} icon={faBell} />
      <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
      <Dropdown overlay={menuUser} arrow>
        <Avatar
          className={styles.avatar}
          src='https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/273464181_1953237191528399_5365515146976666502_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=174925&_nc_ohc=17zTzrqVuPIAX-fk5sX&_nc_ht=scontent.fhan3-4.fna&oh=00_AT9O_Xt3BM7YaxPaunqtbXIyZlG8VSxfnpPxkoXj824j-A&oe=62DF9B32'
        />
      </Dropdown>
    </div>
  )
}
