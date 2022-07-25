import { Avatar, Dropdown, Menu } from 'antd'
import { KeyOutlined, LogoutOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import styles from './header.module.css'
import { STORAGEKEY, removeCookie } from '../../../utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../redux/slices/UserInfoSlice'
import ModalChangePassword from '../../../components/Modal/ModalChangePassword'

export default function Head() {
  // state
  const [modalChangePassword, setModalChangePassword] = useState(false)
  // redux
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.userInfo)

  const handleLogout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
    await dispatch(logout())
    window.location.href = '/login'
  }

  const handleOpenModal = () => {
    setModalChangePassword(true)
  }

  const menuUser = (
    <Menu
      items={[
        {
          key: '1',
          label: <a onClick={handleOpenModal}>Change Password</a>,
          icon: <KeyOutlined />
        },
        {
          key: '2',
          label: <a onClick={handleLogout}>Logout</a>,
          icon: <LogoutOutlined />
        }
      ]}
    />
  )

  return (
    <div className={styles.headerRight}>
      <FontAwesomeIcon className={styles.icon} icon={faBell} />
      <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
      <Dropdown overlay={menuUser} placement='bottomRight'>
        <Avatar className={styles.avatar} src={userData.avatarUrl} />
      </Dropdown>
      <ModalChangePassword isModalVisible={modalChangePassword} setIsModalVisible={setModalChangePassword} />
    </div>
  )
}
