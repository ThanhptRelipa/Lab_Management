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
          src='https://upload.wikimedia.org/wikipedia/commons/c/c1/Lionel_Messi_20180626.jpg'
        />
      </Dropdown>
    </div>
  )
}
