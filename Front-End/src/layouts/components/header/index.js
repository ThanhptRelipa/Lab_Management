import { Avatar, Dropdown, Menu } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import style from './header.module.css'
import { STORAGEKEY, removeCookie } from '../../../utils/storage'

export default function Head() {
  const handleLogout = async() => {
    await removeCookie(STORAGEKEY.ACCESS_TOKEN)
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
    <>
      {/* <Text className='notification'>03</Text> */}
      <FontAwesomeIcon className={style.icon} icon={faBell} />
      <FontAwesomeIcon className={style.icon} icon={faEnvelope} />
      <Dropdown overlay={menuUser} arrow>
        <Avatar
          className={style.avatar}
          src='https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/226396345_112714520999473_4823512747928449349_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=r1Gv66ilVM8AX_X-P0B&_nc_ht=scontent.fhph2-1.fna&oh=00_AT_TedsQ2ajuyXa5zwpHSAfcWKK5gNA3vR0dGSVP3BhjNw&oe=6265FB83'
        />
      </Dropdown>
    </>
  )
}
